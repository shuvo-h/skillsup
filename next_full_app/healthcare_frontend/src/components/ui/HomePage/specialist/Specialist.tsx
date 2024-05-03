import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Specialist = async() => {
    const res = await fetch(`http://localhost:5000/api/v1/specialties`,{
        next:{
            revalidate: 30
        }
    })
    const result = await res.json()
    console.log(result);
    
    return (
        <Container>
            <Box sx={{margin:"40px 0",textAlign:"center"}}>
                <Box sx={{textAlign:"start"}}>
                    <Typography variant='h4' fontWeight={600}>Explore Treatments Across Specialties</Typography>
                    <Typography component='p' fontWeight={300} fontSize={18}>Experienced Doctors Across All Specialties</Typography>
                </Box>
                <Stack direction={"row"} gap={4} mt={5}>
                    {
                        result.data?.map((speciality:any)=>(
                            <Box key={speciality._id} sx={{
                                flex:1,width:"150px",backgroundColor:"rgba(245,245,245,1)", border:"1px solid rgba(250,250,250,1)",borderRadius:"10px",textAlign:"center",padding:"40px 10px",
                                "& img":{width:"50px",height:"50px",margin:'0 auto'},
                                "&:hover":{ border:"1px solid blue",borderRadius:"10px",padding:"40px 10px"},
                                }}>
                                <Image width={100} height={100} src={speciality.icon} alt='Speciality icon' />
                                <Box>
                                <Typography component='p' fontWeight={300} mt={2}>{speciality.title}</Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </Stack>
                <Box>
                    <Button variant='outlined' sx={{marginTop:"20px"}}>View All</Button>

                </Box>
            </Box>
        </Container>
    );
};

export default Specialist;