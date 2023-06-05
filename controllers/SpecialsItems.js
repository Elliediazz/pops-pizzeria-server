const { MongoClient } = require('mongodb');

// MongoDB connection
const url = process.env.MONGO_URI;
const dbName = 'PopsPizzeria';
const collectionName = 'specialsItems';

const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB: Specials');
  } catch (error) {
    console.error('Error connecting to MongoDB: Specials', error);
  }
}

// GET collection - specialsItems
function getSpecialsItemsCollection() {
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

async function getAllSpecialsItems(req, res) {
  try {
    const collection = getSpecialsItemsCollection();
    const items = await collection.find().toArray();
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting all items' });
  }
}

async function getSpecialsItemById(req, res) {
  try {
    const { id } = req.params;
    const collection = getSpecialsItemsCollection();
    const item = await collection.findOne({ _id: id });
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting item' });
  }
}

async function createSpecialsItem(req, res) {
  try {
    const collection = getSpecialsItemsCollection();
    await collection.insertOne(req.body);
    res.status(201).json({ message: 'Item created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating item' });
  }
}

async function deleteSpecialsItemById(req, res) {
  try {
    const { id } = req.params;
    const collection = getSpecialsItemsCollection();
    await collection.deleteOne({ _id: id });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
}

module.exports = {
  getAllSpecialsItems,
  getSpecialsItemById,
  createSpecialsItem,
  deleteSpecialsItemById,
  connect,
  closeConnection,
};