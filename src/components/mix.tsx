

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
async function replace_random_word (text: string) {
    let temp = text.split(" ");
    const rand = Math.floor(Math.random() * temp.length);

    let word = temp[rand];
    const char = containsSpecialCharacter(word);

    const word1 = char ? word.replace(char, "") : word;

    const res = await fetch(`/api/synonyms?word=${word}`);
    const { synonyms } = await res.json();
    const syns = synonyms.syns;
    if (syns.length == 0) return text;


    let syn = syns[Math.floor(Math.random() * syns.length)].synonym;

    const newWord = syn + (char ?? "");
    
    temp[rand] = newWord;

    return temp.join(" ");
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