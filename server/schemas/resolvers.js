const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Error login');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password');
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Wrong credentials');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong credentials');
      }
      const token = signToken(user);
      return { token, user };
    },


    
    saveBook: async (parent, { userId, authors, description, bookId, image, link, title }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { savedBooks: { authors, description, bookId, image, link, title } } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
}

module.exports = resolvers;