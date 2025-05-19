const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

router.post('/books/:id/reviews', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingReview = await Review.findOne({
      book: req.params.id,
      user: req.user.userId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      ...req.body,
      book: req.params.id,
      user: req.user.userId
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({
      review,
    });

  } catch (error) {
    console.error('Error in GET /api/reviews/:id:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }
    
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.deleteOne(); // Updated from remove() to deleteOne()
    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Error in DELETE /api/reviews/:id:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;