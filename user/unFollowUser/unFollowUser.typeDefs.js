import { gql } from "apollo-server";

export default gql`
  type UnFollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unFollowUser(userName: String): UnFollowUserResult
  }
`;