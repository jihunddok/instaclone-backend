import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../user.utils";

const resolverFn = 
async (
  _,
  { firstName, lastName, userName, email, password: newPassword},
  {loggedInUser,protectResolver}
) => {
  
  console.log("user : ", loggedInUser);
  let uglyPassword = null; 
  // new password that hashed. 
  if (newPassword) { //if user input new password,
    uglyPassword = await bcrypt.hash(newPassword, 10);
    //this work have to be run by asyncronizationally.
    //hasing new password to uglypassword.
  }
  const updateUser = await client.user.update({
    where: {
      id : loggedInUser.id,
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
  if (updateUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};
export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};