"use client"

import { TextField, Button, Box, Grid, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

export default function Home() {
  const router = useRouter();

  return (
    <Box display="flex"
      justifyContent="center"
      alignItems="center">
      <Grid spacing={2} >
        <Logo/>
        <br/>

        <Typography sx={{ 
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }} variant="h5">Submit the text you want, and MIX it until you get something new!</Typography>
        <br/>
        <br/>
        <Grid display="flex" justifyContent="center">
          <Button size="large" variant="contained" sx={{justifyContent: 'center', padding: '14px 28px', fontSize: '1.2rem' }} onClick={() => { router.push("/input") }}>
          Create New Story
          </Button>
        </Grid>
        
      </Grid>
    </Box>
  );
}
