const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use("/api", router); // Serve data at /api

server.listen(5000, () => {
  console.log("JSON Server is running at http://localhost:5000");
});
