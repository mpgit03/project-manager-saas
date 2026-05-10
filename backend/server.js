// 1. DNS Fix (Must stay at the top)
import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";    
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import dotenv from "dotenv"
dotenv.config() 
import express from "express"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import notFound from "./middleware/notFound.js"
import {errorhandler} from "./middleware/errorHandler.js" 
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import { timeStamp } from "node:console";


const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, "frontend", "dist");



//  Connect to Database
connectDB();

//  Built-in Middleware
app.use(express.json());

app.use(morgan("dev"));
app.use(helmet());

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Project Management API",
    docs: "/api-docs"
  });
});

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:"Too many requests from this IP, please try again later.",
    standardHeaders:true,
    legacyHeaders:false
});

app.use("/api",limiter);

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// 4. Routes
app.get("/health",(req,res)=>{
    res.status(201).json({
        status:"UP",
        timeStamp: new Date().toISOString(),
    });
});



app.use("/api/admin",adminRoutes); 

//rate limiting login route
app.use("/api/auth/login",rateLimit({
    windowMs:10*60*1000,
    max: 10,
    message:"Too many login attempted . try again later",
    
}));

app.use("/api/auth", authRoutes); // login register

app.use("/api/users",userRoutes) // user routes

app.use("/api/projects",projectRoutes); //project route and taskroutes 

app.use("/uploads",express.static("uploads"));

if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
    app.get(/^\/(?!api|api-docs|health|uploads).*/, (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
}


// Error Middleware (Must be last)
app.use(notFound);      // Catches 404s
app.use(errorhandler);  // Catches actual code errors

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});