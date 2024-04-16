import { UserRole } from "@prisma/client";
import { prisma } from "../src/shared/prisma";
import bcrypt from "bcrypt";

const seedSuperAdmin = async() =>{
    try {
        const isExistSuperAdmin = await prisma.user.findFirst({
            where:{
                role: UserRole.SUPER_ADMIN
            }
        })
        if (isExistSuperAdmin) {
            console.log("Super admin already exist = ", isExistSuperAdmin);
            
            return
        }
        const saltRound = 12;
        const password: string = await bcrypt.hash(
                '1234',
                saltRound
            );
        const superAdmin = await prisma.user.create({
            data:{
                email:"super@admin.com",
                password,
                role: UserRole.SUPER_ADMIN,
                admin:{
                    create:{
                        contactNumber:"0123456789",
                        name:"Super Admin",
                    }
                }
            }
        })
        console.log("super admin is created = ",superAdmin);
        
    } catch (error) {
        console.log(error);
        
    }finally{
        await prisma.$disconnect();
    }
}

seedSuperAdmin();