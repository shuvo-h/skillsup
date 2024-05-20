import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TopRatedDoctors = async() => {
    const {data:doctors} = await fetch(`http://localhost:5000/api/v1/doctor?page=1&limit=3`).then(res=>res.json())
    
    

    return (
        <Box sx={{my:10,py:30,backgroundColor:"rgba(20,20,20,0.1)", clipPath:"polygon(0 0, 100% 25%, 100% 100%, 0 75%)"}}>
            <Box sx={{textAlign:"center"}}>
                <Typography variant='h4' component={"h1"} fontWeight={700}>Our Top Reated Doctors</Typography>
                <Typography component={"p"} fontWeight={400} fontSize={18} sx={{mt:2}}>Access to expert physicians and surgeons, advanced technologies</Typography>
            </Box>
            <Container sx={{margin:"30px auto"}}>
                <Grid container spacing={2}>
                    {
                        doctors.map((doctor:any) =><Grid sx={{padding:"4px"}} md={4} key={doctor._id}>
                            <Card >
                                <Box>
                                    <Image src={doctor.profilePhoto ||"/"} width={400} height={100} alt='' />
                                </Box>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {doctor.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {doctor.qualification}, {" "}
                                    {doctor.designation}
                                    </Typography>
                                    <Typography mt={1} variant="body2" color="text.secondary">
                                    <LocationOnIcon /> {doctor.address}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent:"space-between",px:2,paddingBottom:"20px"}}>
                                    <Button >Book Now</Button>
                                    <Button variant='outlined'>View Profile</Button>
                                </CardActions>
                            </Card>
                        </Grid>)
                    }
                </Grid>
                <Box sx={{textAlign:"center"}}>
                    <Button variant='outlined' sx={{marginTop:"20px"}}>View All</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default TopRatedDoctors;