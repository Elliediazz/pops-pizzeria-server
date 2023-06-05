const { MongoClient } = require("mongodb");
const path = require("path");


// MongoDB Connection
const uri = "mongodb+srv://elliediazz:gokoUUOcBmxJ6Zcm@cluster0.tgkwluy.mongodb.net/?retryWrites=true&w=majority";
const dbName = "PopsPizzeria";
const collectionName = "menuItems";

const menu = [
  {
    name: "Sicilian Slice",
    price: 3.25,
    description: "A thin, crispy crust that is topped with a simple tomato sauce, slices of fresh mozzarella cheese, and fresh basil leaves. The sauce is usually made with San Marzano tomatoes, which are known for their sweet flavor and low acidity.",
    img: "",
    category: "Pizza"
},
{
    name: "Regular Slice",
    price: 2.75,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Regular Pie (18\")",
    price: 17.25,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Sicilian Pizza Pie",
    price: 21.80,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Vodka Pie (Rectangle)",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Grandma Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Chicken Bacon Ranch Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Buffalo Chicken Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "BBQ Chicken Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Chicken Parm Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Chicken Marsala Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Chicken Francese Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Sweet Chili Chicken Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "House Special Pie",
    price: 26.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Sicilian House Special Pie",
    price: 29.00,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "White Pie",
    price: 22.85,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Baked Ziti Pie",
    price: 22.85,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Hawaiian Pie",
    price: 22.85,
    description: "Pizza with Ham and Pineapple",
    img: "",
    category: "Pizza"
},
{
    name: "Eggplant Parm Pie",
    price: 22.85,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Margherita Pie",
    price: 22.85,
    description: "",
    img: "",
    category: "Pizza"
},
{
    name: "Meat Lovers Pie",
    price: 22.85,
    description:"Pizza with Pepperoni, Sausage, and Meatball",
    img: "",
    category: "Pizza"
},
{
    name: 'Veggie Pie',
    price: 22.85,
    description: 'Pizza with Mushroom, Onion, and Peppers',
    img: '',
    category: 'Pizza'
},
{
    name: 'Buffalo Chicken Slice',
    price: 4.06,
    description: '',
    img: '',
    category: 'Pizza'
},
{
    name: 'Sweet Chili and Chicken Slice',
    price: 4.06,
    description: '',
    img: '',
    category: 'Pizza'
},
{
    name: 'White Slice',
    price: 4.06,
    description: '',
    img: '',
    category: 'Pizza'
},
{
    name: 'Grandma Slice',
    price: 4.06,
    description: '',
    img: '',
    category: 'Pizza'
},
{
    name: 'Margarita Slice',
    price: 4.06,
    description: '',
    img: '',
    category: 'Pizza'
},
{
    name: 'Chicken Parm Slice',
    price: 4.06,
    description: '',
    img: '',
    category: 'Pizza'
},
{
    name: 'Chicken Roll',
    price: 9.65,
    description: '',
    img: '',
    category: 'Rolls & Calzones'
},
{
    name: 'Sausage Roll',
    price: 9.65,
    description: 'With Peppers and Onions',
    img: '',
    category: 'Rolls & Calzones'
},
{
    name: 'Spinach Roll',
    price: 9.65,
    description: '',
    img: '',
    category: 'Rolls & Calzones'
},
{
    name: 'Pepperoni Pinwheel',
    price: 2.50,
    description: '',
    img: '',
    category: 'Rolls & Calzones'
},
{
    name: 'Regular Calzone',
    price: 9.65,
    description: '',
    img: '',
    category: 'Rolls & Calzones'
},
{
    name: 'Linguine or Ziti with Marinara',
    price: 11.45,
    description: '',
    img: '',
    category: 'Pasta'
},
{
    name: 'Linguine or Ziti with Meat Sauce',
    price: 13.35,
    description: '',
    img: '',
    category: 'Pasta'
},
{
    name: 'Linguine or Ziti with Sausage',
    price: 13.35,
    description: '',
    img: '',
    category: 'Pasta'
},
{
    name: 'Linguine or Ziti with Meatball',
    price: 13.35,
    description: '',
    img: '',
    category: 'Pasta'
},
{
    name: 'Linguine or Ziti with Shrimp',
    price: 16.50,
    description: '',
    img: '',
    category: 'Pasta'
},
{
    name: 'Linguine or Ziti with White or Red Clam Sauce',
    price: 12.45,
    description: '',
    img: '',
    category: 'Pasta'
},
{
    name: 'Baked Ziti',
    price: 12.45,
    description: '',
    img: '',
    category: 'Pasta'
},
{
    name: "Baked Ziti Sicilian Style",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Baked Stuffed Shells",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Baked Cheese Ravioli",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Baked Lasagna",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Baked Manicotti",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Tortellini",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Penne Alla Vodka",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Fettuccine Alfredo",
    price: 13.45,
    description: "",
    img: "",
    category: "Pasta"
},
{
    name: "Chicken Parmigiana Hero",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Meatball Parmigiana Hero",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Eggplant Parmigiana Hero",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Veal Cutlet Parmigiana Hero",
    price: 11.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Shrimp Parmigiana Hero",
    price: 11.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Sausage Parmigiana Hero",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Sausage and Peppers with Onions Hero",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Chicken Cutlet Hero",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Pop's Sub Special",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: "Peppers Eggs Onions Hero",
    price: 10.35,
    description: "",
    img: "",
    category: "Heroes"
},
{
    name: 'Chicken Parmigiana',
    price: 16.65,
    description: 'Breaded chicken cutlet, tomato sauce, mozzarella cheese, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Chicken & Eggplant Parmigiana',
    price: 17.65,
    description: 'Breaded chicken cutlet, breaded eggplant, tomato sauce, mozzarella cheese, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Veal Parmigiana',
    price: 17.65,
    description: 'Breaded veal cutlet, tomato sauce, mozzarella cheese, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Eggplant Parmigiana',
    price: 16.65,
    description: 'Breaded eggplant, tomato sauce, mozzarella cheese, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Chicken Francese',
    price: 18.60,
    description: 'Egg-battered chicken breast, white wine, lemon, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Chicken Marsala',
    price: 18.60,
    description: 'Sauteed chicken breast, Marsala wine, mushrooms, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Veal Francese',
    price: 19.65,
    description: 'Egg-battered veal cutlet, white wine, lemon, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Veal Marsala',
    price: 19.65,
    description: 'Sauteed veal cutlet, Marsala wine, mushrooms, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Shrimp Francese',
    price: 19.65,
    description: 'Egg-battered shrimp, white wine, lemon, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Shrimp Marsala',
    price: 19.65,
    description: 'Sauteed shrimp, Marsala wine, mushrooms, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Eggplant Rollatini',
    price: 17.65,
    description: 'Eggplant rolled with ricotta cheese, topped with tomato sauce and melted mozzarella cheese',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Sausage & Peppers with Onions',
    price: 17.65,
    description: 'Sauteed sausage, green peppers, onions, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Shrimp Parmigiana',
    price: 17.65,
    description: 'Breaded shrimp, tomato sauce, mozzarella cheese, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: 'Shrimp Fra Diavolo',
    price: 19.65,
    description: 'Sauteed shrimp in spicy marinara sauce, served with spaghetti',
    img:"",
    category: 'Dinner'
  },
  {
    name: "Shrimp Scampi",
    price: 19.65,
    description: "Shrimp sautéed in garlic, butter and lemon sauce served over linguine.",
    img:"",
    category: "Dinner"
  },
  {
    name: "Minestrone (Pint)",
    price: 6.00,
    description: "A hearty Italian vegetable soup.",
    img:"",
    category: "Soups & Salads"
  },
  {
    name: "Pasta Fagiolli",
    price: 6.00,
    description: "Pasta and beans in a tomato-based soup.",
    img:"",
    category: "Soups & Salads"
  },
  {
    name: "Lentil",
    price: 6.00,
    description: "A traditional lentil soup.",
    img:"",
    category: "Soups & Salads"
  },
  {
    name: "Greek Salad",
    price: 7.00,
    description: "Fresh mixed greens topped with tomatoes, cucumbers, red onions, feta cheese, and Kalamata olives.",
    img:"",
    category: "Soups & Salads"
  },
  {
    name: "Caesar Salad",
    price: 7.00,
    description: "Crisp romaine lettuce with croutons, shaved Parmesan cheese and Caesar dressing.",
    img:"",
    category: "Soups & Salads"
  },
  {
    name: "Antipasto",
    price: 9.00,
    description: "An assortment of Italian meats, cheeses, olives and marinated vegetables.",
    img:"",
    category: "Soups & Salads"
  },
{
    name: "Grilled Chicken Salad",
    price: 10.00,
    description: "Fresh mixed greens topped with grilled chicken, tomatoes, onions, cucumbers, and your choice of dressing.",
    img: "",
    category: "Soups & Salads"
},
{
    name: "Chicken Cutlet Salad",
    price: 10.00,
    description: "Crispy chicken cutlets served on a bed of mixed greens, with tomatoes, onions, cucumbers, and your choice of dressing.",
    img: "",
    category: "Soups & Salads"
},
{
    name: "Garlic Knots (3 Knots)",
    price: 2.50,
    description: "",
    img: "",
    category: "Appetizers"
},
{
    name: "Garlic Bread (2 Loaves)",
    price: 4.00,
    description: "",
    img: "",
    category: "Appetizers"
},
{
    name: "Buffalo Wings",
    price: 9.00,
    description: "",
    img: "",
    category: "Appetizers"
},
{
    name: "Beef Patty",
    price: 3.50,
    description: "",
    img: "",
    category: "Appetizers"
},
{
    name: "Mozzarella Sticks (6 Pieces)",
    price: 6.00,
    description: "",
    img: "",
    category: "Appetizers"
},
{
    name: "Chicken Fingers",
    price: 5.00,
    description: "",
    img: "",
    category: "Appetizers"
},
{
    name: "French Fries",
    price: 5.00,
    description: "",
    img: "",
    category: "Appetizers"
},
{
    name: "20oz Soda",
    price: 2.25,
    description: "",
    img: "",
    category: "Cold Beverages"
},
{
    name: "Hanks Soda",
    price: 2.25,
    description: "",
    img: "",
    category: "Cold Beverages"
},
{
    name: "Snapple",
    price: 2.00,
    description: "",
    img: "",
    category: "Cold Beverages"
},
{
    name: "Can Soda",
    price: 1.50,
    description: "",
    img: "",
    category: "Cold Beverages"
},
{
    name: "2 Liter Bottle",
    price: 4.00,
    description: "Coke Products",
    img: "",
    category: "Cold Beverages"
},
{
    name: "Bottled Water",
    price: 1.50,
    description: "",
    img: "",
    category: "Cold Beverages"
},
{
    name: "Vanilla Brownie Pint",
    price: 5.95,
    description: "",
    img: "",
    category: "Ice Cream"
},
{
    name: "Rainbow Cookie Pint",
    price: 5.95,
    description: "",
    img: "",
    category: "Ice Cream"
},
{
    name: "Raspberry Sorbet Pint",
    price: 5.95,
    description: "",
    img: "",
    category: "Ice Cream"
},
{
    name: "Rocky Road Pint",
    price: 5.95,
    description: "",
    img: "",
    category: "Ice Cream"
},
{
    name: "S'mores Pint",
    price: 5.95,
    description: "",
    img: "",
    category: "Ice Cream"
},
{
    name: "Pistachio Pint",
    price: 5.95,
    description: "",
    img: "",
    category: "Ice Cream"
},
{
    name: "Nutella Banana",
    price: 5.95,
    description: "",
    img: "",
    category: "Ice Cream"
}
];

async function transferMenuData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Clear the collection before inserting new documents (optional)
    await collection.deleteMany({});

    // Iterate over the menu array and insert each menu item
    for (const menuItem of menu) {
      // // Get the absolute path to the image file
      // const imagePath = path.resolve(__dirname, "../Assets/margarita.jpg");
      // // Assign the image path to the `img` property
      // menuItem.img = imagePath;

      await collection.insertOne(menuItem);
    }

    console.log("Menu data transferred to MongoDB successfully");
  } catch (error) {
    console.error("Error transferring menu data to MongoDB", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

transferMenuData();