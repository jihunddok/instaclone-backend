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
type EditProfileResult{
    ok : Boolean!
    error : String
}
type Mutation{
    editProfile(
        firstName: String
        lastName: String
        userName: String
        email: String
    ) : EditProfileResult!
}
`;
