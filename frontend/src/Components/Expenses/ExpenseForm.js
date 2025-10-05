
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Button from '../Button/Button';
// import { plus } from '../../utils/Icons';
// import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api/transactions";

// function ExpenseForm({ refreshExpenses }) {
//     const [inputState, setInputState] = useState({
//         title: '',
//         amount: '',
//         date: null,
//         category: '',
//         description: '',
//     });

//     const [error, setError] = useState('');

//     const { title, amount, date, category, description } = inputState;

//     const handleInput = name => e => {
//         setInputState({ ...inputState, [name]: e.target.value });
//         setError('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!title || !amount || !date || !category) {
//             setError('Please fill in all fields.');
//             return;
//         }

//         const parsedAmount = Number(amount);
//         if (isNaN(parsedAmount)) {
//             setError('Amount must be a valid number.');
//             return;
//         }

//         const expenseData = {
//             title,
//             amount: parsedAmount,
//             date: date.toISOString(),
//             category,
//             description,
//         };

//         try {
//             await axios.post(`${BASE_URL}/add-expense`, expenseData, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });

//             await refreshExpenses();

//             setInputState({
//                 title: '',
//                 amount: '',
//                 date: null,
//                 category: '',
//                 description: '',
//             });
//         } catch (err) {
//             console.error('Error adding expense:', err.response || err);
//             setError('Error adding expense');
//         }
//     };

//     return (
//         <ExpenseFormStyled onSubmit={handleSubmit}>
//             {error && <p className="error">{error}</p>}
//             <div className="input-control">
//                 <input
//                     type="text"
//                     value={title}
//                     placeholder="Expense Title"
//                     onChange={handleInput('title')}
//                 />
//             </div>
//             <div className="input-control">
//                 <input
//                     type="number"
//                     value={amount}
//                     placeholder="Expense Amount"
//                     onChange={handleInput('amount')}
//                 />
//             </div>
//             <div className="input-control">
//                 <DatePicker
//                     placeholderText="Enter A Date"
//                     selected={date}
//                     dateFormat="dd/MM/yyyy"
//                     onChange={(date) => setInputState({ ...inputState, date })}
//                 />
//             </div>
//             <div className="selects input-control">
//                 <select value={category} onChange={handleInput('category')} required>
//                     <option value="" disabled>Select Option</option>
//                     <option value="education">Education</option>
//                     <option value="groceries">Groceries</option>
//                     <option value="health">Health</option>
//                     <option value="subscriptions">Subscriptions</option>
//                     <option value="takeaways">Takeaways</option>
//                     <option value="clothing">Clothing</option>
//                     <option value="travelling">Travelling</option>
//                     <option value="other">Other</option>
//                 </select>
//             </div>
//             <div className="input-control">
//                 <textarea
//                     value={description}
//                     placeholder="Add A Reference"
//                     onChange={handleInput('description')}
//                     rows="4"
//                 />
//             </div>
//             <div className="submit-btn">
//                 <Button
//                     name="Add Expense"
//                     icon={plus}
//                     bPad=".8rem 1.6rem"
//                     bRad="30px"
//                     bg="var(--color-accent)"
//                     color="#fff"
//                     type="submit"
//                 />
//             </div>
//         </ExpenseFormStyled>
//     );
// }

// const ExpenseFormStyled = styled.form`
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem; /* Reduced gap between fields for better compactness */

//     .input-control {
//         display: flex;
//         flex-direction: column;
//         gap: 0.5rem; /* Adding spacing between label and input */
//     }

//     input, textarea, select {
//         font-family: inherit;
//         font-size: 1rem;
//         outline: none;
//         border: 2px solid #f1f1f1; /* Soft border color */
//         border-radius: 10px; /* Rounded corners for a softer look */
//         padding: 0.8rem 1.2rem; /* Larger padding for better input space */
//         background: #fff; /* White background for inputs */
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
//         color: #2c3e50; /* Darker color for text */
//         transition: all 0.3s ease-in-out; /* Smooth transition for inputs */

//         &::placeholder {
//             color: #bdc3c7; /* Light grey placeholder text */
//         }

//         &:focus {
//             border-color: var(--color-accent); /* Highlight border on focus */
//             box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1); /* Focus shadow */
//         }
//     }

