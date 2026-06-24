import { Sequelize } from "sequelize";

const db = Sequelize("movies", "root", "", {
  host: "localhost",
  dialect: "mysql",
  loggin: false,
});

export default db;
