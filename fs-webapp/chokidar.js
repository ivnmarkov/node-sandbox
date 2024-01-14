const chokidar = require("chokidar");
const path = require("path");

// Path to watch
const watchedPath = path.join(__dirname, "files");

// Initialize chokidar watcher with options
const watcher = chokidar.watch(watchedPath, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true, // keep process running as long as files are being watched
  ignoreInitial: true, // ignore initial add events
  depth: 2, // watch 2 levels deep
  usePolling: true, // enables polling for file changes (useful for NFS)
  interval: 100, // polling interval
  binaryInterval: 300, // polling interval for binary files
  alwaysStat: true, // always pass `stats` with `add`, `addDir`, and `change` events
  awaitWriteFinish: {
    stabilityThreshold: 2000, // duration in milliseconds for a file size to be stable
    pollInterval: 100,
  },
});

// Add event
watcher.on("add", (path, stats) => {
  console.log(`File ${path} has been added`);
  if (stats) console.log(`File size: ${stats.size} bytes`);
});

// Change event
watcher.on("change", (path, stats) => {
  console.log(`File ${path} has been changed`);
  if (stats) console.log(`New file size: ${stats.size} bytes`);
});

// Delete event
watcher.on("unlink", (path) => {
  console.log(`File ${path} has been removed`);
});

// Directory events
watcher
  .on("addDir", (path) => {
    console.log(`Directory ${path} has been added`);
  })
  .on("unlinkDir", (path) => {
    console.log(`Directory ${path} has been removed`);
  });

// Error handling
watcher.on("error", (error) => {
  console.error(`Watcher error: ${error}`);
});

// Ready event
watcher.on("ready", () => {
  console.log("Initial scan complete. Ready for changes");
});

// Optional: Log raw events
watcher.on("raw", (event, path, details) => {
  console.log("Raw event info:", event, path, details);
});

// Close the watcher after a certain time
setTimeout(() => {
  watcher.close().then(() => console.log("Watcher closed"));
}, 10000); // close after 10 seconds
