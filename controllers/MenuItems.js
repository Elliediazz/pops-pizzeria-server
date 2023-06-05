const { MongoClient } = require('mongodb');

// MongoDB connection
const url = process.env.MONGO_URI;
const dbName = 'PopsPizzeria';
const collectionName = 'menuItems';

const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB: Menu');
  } catch (error) {
    console.error('Error connecting to MongoDB:Menu', error);
  }
}

// GET collection - menuItems
function getMenuItemsCollection() {
  const db = client.db(dbName);
  return db.collection(collectionName);
}

// Close the MongoDB connection
async function closeConnection() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB', error);
  }
}

async function getAllMenuItems(req, res) {
  try {
    const collection = getMenuItemsCollection();
    const items = await collection.find().toArray();
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting all items' });
  }
}

async function getMenuItemById(req, res) {
  try {
    const { id } = req.params;
    const collection = getMenuItemsCollection();
    const item = await collection.findOne({ _id: id });
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting item' });
  }
}

async function createMenuItem(req, res) {
  try {
    const collection = getMenuItemsCollection();
    await collection.insertOne(req.body);
    res.status(201).json({ message: 'Item created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating item' });
  }
}

async function deleteMenuItemById(req, res) {
  try {
    const { id } = req.params;
    const collection = getMenuItemsCollection();
    await collection.deleteOne({ _id: id });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
}

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  deleteMenuItemById,
  connect,
  closeConnection,
};