import express from "express";
import Recipe from "../models/recipes.js";

const recipeRouter = express.Router();

recipeRouter.post('/new', (req, res) => {
    const { name, description, difficulty, ingredients, steps } = req.body;

    let newRecipe = new Recipe({
        name,
        description,
        difficulty,
        ingredients,
        steps,
    });

    newRecipe
        .save()
        .then(() => {
            return res.status(201).json({ message: 'Recipe added successfully!' });
        })
        .catch((err) => {
            console.log('Error adding recipe:', err);
            return res.status(400).json({ message: 'Failed to add recipe. Recipe might already exist.' });
        });
});

recipeRouter.get('/all', (req, res) => {
    Recipe.find()
    .then((result) => {
        console.log(result)
        res.json(result)
    })
    .catch((err) => {
        console.log('Error fetching recipes: ', err)
        res.status(500).json({ message: 'Failed to fetch recipes!' })
    });
});



recipeRouter.get('/:id', (req, res) => {
    const recipeId = req.params.id;

    Recipe.findById(recipeId)
    .then((result) => {
        if (!result) {
            res.status(404).json({ message: 'Recipe not found!' });
        }
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log('Error finding recipe: ', err);
        res.status(500).json({ message: 'An error occurred while trying to find the recipe!' });
    });
});

recipeRouter.put('/:id', (req, res) => {
    const recipeId = req.params.id;
    const {name, description, difficulty, ingredients, steps} = req.body;

    Recipe.findByIdAndUpdate(recipeId, {name, description, difficulty, ingredients, steps}, {new: true})
    .then((updatedRecipe) => {
        if(!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe to update could not be found !' });
        }
        res.json({ message: 'Recipe updated ! ', updatedRecipe});
    })
    .catch((err) => {
        console.log('Error updating the recipe: ', err);
        return res.status(500).json({ message: 'An error occurred while trying to update the recipe !' });
    });
});

recipeRouter.delete('/:id', (req, res) => {
    const recipeId = req.params.id;

    Recipe.findByIdAndDelete(recipeId)
    .then((deletedRecipe) => {
        if(!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe to be deleted not found !' });
        }
        res.json({ message: 'Recipe deleted !' });
    })
    .catch((err) => {
        console.log('Error while deleting recipe: ', err)
        return res.status(500).json({ message: 'Error occurred while trying to delete the recipe !' })
    })
})

export default recipeRouter;
