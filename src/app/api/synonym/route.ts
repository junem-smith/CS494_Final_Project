import { type NextRequest } from "next/server";
import { Word, wordFromJson } from "@/types/synonym";
import { getSynonyms } from "@/lib/synonyms";


import { redis } from "@/lib/redis";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('word') ?? ""
    const synonyms = await getSynonyms(query)
    return Response.json({ synonyms: synonyms})

}

// process.env.API_KEY_DICTIONARY
