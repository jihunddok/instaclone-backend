import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
  Mutation: {
    unFollowUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { userName } }); //check user input that the username is exist.
      if (!ok) {
        return {
          ok: false,
          error: "can`t unfollow user.",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          followings: {
            disconnect: {
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