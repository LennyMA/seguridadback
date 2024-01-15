import { config } from "dotenv";

config();

export default {
  port: process.env.PORT || 3000,
  dbUser: process.env.USER || "",
  dbPassword: process.env.PASSWORD || "",
  dbServer: process.env.SERVER || "",
  dbName: process.env.NAME || "",
};
