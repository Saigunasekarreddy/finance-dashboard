// import React, { useEffect } from 'react'
// import styled from 'styled-components'
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import Form from '../Form/Form';
// import IncomeItem from '../IncomeItem/IncomeItem';

// function Income() {
//     const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

//     useEffect(() =>{
//         getIncomes()
//     }, [])
//     return (
//         <IncomeStyled>
//             <InnerLayout>
//                 <h1>Incomes</h1>
//                 <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
//                 <div className="income-content">
//                     <div className="form-container">
//                         <Form />
//                     </div>
//                     <div className="incomes">
//                         {incomes.map((income) => {
//                             const {_id, title, amount, date, category, description, type} = income;
//                             return <IncomeItem
//                                 key={_id}
//                                 id={_id} 
//                                 title={title} 
//                                 description={description} 
//                                 amount={amount} 
//                                 date={date} 
//                                 type={type}
//                                 category={category} 
//                                 indicatorColor="var(--color-green)"
//                                 deleteItem={deleteIncome}
//                             />
//                         })}
//                     </div>
//                 </div>
//             </InnerLayout>
//         </IncomeStyled>
//     )
// }

// const IncomeStyled = styled.div`
//     display: flex;
//     overflow: auto;
//     .total-income{
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
//         gap: .5rem;
//         span{
//             font-size: 2.5rem;
//             font-weight: 800;
//             color: var(--color-green);
//         }
//     }
//     .income-content{
//         display: flex;
//         gap: 2rem;
//         .incomes{
//             flex: 1;
//         }
//     }
// `;

// export default Income


// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { InnerLayout } from '../../styles/Layouts';
// import Navigation from '../Navigation/Navigation';
// import Form from '../Form/Form';
// import IncomeItem from '../IncomeItem/IncomeItem';
// import { useNavigate } from 'react-router-dom';

// const BASE_URL = "http://localhost:5000/api/transactions";

// function Income() {
//   const [incomes, setIncomes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [active, setActive] = useState(1);
//   const [editIncome, setEditIncome] = useState(null); // State to store the income being edited
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchIncomes();
//   }, []);

//   const fetchIncomes = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/get-incomes`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setIncomes(response.data);
//     } catch (err) {
//       console.error('Error fetching incomes:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addIncome = async (incomeData) => {
//     try {
//       await axios.post(`${BASE_URL}/add-income`, incomeData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       fetchIncomes();
//     } catch (err) {
//       console.error('Error adding income:', err);
//     }
//   };

//   const updateIncome = async (id, incomeData) => {
//     try {
//       await axios.put(`${BASE_URL}/update-income/${id}`, incomeData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       fetchIncomes();
//       setEditIncome(null); // Reset editing state after successful update
//     } catch (err) {
//       console.error('Error updating income:', err);
//     }
//   };

//   const deleteIncome = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete-income/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setIncomes(incomes.filter(income => income._id !== id));
//     } catch (err) {
//       console.error('Error deleting income:', err);
//     }
//   };

//   const totalIncome = () => {
//     return incomes.reduce((acc, curr) => acc + curr.amount, 0);
//   };

//   return (
//     <PageWrapper>
//       <nav className="nav-container">
//         <Navigation active={active} setActive={setActive} />
//       </nav>
//       <ContentWrapper>
//         <InnerLayout>
//           <div className="header">
//             <h1>Incomes</h1>
//             <button className="back-btn" onClick={() => navigate('/dashboard')}>
//               Back
//             </button>
//           </div>
//           <h2 className="total-income">
//             Total Income: <span>${totalIncome()}</span>
//           </h2>
//           <div className="income-content">
//             <div className="form-container">
//               <Form
//                 onSuccess={fetchIncomes}
//                 incomeId={editIncome ? editIncome._id : null}
//                 incomeData={editIncome || {}}
//               />
//             </div>
//             <div className="incomes">
//               {loading ? (
//                 <p>Loading...</p>
//               ) : incomes.length > 0 ? (
//                 incomes.map((income) => (
//                   <IncomeItem
//                     key={income._id}
//                     id={income._id}
//                     title={income.title}
//                     description={income.description}
//                     amount={income.amount}
//                     date={income.date}
//                     category={income.category}
//                     indicatorColor="var(--color-green)"
//                     deleteItem={deleteIncome}
//                     setEditIncome={setEditIncome} // Pass down the function to set the income to edit
//                   />
//                 ))
//               ) : (
//                 <p>No income records available</p>
//               )}
//             </div>
//           </div>
//         </InnerLayout>
//       </ContentWrapper>
//     </PageWrapper>
//   );
// }

