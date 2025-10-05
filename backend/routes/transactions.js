const express = require('express');
const router = express.Router();

// Import controllers
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');
const verifyToken = require('../middleware/verifyToken');  // JWT token middleware

// Define routes
router.post('/add-income', verifyToken, addIncome);
router.get('/get-incomes', verifyToken, getIncomes);
router.delete('/delete-income/:id', verifyToken, deleteIncome);
router.put('/update-income/:id', verifyToken, updateIncome);

router.post('/add-expense', verifyToken, addExpense);
router.get('/get-expenses', verifyToken, getExpense);
router.delete('/delete-expense/:id', verifyToken, deleteExpense);
router.put('/update-expense/:id', verifyToken, updateExpense);

// Export router
module.exports = router;