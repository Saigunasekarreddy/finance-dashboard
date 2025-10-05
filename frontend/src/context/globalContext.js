// import React, { useContext, useState } from "react"
// import axios from 'axios'


// const BASE_URL = "http://localhost:5000/api/";


// const GlobalContext = React.createContext()

// export const GlobalProvider = ({children}) => {

//     const [incomes, setIncomes] = useState([])
//     const [expenses, setExpenses] = useState([])
//     const [error, setError] = useState(null)

//     //calculate incomes
//     const addIncome = async (income) => {
//         const response = await axios.post(`${BASE_URL}add-income`, income)
//             .catch((err) =>{
//                 setError(err.response.data.message)
//             })
//         getIncomes()
//     }

//     const getIncomes = async () => {
//         const response = await axios.get(`${BASE_URL}get-incomes`)
//         setIncomes(response.data)
//         console.log(response.data)
//     }

//     const deleteIncome = async (id) => {
//         const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
//         getIncomes()
//     }

//     const totalIncome = () => {
//         let totalIncome = 0;
//         incomes.forEach((income) =>{
//             totalIncome = totalIncome + income.amount
//         })

//         return totalIncome;
//     }


//     //calculate incomes
//     const addExpense = async (income) => {
//         const response = await axios.post(`${BASE_URL}add-expense`, income)
//             .catch((err) =>{
//                 setError(err.response.data.message)
//             })
//         getExpenses()
//     }

//     const getExpenses = async () => {
//         const response = await axios.get(`${BASE_URL}get-expenses`)
//         setExpenses(response.data)
//         console.log(response.data)
//     }

//     const deleteExpense = async (id) => {
//         const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
//         getExpenses()
//     }

//     const totalExpenses = () => {
//         let totalIncome = 0;
//         expenses.forEach((income) =>{
//             totalIncome = totalIncome + income.amount
//         })

//         return totalIncome;
//     }


//     const totalBalance = () => {
//         return totalIncome() - totalExpenses()
//     }

//     const transactionHistory = () => {
//         const history = [...incomes, ...expenses]
//         history.sort((a, b) => {
//             return new Date(b.createdAt) - new Date(a.createdAt)
//         })

//         return history.slice(0, 3)
//     }


//     return (
//         <GlobalContext.Provider value={{
//             addIncome,
//             getIncomes,
//             incomes,
//             deleteIncome,
//             expenses,
//             totalIncome,
//             addExpense,
//             getExpenses,
//             deleteExpense,
//             totalExpenses,
//             totalBalance,
//             transactionHistory,
//             error,
//             setError
//         }}>
//             {children}
//         </GlobalContext.Provider>
//     )
// }

// export const useGlobalContext = () =>{
//     return useContext(GlobalContext)
// }

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/transactions";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // Add Income
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getIncomes(); // Refresh income list
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Get Incomes
  const getIncomes = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}get-incomes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getIncomes(); // Refresh income list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  };

  // Calculate Total Income
  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // Add Expense
  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getExpenses(); // Refresh expense list
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Get Expenses
  const getExpenses = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}get-expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getExpenses(); // Refresh expense list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  // Calculate Total Expenses
  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Calculate Total Balance (Income - Expenses)
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Get Transaction History (Recent 3 transactions)
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  // Login User
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setIsLoggedIn(true);
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Signup User
  const signupUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/signup`, { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setIsLoggedIn(true);
      alert("Signup successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  // Logout User
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        loginUser,
        signupUser,
        logoutUser,
        isLoggedIn,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
