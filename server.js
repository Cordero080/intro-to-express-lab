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
  const { username } = req.params; // Extract username from URL
  res.send(`It's you again, ${username}! What a sight for sore eyes!`); // revised
});

// ================== 2. Rolling the dice
app.get("/roll/:num", (req, res) => {
  const num = Number(req.params.num); // Convert to number.
  // params is the object that contains the route parameters. the route parameter is the part of the URL that comes after the colon (:)

  // Validation: must be a non-negative whole number
  if (!Number.isInteger(num) || num < 0) {
    return res.send("You must specify a whole number."); // revised
  }
  // Generate a random integer between 0 and num
  const roll = Math.floor(Math.random() * (num + 1));

  // Send the result back
  res.send(`You rolled ${roll}.`);
});

// =================== 3. I Want THAT One!

// Data for step 3
const collectibles = [
  { name: "The Code of Hammurabi", price: 17777777.99 },
  { name: "Werewolf Bone", price: 10000.95 }, //spelling revised
  { name: "Ominous Wig", price: 35000.77 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = Number(req.params.index);

  // Validate: must be a non-negative whole number within array bounds
  const outOfRange =
    !Number.isInteger(index) || index < 0 || index >= collectibles.length;

  if (outOfRange) {
    return res.send("Not in stock. My bad!");
  }

  const item = collectibles[index];
  res.send(
    `So, you're SURE you want the ${item.name}? For $${item.price}, it can be yours!`
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

  // Destructured query parameters
  const { "min-price": minPrice, "max-price": maxPrice, type } = req.query;

  // If no filters are provided, return everything intentionally. if runs only when all three filters are missing or empty.
  if ([minPrice, maxPrice, type].every((v) => v == null || v === "")) {
    return res.json(shoes);
  }

  // Parse safely (Number(): "50px" -> NaN)
  const min =
    minPrice !== undefined && minPrice !== "" ? Number(minPrice) : undefined;
  const max =
    maxPrice !== undefined && maxPrice !== "" ? Number(maxPrice) : undefined;
  const typeNorm =
    typeof type === "string" && type !== "" ? type.toLowerCase() : undefined;

  // Use a single filter for all conditions
  const filteredShoes = shoes.filter((shoe) => {
    if (Number.isFinite(min) && shoe.price < min) return false;
    // Check for max-price f
    if (Number.isFinite(max) && shoe.price > max) return false;
    // Check for type f
    if (typeNorm && shoe.type.toLowerCase() !== typeNorm) return false;

    return true;
  });

  // Respond with the filtered list of shoes
  res.json(filteredShoes); // .json to send arrays of objects. .send for strings (text/html)
});
