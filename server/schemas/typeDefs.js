const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        createdAt: String
        image: String
        bio: String
        nowPlaying: [Game]
        savedGames: [Game]
        completedGames: [Game]
        completedGameCount: Int
        friends: [User]
        friendCount: Int
        reviews: [Review]
        reviewCount: Int
        posts: [Post]
        postCount: Int
        likes: [Post]
    }

    input UpdateUserInput {
        bio: String
    }

    input AddProfilePic {
        image: String!
    }

    type Game {
        _id: ID!
        gameId: Int
        name: String
        createdAt: String
        reviews: [Review]
        reviewCount: Int
    }

    input AddNewGame {
        gameId: Int
        name: String
        summary: String
        cover: String
        coverId: Int
        platforms: [String]
        platformId: [Int]
        genres: [String]
        genresId: [Int]
    }

    input AddNowPlaying {
        gameId: Int
    }

    type Post {
        _id: ID
        postText: String
        createdAt: String
        username: String
        userImage: String
        comments: [Comment]
        commentCount: Int
        likes: [Like]
        likeCount: Int
    }

    type Review {
        _id: ID
        reviewText: String
        createdAt: String
        username: String
        comments: [Comment]
        commentCount: Int
        gameId: Int
        gameName: String
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Like {
        _id: ID
        username: String!
        createdAt: String!
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        game(gameId: Int!): Game
        posts(username: String): [Post]
        post(_id: ID!): Post
        reviews(gameId: Int!): [Review]
        review(_id: ID!): Review
        completedGames(username: String!): User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProfilePic(image: String!): User
        addBio(_id: ID!, bio: String!): User
        addPost(userImage: String!, postText: String!): Post
        addReview(reviewText: String!, gameId: Int!, gameName: String!): Review
        addComment(postId: ID!, commentBody: String!): Post
        addLike(postId: ID!, username: String!): Post
        addFriend(friendId: ID!): User
        updateUser(bio: String, input: UpdateUserInput!): User
        completeGame(addGame: AddNewGame!): User
        removeCompletedGame(removeCompletedGame: ID!): User
        addNowPlaying(addNowPlaying: AddNowPlaying!): User
        deletePost(postId: ID!): Post
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;