import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword }
    ) => {
      let uglyPassword = null; 
      // new password that hashed. 
      if (newPassword) { //if user input new password,
        uglyPassword = await bcrypt.hash(newPassword, 10);
        //this work have to be run by asyncronizationally.
        //hasing new password to uglypassword.
      }
      const updatedUser = await client.user.update({
        where: {
          id: 1,
          //need check user token. now is for test user id 1.
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
          // this is es6 expression, this mean ,if uglyPassword is true, return put uglyPassword in to password.
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update profile.",
        };
      }
    },
  },
};