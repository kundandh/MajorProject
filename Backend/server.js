const express = require("express");
const cors = require("cors");
const Razorpay = require('razorpay');
const cookieSession = require("cookie-session");
const ProductModel = require('./app/models/productModel')
const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");
const promocodeModel = require('./app/models/promocode')
const bodyParser = require('body-parser');
const orderModel = require('./app/models/orders')
const multer = require('multer');
const path = require('path'); 
require('./app/middlewares/uploads')


const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'imageUrl') {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Unexpected field')); // Reject the file
    }
  }
});

const STRIPE_SECRET_KEY = 
"sk_test_51OsOCvSGwbKLSXXDeE92QcXwQQdNGTI4JYgNwslHmi0jOzQnlUmKsdyIZXft9OgjIRR4Gt5KZAP3uLGZkbuusUZX00Y7k1VVR3"
const stripe = require("stripe")(STRIPE_SECRET_KEY);

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
  res.send(result)
})

app.get('/api/products/:productId',async (req, res) => {
  const productId = req.params.productId;
  // const products = await ProductModel.find({ _id: productId });
  const result = await ProductModel.find();
  const products = result.find(product => product._id == productId)
  res.send(products);
})

app.delete('/api/products/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ message: 'Internal Server Error' });
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

app.get('/api/promocode',async (req, res) => {
  const promocode = await promocodeModel.find();
  res.send(promocode);
})

app.get('/api/promocode/:promocode',async (req, res) => {
  const promocode_ = req.params.promocode;
  const codes = await promocodeModel.find();
  const result = codes.find((code)=>code.promocode == promocode_)
  res.send(result);
})

app.post('/api/promocode', async (req, res) => {
  const promocode = new promocodeModel(req.body);
  const result = await promocode.save();
  res.send(result)});

app.get("/success", async(req,res)=>{
  const session_id = req.query.session_id;

  try{
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if(session.payment_status === "paid"){
      res.send("payment Sucessful");
    }else{
      res.send("payment Unsucessful");
    }
  }catch(error){
    res.send("payment Confimation Error");
  }
});

app.get("/cancel",(req,res) =>{
  res.send("Payment Canceled");
});


app.post('/create-checkout-session',async(req,res)=>{
  try{
    const session = await stripe.checkout.sessions.create({
      payement_method_types :["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data:{
              name: "Product Name"
            },
            unit_amount : 1000
          },
          quantity:1
        }
      ],
      mode : "payment",
      success_url : "http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url : "http://localhost:8080/cancel"
    });
    res.json({url:session.url});
  }catch(error){
    res.status(500).json({error: error.message});
  }
})

app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Fetching the order by ID from the database
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" }); // Order not found
    }

    res.status(200).json(order); // Sending the fetched order as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Sending an error response
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    // Fetching orders from the database
    const orders = await orderModel.find();

    res.status(200).json(orders); // Sending the fetched orders as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Sending an error response
  }
});

app.post('/api/orders', async (req, res) => {
  try {
      // Extracting data from the request body
      const { user_Id, products, orderValue, address, date,promocode } = req.body;

      // Creating a new order instance
      const newOrder = new orderModel({
          user_Id,
          products,
          orderValue,
          address,
          date,
          promocode
      });

      // Saving the order to the database
      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder); // Sending the saved order as response
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" }); // Sending an error response
  }
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


// mihir code 

const nutritionPlanSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  // Add more fields as needed
});

const NutritionPlan = mongoose.model("Dietplan", nutritionPlanSchema);

app.post("/api/nutrition-plans", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body; // Assuming you're sending imageUrl directly
    const nutritionPlan = new NutritionPlan({
      title,
      description,
      imageUrl,
    });
    const newNutritionPlan = await nutritionPlan.save();
    res.status(201).json(newNutritionPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET All Nutrition Plans
app.get("/api/nutrition-plans", async (req, res) => {
  try {
    const nutritionPlans = await NutritionPlan.find();
    res.json(nutritionPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Nutrition Plan by ID
app.get("/api/nutrition-plans/:id", async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findById(req.params.id);
    if (nutritionPlan == null) {
      return res.status(404).json({ message: "Nutrition plan not found" });
    }
    res.json(nutritionPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});