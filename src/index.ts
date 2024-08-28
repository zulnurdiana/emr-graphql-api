import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { AppDataSource } from "./data-source";
import { resolvers } from "./resolver";

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("DataSource initialized successfully");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      context: () => ({} as any),
      listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();
