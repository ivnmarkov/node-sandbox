const express = require("express");
const fs = require("fs").promises; // Use promises API
const path = require("path");

const app = express();
const PORT = 3003;
const FILES_DIR = path.join(__dirname, "files");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure directory exists at startup
(async () => {
  try {
    await fs.mkdir(FILES_DIR, { recursive: true });
    console.log("Directory ensured to exist.");
  } catch (error) {
    console.error("Error ensuring directory exists:", error);
  }
})();

// 1. List files
app.get("/files", async (req, res, next) => {
  try {
    const files = await fs.readdir(FILES_DIR);
    res.json(files);
  } catch (error) {
    next(error);
  }
});

// 2. Read a file
app.get("/files/:filename", async (req, res, next) => {
  try {
    const content = await fs.readFile(
      path.join(FILES_DIR, req.params.filename),
      "utf8"
    );
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

// 3. Create a new file or edit existing file
app.post("/files", async (req, res, next) => {
  const { filename, content } = req.body;
  try {
    await fs.writeFile(path.join(FILES_DIR, filename), content, "utf8");
    res.status(201).send("File created successfully.");
  } catch (error) {
    next(error);
  }
});

// 4. Delete a file
app.delete("/files/:filename", async (req, res, next) => {
  try {
    await fs.unlink(path.join(FILES_DIR, req.params.filename));
    res.status(200).send("File deleted successfully.");
  } catch (error) {
    next(error);
  }
});

// 5. Copy a file
app.post("/files/copy", async (req, res, next) => {
  const { sourceFilename, destFilename } = req.body;
  try {
    await fs.copyFile(
      path.join(FILES_DIR, sourceFilename),
      path.join(FILES_DIR, destFilename)
    );
    res.status(201).send("File copied successfully.");
  } catch (error) {
    next(error);
  }
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Server Error");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
