// import React, { useEffect } from 'react'
// import styled from 'styled-components'
// import { useGlobalContext } from '../../context/globalContext';
// import History from '../../History/History';
// import { InnerLayout } from '../../styles/Layouts';
// import { dollar } from '../../utils/Icons';
// import Chart from '../Chart/Chart';

// function Dashboard() {
//     const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

//     useEffect(() => {
//         // Fetch incomes and expenses when Dashboard mounts
//         const fetchData = async () => {
//             await getIncomes();
//             await getExpenses();
//         };
//         fetchData();
//     }, [getIncomes, getExpenses]);

//     // Safe calculation for min/max if incomes/expenses are not empty
//     const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
//     const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
//     const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
//     const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

//     return (
//         <DashboardStyled>
//             <InnerLayout>
//                 <h1>All Transactions</h1>
//                 <div className="stats-con">
//                     <div className="chart-con">
//                         <Chart />
//                         <div className="amount-con">
//                             <div className="income">
//                                 <h2>Total Income</h2>
//                                 <p>
//                                     {dollar} {totalIncome()}
//                                 </p>
//                             </div>
//                             <div className="expense">
//                                 <h2>Total Expense</h2>
//                                 <p>
//                                     {dollar} {totalExpenses()}
//                                 </p>
//                             </div>
//                             <div className="balance">
//                                 <h2>Total Balance</h2>
//                                 <p>
//                                     {dollar} {totalBalance()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="history-con">
//                         <History />
//                         <h2 className="salary-title">Min <span>Salary</span>Max</h2>
//                         <div className="salary-item">
//                             <p>
//                                 ${minIncome}
//                             </p>
//                             <p>
//                                 ${maxIncome}
//                             </p>
//                         </div>
//                         <h2 className="salary-title">Min <span>Expense</span>Max</h2>
//                         <div className="salary-item">
//                             <p>
//                                 ${minExpense}
//                             </p>
//                             <p>
//                                 ${maxExpense}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </InnerLayout>
//         </DashboardStyled>
//     )
// }

// const DashboardStyled = styled.div`
//     .stats-con{
//         display: grid;
//         grid-template-columns: repeat(5, 1fr);
//         gap: 2rem;
//         .chart-con{
//             grid-column: 1 / 4;
//             height: 400px;
//             .amount-con{
//                 display: grid;
//                 grid-template-columns: repeat(4, 1fr);
//                 gap: 2rem;
//                 margin-top: 2rem;
//                 .income, .expense{
//                     grid-column: span 2;
//                 }
//                 .income, .expense, .balance{
//                     background: #FCF6F9;
//                     border: 2px solid #FFFFFF;
//                     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//                     border-radius: 20px;
//                     padding: 1rem;
//                     p{
//                         font-size: 3.5rem;
//                         font-weight: 700;
//                     }
//                 }

//                 .balance{
//                     grid-column: 2 / 4;
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: center;
//                     align-items: center;
//                     p{
//                         color: var(--color-green);
//                         opacity: 0.6;
//                         font-size: 4.5rem;
//                     }
//                 }
//             }
//         }

//         .history-con{
//             grid-column: 4 / -1;
//             h2{
//                 margin: 1rem 0;
//                 display: flex;
//                 align-items: center;
//                 justify-content: space-between;
//             }
//             .salary-title{
//                 font-size: 1.2rem;
//                 span{
//                     font-size: 1.8rem;
//                 }
//             }
//             .salary-item{
//                 background: #FCF6F9;
//                 border: 2px solid #FFFFFF;
//                 box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//                 padding: 1rem;
//                 border-radius: 20px;
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 p{
//                     font-weight: 600;
//                     font-size: 1.6rem;
//                 }
//             }
//         }
//     }
// `;

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import History from '../../History/History';
import Chart from '../Chart/Chart';
import Navigation from '../Navigation/Navigation'; // Import navigation here

const BASE_URL = "http://localhost:5000/api/transactions";

function Dashboard() {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [active, setActive] = useState(1); // for navigation highlighting

    useEffect(() => {
        const fetchData = async () => {
            try {
                const incomeRes = await axios.get(`${BASE_URL}/get-incomes`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const expenseRes = await axios.get(`${BASE_URL}/get-expenses`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setIncomes(incomeRes.data);
                setExpenses(expenseRes.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalIncome = () => incomes.reduce((acc, item) => acc + item.amount, 0);
    const totalExpenses = () => expenses.reduce((acc, item) => acc + item.amount, 0);
    const totalBalance = () => totalIncome() - totalExpenses();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <DashboardLayout>
            <Navigation active={active} setActive={setActive} />
            <div className="dashboard-content">
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart incomes={incomes} expenses={expenses} />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>${totalIncome()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>${totalExpenses()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>${totalBalance()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History incomes={incomes} expenses={expenses} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

const DashboardLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .dashboard-content {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
    }

    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        padding-bottom: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 400px;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;

                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .income, .expense {
                    grid-column: span 2;
                }

                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;
        }
    }
`;

export default Dashboard;
