import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:[
        {
            emit: "event",
            level:"query"
        }
    ]
});

prisma.$on("query",(e)=>{
    // console.log("Query = ",e.query);
    console.log("Duration = ",e.duration,"ms");
    // console.log("Date & Time = ",e.timestamp);
    
})

const queryAndPopulate = async() =>{
    // fluent API: search by a column in a table but return the data from referenced populated data
    // here searching in "user" table by userId but populating 'post' and return the post list
    const result = await prisma.user.findUnique({
        where: {
            id: 1
        },
        include:{
            post: true,         // if we want post[] list with user information
        }
    })
    // .post() // fluent API: if we want only return post[] array
    // .profile()
    // console.log(result);

    const publishedPostUsers = await prisma.user.findMany({
        // where:{},
        include:{
            post: {
                where: {
                    published: true
                }
            }
        },
    });

    console.dir(publishedPostUsers,{depth:Infinity});
}

const filterData = async() =>{
    const result = await prisma.user.findMany({
        where:{
            /*
            // return only if all satisfy
            AND: [
                { title: {contains:"sub", mode:"insensitive"}},
                { published: true }
            ],
            
            // return either this or that
            OR: [
                {content: {contains:"mediu", mode:"default"}},
                { published: false}
            ],

            // return whose are not match
            NOT: [
                { title: {contains:"titl", mode:"insensitive"}}
            ],

            // special match
            title: {
                startsWith: 'e', 
                endsWith: 'g', 
                // equals:"ttest value",
                // contains:"ttest value",
                mode:"insensitive"
            }

            // search by a list
            username:{
                in: ['name54','user1','user2','name74']     // if in db username:[..string]
            }
            */
        },
        /*
        select:{
            // title: true,
            // published: true,
            // content: true,
            // username: true,
        },
        */
        // populate the nested reference rows
        // userModel-> postModel->postCategoryModel->categoryModel    
        include:{
            post: {
                include:{
                    postCategory:{
                        include:{
                            category:true
                        }
                    }
                }
            }
        }
    })

    // console.dir(result,{depth:Infinity});
}

// aggregated query
// aggregate can only applied on number fields, only '_count' is applied on any field
const aggregatedQuery = async() =>{
    const result = await prisma.user.aggregate({
        _avg:{              // _sum, _count, _max, _min
            age: true
        },
        // where:{},
        // skip
        // orderBy
        // cursor
    })
    console.log(result);
}
// groupBy query
const groupByQuery = async() =>{
    const result = await prisma.post.groupBy({
        by: ["published"],
        _count: {
            title: true
        },
        having:{
            authorId:{
                _min:{
                    gte: 1
                }
            }
        },
    })
    console.log(result);
}

// batch transection API query
const transectionAPiQuery = async() =>{
    const createUserOperation = prisma.user.create({
        data:{
            username:"daniel Malko77",
            email: "damiel@mail.com",
            age: 24,
        }
    })
    
    const updateUserOperation = prisma.user.update({
        where:{
            id: 27,
        },
        data:{
            age: 30
        }
    })

    // Do transection and await here
    const [createUserResult,updateuserResult] = await prisma.$transaction([
        createUserOperation,
        updateUserOperation,
    ])
    console.log(createUserResult,updateuserResult); 
}

// interactive transection API query
const interactiveTransectionAPiQuery = async() =>{
    const result = await prisma.$transaction(async(transactionClient)=>{
        // operation 1
        const gerAllPost = await transactionClient.post.findMany({
            where:{
                published: true
            }
        })
        
        // operation 2
        const countUser = await transactionClient.user.count();
        if (countUser < 5) {
            throw new Error("user is lower than expected count")
        }

        // operation 3
        const updateUser = await transactionClient.user.update({
            where:{
                id: 27
            },
            data:{
                age: 25
            }
        });

        return {
            gerAllPost,
            countUser,
            updateUser,
        }

    })
    console.log(result); 
}


// RAW query using prisma
const rawQueryUsingPrisma = async() =>{
    const result = await prisma.$queryRaw `SELECT * FROM "users"`
    
    console.log(result); 
}



module.exports = {
    queryAndPopulate,
    filterData,
    aggregatedQuery,
    groupByQuery,
    transectionAPiQuery,
    interactiveTransectionAPiQuery,
    rawQueryUsingPrisma,
}