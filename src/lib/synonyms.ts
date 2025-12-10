"use server";

import { Word, wordFromJson } from "@/types/synonym";
import { redis } from "@/lib/redis";


export async function getSynonyms(word: string): Promise<Word> {
  try {
    const cached = await redis.get(word);

    // If Redis returned an object, just return it
    if (cached && typeof cached === "object") {
      return cached as Word;
    }

    // If Redis returned a string, parse it
    if (cached && typeof cached === "string") {
      return JSON.parse(cached) as Word;
    }

    // Otherwise fetch from the dictionary API
    const safe = encodeURIComponent(word);
    const url =
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${safe}?key=${process.env.API_KEY_THESAURUS}`;

    const response = await fetch(url);
    const data = await response.json();

    const synonyms = wordFromJson(word, data);

    // Store as *raw object*, not string
    await redis.set(word, synonyms);

    return synonyms;

  } catch (err) {
    console.error("Failed to fetch synonyms:", err);
    return { name: word, syns: [] }; // safe fallback
  }
}