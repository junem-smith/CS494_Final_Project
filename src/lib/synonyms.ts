import { wordFromJson } from "@/types/synonym";
import { redis } from "@/lib/redis";


export async function getSynonyms(word: string){
    // const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY_DICTIONARY}`
    const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.API_KEY_THESAURUS}`
    const cached = await redis.get(word)
    
    if (cached) return cached

    console.log("NOT FOUND")
    const response = await fetch(url)
    const data = await response.json()

    const synonyms = wordFromJson(word, data)
    await redis.set(word, synonyms)
    return synonyms
}