const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Atlas URI - replace with your actual URI
mongoose.connect('mongodb+srv://avadhesh:Cx9HmlrZDnzL6Due@dev-cluster.cof7u.mongodb.net/clothingShop?retryWrites=true&w=majority&appName=dev-cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    image6: String,
    image7: String,
    category: String,
    description: String,
    attire_type: String,
    clothing_type: String
});

// Mongoose Model
const Product = mongoose.model('Product', productSchema, 'products'); 
// ^-- 'products' matches your MongoDB collection name

// POST route to add a product
app.post('/add', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(200).send('✅ Product added successfully');
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(500).send('❌ Failed to add product');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
