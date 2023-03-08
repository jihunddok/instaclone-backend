import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      //find user with args.userName
      const user = await client.user.findFirst({
        where: { userName },
      });
      if (!user) {
        return {
          ok: false,
          error: "user not found",
        };
      }
      //check passowrd with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      //issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
