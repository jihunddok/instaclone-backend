import bcrypt from "bcrypt";
import client from "../../client";
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/e-mail are already taken.");
        }
      } catch (e) {
        console.log(e);
        return e;
      }

      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
    },
  },
};
