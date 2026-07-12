import Project from "../models/Project.js";
import { asynchandler } from "../middleware/asynchandler.js";
import Task from "../models/Task.js";
import { logActivity } from "../services/activityService.js";
import {
  ACTIVITY_EVENTS,
  ENTITY_TYPES,
} from "../constants/activity.js";

export const createProject = asynchandler(
    async (req,res)=>{
    const {name,description} = req.body;

    const project = await Project.create({
        name,
        description,
        owner:req.user._id
    });

    await logActivity({
        user: req.user.id,
        action: ACTIVITY_EVENTS.PROJECT_CREATED,
        entityType: ENTITY_TYPES.PROJECT,
        entityId: project._id,
        entityName: project.name,
        });

    res.status(201).json(project);

}
)

export const getProjects = asynchandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const search = req.query.search
        ? { name: { $regex: req.query.search, $options: "i" } }
        : {};

    const sort = req.query.sort || "-createdAt";

    const [projects, total] = await Promise.all([
        Project.find({
            owner: req.user._id,
            ...search,
        })
            .sort(sort)
            .skip(skip)
            .limit(limit),

        Project.countDocuments({
            owner: req.user._id,
            ...search,
        }),
    ]);

    // Fetch all tasks belonging to these projects
    const projectIds = projects.map(project => project._id);

    const tasks = await Task.find({
        project: { $in: projectIds },
    });

    // Attach progress to each project
    const projectsWithProgress = projects.map(project => {

        const projectTasks = tasks.filter(
            task => task.project.toString() === project._id.toString()
        );

        const doneTasks = projectTasks.filter(
            task => task.status === "done"
        );

        const progress =
            projectTasks.length === 0
                ? 0
                : Math.round(
                      (doneTasks.length / projectTasks.length) * 100
                  );

        return {
            ...project.toObject(),
            progress,
        };
    });

    res.json({
        page,
        totalPages: Math.ceil(total / limit),
        totalProjects: total,
        projects: projectsWithProgress,
    });
});

export const getProject = asynchandler(
    async (req,res)=>{
    const project = req.resource;
    res.json(project);
}
)

export const updateProject = asynchandler(
     async (req,res)=>{
    const project = req.resource;

    

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    const updatedproject = await project.save();
    res.json(updatedproject);

}
)

export const deleteProject = asynchandler(async (req, res) => {
    const project = req.resource;

    await Task.deleteMany({
        project: project._id,
    });

    await project.deleteOne();

    res.json({
        message: "Project deleted",
    });
});

