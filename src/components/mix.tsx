"use client";

export async function mix (text: string) {
    let newText = text;

    const r = Math.floor(Math.random() * 6) + 1;

    for (let i = 0; i < r; i++){
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

    const token = words[rand];

    // In case of special characters like punctuation.
    const { before, core, after } = splitWord(token);
    
    if (!core || core.trim().length === 0) return text;

    
    const res = await fetch(`/api/synonyms?word=${encodeURIComponent(core)}`);
    if (!res.ok) {
    console.error("Failed to fetch synonyms for:", core);
    return text;
}

    const { synonyms } = await res.json();
    const syns = Array.isArray(synonyms.syns) ? synonyms.syns : [];

    if (syns.length === 0) return text;

    const syn = syns[Math.floor(Math.random() * syns.length)].synonym;

    // Reassemble the token
    const newToken = before + syn + after;
    words[rand] = newToken;

    return words.join(" ");
}

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

function containsSpecialCharacter(str: string) {
    let specialChars = "!@#$%^&*()-_=+[{]};:'\",<.>/?\\|";
    if (!str) return null;
    for (var i = 0; i < str.length; i++) {
        if (specialChars.indexOf(str[i]) !== -1) {
            return str[i];
        }
    }
    return null;
}