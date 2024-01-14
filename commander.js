const { program } = require("commander");
const fs = require("fs");
const path = require("path");

program
  .name("demo-app")
  .description("A demonstration of Commander for Node.js")
  .version("1.0.0");

// Adding a basic command
program
  .command("basic")
  .description("Basic command")
  .action(() => {
    console.log("Basic command executed");
  });

// Command with arguments
program
  .command("greet <name>")
  .description("Greet someone")
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

// Command with options
program
  .command("sum")
  .description("Sum numbers")
  .option("-n, --numbers <numbers...>", "Numbers to sum")
  .action((cmdObj) => {
    const numbers = cmdObj.numbers.map(Number);
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    console.log(`Sum: ${sum}`);
  });

// Command with variadic arguments
program
  .command("multiply <factor> [others...]")
  .description("Multiply numbers")
  .action((factor, others) => {
    const result = others.reduce((acc, curr) => acc * curr, factor);
    console.log(`Result: ${result}`);
  });

// Subcommand setup
const configure = program
  .command("configure")
  .description("Configure the application");

configure
  .command("user <name>")
  .description("Configure user name")
  .action((name) => {
    console.log(`User name set to ${name}`);
  });

configure
  .command("env <environment>")
  .description("Set the environment")
  .action((environment) => {
    console.log(`Environment set to ${environment}`);
  });

// Command with custom help
const custom = program
  .command("custom")
  .description("A command with custom help")
  .action(() => {
    console.log("Custom command executed");
  });

custom.addHelpText(
  "after",
  `
Example call:
  $ custom --help`
);

// Option processing
program.option("-d, --debug", "output extra debugging");

program.on("option:debug", function () {
  process.env.DEBUG = this.debug;
});

// Custom event listener
program.on("command:*", function () {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

// Extensive Command Example
program
  .command("extensive")
  .description("An extensive command example")
  .option("-f, --file <type>", "file type")
  .option("-p, --path <path>", "file path")
  .action((cmdObj) => {
    console.log("Extensive command with options:");
    console.log(`File type: ${cmdObj.file}`);
    console.log(`File path: ${cmdObj.path}`);
  });

// Parsing and executing the commands
program.parse(process.argv);
