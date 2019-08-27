const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "messages", url: "http://localhost:4002/graphql" },
    { name: "residents", url: "http://localhost:4001/graphql" }
  ]
});

(async () => {

  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ 
      schema, 
      engine: {
        apiKey: process.env.APOLLO_ENGINE_KEY,
      },
      executor
    
    });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();