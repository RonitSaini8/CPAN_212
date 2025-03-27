import express from 'express';
import Book from '../models/book.js'; // db.books
import fetchAllBooks from "../controllers/book_controller.js"

const router = express.Router();

router.get("/fetch-all", fetchAllBooks);

router.get("/fetch-query", (req, res) => {
    let filters = {};

    if (req.query) {
        filters.title = "The Last Songbird"
    }

    Book.find(filters).then((results) => {
        res.json(results)
    });
});

router.get("/itm/:id", (req, res) => {
    Book.find({id: req.params.id}).then((results) => {
        res.json(results)
    });
});

router.post("/add-book", (req, res) => {
    // 1 - fetch the information from the client
    const {title, author, pages, publisher, ISBN} = req.body;

    // 2 - write it down
    const newBook = new Book({
        title,
        author,
        pages,
    })

    // 3 - save it
    newBook.save().then((results) => res.json(results));
});

router.put("/:id", (req, res) => {
    Book.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: 
            {name: "Leo", review: "hi"}
        }}
    )
})

router.delete(":/id", (req, res) => {
    Book.findByIdAndDelete(req.params.id);
})

export default router;

// URL: http://localhost:8000/book/fetch-all

