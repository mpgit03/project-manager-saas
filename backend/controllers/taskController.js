import { asynchandler } from "../middleware/asynchandler.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";


export const createTask = asynchandler(
    async(req,res)=>{
        const {title,description} = req.body;
        // console.log(req.params.id);
        const attachment = req.file ? req.file.path:null;

        const project = req.project;
        const createdBy = req.user._id;

        const task = await Task.create({
            title,description,
            project: project._id,
            createdBy,
            attachment
        });
        res.status(201).json(task);

    }
)


export const getProjectTasks = asynchandler(
    async(req,res)=>{
        const projectId = req.params.projectId;
        const tasks = await Task.find({project:projectId});
        res.json(tasks)
    }
)


export const updateTask = asynchandler(
    async (req,res)=>{
        const task = req.task;

    console.log("BODY:", req.body);
    console.log("STATUS BEFORE:", task.status);
    console.log("STATUS AFTER:", task.status);
       
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
        
        const updated =  await task.save();
         console.log("SAVED STATUS:", updated.status);
        res.json(updated);

    }
)

export const deleteTask =asynchandler(
    async(req,res)=>{
        const task =req.task;
        

        await task.deleteOne()
        res.json({message:"task deleted"});
    }
)


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

