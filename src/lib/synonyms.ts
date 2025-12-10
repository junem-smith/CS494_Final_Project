"use server";

import { Word, wordFromJson } from "@/types/synonym";
import { redis } from "@/lib/redis";

export async function getSynonyms(word: string): Promise<Word> {
  try {
    const cached = await redis.get(word);

    if (cached && typeof cached === "object") {
      return cached as Word;
    }
    if (cached && typeof cached === "string") {
      return JSON.parse(cached) as Word;
    }

    // FETCH
    let base = word.toLowerCase();
    if (base.endsWith("s") && base.length > 3) {
        base = base.slice(0, -1); // singularize naive plural
    }
    const safe = encodeURIComponent(base);
    const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${safe}?key=${process.env.API_KEY_THESAURUS}`;

    const response = await fetch(url);
    const data = await response.json();

    
    if (Array.isArray(data) && typeof data[0] === "string") {
      const suggested = data[0];
      return await getSynonyms(suggested);
    }

    const synonyms = wordFromJson(word, data);

    
    if (synonyms.syns.length > 0) {
      await redis.set(word, synonyms);
    }

    return synonyms;

  } catch (err) {
    console.error("Failed to fetch synonyms:", err);
    return { name: word, syns: [] };
  }
}