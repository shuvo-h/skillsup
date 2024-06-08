
import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";
import { Post } from "./RelationalQuery/post";
import { User } from "./RelationalQuery/user";
import { Profile } from "./RelationalQuery/profile";


export const resolvers = {
    // get API
    Query: {...Query},
    // post or update API
    Mutation:{...Mutation},

    // relational resolvers
    Post:{...Post},
    User:{...User},
    Profile:{...Profile},
  };
