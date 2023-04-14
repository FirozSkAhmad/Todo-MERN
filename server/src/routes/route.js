const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/auth");
const {
  getToDo,
  addToDo,
  updateToDo,
  deleteToDo
} = require("../controllers/todoController");

//==============================USER APIS======================================

router.post("/register", userController.regiserUser);
router.post("/login", userController.login);
router.get("/gettodo", authentication, authorization, getToDo);
router.post("/save", authentication, authorization, addToDo);
router.delete("/delete", authentication, authorization, deleteToDo);
router.put("/update", authentication, authorization, updateToDo);

module.exports = router;
