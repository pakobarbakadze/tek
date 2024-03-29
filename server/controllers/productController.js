import Product from "../models/productModel.js";
import fs from "fs";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.category !== "ALL" ? { category: req.query.category } : {};

  try {
    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (e) {
    res.status(500).send(e);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  try {
    res.json(product);
  } catch (e) {
    res.status(404).send("Product not found");
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  try {
    await product.remove();
    res.json({ message: "Product removed" });
  } catch (e) {
    res.status(404).send("Product not found");
  }
};

// @desc    Upload a product
// @route   POST /api/products
// @access  Private/Admin
const uploadProduct = async (req, res) => {
  const { name, price, brand, category, description } = req.body;
  try {
    const product = new Product({
      user: req.user._id,
      name: name,
      brand: brand,
      image: {
        buffer: fs.readFileSync(`./server/images/${req.file.filename}`),
        contentType: req.file.mimetype,
      },
      category: category,
      description: description,
      price: price,
    });

    await product.save();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (e) {
    res.status(404).send("Product not found");
  }
};

export { getProducts, getProductById, deleteProduct, uploadProduct, updateProduct };
