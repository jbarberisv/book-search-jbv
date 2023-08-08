const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }
      throw new AuthenticationError('Error login');
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
        const correctPw = await user.wrongPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Wrong credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },
    }

  }};

module.exports = resolvers;
