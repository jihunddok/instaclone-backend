require("dotenv").config();
import express  from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./user/user.utils";
import { graphql } from "graphql";
import logger from "morgan";

const PORT = process.env.PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/static",express.static("uploads"));
server.applyMiddleware({ app});

app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});
//startApolloServer(typeDefs, resolvers);
