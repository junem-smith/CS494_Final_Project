"use client";

import { Box } from "@mui/material"
import Image from "next/image";

export default function Logo(){
    return (
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Image
                src="/thumbnail_image.png"
                alt="Docu-Mixer!"
                width={1424 / 3}
                height={913 / 3}
            />
        </Box>
    )
    
}