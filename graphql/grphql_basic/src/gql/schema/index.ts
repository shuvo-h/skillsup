
export const typeDefs = `#graphql
    type Product {
        id: ID!,
        name: String,
        image: String,
        description: String,
        price: Float,
        quantity: Int,
        onStock: Boolean,
        categoryId: String
        category: Category  #relation
        reviews: [Review]
    }

    type Category{
        id: ID!
        name: String
        products: [Product]
    }

    type Review {
        id: ID!
        review: String
        rating: Float
        date: String
        productId: String
        product: Product
    }

    # consider as list of collections/tables
    # Query type -> send to resolvers
    type Query {
        products: [Product]
        product(productId: ID!): Product
        categories: [Category]
        category(categoryId:ID!): Category
        reviews: [Review]
        review(reviewId:ID!): Review
    }
`;
