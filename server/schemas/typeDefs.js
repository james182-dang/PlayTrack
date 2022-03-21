const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        bio: String
        savedGames: [Game]
        completedGames: [Game]
        completedGameCount: Int
        friends: [User]
        friendCount: Int
        reviews: [Review]
        reviewCount: Int
        posts: [Post]
        postCount: Int
    }

    type Game {
        gameId: ID!
        image: String
        summary: String
    }

    type Post {
        _id: ID
        postText: String
        createdAt: String
        username: String
        comments: [Comment]
        commentCount: Int
    }

    type Review {
        _id: ID
        reviewText: String
        createdAt: String
        username: String
        comments: [Comment]
        commentCount: Int
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(_id: ID!): Post
        reviews(username: String): [Review]
        review(_id: ID!): Review
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postText: String!): Post
        addReview(reviewText: String!): Review
        addComment(postId: ID!, commentBody: String!): Post
        addFriend(friendId: ID!): User
        addBio(_id: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;