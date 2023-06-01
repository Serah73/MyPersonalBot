"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    id: Number,
    title: String,
    section: String,
    method: Array,
  ingredients: Array,
    time: Number
});

const Recipe = mongoose.model('Recipe', recipeSchema);


module.exports = {
  Recipe
}