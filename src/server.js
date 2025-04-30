import express from "express"
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5003;

//middleware
app.use(express.json());

//Get the file path from the URL of the current module
const __fileName = fileURLToPath(import.meta.url);

//Get the directory name from the file path
const __dirName = dirname(__fileName);

//
app.use(express.static(path.join(__dirName, "../public")));

app.get("/", (req, res) => {    
    console.log("New Request");
    res.sendFile(path.join(__dirName, "public", "index.html"));
});

//Routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));