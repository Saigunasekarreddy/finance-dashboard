const Income = require("../models/IncomeModel");

// Add new income
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new Income({
        title,
        amount,
        category,
        description,
        date,
        userId: req.user.userId  // Attach the user ID
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get incomes for logged-in user
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete income for logged-in user
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await Income.findOneAndDelete({ _id: id, userId: req.user.userId });

        if (!income) {
            return res.status(404).json({ message: 'Income not found or unauthorized' });
        }

        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update income for logged-in user
exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        const updatedIncome = await Income.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { title, amount, category, description, date },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found or unauthorized' });
        }

        res.status(200).json({ message: 'Income Updated', income: updatedIncome });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};