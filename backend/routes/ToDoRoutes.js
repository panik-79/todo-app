const { Router } = require('express');
const { getToDos, saveToDo, deleteToDo, updateToDo, markToDoAsCompleted } = require('../controllers/ToDoController');

const router = Router();

router.get("/get", getToDos);
router.post("/save", saveToDo); 
router.delete("/delete/:id", deleteToDo);
router.put("/update/:id", updateToDo);
router.put("/complete/:id", markToDoAsCompleted);

module.exports = router;