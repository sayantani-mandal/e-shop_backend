const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Product = require('../models/product');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
  paymentMethod: {
    type: String,
    default: 'COD',
  },
  status: {
    type: mongoose.Schema.Types.String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('Order', orderSchema);

// function validateOrder(order) {
//   const schema = Joi.object({
//     firstName: Joi.string().min(3).required(),
//     lastName: Joi.string().min(3).required(),
//     address: Joi.string().min(4).required(),
//     products: Joi.array().required(),
//     createdAt: Joi.date(),
//   });

//   return schema.validate(order);
// }

exports.Order = Order;
//exports.validate = validateOrder;
