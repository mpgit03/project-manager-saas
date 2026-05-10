import { body } from "express-validator";

export const createTaskValidator = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage(
      "Task title is required"
    ),

  body("description")
    .optional(),

  body("status")
    .optional()
    .isIn([
      "todo",
      "in_progress",
      "done",
    ])
    .withMessage(
      "Invalid task status"
    ),

];