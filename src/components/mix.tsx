"use client";

export async function mix(text: string) {
    let newText = text;

    const r = Math.floor(Math.random() * 6) + 1;

    for (let i = 0; i < r; i++) {
        newText = await replace_random_word(newText);
    }

    return newText;
}

/**
 * Find a random synonym of one random word in text 
 * and replace the word with it.
 * 
 * @param text 
 */
async function replace_random_word(text: string) {
    let words = text.split(" ");
    const rand = Math.floor(Math.random() * words.length);

    // random word that could have punctuation
    const token = words[rand];
    const { before, core, after } = splitWord(token);
    
    if (!core || core.trim().length === 0) return text;

    const res = await fetch(`/api/synonyms?word=${encodeURIComponent(core)}`);

    if (!res.ok) {
        console.error("Error from /api/synonyms:", res.status);
        return text;
    }

    let json;
    try {
        json = await res.json();
    } catch (err) {
        console.error("JSON parse error:", err);
        return text;
    }

    
    const syns = json?.syns ?? [];

    if (syns.length === 0) {
        console.warn(`No synonyms for word: ${core}`);
        return text;
    }

    // pick random synonym
    const syn = syns[Math.floor(Math.random() * syns.length)];

    // Add punctuation if needed
    const newToken = before + syn + after;
    words[rand] = newToken;

    return words.join(" ");
}

/**
 * Handle possible punctuation around a word
 * @param token 
 * @returns 
 */
function splitWord(token: string) {
    const match = token.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9]+)([^a-zA-Z0-9]*)$/);

    if (!match) {
        return { before: "", core: token, after: "" };
    }

    return {
        before: match[1],
        core: match[2],
        after: match[3],
    };
}
