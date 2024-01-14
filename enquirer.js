const Enquirer = require("enquirer");

async function main() {
  console.log("Enquirer Demonstration");

  // Simple text input
  const responseName = await Enquirer.prompt({
    type: "input",
    name: "name",
    message: "What is your name?",
  });

  console.log(`Hello, ${responseName.name}!`);

  // Number input
  const responseAge = await Enquirer.prompt({
    type: "numeral",
    name: "age",
    message: "How old are you?",
  });

  console.log(`You are ${responseAge.age} years old.`);

  // Password input
  const responsePassword = await Enquirer.prompt({
    type: "password",
    name: "password",
    message: "Enter a fake password:",
  });

  console.log(
    `Your fake password is ${"*".repeat(responsePassword.password.length)}`
  );

  // Confirmation
  const responseConfirm = await Enquirer.prompt({
    type: "confirm",
    name: "confirmed",
    message: "Do you like programming?",
  });

  console.log(
    responseConfirm.confirmed
      ? "You like programming!"
      : "You don’t like programming."
  );

  // List (comma-separated values)
  const responseList = await Enquirer.prompt({
    type: "list",
    name: "fruits",
    message: "Enter some fruits (comma-separated):",
  });

  console.log(`You like these fruits: ${responseList.fruits.join(", ")}`);

  // Multi-select
  const responseMultiSelect = await Enquirer.prompt({
    type: "multiselect",
    name: "colors",
    message: "Choose some colors",
    choices: ["Red", "Green", "Blue", "Yellow"],
  });

  console.log(
    `You selected these colors: ${responseMultiSelect.colors.join(", ")}`
  );

  // Single select
  const responseSelect = await Enquirer.prompt({
    type: "select",
    name: "country",
    message: "Pick a country:",
    choices: ["USA", "Canada", "UK", "Australia"],
  });

  console.log(`You selected: ${responseSelect.country}`);

  // Autocomplete
  const responseAutoComplete = await Enquirer.prompt({
    type: "autocomplete",
    name: "state",
    message: "Type to search for a state:",
    limit: 5,
    choices: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  });

  console.log(`You selected: ${responseAutoComplete.state}`);

  // Snippet prompt
  const responseSnippet = await Enquirer.prompt({
    type: "snippet",
    name: "profile",
    message: "Fill out the following fields:",
    template: `Name: \${name}
    Age: \${age}
    Username: \${username}
    Email: \${email}`,
  });

  console.log("Your profile:");
  console.log(responseSnippet.profile.result);
}

main().catch(console.error);
