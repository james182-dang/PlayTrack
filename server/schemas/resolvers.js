const { User, Post, Review } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('posts')
                    .populate('reviews')
                    .populate('completedGames')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },

        post: async (parent, { _id }) => {
            return Post.findOne({ _id });
        },

        reviews: async (parent, { gameId }) => {
            const params = gameId ? { gameId } : {};
            return Review.find(params).sort({ createdAt: -1 });
        },

        review: async (parent, { _id }) => {
            return Review.findOne({ _id });
        },

        users: async (parent, args) => {
            return User.find()
              .select('-__v -password')
              .populate('friends');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('posts')
              .populate('reviews')
              .populate('friends');
        },

        completedGames: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('completedGames');    
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const token = signToken(user);
            return { token, user };
        },

        addProfilePic: async (parent, { image }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { image: image },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
        },

        addBio: async (parent, { bio }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { bio: bio },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
        },

        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                return post;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addReview: async (parent, args, context) => {
            if (context.user) {
                const review = await Review.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { reviews: review._id, gameId: review.gameId, gameName: review.gameName } },
                    { new: true }
                );

                return review;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addLike: async (parent, { postId, username }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { likes: { username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        updateUser: async (parent, { bio }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { push: { bio } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        completeGame: async (parent, { addGame }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { completedGames: addGame } },
                    { new: true }
                )

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        removeCompletedGame: async (parent, { username, removeCompletedGame }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $pull: { completedGames: removeCompletedGame } },
                    { new: true }
                )

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addNowPlaying: async (parent, { addNowPlaying }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $set: { nowPlaying: addNowPlaying } },
                    { new: true }
                )

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        deletePost: async (parent, { postId }, context) => {
            if (context.user) {
                const deletedPost = await Post.findByIdAndDelete(
                    { _id: postId }
                );

                return deletedPost;
            }

            throw new AuthenticationError('You must be logged in to delete a post!');
        }
    }
};

module.exports = resolvers;