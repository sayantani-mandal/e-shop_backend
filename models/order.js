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
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 1,
  },
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

module.exports = Order;
