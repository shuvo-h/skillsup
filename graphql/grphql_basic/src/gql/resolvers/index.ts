import { db } from "../../db.js";

export const resolvers = {
    // base queries
    Query: {
        // must match with typeDef Query name
        products:()=> db.products,
        product:(parent,arg:{productId:string},context)=> {
            // console.log({parent,arg,context});
            const {productId} = arg;
            const result = db.products.find(item=>item.id === productId)
            return result
        },
        categories:()=> db.categories,
        category:(parent,arg:{categoryId:string},context)=> {
            // console.log({parent,arg,context});
            const {categoryId} = arg;
            const result = db.categories.find(item=>item.id === categoryId)
            return result
        },
        reviews:()=> db.reviews,
        review:(parent,arg:{reviewId:string},context)=> {
            // console.log({parent,arg,context});
            const {reviewId} = arg;
            const result = db.reviews.find(item=>item.id === reviewId)
            return result
        },
    },
    // relation queries
    Product: {
        category:(parent,arg,context)=>{
            const {categoryId} = parent
            // console.log({parent,arg,context});
            const result = db.categories.find(el=>el.id === categoryId)
            return result
        },
        reviews: (parent,arg,context)=>{
            const {id} = parent
            console.log({parent,arg,context});
            const result = db.reviews.filter(el=>el.productId === id)
            return result
        }
    },
    Category:{
        products: (parent,arg,context)=>{
            const {id} = parent
            // console.log({parent,arg,context});
            const result = db.products.filter(el=>el.categoryId === id);
            return result
        }
    }
  };