// // Layout styles
// const PageWrapper = styled.div`
//   display: flex;
//   height: 100vh;
//   overflow: hidden;

//   .nav-container {
//     width: 250px;
//     background-color: #fff;
//     border-right: 1px solid #e0e0e0;
//     height: 100vh;
//     overflow-y: auto;
//   }
// `;

// const ContentWrapper = styled.div`
//   flex: 1;
//   height: 100vh;
//   overflow-y: auto;
//   padding: 2rem;
//   box-sizing: border-box;

//   .header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 1rem;
//   }

//   .back-btn {
//     background-color: #ff6347;
//     color: white;
//     border: none;
//     padding: 0.5rem 1rem;
//     font-size: 1rem;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;

//     &:hover {
//       background-color: #ff4500;
//     }
//   }

//   .total-income {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: #fcf6f9;
//     border: 2px solid #ffffff;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     border-radius: 20px;
//     padding: 1rem;
//     margin: 1rem 0;
//     font-size: 2rem;
//     gap: 0.5rem;

//     span {
//       font-size: 2.5rem;
//       font-weight: 800;
//       color: var(--color-green);
//     }
//   }

//   .income-content {
//     display: flex;
//     gap: 2rem;
//     flex: 1;
//     height: 100%;

//     .form-container {
//       flex: 0.6;
//     }

//     .incomes {
//       flex: 1;
//       overflow-y: auto;
//       max-height: calc(100vh - 320px); /* Adjust based on header & total-income */
//       padding-right: 0.5rem;
//     }
//   }
// `;

// export default Income;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { InnerLayout } from '../../styles/Layouts';
import Navigation from '../Navigation/Navigation';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:5000/api/transactions";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(1);
  const [editIncome, setEditIncome] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-incomes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIncomes(response.data);
    } catch (err) {
      console.error('Error fetching incomes:', err);
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async (incomeData) => {
    await axios.post(`${BASE_URL}/add-income`, incomeData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchIncomes();
  };

  const updateIncome = async (id, incomeData) => {
    await axios.put(`${BASE_URL}/update-income/${id}`, incomeData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchIncomes();
    setEditIncome(null); // Clear form after updating
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}/delete-income/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setIncomes(incomes.filter(income => income._id !== id));
  };

  const totalIncome = () => {
    return incomes.reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <PageWrapper>
      <nav className="nav-container">
        <Navigation active={active} setActive={setActive} />
      </nav>
      <ContentWrapper>
        <InnerLayout>
          <div className="header">
            <h1>Incomes</h1>
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              Back
            </button>
          </div>
          <h2 className="total-income">
            Total Income: <span>${totalIncome()}</span>
          </h2>
          <div className="income-content">
            <div className="form-container">
              <Form
                onSuccess={fetchIncomes}
                incomeData={editIncome}
                addIncome={addIncome}
                updateIncome={updateIncome}
                clearEdit={() => setEditIncome(null)}
              />
            </div>
            <div className="incomes">
              {loading ? (
                <p>Loading...</p>
              ) : incomes.length > 0 ? (
                incomes.map((income) => (
                  <IncomeItem
                    key={income._id}
                    id={income._id}
                    title={income.title}
                    description={income.description}
                    amount={income.amount}
                    date={income.date}
                    category={income.category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteIncome}
                    onEdit={() => setEditIncome(income)} // Pass edit handler here ✅
                  />
                ))
              ) : (
                <p>No income records available</p>
              )}
            </div>
          </div>
        </InnerLayout>
      </ContentWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;

  .nav-container {
    width: 250px;
    background-color: #fff;
    border-right: 1px solid #e0e0e0;
    height: 100vh;
    overflow-y: auto;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .back-btn {
    background-color: #ff6347;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #ff4500;
    }
  }

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;
    height: 100%;

    .form-container {
      flex: 0.6;
    }

    .incomes {
      flex: 1;
      overflow-y: auto;
      max-height: calc(100vh - 320px);
      padding-right: 0.5rem;
    }
  }
`;

export default Income;
