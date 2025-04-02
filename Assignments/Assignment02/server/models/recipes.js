import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            required: true
        },
        ingredients: {
            type: [String],
            required: true
        },
        steps: {
            type: [String],
            required: true
        }
    }
);

const Recipe = mongoose.model('recipes', recipeSchema);

export default Recipe;