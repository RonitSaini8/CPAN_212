import express from 'express';
import bookController from '../controllers/book_controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Fetch all books for the logged-in user
router.get("/", auth.verifyToken, bookController.getUserBooks);

// Fetch all books
router.get("/all", bookController.getAllBooks);

// Add a new book
router.post("/add", auth.verifyToken, bookController.addBook);

// Fetch detailed book information
router.get("/details/:id", bookController.getBookDetails);

// Edit an existing book
router.put("/edit/:id", auth.verifyToken, bookController.editBook);

// Delete a book
router.delete("/delete/:id", auth.verifyToken, bookController.deleteBook);

export default router;
