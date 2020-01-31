const { Router } = require("express");

const routes = Router();

routes.get("/", (req, response) => {
  return response.json({ message: "Hellow Word 1" });
});

module.exports = routes;
