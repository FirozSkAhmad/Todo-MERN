const todoModel = require("../models/todoModel");

async function getToDo(req, res) {
  try {
    const token = req.headers.decodedToken;

    const toDo = await todoModel.find({
      user_id: token.user_id,
    });

    return res.status(200).send({ status: true, todoData: toDo })
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

async function addToDo(req, res) {
  try {
    const { text } = req.body;

    const token = req.headers.decodedToken;

    const data = { text: text, user_name: token.name, user_id: token.user_id };

    const createdData = todoModel.create(data)

    return res.status(201).send(createdData);
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
async function deleteToDo(req, res) {
  try {
    const { _id } = req.body;

    await todoModel.findByIdAndDelete({ _id })

    return res.status(202).send({ msg: "deleted sucessfully" });
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

async function updateToDo(req, res) {
  try {
    const { text, toDoId } = req.body;
    const updatedData = await todoModel.findByIdAndUpdate({ _id: toDoId }, { text: text }, { new: true })
    return res.status(201).send({ msg: "updated sucessfully", updatedData });
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { getToDo, addToDo, deleteToDo, updateToDo }
