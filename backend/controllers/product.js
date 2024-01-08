const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = async (req, res) => {

    //res.status(200).json({file: req.files, body: req.body});
    
    const {
        name, price, offer, description, category, quantity, createdBy
    } = req.body;

    let productPictures = [];
    
    if(req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        offer,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json({ product: savedProduct });
    } catch (error) {
        res.status(400).json({ error });
    }

};

exports.getProductsBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug }).select('_id').exec();
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (category) {
            const products = await Product.find({ category: category._id }).exec();
            res.status(200).json({ 
                products
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
