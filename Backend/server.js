const express = require("express");
const cors = require("cors");
const Razorpay = require('razorpay');
const cookieSession = require("cookie-session");
const ProductModel = require('./app/models/productModel')
const EventModel = require('./app/models/eventModel')
const dbConfig = require("./app/config/db.config");

const app = express();

app.use('/uploads', express.static('uploads'));

const corsOptions = {
  origin: "http://localhost:4200", // Replace with the actual origin of your Angular app
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "gym-session",
    keys: ["COOKIE_SECRET"], // Use a proper secret, possibly from an environment variable
    httpOnly: true,
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: "user" }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({ name: "admin" }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// kundan product routs
app.get("/api/products", async (req, res) => {
  const result = await ProductModel.find();
  res.send(result);
});

app.get("/api/products/category", async (req, res) => {
  const result = await ProductModel.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        name: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);
  res.send(result);
});

app.post('/api/products', upload.single('imageUrl'), async (req, res)=> {
  const imageURL = req.file ? `http://localhost:8080/${req.file.path}` : null;
  const product = new ProductModel({
    productName: req.body.productName,
    brandName: req.body.brandName,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    size: req.body.size,
    stars: req.body.stars,
    // Get the path of the uploaded image file
    imageUrl : imageURL
  });
  const result = await product.save();
  res.send(result);
});

app.get("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  // const products = await ProductModel.find({ _id: productId });
  const result = await ProductModel.find();
  const products = result.find((product) => product._id == productId);
  res.send(products);
});

app.delete("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put('/api/products/:productId', upload.single('imageUrl'), async (req, res) => {
  try {
    const productId = req.params.productId;
    let updatedProductData = req.body;
    
    // If an image file is uploaded, update the imageURL
    if (req.file) {
      const imageURL = req.file ? `http://localhost:8080/${req.file.path}` : null;
      updatedProductData.imageUrl = imageURL.toString()
    }
    console.log(updatedProductData.imageUrl)
    // Find the product by its ID and update its data
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { $set: updatedProductData },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/products/search/:searchTerm", async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const products = await ProductModel.find({
    productName: { $regex: new RegExp(searchTerm, "i") },
  });
  res.send(products);
});

app.get("/api/products/category/:categoryName", async (req, res) => {
  const category_ = req.params.categoryName;
  const products = await ProductModel.find({ category: category_ });
  res.send(products);
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
