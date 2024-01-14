// Importing the 'got' package
const got = require("got");
const { HttpsProxyAgent } = require("https-proxy-agent");

// Function for demonstrating GET request
async function getExample() {
  try {
    const response = await got("https://httpbin.org/get");
    console.log("GET Request Response:", response.body);
  } catch (error) {
    console.error("Error in GET Request:", error.response.body);
  }
}

// Function for demonstrating POST request
async function postExample() {
  try {
    const response = await got.post("https://httpbin.org/post", {
      json: {
        hello: "world",
      },
      responseType: "json",
    });
    console.log("POST Request Response:", response.body);
  } catch (error) {
    console.error("Error in POST Request:", error.response.body);
  }
}

// Function for demonstrating handling query parameters
async function queryParametersExample() {
  try {
    const response = await got("https://httpbin.org/get", {
      searchParams: { answer: 42 },
    });
    console.log("Query Parameter Response:", response.body);
  } catch (error) {
    console.error("Error in Query Parameters:", error.response.body);
  }
}

// Function for demonstrating custom headers
async function customHeadersExample() {
  try {
    const response = await got("https://httpbin.org/headers", {
      headers: {
        "Custom-Header": "MyValue",
      },
    });
    console.log("Custom Headers Response:", response.body);
  } catch (error) {
    console.error("Error in Custom Headers:", error.response.body);
  }
}

// Function for demonstrating error handling
async function errorHandlingExample() {
  try {
    await got("https://httpbin.org/status/404");
  } catch (error) {
    console.error("Error Handling Response:", error.response.body);
  }
}

// Function for demonstrating timeout
async function timeoutExample() {
  try {
    await got("https://httpbin.org/delay/3", { timeout: 2000 });
  } catch (error) {
    console.error("Timeout Error:", error.message);
  }
}

// Function for demonstrating hooks
async function hooksExample() {
  try {
    await got("https://httpbin.org/get", {
      hooks: {
        beforeRequest: [
          (options) => {
            console.log("Before Request Hook:", options.url.href);
          },
        ],
        afterResponse: [
          (response) => {
            console.log("After Response Hook:", response.statusCode);
            return response;
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error in Hooks Example:", error);
  }
}

// Function for demonstrating retries
async function retryExample() {
  try {
    await got("https://httpbin.org/status/500", {
      retry: {
        limit: 2,
        methods: ["GET"],
        statusCodes: [500],
        calculateDelay: ({ attemptCount, error, computedValue }) => {
          console.log(`Retry attempt: ${attemptCount}`);
          return computedValue;
        },
      },
    });
  } catch (error) {
    console.error("Retry Example Error:", error.message);
  }
}

// Function for demonstrating streaming
function streamingExample() {
  got
    .stream("https://httpbin.org/stream/10")
    .on("data", (chunk) => {
      console.log("Streaming Data Chunk:", chunk.toString());
    })
    .on("error", (error) => {
      console.error("Streaming Error:", error.message);
    });
}

async function proxyExample() {
  try {
    const proxyAgent = new HttpsProxyAgent("http://localhost:8080");

    const response = await got("https://httpbin.org/get", {
      agent: {
        http: proxyAgent,
        https: proxyAgent,
      },
    });

    console.log("Response through Proxy:", response.body);
  } catch (error) {
    console.error("Error in Proxy Example:", error);
  }
}

async function http2Example() {
  try {
    const response = await got("https://httpbin.org/get", {
      http2: true,
    });
    console.log("HTTP/2 Response:", response.body);
  } catch (error) {
    console.error("Error in HTTP/2 Example:", error.response.body);
  }
}

async function paginationExample() {
  try {
    let pageNumber = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await got(
        `http://localhost:3000/api/items?page=${pageNumber}`,
        {
          responseType: "json",
        }
      );
      const data = response.body;

      console.log(`Page ${pageNumber} data:`, data);

      pageNumber++;
      hasMore = data.hasMore;
    }

    console.log("Pagination complete.");
  } catch (error) {
    console.error("Error in Pagination Example:", error.message);
  }
}

// Main function to run all examples
async function main() {
  await getExample();
  await postExample();
  await queryParametersExample();
  await customHeadersExample();
  await errorHandlingExample();
  await timeoutExample();
  await hooksExample();
  await retryExample();
  await http2Example();
  await proxyExample();
  await paginationExample();
  streamingExample();
}

// Execute the main function
main();
