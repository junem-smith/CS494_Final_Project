
export type Word = {
    name: string,
    syns: string[]
}


export type Synonym = {
    word: string
    synonym: string
}


export type RawSynonyms = {
    meta?: { id: string };
    syns: string[];
}[];



function extractSyns(data: any[]): RawSynonyms {
    const rawSyns: RawSynonyms = [];

    for (const entry of data) {
        const synSet = new Set<string>();

        // Only include top-level meta.syns
        for (const group of entry.meta?.syns ?? []) {
            for (const word of group ?? []) {
                if (word) synSet.add(word);
            }
        }

        if (synSet.size > 0) {
            rawSyns.push({
            meta: entry.meta ? { id: entry.meta.id } : undefined,
            syns: Array.from(synSet)
        });
        }
    }

    return rawSyns;
}

export function wordFromJson(name: string, data: any[]): Word {
    const rawSyns = extractSyns(data); 
    const syns: string[] = rawSyns.flatMap(r => r.syns);


    return {
        name,
        syns
    };
}