import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
            _id
            username
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $bio: String!) {
        updateUser(bio: $bio) {
            _id
            username
            bio
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($postText: String!) {
        addPost(postText: $postText) {
            _id
            postText
            createdAt
            username
            commentCount
            comments {
                _id
            }
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation addReview($reviewText: String!) {
        addReview(reviewText: $reviewText) {
            _id
            reviewText
            createdAt
            username
            commentCount
            comments {
                _id
            }
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $commentBody: String!) {
        addComment(postId: $postId, commentBody: $commentBody) {
            _id
            commentCount
            comments {
                _id
                commentBody
                createdAt
                username
            }
        }
    }
`;

export const ADD_LIKE = gql`
    mutation addLike($postId: ID!, $username: String!) {
        addLike(postId: $postId, username: $username) {
            _id
            likeCount
            likes {
                _id
                username
                createdAt
            }
        }
    }
`;

export const COMPLETE_GAME = gql`
    mutation completeGame($addGame: AddNewGame!) {
        completeGame(addGame: $addGame) {
            _id
            completedGameCount
            completedGames {
                gameId
                name
            }
        }
    }
`;


export const ADD_NOW_PLAYING = gql`
    mutation addNowPlaying($addNowPlaying: AddNowPlaying!) {
        addNowPlaying(addNowPlaying: $addNowPlaying) {
            _id
            nowPlaying {
                gameId
            }
        }
    }
`;

export const REMOVE_COMPLETED_GAME = gql`
    mutation removeCompletedGame($gameId: ID!) {
        removeCompletedGame(removeCompletedGame: $gameId) {
            _id
            completedGames {
                gameId
            }
        }
    }
`;