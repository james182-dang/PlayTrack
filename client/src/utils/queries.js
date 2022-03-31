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

            likeCount
            likes {
                _id
                username
                createdAt
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

            likeCount
            likes {
                _id
                username
                createdAt
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
            completedGameCount
            postCount
            completedGames {
                gameId
            }
            friends {
                _id
                username
            }

            likes {
                _id
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

export const QUERY_COMPLETED_GAMES = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            completedGames {
                gameId
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
            completedGameCount
            likes {
                _id
            }

            completedGames {
                gameId
            }

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
                likeCount
                likes {
                    _id
                    username
                    createdAt
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
            completedGameCount
            friendCount
            postCount
            reviewCount
            friends {
                _id
                username
            }

            completedGames {
                gameId
            }
        }
    }
`;