import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
    query post($username: String) {
        posts(username: $username) {
            _id
            postText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;

export const QUERY_POST = gql`
    query post($id: ID!) {
        post(_id: $id) {
            _id
            postText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;

export const QUERY_REVIEWS = gql`
    query review($username: String) {
        reviews(username: $username) {
            _id
            reviewText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;

export const QUERY_REVIEW = gql`
    query review($id: ID!) {
        review(_id: $id) {
            _id
            reviewText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            friendCount
            postCount
            friends {
                _id
                username
            }

            posts {
                _id
                postText
                createdAt
                commentCount
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            friendCount
            postCount
            posts {
                _id
                postText
                createdAt
                commentCount
                comments {
                    _id
                    createdAt
                    commentBody
                    username
                }
            }

            reviews {
                _id
                reviewText
                createdAt
                commentCount
                comments {
                    _id
                    createdAt
                    commentBody
                    username
                }
            }

            friends {
                _id
                username
            }
        }
    }
`;

export const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email
            friendCount
            postCount
            reviewCount
            friends {
                _id
                username
            }
        }
    }
`;