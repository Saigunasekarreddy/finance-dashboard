// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { InnerLayout } from '../../styles/Layouts';
// import IncomeItem from '../IncomeItem/IncomeItem';
// import ExpenseForm from './ExpenseForm';
// import Navigation from '../Navigation/Navigation';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api/transactions";

// function Expenses() {
//     const [expenses, setExpenses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [active, setActive] = useState(1); 
//     const navigate = useNavigate();

//     useEffect(() => {
//         getExpenses();
//     }, []);

//     const getExpenses = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/get-expenses`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });

//             // Ensure amount is a number
//             const sanitizedExpenses = res.data.map(item => ({
//                 ...item,
//                 amount: Number(item.amount)
//             }));
//             setExpenses(sanitizedExpenses);
//         } catch (err) {
//             console.error('Error fetching expenses:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const deleteExpense = async (id) => {
//         try {
//             await axios.delete(`${BASE_URL}/delete-expense/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });
//             setExpenses(expenses.filter(exp => exp._id !== id));
//         } catch (err) {
//             console.error('Error deleting expense:', err);
//         }
//     };

//     const totalExpenses = () => {
//         return expenses.reduce((acc, curr) => {
//             const amount = Number(curr.amount);
//             return acc + (isNaN(amount) ? 0 : amount);
//         }, 0);
//     };

//     // Real-time refresh of expenses after adding a new one
//     const refreshExpenses = async () => {
//         await getExpenses(); // Re-fetch updated expenses
//     };

//     return (
//         <ExpenseStyled>
//              <Navigation active={active} setActive={setActive} />
//             <InnerLayout>
//                 <button className="back-button" onClick={() => navigate('/dashboard')}>
//                     Back
//                 </button>
//                 <h1>Expenses</h1>
//                 <h2 className="total-income">
//                     Total Expense: <span>${totalExpenses()}</span>
//                 </h2>
//                 <div className="income-content">
//                     <div className="form-container">
//                         {/* Pass refreshExpenses as a prop to ExpenseForm */}
//                         <ExpenseForm refreshExpenses={refreshExpenses} />
//                     </div>
//                     <div className="incomes">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : expenses.length > 0 ? (
//                             expenses.map(({ _id, title, amount, date, category, description, type }) => (
//                                 <IncomeItem
//                                     key={_id}
//                                     id={_id}
//                                     title={title}
//                                     amount={amount}
//                                     date={date}
//                                     category={category}
//                                     description={description}
//                                     type={type}
//                                     indicatorColor="var(--color-red)"
//                                     deleteItem={deleteExpense}
//                                 />
//                             ))
//                         ) : (
//                             <p>No expense records available</p>
//                         )}
//                     </div>
//                 </div>
//             </InnerLayout>
//         </ExpenseStyled>
//     );
// }

// const ExpenseStyled = styled.div`
//     display: flex;
//     overflow: auto;

//     .total-income {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         background: #FCF6F9;
//         border: 2px solid #FFFFFF;
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//         border-radius: 20px;
//         padding: 1rem;
//         margin: 1rem 0;
//         font-size: 2rem;
//         gap: 0.5rem;

//         span {
//             font-size: 2.5rem;
//             font-weight: 800;
//             color: var(--color-red);
//         }
//     }

//     .income-content {
//         display: flex;
//         gap: 2rem;

//         .incomes {
//             flex: 1;
//             max-height: 400px;
//             overflow-y: auto;
//             padding-right: 1rem;
//         }
//     }

//     .back-button {
//         position: absolute;
//         top: 20px;
//         right: 20px;
//         background-color: var(--color-accent);
//         color: #fff;
//         border: none;
//         padding: 10px 20px;
//         font-size: 1rem;
//         border-radius: 30px;
//         cursor: pointer;
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//         &:hover {
//             background-color: var(--color-green);
//         }
//     }
//         .navContainer: {
//     width: '250px',
//     backgroundColor: '#2c3e50',
//     padding: '20px',
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     height: '100vh',
//   },
// `;
// export default Expenses;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/transactions";

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1); 
    const [editItem, setEditItem] = useState(null); // <-- For editing
    const navigate = useNavigate();

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/get-expenses`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            const sanitizedExpenses = res.data.map(item => ({
                ...item,
                amount: Number(item.amount)
            }));
            setExpenses(sanitizedExpenses);
        } catch (err) {
            console.error('Error fetching expenses:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-expense/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setExpenses(expenses.filter(exp => exp._id !== id));
        } catch (err) {
            console.error('Error deleting expense:', err);
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
    };

    const totalExpenses = () => {
        return expenses.reduce((acc, curr) => {
            const amount = Number(curr.amount);
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0);
    };

    const refreshExpenses = async () => {
        await getExpenses();
    };

    return (
        <ExpenseStyled>
            <Navigation active={active} setActive={setActive} />
            <InnerLayout>
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    Back
                </button>
                <h1>Expenses</h1>
                <h2 className="total-income">
                    Total Expense: <span>${totalExpenses()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm 
                            refreshExpenses={refreshExpenses} 
                            editItem={editItem} 
                            clearEdit={() => setEditItem(null)} 
                        />
                    </div>
                    <div className="incomes">
                        {loading ? (
                            <p>Loading...</p>
                        ) : expenses.length > 0 ? (
                            expenses.map(({ _id, title, amount, date, category, description, type }) => (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    amount={amount}
                                    date={date}
                                    category={category}
                                    description={description}
                                    type={type}
                                    indicatorColor="var(--color-red)"
                                    deleteItem={deleteExpense}
                                    onEdit={handleEdit}  // <-- Pass the handleEdit function here
                                />
                            ))
                        ) : (
                            <p>No expense records available</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red);
        }
    }

    .income-content {
        display: flex;
        gap: 2rem;

        .incomes {
            flex: 1;
            max-height: 400px;
            overflow-y: auto;
            padding-right: 1rem;
        }
    }

    .back-button {
        position: absolute;
        top: 20px;
        right: 20px;
        background-color: var(--color-accent);
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
            background-color: var(--color-green);
        }
    }
`;

export default Expenses;
