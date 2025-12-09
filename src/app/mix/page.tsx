"use client";

import { useTextContext } from "@/context/textContext";
import { Box, Button, Grid, Link, Typography, Paper, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import React, { useState, useEffect } from "react";
import { Grid3x3Rounded } from "@mui/icons-material";
import { mix } from "@/components/mix";


export default function Home() {
    const { text, setText } = useTextContext()
    const router = useRouter();
    
    useEffect(()=> {
        if (text === null || text === undefined){
            router.push("/input");
        }
        
    },[])

    async function mixText(text: string) {
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
                <Typography fontWeight="bold">Your Mixed Story:</Typography>
                <Container maxWidth="sm" sx={{ backgroundColor: 'whitesmoke', display: 'flex' }}>
                    <Typography variant="body1" gutterBottom >
                        {text}
                    </Typography>
                </Container>
                <Container>
                    <br/>
                    <Button variant="contained" disabled={false} onClick={() => { mixText(text) }}>
                        ReMix!
                    </Button>
                    <Button variant="contained"  onClick={() => { router.push("/input") }}>
                        New Story
                    </Button>
                </Container>
                
            </Grid>
        </Box>
    );
}
