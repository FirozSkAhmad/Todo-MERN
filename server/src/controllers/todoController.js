const todoModel = require("../models/todoModel");

module.exports.getToDo = async (req, res) => {
  const token = req.headers.decodedToken;

  const toDo = await todoModel.find({
    user_id: token.user_id,
  });
  
  res.status(200).send({ status: true, data: toDo });
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  console.log(req.body);
  const token = req.headers.decodedToken;
  const data = { text: text, user_name: token.name, user_id: token.user_id };
  todoModel.create(data).then((data) => {
    console.log("added successfully");
    res.send(data);
  });
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  console.log('=============================================================================')
  console.log(req.body)
  todoModel
    .findByIdAndDelete({ _id: _id })
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => console.log(err));
};

module.exports.updateToDo = async (req, res) => {
  const { text, toDoId } = req.body;
  console.log(req.body);
  todoModel
    .findByIdAndUpdate({ _id: toDoId }, { text: text })
    .then(() => {
      res.send("updated successfully");
    })
    .catch((err) => console.log(err));
};
