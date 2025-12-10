"use client";

import { useTextContext } from "@/context/textContext";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { useEffect } from "react";
import { mix } from "@/components/mix";
import Notes from "@/components/notes";


export default function Home() {
    const { text, setText } = useTextContext()
    const router = useRouter();
    
    useEffect(()=> {
        if (text == null || text == undefined || text == ""){
            router.push("/input");
        }
        
    },[])

    async function mixText() {
        if (!text || text.trim().length === 0) return;
        const mixed = await mix(text)
        setText(mixed)
    }

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
            <Grid spacing={2}>
                <Logo/>
                <br/>
                <Grid sx={{display: 'flex', justifyContent: 'center', borderRadius: 1}}>
                    <Container sx={{display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        borderRadius: 1,}}>
                        <Button variant="contained" disabled={!text || text.trim().length === 0} onClick={() => { mixText() }}>
                        ReMix!
                        </Button>
                    </Container>
                    <Container sx={{display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        borderRadius: 1,}}>
                        <Button variant="contained"  onClick={() => { router.push("/input") }}>
                        New Story
                        </Button>
                    </Container>
                    
                </Grid>
                <br/>
                <Typography fontWeight="bold">Your Mixed Story:</Typography>
                <Container maxWidth="sm" sx={{ backgroundColor: 'whitesmoke', display: 'flex' }}>
                    <Typography variant="body1" gutterBottom >
                        {text}
                    </Typography>
                </Container>
                
                <br/><br/><br/><br/><br/>
                <Notes/>
            </Grid>
            
        </Box>
    );
}
