import { gql } from "apollo-server";

export default gql`
type User {
  id: Int!
  firstName: String!
  lastName: String
  userName: String!
  email: String!
  createdAt: String!
  updatedAt: String!
}
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(userName: String!, password: String!): LoginResult!
  }
`;
