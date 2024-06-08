// which properties or column we want to return from API

export const typeDefs = `#graphql
  # GET: main query
  type Query {
    me: User
    users: [User]
    posts: [Post]
    profile(userId: ID!): Profile
    # post(pstId):()=>{}
  }

  # POST: main mutation
  type Mutation {
    signup(name:String!,email:String!,password:String!,bio:String):TAuthPayload

    signin(email:String,password:String):TAuthPayload
    addPost(post:PostInput):TPostPayload
    updatePost(postId:ID!,post:PostInput):TPostPayload
    deletePost(postId:ID!):TPostPayload
    publishPost(postId:ID!):TPostPayload
  }



  type Post {
    id: ID!
    title: String!
    content: String!
    # authorId: ID! // no need in graphql since we are keeping the relation object in graphql
    author: User        # add in relational resolver const Post = {author}
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

  # mutation parameter types
  input PostInput{
    title: String
    content: String
  }
  # return types
  type TAuthPayload {token:String user:User,userError:String}
  type TPostPayload {post:Post,userError:String}

`;
