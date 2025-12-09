"use client";
/*
 * 
 * Title page with button
 * 
 * Mixer function
 *    Takes in text
 *    splits it into an array
 *    while random number:
 *    Finds words at random index in array
 *    If word has no synonyms, find another
 *    Keep track of which words have been mixed
 *    Replace current word with random synonym
 *    continue until randomized word count is equal to randomized number
 *    Put array back together into a string
 *    return that string
 * 
 * Main screen
 *    large text field
 *    Mix button uses the input into the text field and puts it through the mixer function
 * 
 * Mixed Screen
 *    Next the mixed text is remembered and displayed
 *    Re-Mix button takes the current text and puts it through the function, then the old text value is replaced by the new one and that is displayed on the same page.
 *    New Story button returns you to the main mixing screen and text field, and deletes the old data
 * 
 * 
 */
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import { useTextContext } from "@/context/textContext";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { mix } from "@/components/mix";

export default function Input() {
  const router = useRouter();
  const [userText, setUserText] = useState<string>("")
  const { text, setText } = useTextContext()
  let canMix = userText ? false : true;


  async function mixText (uText: string) {
    setText( await mix(uText) )
    router.push("/mix");
  }

  return (
    <Box display="flex"
  justifyContent="center"
  alignItems="center">
        <Grid spacing={2}>
            <Logo/>
            <br/>

            <TextField
                id="usertext"
                value={userText}
                sx={{ m: 1, width: '50ch',  justifyContent: 'center' }}
                multiline
                rows={12}
                variant="filled"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserText(event.target.value);
                }}
                
            />
            
            <Button variant="contained" disabled={canMix} sx={{justifyContent: 'center'}} onClick={() => { mixText(userText) }}>
            Mix!
            </Button>
      </Grid>
    </Box>
  );
}
