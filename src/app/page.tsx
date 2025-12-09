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

        <Typography variant="h5">Submit the text you want, and MIX it until you get something new!</Typography>
        <br/>
        <Grid display="flex" justifyContent="center">
          <Button variant="contained" sx={{justifyContent: 'center'}} onClick={() => { router.push("/input") }}>
          Create New Story
          </Button>
        </Grid>
        
      </Grid>
    </Box>
  );
}
