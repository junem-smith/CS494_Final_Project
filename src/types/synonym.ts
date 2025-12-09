
export type Word = {
    name: string,
    syns: Synonym[]
}


export type Synonym = {
    word: string
    synonym: string
}

export type RawSynonyms = {
    meta?: { id: string };
    def?: {
    sseq: [
        [
        "sense",
        {
            dt: (
            | ["text", string]
            | ["syn_list", { wd: string }[][]]
            )[];
        }
        ]
    ][];
    }[];
}[];

function extractSyns(data: any[]): string[] {
    const syns: string[] = [];

    for (const entry of data) {
        for (const d of entry.def ?? []) {
            for (const sseq of d.sseq ?? []) {
            for (const sense of sseq) {
                const body = sense[1];
                for (const dt of body?.dt ?? []) {
                if (dt[0] === "syn_list") {
                    for (const group of dt[1]) {
                    for (const item of group) {
                        syns.push(item.wd);
                    }
                    }
                }
                }
            }
            }
        }
    }

    return syns;
}

export function wordFromJson(name: string, data: any[]): Word {
    const rawSyns = extractSyns(data); 

    const syns = rawSyns.map(s => ({
        word: name,
        synonym: s
    }));

    return {
        name: name,
        syns: syns
    }
    
}