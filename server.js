require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getIntrospectionQuery } from "graphql";
import {getUser,protectResolver} from "./user/user.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,

//   context:({req})=>{
//     console.log(req.headers);
//     return{
//       token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjgzNzIzNTI3fQ.1Xpj4n2MIakqAr9L2K78yPbmhsXeGYS5pSw9OMPCEBQ"
//   }
// }
  context: async({req}) => {
    
    console.log("req token : ", req.headers.token);   
    return{
      loggedInUser : await getUser(req.headers.token),
      protectResolver
    };
    
  },
});


server
  .listen(PORT)
  .then(() =>
    console.log(`🚀Server is running on http://localhost:${PORT} ✅`)
  );

// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model User{
//   id Int @id @default(autoincrement())
//   firstName String
//   lastName String?
//   userName String @unique
//   email String @unique
//   password String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt()
// }
