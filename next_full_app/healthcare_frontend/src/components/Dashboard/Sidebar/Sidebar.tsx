'use client'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Image from 'next/image';
import { assets } from '@/assets/assetImages';
import Link from 'next/link';
import { drawerItems } from '@/utils/drawerItems';
import { TUserRole } from '@/types';
import SidebarItem from './SidebarItem';
import { getUserInfo } from '@/services/actions/auth.service';
import { useEffect, useState } from 'react';


const Sidebar = () => {
  const [userRole,setUserRole] = useState("")
  
    useEffect(()=>{
      const {role} = getUserInfo();
      setUserRole(role)
    },[])
  
    
    return (
        <Box>
          <Stack 
            sx={{py:1,mt:1}} 
            direction="row" 
            justifyContent={"center"} 
            gap={1}
            component={Link}
            href={"/"}
          >
            
            <Image src={assets.svgs.logo} width={40} height={40} alt='logo' />
            <Typography sx={{cursor:"pointer"}} variant="h6" component="h1"> PH Health Care</Typography>
          </Stack>
          <List>
            {drawerItems(userRole as TUserRole).map((item, index) => (
              <SidebarItem item={item}  key={index} />
            ))}
          </List>
        </Box>
    );
};

export default Sidebar;