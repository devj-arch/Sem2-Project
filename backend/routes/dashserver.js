import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://avadhesh:Cx9HmlrZDnzL6Due@dev-cluster.cof7u.mongodb.net/clothingShop?retryWrites=true&w=majority&appName=dev-cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema & Model
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

const Product = mongoose.model('Product', productSchema, 'products');

// POST route to add product
app.post('/add-p', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(200).send('✅ Product added successfully');
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(500).send('❌ Failed to add product');
    }
});
export default router;