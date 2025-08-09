// ===================1. Be Polite, Greet the User

//import express module

const express = require("express");

// Create an Express app

const app = express();

// Define routes

// listen for requests on port 8080
app.listen(8080, () => {
  console.log("Listening on port 8080");
});
app.get("/greetings/:username", (req, res) => {
  const { username } = req.params; // Exctract username from URL
  res.send(`It's you again, ${username}! what sight for sore eyes!`);
});

// ================== 2. Rolling the dice
app.get("/roll/:num", (req, res) => {
  const num = Number(req.params.num); // Converet to number.
  // params is the object that contains the route parameters. the route parameter is the part of the URL that comes after the colon (:)

  //  Validation: must be a whole number
  if (!Number.isInteger(num)) {
    //  simpler format to check if num is an integer -already checks if num is a number is finite or NaN
    return res.send("You must specify a number,");
  }
  // Generate a random integer between 0 and num
  const roll = Math.floor(Math.random() * (num + 1));

  // Send the result back
  res.send(`you rolled ${roll} `);
});

// =================== 3. I Want THAT One!

// Data forn step 3
const collectibles = [
  { name: "The Code of Hammurabi", price: 17777777.99 },
  { name: "Warewolf Bone", price: 10000.95 },
  { name: " Ominous Wig", price: 35000.77 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = Number(req.params.index);

  // Validate: must be a negative whole number within array bounds
  const noIndex =
    !Number.isInteger(index) || index < 0 || index >= collectibles.length;

  if (noIndex) {
    return res.send("Not in stock. My bad!");
  }

  const item = collectibles[index];
  res.send(
    `So, you SURE you want the ${item.name}? for ${item.price}, it can be yours!`
  );
});

// ==================== 4. Filter Shoes by Query Parameters

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" }, // Objects as elements in an array
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];
app.get("/shoes", (req, res) => {
  // let filteredShoes = shoes;

  // Destructive query parameters
  const { "min-price": minPrice, "max-price": maxPrice, type } = req.query;
  // The part after the colon creates a variable name out of the URL("min-price")

  //  Single filter function - checks lall the conditions at once

  // Use a single filter for all conditions
  const filteredShoes = shoes.filter((shoe) => {
    // Check for min-price f
    if (minPrice && shoe.price < parseInt(minPrice)) return false;
    // Check for max-price f
    if (maxPrice && shoe.price > parseInt(maxPrice)) return false;
    // Check for type f
    if (type && shoe.type.toLowerCase() !== type.toLowerCase()) return false;

    return true;
  });

  // Respond with the filtered list of shoes
  res.json(filteredShoes); // .json to send arrays of objects. .send for strings (text/html)
});
