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

  if (req.files.length > 0) {
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

exports.getProductDetailsById = async (req, res) => {
  const { productId } = req.params;
  if (productId) {
    try {
      const product = await Product.findOne({ _id: productId }).exec();
      if (product) {
        res.status(200).json({ product });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};


exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
