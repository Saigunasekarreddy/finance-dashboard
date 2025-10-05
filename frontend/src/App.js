// import React, {useState, useMemo} from 'react';
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import styled from "styled-components";
// import bg from './img/bg.png'
// import {MainLayout} from './styles/Layouts'
// import Orb from './Components/Orb/Orb'
// import Navigation from './Components/Navigation/Navigation'
// import Dashboard from './Components/Dashboard/Dashboard';
// import Income from './Components/Income/Income'
// import Expenses from './Components/Expenses/Expenses';
// import { useGlobalContext } from './context/globalContext';
// import Signup from './pages/signup';
// import Login from './pages/login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
        
//         <Route path="/Adminlogin" element={<Signup/>} />
//         <Route path="/Userlogin" element={<Login />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// function App() {
//   const [active, setActive] = useState(1)

//   const global = useGlobalContext()
//   console.log(global);

//   const displayData = () => {
//     switch(active){
//       case 1:
//         return <Dashboard/>
//       case 2:
//         return <Dashboard />
     
//       case 3:
//         return <Income />
//       case 4: 
//         return <Expenses />
//       default: 
//         return <Dashboard />
//     }
//   }

//   const orbMemo = useMemo(() => {
//     return <Orb />
//   },[])

//   return (
//     <AppStyled bg={bg} className="App">
//       {orbMemo}
//       <MainLayout>
//         <Navigation active={active} setActive={setActive} />
//         <main>
//           {displayData()}
//         </main>
//       </MainLayout>
//     </AppStyled>
//   );
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   position: relative;
//   main{
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar{
//       width: 0;
//     }
//   }
// `;

// export default App;
// import React, { useState, useMemo } from 'react'
// import styled from 'styled-components'
// import bg from './img/bg.png'
// import { MainLayout } from './styles/Layouts'
// import Orb from './Components/Orb/Orb'
// import Navigation from './Components/Navigation/Navigation'
// import Dashboard from './Components/Dashboard/Dashboard'
// import Income from './Components/Income/Income'
// import Expenses from './Components/Expenses/Expenses'
// import { useGlobalContext } from './context/globalContext'
// import Signup from './Components/Signup/Signup'
// import Signin from './Components/Signin/Signin'

// function App() {
//   const [active, setActive] = useState(1)
//   const global = useGlobalContext()

//   const displayData = () => {
//     switch (active) {
//       case 1:
//         return <Signup />
//       case 2:
//         return <Signin />
//       case 3:
//         return <Dashboard />
//       case 4:
//         return <Income />
//       case 5:
//         return <Expenses />
//       default:
//         return <Signup />
//     }
//   }

//   const orbMemo = useMemo(() => <Orb />, [])

//   return (
//     <AppStyled bg={bg}>
//       {orbMemo}
//       <MainLayout>
//         <Navigation active={active} setActive={setActive} />
//         <main>
//           {displayData()}
//         </main>
//       </MainLayout>
//     </AppStyled>
//   )
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   background-size: cover;
//   background-position: center;
//   position: relative;
//   box-sizing: border-box;

//   main {
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #ffffff;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     padding: 2rem;
//     &::-webkit-scrollbar {
//       width: 0;
//     }
//   }
// `

// export default App

// Import necessary libraries
// import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signup from './pages/Signup'; // Match PascalCase
// import Login from './pages/Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
//import Icons from './utils/Icons';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Chart from './Components/Chart/Chart';
import History from './History/History';
import IncomeItem from './Components/IncomeItem/IncomeItem';
import Calculator from './Components/Calculator/Calculator';
import ReportGenerator from './Components/Report/ReportGenerator';
import StockNews from './Components/Stock/StockNews';
import { GlobalProvider } from './context/globalContext'; 



import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [active, setActive] = useState(1); // Default to show login page
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track if the user is logged in

  // Check if the user has a token (indicating they are logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  // Handle login and redirect to dashboard
  const handleLogin = (loginSuccess) => {
    if (loginSuccess) {
      setIsLoggedIn(true); // Set logged in status
      Navigate('/app'); // Redirect to dashboard
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Login setIsLoggedIn={handleLogin} />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <GlobalProvider> {/* Wrap the app inside the GlobalProvider */}
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          <Route path="/navbar" element={<Navigation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/history" element={<History />} />
          
           {/* <Route path="/transactions" element={<Transactions />} /> */}
          <Route path="/incomes" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/report" element={<ReportGenerator />} />
          <Route path="/stock" element={<StockNews />} />
          <Route path="/incomeItem" element={<IncomeItem />} />
          {/* <Route path="/icons" element={<Icons />} /> */}
          
          {/* Main App Routes (Dashboard UI) */}
          <Route
            path="/app"
            element={isLoggedIn ? (
              <AppStyled bg={bg} className="App">
                {orbMemo}
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                  <main>{displayData()}</main>
                </MainLayout>
              </AppStyled>
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </Router>
    </GlobalProvider> 
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
