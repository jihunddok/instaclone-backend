const {ApolloServer, gql} = require("apollo-server");

const typeDefs =gql`
    type Query {
        hello : String
    }
`;

const resolvers = {
    Query : {
        hello :()=>"jihun",
    },
};

const sercver =new ApolloServer({
    typeDefs,
    resolvers,
});

sercver.listen().then(() => console.log("Server is running on http://localhost:4000/"));

