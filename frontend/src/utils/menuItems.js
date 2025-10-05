
import { dashboard, expenses, transactions, trend } from '../utils/Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard',
    },
    {
        id: 2,
        title: "Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/incomes",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Calculator",
        icon: <i className="fa-solid fa-calculator"></i>, // use className in React
        link: "/calculator",
    },
    {
        id: 6,
        title: "Report",
        icon: <i class="fa fa-file" aria-hidden="true"></i>, // use className in React
        link: "/report",
      },
      {
        id: 7,
        title: "Stock news",
        icon: <i class="fas fa-newspaper"></i>, // use className in React
        link: "/stock",
      }

      
];
