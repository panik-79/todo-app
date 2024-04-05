const ToDoModel = require('../models/ToDoModel');

exports.getToDos = async (req, res) => {
    try {
        const toDos = await ToDoModel.find();
        res.json(toDos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.saveToDo = async (req, res) => {
    const { title, description } = req.body;
    const newToDo = new ToDoModel({ title, description });
    try {
        const savedToDo = await newToDo.save();
        res.status(201).json(savedToDo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteToDo = async (req, res) => {
    const { id } = req.params;
    try {
        await ToDoModel.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateToDo = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const updatedToDo = await ToDoModel.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        res.json(updatedToDo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.markToDoAsCompleted = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedToDo = await ToDoModel.findByIdAndUpdate(id, { completed: true }, { new: true });
        res.json(updatedToDo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
