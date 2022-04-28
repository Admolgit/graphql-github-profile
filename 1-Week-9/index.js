import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const app = express();

const PORT = 5000;

const balances = new GraphQLObjectType({
  accountNumber: new GraphQLNonNull(GraphQLString),
  balance: new GraphQLNonNull(GraphQLString),
  createdAt: new GraphQLNonNull(GraphQLString)
});

const balanceType = new GraphQLObjectType({
  name: "account",
  description: "This represents a account balance",
  fields: () => ({
    accountNumber: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) }
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Owner",
  description: "This represents a account balance Owner",
  fields: () => ({
    balance: {
    type: new GraphQLList(balanceType),
    description: "List of balances",
    resolve: () => balance
    }
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType
})

var balance = {
  accountNumber: "1234567890",
  balance: "5000",
  createdAt: "2020-08-16T19:42:52Z"
}

app.use("/graphql", graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(PORT, () => {
  console.log("Server running on port "+ PORT)
});