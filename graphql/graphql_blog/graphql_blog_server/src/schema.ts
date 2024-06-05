// which properties or column we want to return from API

export const typeDefs = `#graphql
  # GET: main query
  type Query {
    posts: [Post]
    me: User
    users: [User]
    # post(pstId):()=>{}
  }

  # POST: main mutation
  type Mutation {
    signup(name:String!,email:String!,password:String!,bio:String):TAuthPayload

    signin(email:String,password:String):TAuthPayload
  }

  type TAuthPayload {token:String user:User,userError:String}

  type Post {
    id: ID!
    title: String!
    content: String!
    # authorId: ID! // no need in graphql since we are keeping the relation object in graphql
    author: User
    published: Boolean!
    createdAt: String!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    # password: String! // we don't want to return password

    posts: [Post]
    createdAt: String!
  }
  type Profile {
    id: ID!
    bio: String!
    user: User!
    createdAt: String!
  }





`;
