import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password: newPassword},
      {authorization}
    ) => {
      const {id} = await jwt.verify(authorization, process.env.PRIVATE_KEY);
      console.log("id token : ",authorization);
      let uglyPassword = null; 
      // new password that hashed. 
      if (newPassword) { //if user input new password,
        uglyPassword = await bcrypt.hash(newPassword, 10);
        //this work have to be run by asyncronizationally.
        //hasing new password to uglypassword.
      }
      const updatedUser = await client.user.update({
        where: {
          id,
          //need check user token. now is for test user id 1.
        },
        data: {
          firstName,
          lastName,
          userName,
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