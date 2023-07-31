import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({ where: { id } });
    // console.log("getuser token : ", { token });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
//
// export const protectResolver = (user)=>{
//     if(!user){
//         return{
//             ok : false,
//             error : "you need to login."
//         }
//         // throw new Error("you need to login."); // is same with upper.
//     }
// };

// export const protectedResolver =
//   (ourResolver) => (root, args, context, info) => {
//     if (!context.loggedInUser) {
//       return {
//         ok: false,
//         error: "please login in to perform this action.",
//       };
//     }
//   };

// 단순히 지금 단계는 백엔드 비즈니스 로직이랑 graphql, javascript, apollo webserver, prisma, json webtoken.
export function protectedResolver(ourResolver){
    return function(root,args,context,info){
        if (!context.loggedInUser) {
            return {
              ok: false,
              error: "please login in to perform this action.",
            };
          }
          return ourResolver(root,args,context,info);
    };
}