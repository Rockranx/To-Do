import { Router } from "express";
import { TodoController } from "../controllers";
import { getalltodoController } from "../controllers/Todo";
import { authenticate } from "../controllers/Todo/authenticate";

export const todoRouter= Router()

todoRouter.post(
    "/create",
    authenticate,
    TodoController.todocreateController
)

todoRouter.get(
    "/",
    authenticate,
    TodoController.getalltodoController
)
todoRouter.get(
    "/:id",
    authenticate,
    TodoController.gettodobyidController 
)
todoRouter.put(
    "/update/:id",
    authenticate,
    TodoController.updatetodocontroller 
)
todoRouter.delete(
    "/delete/:id",
    authenticate,
    TodoController.deletetodobyidcontroller 
)