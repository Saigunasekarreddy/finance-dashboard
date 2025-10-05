const Expense = require("../models/ExpenseModel");

// Add Expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new Expense({
        title,
        amount,
        category,
        description,
        date,
        userId: req.user.userId  // Attach the logged-in user ID
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get All Expenses for Logged-In User
exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Expense (Only if it belongs to the user)
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.user.userId });

        if (!deleted) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }

        res.status(200).json({ message: 'Expense Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Expense (Only if it belongs to the user)
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { title, amount, category, description, date },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }

        res.status(200).json({ message: 'Expense Updated', expense: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};