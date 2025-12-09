"use client";

import { useTextContext } from "@/context/textContext";
import { Box, Button, Grid, Link, Typography, Paper, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import React, { useState, useEffect } from "react";
import { Grid3x3Rounded } from "@mui/icons-material";


export default function Home() {
    const { text, setText } = useTextContext()
    const router = useRouter();
    
    useEffect(()=> {
        if (!text){
            router.push("/input");
        }
        
    },[text])

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
            <Grid spacing={2}>
                <Logo/>
                    <br/>
                <Container maxWidth="sm" sx={{ backgroundColor: 'whitesmoke', display: 'flex' }}>
                    <Typography variant="body1" gutterBottom >
                        Mixed text: {text}
                    </Typography>
                </Container>
                <Container>
                    <br/>
                    <Button variant="contained" disabled={true} onClick={() => { setText(text) }}>
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
