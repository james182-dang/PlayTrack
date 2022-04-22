import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
    query post($username: String) {
        posts(username: $username) {
            _id
            postText
            createdAt
            username
            userImage
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
            userImage
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

export const QUERY_GAME = gql`
    query game($gameId: Int) {
        game(gameId: $gameId) {
            _id
            gameId
            name
            reviewCount
            reviews {
                reviewText
                createdAt
                username
                comments
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
            
            game {
                gameId
                name
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
            gameId
            gameName
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

export const QUERY_GAME_REVIEWS = gql`
    query reviews($gameId: Int!) {
        reviews(gameId: $gameId) {
            _id
            reviewText
            createdAt
            username
            gameId
            gameName
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
            bio
            image
            friendCount
            completedGameCount
            postCount
            completedGames {
                gameId
                name
                createdAt
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
                name
                createdAt
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
            bio
            image
            friendCount
            postCount
            reviewCount
            completedGameCount
            likes {
                _id
            }

            completedGames {
                gameId
                name
                createdAt
            }

            posts {
                _id
                postText
                createdAt
                username
                userImage
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
            image
            completedGameCount
            friendCount
            postCount
            reviewCount
            friends {
                _id
                username
            }

            completedGames {
                name
            }
        }
    }
`;