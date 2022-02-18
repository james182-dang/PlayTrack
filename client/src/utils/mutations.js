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