const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postTodo,
  getTodos,
  getTodo,
  patchTodo,
  deleteTodo,
} = require("./_controllers");

const router = express.Router();

router.post("/todos", isLoggedIn, postTodo);
router.get("/todos", isLoggedIn, getTodos);
router.get("/todos/:id", isLoggedIn, getTodo);
router.patch("/todos/:id", isLoggedIn, patchTodo);
router.delete("/todos/:id", isLoggedIn, deleteTodo);

module.exports = router;
