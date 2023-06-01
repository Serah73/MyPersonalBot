"use strict"

const { Recipe } = require('../models/recipe.model');
const { writeMessage, TypesMessage } = require('../utils/messageManager');
const LOCATION = "Recipe.Controller";


//////////// ESTA HA SIDO LA EDITADA!
async function create(req, res) { //res? Pregunta a Ernesto!
    const recipe = new Recipe();
    recipe.title = req.body.title;
    recipe.section = req.body.section;
    recipe.method = req.body.method;
    recipe.ingredients = req.body.ingredients;

    recipe.save((err, saved) => {
        if (err || !saved) return JSON.stringify(writeMessage('Internal Server Error', 500, location));
        return JSON.stringify(writeMessage('Successfully saved'));
    });
};

async function remove(req, res) {
    Recipe.deleteOne({_id: req.params.id}, (err, docs) => {
        if ( err ) return res.status(500).send({ message: 'Internal Server Error' });
        if ( !docs ) return res.status(404).send({ message: 'Recipe Not Found'});
        return res.status(200).send({ message: 'Deleted' });
    });
};

async function getDetail(req, res) {
    Recipe.findOne({ _id: req.params.id }, (err, docs) => {
        if (err) return res.status(500).send({ message: 'Internal Server Error' });
        if (!docs) return res.status(404).send({ message: 'Recipe Not Found' });
        return res.status(200).send(docs);
    });
}

async function getRecipeBySection(req, res) {
    Recipe.find({ section: req.body.section }, (err, docs) => {
        if (err) return res.status(500).send({ message: 'Internal Server Error' });
        if (!docs) return res.status(404).send({ message: 'Recipe\'s Not Found' });
        
        return res.status(200).send( docs.map((obj) => obj.title ))
    })
}


module.exports = {
    create,
    remove,
    getDetail,
    getRecipeBySection
}