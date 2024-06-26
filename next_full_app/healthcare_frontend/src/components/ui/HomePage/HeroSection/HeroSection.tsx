import { assets } from '@/assets/assetImages';
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
    return (
        <Container sx={{display:"flex",direction:"row",my:16}}>
            <Box sx={{flex:1,position:"relative"}}>
                <Box sx={{position:"absolute",width:"700px",top:"-90px",left:"-120px"}}>
                    <Image style={{ opacity: 0.1 }} src={assets.images.gridShape} alt='' />
                </Box>
                <Typography variant='h3' component="h1" fontWeight={600}>Healthcare Hearts</Typography>
                <Typography variant='h3' component="h1">Comes From</Typography>
                <Typography color={"primary.main"} variant='h3' component="h1" >Preventive Care</Typography>
                <Typography  variant='h6' component="p" fontWeight={400} sx={{width:"50%"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, dicta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, fugiat omnis? Corporis error perferendis vel eius animi.</Typography>
                <Box sx={{display:"flex", gap:2}}>
                    <Button>Make Appointment</Button>
                    <Button variant='outlined'>Contact us</Button>
                </Box>
            </Box>
            <Box sx={{p:1,flex:1,display:"flex",justifyContent:"center",position:"relative",mt:0}}>
                <Box>
                    <Image fill={true} src={assets.images.doctor_banner} alt='' />
                </Box>
            </Box>
        </Container>
    );
};

export default HeroSection;