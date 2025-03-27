import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        author: {
            type: String
        },
        description: {
            type: String
        },
        pages: {
            type: Number
        },
    }
);

const Book = mongoose.model("books", bookSchema);

export default Book;