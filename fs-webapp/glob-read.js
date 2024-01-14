const { glob } = require("glob");
const fs = require("fs");

// Options for glob
const options = {
  ignore: ["**/node_modules/**", "**/test/**"],
  mark: true,
  nocase: true,
  dot: true,
};

const pattern = 'files/**/*new*[0-9]*.txt';

setTimeout(async () => {
  const files = await glob(pattern, options, (err, files) => {
    if (err) {
      console.error("Error occurred:", err);
      return;
    }
    return files;
  });
  // Read and log the contents of each file
  files.forEach((file) => {
    fs.readFile(file, "utf8", (readErr, data) => {
      if (readErr) {
        console.error(`Error reading file ${file}:`, readErr);
        return;
      }

      console.log(`Contents of ${file}:\n${data}`);
    });
  });
}, 0);
