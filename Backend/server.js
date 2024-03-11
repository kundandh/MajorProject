const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const ProductModel = require("./app/models/productModel");
// const EventModel = require("./app/models/eventModel");
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
const {
  Event,
  NewsLetter,
  ContactUs,
  // MEMBERSHIP,
  Membership,
} = require("./app/models/dashboard.model");
const User = require("./app/models/user.model");
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

app.post("/api/products", async (req, res) => {
  const product = new ProductModel(req.body);
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

app.put("/api/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { $set: updatedProductData },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// kunal event routs...............................................................

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/api/events", async (req, res) => {
  const event = new Event(req.body);
  try {
    const result = await event.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
app.get("/api/newsletter", async (req, res) => {
  try {
    const newletter = await NewsLetter.find();
    res.send(newletter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.post("/api/newsletter", async (req, res) => {
  const newletter = new NewsLetter(req.body);
  try {
    const result = await newletter.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
app.get("/api/contactus", async (req, res) => {
  try {
    const contactus = await ContactUs.find();
    res.send(contactus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.post("/api/contactus", async (req, res) => {
  const contactus = new ContactUs(req.body);
  try {
    const result = await contactus.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
app.get("/api/membeships", async (req, res) => {
  try {
    const membership = await Membership.find();
    res.send(membership);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.post("/api/membeships", async (req, res) => {
  const membeship = new Membership(req.body);
  try {
    const result = await membeship.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.put("/api/membeships/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim(); // Remove leading/trailing whitespace
    console.log();
    const updatedUserData = req.body;
    const updatedUser = await Membership.findByIdAndUpdate(
      userId,
      { $set: updatedUserData },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/membeships/:membershipId", async (req, res) => {
  const membershipId = req.params.membershipId;
  // console.log(productId);
  try {
    const deletedmembership = await Membership.findByIdAndDelete(membershipId);
    if (!deletedmembership) {
      return res.status(404).send({ message: "Membership not found" });
    }
    res.send({ message: "Membership deleted successfully" });
  } catch (error) {
    console.error("Error deleting membership:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.delete("/api/users/:userId", async (req, res) => {
  const userId = req.params.userId.trim(); // Remove leading/trailing whitespace
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/api/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim(); // Remove leading/trailing whitespace
    console.log();
    const updatedUserData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedUserData },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});