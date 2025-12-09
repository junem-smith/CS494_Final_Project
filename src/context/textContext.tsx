"use client";

import { ReactNode, createContext, useState, useContext } from "react"


// props type
type TextProps = {
    text: string,
    setText: (text: string)=>void
}

// createContext
const TextContext = createContext<TextProps | undefined>(undefined)


// provider
export function TextProvider(props: {children: ReactNode}){
    const  [text, setText] = useState<string>("")

    return (
        <TextContext.Provider value={{text: text, setText: setText}}>
            {props.children}
        </TextContext.Provider>
    )
}


// use context
export function useTextContext(){
    const context = useContext(TextContext)
    if (!context){
        throw Error("Context not defined.")
    }
    return context
    
}