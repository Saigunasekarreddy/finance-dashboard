// import React from 'react'
// import {Chart as ChartJs, 
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// } from 'chart.js'

// import {Line} from 'react-chartjs-2'
// import styled from 'styled-components'
// //import { useGlobalContext } from '../../context/globalContext'
// import { dateFormat } from '../../utils/dateFormat'

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// )

// function Chart() {
//     const {incomes, expenses} = useGlobalContext()

//     const data = {
//         labels: incomes.map((inc) =>{
//             const {date} = inc
//             return dateFormat(date)
//         }),
//         datasets: [
//             {
//                 label: 'Income',
//                 data: [
//                     ...incomes.map((income) => {
//                         const {amount} = income
//                         return amount
//                     })
//                 ],
//                 backgroundColor: 'green',
//                 tension: .2
//             },
//             {
//                 label: 'Expenses',
//                 data: [
//                     ...expenses.map((expense) => {
//                         const {amount} = expense
//                         return amount
//                     })
//                 ],
//                 backgroundColor: 'red',
//                 tension: .2
//             }
//         ]
//     }


//     return (
//         <ChartStyled >
//             <Line data={data} />
//         </ChartStyled>
//     )
// }

// const ChartStyled = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// `;

// export default 
import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat'; // Assuming you have a dateFormat function

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart({ incomes, expenses }) {
    console.log("Incomes Data:", incomes);
    console.log("Expenses Data:", expenses);

    // Combine incomes and expenses for unified date sorting
    const combinedData = [
        ...incomes.map(item => ({ type: 'income', date: item.date, amount: item.amount })),
        ...expenses.map(item => ({ type: 'expense', date: item.date, amount: item.amount }))
    ];

    // Sort by date
    combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Extract unique, sorted labels
    const labels = [...new Set(combinedData.map(item => dateFormat(item.date)))];

    // Create income and expense maps
    const incomeMap = new Map();
    const expenseMap = new Map();

    incomes.forEach(item => {
        const formattedDate = dateFormat(item.date);
        incomeMap.set(formattedDate, (incomeMap.get(formattedDate) || 0) + item.amount);
    });

    expenses.forEach(item => {
        const formattedDate = dateFormat(item.date);
        expenseMap.set(formattedDate, (expenseMap.get(formattedDate) || 0) + item.amount);
    });

    // Construct datasets aligned with sorted labels
    const incomeData = labels.map(label => incomeMap.get(label) || 0);
    const expenseData = labels.map(label => expenseMap.get(label) || 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'green',
                tension: 0.2,
                fill: false,
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: 'red',
                tension: 0.2,
                fill: false,
            },
        ],
    };

    return (
        <ChartStyled>
            <h3>Income vs Expenses</h3>
            <Line data={data} />
        </ChartStyled>
    );
}


const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;

    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    canvas {
        max-width: 100%;
        height: auto;
    }
`;

export default Chart;
