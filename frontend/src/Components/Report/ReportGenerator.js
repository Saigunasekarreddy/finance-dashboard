// import React from 'react';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const ReportGenerator = ({ incomes = [], expenses = [] }) => {
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text('Income and Expense Report', 14, 22);
//     doc.setFontSize(12);
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

//     // Income Table
//     autoTable(doc, {
//       startY: 40,
//       head: [['Date', 'Title', 'Amount', 'Category']],
//       body: incomes.map((item) => [
//         new Date(item.date).toLocaleDateString(),
//         item.title,
//         `₹${item.amount}`,
//         item.category,
//       ]),
//       theme: 'striped',
//       headStyles: { fillColor: [46, 204, 113] },
//       margin: { top: 10 },
//     });

//     // Expense Table
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [['Date', 'Title', 'Amount', 'Category']],
//       body: expenses.map((item) => [
//         new Date(item.date).toLocaleDateString(),
//         item.title,
//         `₹${item.amount}`,
//         item.category,
//       ]),
//       theme: 'striped',
//       headStyles: { fillColor: [231, 76, 60] },
//       margin: { top: 10 },
//     });

//     // Save PDF
//     doc.save('Income-Expense-Report.pdf');
//   };

//   return (
//     <div style={{ textAlign: 'center', margin: '20px' }}>
//       <button
//         onClick={generatePDF}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: '#2c3e50',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           fontSize: '16px',
//           cursor: 'pointer',
//         }}
//       >
//         📄 Download PDF Report
//       </button>
//     </div>
//   );
// };

// export default ReportGenerator;
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';

const BASE_URL = 'http://localhost:5000/api/transactions'; // Adjust your base URL here

const ReportGenerator = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [active, setActive] = useState(1);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const incomeRes = await axios.get(`${BASE_URL}/get-incomes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const expenseRes = await axios.get(`${BASE_URL}/get-expenses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Income and Expense Report', 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Income Table
    autoTable(doc, {
      startY: 40,
      head: [['Date', 'Title', 'Amount', 'Category']],
      body: incomes.map((item) => [
        new Date(item.date).toLocaleDateString(),
        item.title,
        `₹${parseFloat(item.amount).toFixed(2)}`, // Fix the amount formatting
        item.category,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [46, 204, 113] },
      margin: { top: 10 },
    });

    // Expense Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Date', 'Title', 'Amount', 'Category']],
      body: expenses.map((item) => [
        new Date(item.date).toLocaleDateString(),
        item.title,
        `₹${parseFloat(item.amount).toFixed(2)}`, // Fix the amount formatting
        item.category,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [231, 76, 60] },
      margin: { top: 10 },
    });

    // Save PDF
    doc.save('Income-Expense-Report.pdf');
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.navContainer}>
        <Navigation active={active} setActive={setActive} />
      </div>
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>Income and Expense Report</h1>
        <button onClick={generatePDF} style={styles.downloadButton}>
          📄 Download PDF Report
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  navContainer: {
    width: '250px',
    backgroundColor: '#2c3e50',
    padding: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  downloadButton: {
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
};

export default ReportGenerator;
