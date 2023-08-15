const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postList,
  getLists,
  getList,
  patchList,
  deleteList,
} = require("./_controllers");

const router = express.Router();

router.post("/lists", isLoggedIn, postList);
router.get("/lists", isLoggedIn, getLists);
router.get("/lists/:id", isLoggedIn, getList);
router.patch("/lists/:id", isLoggedIn, patchList);
router.delete("/lists/:id", isLoggedIn, deleteList);

module.exports = router;
