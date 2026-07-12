import { asynchandler } from "../middleware/asynchandler.js";
import Task from "../models/Task.js";
import { logActivity } from "../services/activityService.js";
import {
  ACTIVITY_EVENTS,
  ENTITY_TYPES,
} from "../constants/activity.js";

export const createTask = asynchandler(async (req, res) => {
  const { title, description } = req.body;

  const attachment = req.file ? req.file.path : null;

  const project = req.project;

  const createdBy = req.user._id;

  const task = await Task.create({
    title,
    description,
    project: project._id,
    createdBy,
    attachment,
  });

  await logActivity({
    user: req.user._id,
    event: ACTIVITY_EVENTS.TASK_CREATED,
    entityType: ENTITY_TYPES.TASK,
    entityId: task._id,
    entityName: task.title,
  });

  if (attachment) {
    await logActivity({
      user: req.user._id,
      event: ACTIVITY_EVENTS.FILE_UPLOADED,
      entityType: ENTITY_TYPES.TASK,
      entityId: task._id,
      entityName: task.title,
      metadata: {
        filename: req.file.filename,
      },
    });
  }

  res.status(201).json(task);
});

export const getProjectTasks = asynchandler(async (req, res) => {
  const projectId = req.params.projectId;

  const tasks = await Task.find({
    project: projectId,
  });

  res.json(tasks);
});

export const updateTask = asynchandler(async (req, res) => {
  const task = req.task;

  const previousStatus = task.status;

  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  if (req.body.description !== undefined) {
    task.description = req.body.description;
  }

  if (req.body.status !== undefined) {
    task.status = req.body.status;
  }

  if (req.file) {
    task.attachment = req.file.path;
  }

  const updatedTask = await task.save();

  await logActivity({
    user: req.user._id,
    event: ACTIVITY_EVENTS.TASK_UPDATED,
    entityType: ENTITY_TYPES.TASK,
    entityId: updatedTask._id,
    entityName: updatedTask.title,
    metadata: {
      updatedFields: Object.keys(req.body),
    },
  });

  if (previousStatus !== updatedTask.status) {
    await logActivity({
      user: req.user._id,
      event: ACTIVITY_EVENTS.TASK_STATUS_CHANGED,
      entityType: ENTITY_TYPES.TASK,
      entityId: updatedTask._id,
      entityName: updatedTask.title,
      metadata: {
        from: previousStatus,
        to: updatedTask.status,
      },
    });
  }

  if (req.file) {
    await logActivity({
      user: req.user._id,
      event: ACTIVITY_EVENTS.FILE_UPLOADED,
      entityType: ENTITY_TYPES.TASK,
      entityId: updatedTask._id,
      entityName: updatedTask.title,
      metadata: {
        filename: req.file.filename,
      },
    });
  }

  res.json(updatedTask);
});

export const deleteTask = asynchandler(async (req, res) => {
  const task = req.task;

  await logActivity({
    user: req.user._id,
    event: ACTIVITY_EVENTS.TASK_DELETED,
    entityType: ENTITY_TYPES.TASK,
    entityId: task._id,
    entityName: task.title,
  });

  await task.deleteOne();

  res.json({
    message: "Task deleted",
  });
});

export const getUserTasks = asynchandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);

  const limit = Math.min(
    Math.max(parseInt(req.query.limit) || 10, 1),
    100
  );

  const skip = (page - 1) * limit;

  const search = req.query.search
    ? {
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : {};

  const statusFilter =
    req.query.status && req.query.status !== "all"
      ? { status: req.query.status }
      : {};

  const query = {
    createdBy: req.user._id,
    ...search,
    ...statusFilter,
  };

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .populate("project", "name")
      .sort(req.query.sort || "-createdAt")
      .skip(skip)
      .limit(limit),

    Task.countDocuments(query),
  ]);

  res.json({
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalTasks: total,
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
    tasks,
  });
});