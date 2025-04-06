import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

dotenv.config();
const router=express.Router();


// Middleware
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(MONGO_URI, {
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
router.post('/add-p', async (req, res) => {
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
