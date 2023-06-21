const { MongoClient } = require("mongodb");
const path = require("path");
require('dotenv').config();

// MongoDB connection
const url = process.env.MONGO_URI
const dbName = "PopsPizzeria";
const collectionName = "specialsItems";

const specialsMenu = [
    {
        name: "Family Special",
        price: 23.79,
        description: "1 Large Cheese Pie, 6 Garlic Knots, Choice of Baked Ziti or Large Salad *Cannot Be Combined with Other Offers*",
        img: "",
        category: "Daily Specials",
        day:"",
        startTime:"",
        endTime:""
    },
    {
        name: "Tuesday Pizza Special",
        price: 11.49,
        description: "18\" Large Cheese Pie (Pick Up Only) *Cannot Be Combined with Any Other Offers*",
        img: "",
        category: "Daily Specials",
        day: 2,
        startTime:"",
        endTime:""
    },
    {
        name: "Wednesday Pasta Special",
        price: 10.04,
        description: "All Pasta and Homemade Pasta *Excludes Baked Lasagna & Liguine with Shrimp. Cannot be combined with any other offers*",
        img: "",
        category: "Daily Specials",
        day: 3,
        startTime:"",
        endTime:""
    },
    {
        name: "Thursday Pie & Wing Special",
        price: 20.84,
        description: "1 Large Cheese Pie & 8 Piece Buffalo Wings *Cannot Be Combined With Any Other Offer*",
        img: "",
        category: "Daily Specials",
        day: 4,
        startTime:"",
        endTime:""
    },
    {
        name: "Lunch Special",
        price: 5.50,
        description: "2 Cheese Slices & 1 Can of Soda",
        img: "",
        category: "Daily Specials",
        day:"",
        startTime: 690,
        endTime: 900
    }
]

async function transferSpecialsData() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      // Clear the collection before inserting new documents (optional)
      await collection.deleteMany({});

        // Iterate over the specials array and insert each specials item
    for (const specialsItem of specialsMenu) {
        await collection.insertOne(specialsItem);
      }
  
      console.log("Menu data transferred to MongoDB: specials successfully");
    } catch (error) {
      console.error("Error transferring specials data to MongoDB", error);
    } finally {
      // Close the MongoDB connection
      await client.close();
    }
  }
  
  transferSpecialsData();