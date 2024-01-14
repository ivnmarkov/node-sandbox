const express = require("express");
const app = express();
const port = 3000;

// Mock data - typically, this would come from a database
const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

// Function to get paginated data
function getPaginatedData(page, limit) {
  const start = (page - 1) * limit;
  const end = page * limit;
  return data.slice(start, end);
}

// Endpoint for pagination
app.get("/api/items", (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 10; // Number of items per page

  if (page < 1 || page > 10) {
    return res.status(400).json({ message: "Page number out of range" });
  }

  const paginatedData = getPaginatedData(page, limit);
  res.json({
    page,
    totalPages: 10,
    data: paginatedData,
    hasMore: page < 10, // True if there are more pages
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
