"use server";
import { NextRequest, NextResponse } from "next/server";
import { Word, wordFromJson } from "@/types/synonym";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const word = searchParams.get("word") ?? "";

    if (!word.trim()) {
        return NextResponse.json([], { status: 200 });
    }

    const safe = encodeURIComponent( word.toLowerCase());
    const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${safe}?key=${process.env.API_KEY_THESAURUS}`;

    const response = await fetch(url, { cache: "no-store" });
    const raw = await response.json();

    const wordObj = wordFromJson(word, raw);
    return NextResponse.json(wordObj);
}

