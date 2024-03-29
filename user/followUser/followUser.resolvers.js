import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { userName } }); //check user input that the username is exist.
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist.",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          followings: {
            connect: {
              userName,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};