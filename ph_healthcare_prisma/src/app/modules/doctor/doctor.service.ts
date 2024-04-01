import { prisma } from "../../../shared/prisma"

const updateIntoDB = async(id:string,payload:any)=>{
    const {specialities,...doctorData} = payload;
    console.log(specialities,doctorData);
    
    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
     where:{id,}
    })

    const result = await prisma.$transaction(async(transectionClient)=>{
        const updateDoctorData = await transectionClient.doctor.update({
            where:{id,},
            data: doctorData
        })
        if (specialities && specialities.length > 0) {
            // to delete specialities
            const deleteSpecialitiesIds = specialities.filter((specialty:any) => specialty.isDeleted);
            for(const specialty of deleteSpecialitiesIds){
                const createDocSpecialities = await transectionClient.doctorSpecialties.deleteMany({
                    where:{
                        doctorId: doctorInfo.id,
                        specialitiesId: specialty.specialtiesId
                    }
                })
    
            }
            // to create specialities
            const createSpecialitiesIds = specialities.filter((specialty:any) => !specialty.isDeleted);
            for(const specialty of createSpecialitiesIds){
                const createDocSpecialities = await transectionClient.doctorSpecialties.create({
                   data: {
                        doctorId: doctorInfo.id,
                        specialitiesId: specialty.specialtiesId
                    }
                })
    
            }
        }

        return updateDoctorData;
    }) 
    
    
    const finalResult = await prisma.doctor.findUnique({
        where:{
            id: doctorInfo.id
        },
        include:{
            doctorSpecialties: {
                include:{
                    specialities: true
                }
            }
        }
        // include:{
        //     doctorSpecialties: {
        //         include: specialities
        //     }
        // }
    })
    return finalResult;
}

export const DoctorSrvice = {
    updateIntoDB,
}