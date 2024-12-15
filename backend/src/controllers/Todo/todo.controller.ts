import { AppDataSouce } from "../../db";
import { TodoEntity } from "../../entities/todo.entity";
import { errorHandlerWrapper } from "../../utils";
import { ObjectId } from "mongodb";


const createTodo = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: "Title and Description are required" })
    }

    try {
        const todoRepository = AppDataSouce.getRepository(TodoEntity);
        const newTodo = todoRepository.create({
            title,
            description,
            completed: false,
            userId: req.userId
        })
        const savedTodo = await todoRepository.save(newTodo)
        return res.status(201).json({ todo: savedTodo })
    } catch (error) {
        console.error("error creating todo", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
const getallTodos = async (req, res) => {
    try {
        const todoRepository = AppDataSouce.getRepository(TodoEntity);

        const todos = await todoRepository.find({ where: { userId: req.userId } });
        return res.status(200).json({ todos })
    } catch (error) {
        console.error("error during fetching", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const gettodobyid = async (req, res) => {
    const { id } = req.params;

    try {
        const todoRepository = AppDataSouce.getRepository(TodoEntity);



        const todo = await todoRepository.findOne({
            where: { _id: new ObjectId(id), userId: req.userId }
        });
        // console.log("Query Result:", todo);

        if (!todo) {
            return res.status(404).json({ message: "To-Do Item not found" })
        }
        return res.status(200).json({ todo })
    } catch (error) {
        console.error("Error fetching todo", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const todoRepository = AppDataSouce.getRepository(TodoEntity)
        const update = await todoRepository.findOne({ where: { _id: new ObjectId(id) } })
        if (!update) {
            return res.status(404).json({ message: "To-Do item not found" })
        }
        update.title = title || update.title
        update.description = description || update.description
        update.completed = completed !== undefined ? completed : update.completed

        const updatedData = await todoRepository.save(update)
        return res.status(200).json({ todo: updatedData })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal server error"})
    }
}
const deletetodobyId = async(req,res) =>{
    const {id } = req.params;
    try {
        const todoRepository = AppDataSouce.getRepository(TodoEntity);
        const deleteTodo = await todoRepository.findOne({ where: { _id: new ObjectId(id) } })
        if(!deleteTodo){
            return res.status(404).json({message:"To- Do item not found"})

        }
        await todoRepository.remove(deleteTodo)
        return res.status(200).json({message:"To-Do item deleted successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export const todocreateController = errorHandlerWrapper(createTodo);
export const getalltodoController = errorHandlerWrapper(getallTodos);
export const gettodobyidController = errorHandlerWrapper(gettodobyid);
export const updatetodocontroller = errorHandlerWrapper(updateTodo);
export const deletetodobyidcontroller = errorHandlerWrapper(deletetodobyId);
