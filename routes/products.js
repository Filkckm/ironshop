var express = require('express');
var router = express.Router();
const Product = require('../models/product');


/* GET products listing. */
router.get('/', (req, res, next) => {

  Product.find({}, (err, products) => {
    if (err) {
      next(err)
    } else {
      res.render('products/index', { products: products });
    }
  })

});

router.get('/new', (req, res, next) => {
  res.render('products/new')
})

router.post('/', (req, res, next) => {
  const productInfo = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }

  const newProduct = new Product(productInfo)
  newProduct.save( (err) => {
    if (err) {
      next(err)
    }
    res.redirect('/products')
  })
})

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) { next(err) }

    res.render('products/show', { product: product} )
  })
})

router.get('/:id/edit', (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) { next(err) }

    res.render('products/edit', { product: product} )
  })
})

router.post('/:id', (req, res, next) => {
  const productInfo = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }

  Product.findByIdAndUpdate(req.params.id, productInfo ,(err, product) => {
    if (err) { next(err) }
    res.redirect('/products')
  })
})


router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id
  Product.deleteOne({ _id: id }, (err) => {
    if (err) { next(err) }
    res.redirect('/products')
  })
})

module.exports = router;
