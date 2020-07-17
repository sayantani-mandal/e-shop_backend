const express = require('express');
const Order = require('../models/order');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    //console.log(req.body.products);
    let carts = req.body.products;
    console.log(carts.length);

    if (!firstName || !lastName || !address)
      return res.status(400).send({
        Error: ' firstName , lastName , address both are required',
      });

    if (!carts) return res.status(400).send({ Error: 'products required' });

    let orders = [];
    for (let i = 0; i < carts.length; i++) {
      orders.push(createOrder(req, carts[i], firstName, lastName, address));
    }

    orders = await Order.create(orders);
    console.log(orders);
    res.send({
      message: 'Orders was created',
      orders,
    });
  } catch (e) {
    res.status(402).send(e);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    let orders = await Order.find({ user: req.user._id })
      .populate('product')
      .populate('user')
      .sort({ createdAt: -1 });
    console.log(orders.length);
    let order = {
      count: orders.length,
      orders,
    };
    res.send(order);
  } catch (e) {
    res.status(402).send(e);
  }
});

function createOrder(req, productInfo, firstName, lastName, address) {
  console.log(req.user);
  return new Order({
    product: productInfo.productId,
    quantity: productInfo.quantity,
    price: productInfo.price,
    user: req.user._id,
    firstName,
    lastName,
    address,
    email: req.user.email,
  });
}

module.exports = router;