//     .selects select {
//         font-size: 1rem;
//         padding: 0.8rem 1.2rem;
//         border: 2px solid #f1f1f1;
//         border-radius: 10px;
//         background: #fff;
//         color: #2c3e50;

//         &:focus {
//             border-color: var(--color-accent);
//         }
//     }

//     .submit-btn {
//         display: flex;
//         justify-content: center;
//         margin-top: 1rem; /* Adding margin to push button down a bit */
//     }

//     .error {
//         color: red;
//         font-weight: bold;
//         font-size: 0.9rem;
//         text-align: center;
//         margin-bottom: 1rem; /* Margin to space out from the form fields */
//     }

//     .submit-btn button {
//         font-size: 1rem;
//         padding: 0.8rem 2rem;
//         border-radius: 30px;
//         background-color: var(--color-accent);
//         color: #fff;
//         border: none;
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
//         cursor: pointer;
//         transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

//         &:hover {
//             background-color: var(--color-green);
//             transform: translateY(-2px); /* Slight lift effect on hover */
//         }

//         &:active {
//             transform: translateY(1px); /* Pressed effect */
//         }
//     }
// `;


// export default ExpenseForm;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/transactions";

function ExpenseForm({ refreshExpenses, editItem, clearEdit }) {
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: '',
    });

    const [error, setError] = useState('');

    const { title, amount, date, category, description } = inputState;

    useEffect(() => {
        if (editItem) {
            setInputState({
                title: editItem.title || '',
                amount: editItem.amount || '',
                date: editItem.date ? new Date(editItem.date) : null,
                category: editItem.category || '',
                description: editItem.description || '',
            });
        }
    }, [editItem]);

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !amount || !date || !category) {
            setError('Please fill in all fields.');
            return;
        }

        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount)) {
            setError('Amount must be a valid number.');
            return;
        }

        const expenseData = {
            title,
            amount: parsedAmount,
            date: date.toISOString(),
            category,
            description,
        };

        try {
            if (editItem && editItem._id) {
                // Edit mode: Update the existing expense
                await axios.put(`${BASE_URL}/update-expense/${editItem._id}`, expenseData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                clearEdit(); // Clear the form after updating
            } else {
                // Add mode: Create a new expense
                await axios.post(`${BASE_URL}/add-expense`, expenseData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
            }

            await refreshExpenses();

            setInputState({
                title: '',
                amount: '',
                date: null,
                category: '',
                description: '',
            });

        } catch (err) {
            console.error('Error submitting expense:', err.response || err);
            setError('Error submitting expense');
        }
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    type="number"
                    value={amount}
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setInputState({ ...inputState, date })}
                />
            </div>
            <div className="selects input-control">
                <select value={category} onChange={handleInput('category')} required>
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    value={description}
                    placeholder="Add A Reference"
                    onChange={handleInput('description')}
                    rows="4"
                />
            </div>
          
            
            <div className="submit-btn">
                <Button
                    name={editItem ? 'Update Expense' : 'Add Expense'}
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                    type="submit"
                />
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    input, textarea, select {
        font-family: inherit;
        font-size: 1rem;
        outline: none;
        border: 2px solid #f1f1f1;
        border-radius: 10px;
        padding: 0.8rem 1.2rem;
        background: #fff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
        color: #2c3e50;
        transition: all 0.3s ease-in-out;

        &::placeholder {
            color: #bdc3c7;
        }

        &:focus {
            border-color: var(--color-accent);
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
        }
    }

    .selects select {
        font-size: 1rem;
        padding: 0.8rem 1.2rem;
        border: 2px solid #f1f1f1;
        border-radius: 10px;
        background: #fff;
        color: #2c3e50;

        &:focus {
            border-color: var(--color-accent);
        }
    }

    .submit-btn {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .error {
        color: red;
        font-weight: bold;
        font-size: 0.9rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    .submit-btn button {
        font-size: 1rem;
        padding: 0.8rem 2rem;
        border-radius: 30px;
        background-color: var(--color-accent);
        color: #fff;
        border: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

        &:hover {
            background-color: var(--color-green);
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(1px);
        }
    }
`;

export default ExpenseForm;
