import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';


import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from '@prisma/client/runtime/library';
import { TTokenUser, jwtHelper } from './utils/jwtHelper';
export const prisma = new PrismaClient()

export interface TContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  userInfo: TTokenUser | null
}


const main = async() =>{

  const server = new ApolloServer({
      typeDefs,
      resolvers,
    });


    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async({req,res}):Promise<TContext>=>{
        const userInfo = await jwtHelper.getUserInfoFromToken(req.headers.authorization as string) as TTokenUser
        // console.log(userInfo);

        return {
          prisma,
          userInfo,
        }
      }
    });

    console.log(`🚀  Server ready at: ${url}`);

}
  main()