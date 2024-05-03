import { assets } from '@/assets/assetImages';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const serviceData = [
    {
        imageSrc: assets.images.award,
        title:"Award Winning Service",
        borderRadious:"10px 10px 100px 10px",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, nobis!"
    },
    {
        imageSrc: assets.images.award,
        title:"Award Winning Service",
        borderRadious:"10px 100px 10px 10px",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, nobis!"
    },
    {
        imageSrc: assets.images.award,
        title:"Award Winning Service",
        borderRadious:"10px 10px 100px 10px",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, nobis!"
    },
    {
        imageSrc: assets.images.award,
        title:"Award Winning Service",
        borderRadious:"10px 100px 10px 10px",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, nobis!"
    },
]

const WhyUs = () => {
    return (
        <Container>
            <Box>
                <Box sx={{textAlign:"center"}}>
                    <Typography color="primary" variant="h6" component="h1" fontWeight={700}>
                        Why Us
                    </Typography>
                    <Typography color="primary" variant="h4" component="h1" fontWeight={700}>
                        Why Choose Us
                    </Typography>
                </Box>

                <Grid container spacing={2} my={5} alignItems={"center"}>
                    <Grid item md={6}>
                        {
                            serviceData.map((service:any) => <Box sx={{display:"flex", gap:"15px",backgroundColor:"rgba(245,245,245,1)",padding:"15px",alignItems:"center",borderRadius:service.borderRadious,margin:"20px 0"}} key={service.title}>
                            <Box sx={{backgroundColor:"#fff",padding:"10px",borderRadius:"10px"}}>
                                <Image src={service.imageSrc} alt='' width={50} height={100} />
                            </Box>
                            <Box>
                                <Typography variant='h6' component={"h6"} fontWeight={600}>
                                    {service.title}
                                </Typography>
                                <Typography variant='body2' color={"primary.body1"} fontWeight={300}>
                                    {service.description}
                                </Typography>
                            </Box>
                        </Box>)
                        }
                        
                    </Grid>
                    <Grid item md={6}>
                        <Image style={{margin:"auto"}}  width={320} height={400} src={assets.images.whyDoctor} alt='' />
                    </Grid>
                </Grid>

            </Box>
        </Container>
    );
};

export default WhyUs;