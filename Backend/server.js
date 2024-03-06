const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const ProductModel = require('./app/models/productModel')
const EventModel = require('./app/models/eventModel')
const dbConfig = require("./app/config/db.config");

const app = express();

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
app.get('/api/events',async (req,res) => {
  const result = await EventModel.find();
  res.send(result);
})


app.get('/api/products',async (req,res) => {
  const result = await ProductModel.find();
  res.send(result);
})

app.get('/api/products/category',async (req,res) => {
  const result = await ProductModel.aggregate([
    {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0
        }
      }
    ])
    res.send(result);
})

app.post('/api/products',async (req,res) => {
  const product = new ProductModel(req.body);
  const result = await product.save();
  res.send(result)
})
app.get('/api/products/:productId',async (req, res) => {
  const productId = req.params.productId;
  // const products = await ProductModel.find({ _id: productId });
  const result = await ProductModel.find();
  const products = result.find(product => product._id == productId)
  res.send(products);
})

app.get('/api/products/search/:searchTerm', async(req, res) => {
  const searchTerm = req.params.searchTerm;
  const products = await ProductModel.find({
    productName: { $regex: new RegExp(searchTerm, 'i') }
  });
  res.send(products);
})

app.get('/api/products/category/:categoryName',async (req, res) => {
  const category_ = req.params.categoryName;
  const products = await ProductModel.find({category:category_});
  res.send(products);
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
