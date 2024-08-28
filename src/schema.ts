// schema.ts
import { gql } from "graphql-tag";
import fs from "fs";
import path from "path";

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, "./schema.graphql"), "utf8")
);

export { typeDefs };
