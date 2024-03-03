/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLObjectType, GraphQLBoolean } from 'graphql';
import { PostType, ProfileType, UserType } from './types.js';
import { UUIDType } from '../types/uuid.js';
import {
  changePostType,
  changeProfileType,
  changeUserType,
  inputPostType,
  inputProfileType,
  inputUserType,
} from './inputTypes.js';
import { GraphQLNonNull } from 'graphql/index.js';

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: {
      type: UserType,
      args: { dto: { type: inputUserType } },
      async resolve(_, args, context) {
        const { prisma } = context;
        return prisma.user.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: inputProfileType } },
      async resolve(_, args, context) {
        const { prisma } = context;
        return prisma.profile.create({
          data: args.dto,
        });
      },
    },
    createPost: {
      type: PostType,
      args: { dto: { type: inputPostType } },
      async resolve(_, args, context) {
        const { prisma } = context;
        return prisma.post.create({
          data: args.dto,
        });
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      async resolve(_, args, context) {
        const { prisma } = context;
        await prisma.user.delete({
          where: {
            id: args.id,
          },
        });
      },
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      async resolve(_, args, context) {
        const { prisma } = context;
        await prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
      },
    },
    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      async resolve(_, args, context) {
        const { prisma } = context;
        await prisma.post.delete({
          where: {
            id: args.id,
          },
        });
      },
    },
    changeUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: changeUserType } },
      async resolve(_, args, context) {
        const { prisma } = context;
        return prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changeProfileType },
      },
      async resolve(_, args, context) {
        const { prisma } = context;
        return prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    changePost: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: changePostType } },
      async resolve(_, args, context) {
        const { prisma } = context;
        return prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      async resolve(_, args, context) {
        const { prisma } = context;
        return prisma.user.update({
          where: {
            id: args.userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
      },
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      async resolve(_, args, context) {
        const { prisma } = context;
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
      },
    },
  },
});

export default RootMutation;
