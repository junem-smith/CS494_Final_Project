"use server";

import { Word, wordFromJson } from "@/types/synonym";
import { redis } from "@/lib/redis";


export async function getSynonyms(word: string): Promise<Word>{
    // const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY_DICTIONARY}`
    const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.API_KEY_THESAURUS}`
    const cached = await redis.get(word) as string | null;
    
    if (cached) return JSON.parse(cached) as Word;

    console.log("NOT FOUND")
    const response = await fetch(url)
    const data = await response.json()

    const synonyms = wordFromJson(word, data)
    await redis.set(word, JSON.stringify(synonyms))
    return synonyms
}