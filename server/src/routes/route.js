const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorization } = require("../middlewares/auth");
const {
  getToDo,
  addToDo,
  updateToDo,
  deleteToDo
} = require("../controllers/todoController");

//==============================USER APIS======================================

router.post("/register", userController.regiserUser);
router.post("/login", userController.login);
router.get("/user", authorization, userController.getUser);
router.get("/gettodo", authorization, getToDo);
router.post("/save", authorization, addToDo);
router.delete("/delete", authorization, deleteToDo);
router.put("/update", authorization, updateToDo);

module.exports = router;
