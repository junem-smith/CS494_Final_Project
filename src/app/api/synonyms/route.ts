"use server";
import { type NextRequest } from "next/server";
import { getSynonyms } from "@/lib/synonyms";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('word') ?? ""
    const synonyms = await getSynonyms(query)
    return Response.json({ synonyms })

}

// process.env.API_KEY_DICTIONARY
