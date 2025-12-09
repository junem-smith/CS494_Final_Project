
import { Word } from "@/types/synonym";
import { getSynonyms } from "@/lib/synonyms";
import { wordFromJson } from "@/types/synonym";

function mix (text: string) {
    let temp = text.split(" ");

    for (const word in temp){

    }

}

async function replace_random_word (text: string) {
    let temp = text.split(" ");
    const rand = Math.random() * temp.length;

    let word = temp[rand]
    const synonyms = await getSynonyms(word);
    
    
    
    // const rand2 = Math.random() * synonyms.length;
}
