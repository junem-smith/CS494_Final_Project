"use client";

import { Box, List, ListItem, Typography } from "@mui/material"

export default function Notes(){
    return (
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <List>
                <ListItem>
                    <Typography fontWeight="bold">
                        Ideas:
                    </Typography>
                    
                </ListItem>
                <ListItem>-- Try it with a longer story to see how long it takes to become unrecognizable!</ListItem>
                <ListItem>-- See if your friends can guess what the original was!</ListItem>
                <ListItem>-- Mix famous song lyrics!</ListItem>
                <ListItem>-- Find a word you wouldn't often use!</ListItem>
                <br/>

            </List>
        </Box>
    )
    
}