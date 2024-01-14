const chalk = require("chalk");
const figlet = require("figlet");
const cliProgress = require("cli-progress");

// Function to display welcome message
function showWelcomeMessage() {
  console.log(
    chalk.yellow(figlet.textSync("Welcome CLI!", { horizontalLayout: "full" }))
  );
  console.log(
    chalk.green("This is a demonstration of chalk, figlet, and cli-progress.\n")
  );
}

// Function to demonstrate various chalk features
function demonstrateChalk() {
  console.log(chalk.blue("Hello") + " World" + chalk.red("!"));
  console.log(chalk.blue.bgRed.bold("Hello world!"));
  console.log(chalk.green("Green text"));
  console.log(chalk.underline.red("Underlined red text"));
  console.log(chalk.inverse("Inverted colors"));
  console.log(chalk.rgb(123, 45, 67).underline("Underlined rgb text"));
  console.log(chalk.hex("#DEADED").bold("Bold hexadecimal color"));
}

// Function to demonstrate figlet with different fonts
function demonstrateFiglet() {
  figlet("Hello World!", { font: "Ghost" }, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });

  figlet.text(
    "CLI Fun!",
    {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    }
  );
}

// Function to demonstrate cli-progress
function demonstrateCliProgress() {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(100, 0);

  const interval = setInterval(() => {
    bar.increment();
    if (bar.value === 100) {
      bar.stop();
      clearInterval(interval);
      console.log(chalk.green("\nProgress Complete!"));
    }
  }, 100);
}

// Main function to run the demonstrations
function main() {
  showWelcomeMessage();
  console.log(chalk.yellow("Demonstrating Chalk...\n"));
  demonstrateChalk();

  console.log(chalk.yellow("\nDemonstrating Figlet...\n"));
  demonstrateFiglet();

  console.log(chalk.yellow("\nDemonstrating CLI Progress Bar...\n"));
  demonstrateCliProgress();
}

main();
