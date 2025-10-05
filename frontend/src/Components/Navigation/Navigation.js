// import React, { useState } from 'react'
// import styled from 'styled-components'
// import avatar from '../../img/avatar.png'
// import { signout } from '../../utils/Icons'
// import { menuItems } from '../../utils/menuItems'

// function Navigation({active, setActive}) {
    
//     return (
//         <NavStyled>
//             <div className="user-con">
//                 <img src={avatar} alt="" />
//                 <div className="text">
//                     <h2>Abhi</h2>
//                     <p>Your Money</p>
//                 </div>
//             </div>
//             <ul className="menu-items">
//                 {menuItems.map((item) => {
//                     return <li
//                         key={item.id}
//                         onClick={() => setActive(item.id)}
//                         className={active === item.id ? 'active': ''}
//                     >
//                         {item.icon}
//                         <span>{item.title}</span>
//                     </li>
//                 })}
//             </ul>
//             <div className="bottom-nav">
//                 <li>
//                     {signout} Sign Out
//                 </li>
//             </div>
//         </NavStyled>
//     )
// }

// const NavStyled = styled.nav`
//     padding: 2rem 1.5rem;
//     width: 374px;
//     height: 100%;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     gap: 2rem;
//     .user-con{
//         height: 100px;
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         img{
//             width: 80px;
//             height: 80px;
//             border-radius: 50%;
//             object-fit: cover;
//             background: #fcf6f9;
//             border: 2px solid #FFFFFF;
//             padding: .2rem;
//             box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
//         }
//         h2{
//             color: rgba(34, 34, 96, 1);
//         }
//         p{
//             color: rgba(34, 34, 96, .6);
//         }
//     }

//     .menu-items{
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         li{
//             display: grid;
//             grid-template-columns: 40px auto;
//             align-items: center;
//             margin: .6rem 0;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all .4s ease-in-out;
//             color: rgba(34, 34, 96, .6);
//             padding-left: 1rem;
//             position: relative;
//             i{
//                 color: rgba(34, 34, 96, 0.6);
//                 font-size: 1.4rem;
//                 transition: all .4s ease-in-out;
//             }
//         }
//     }

//     .active{
//         color: rgba(34, 34, 96, 1) !important;
//         i{
//             color: rgba(34, 34, 96, 1) !important;
//         }
//         &::before{
//             content: "";
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 4px;
//             height: 100%;
//             background: #222260;
//             border-radius: 0 10px 10px 0;
//         }
//     }
// `;

// export default Navigation
import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { menuItems } from '../../utils/menuItems';
import { useNavigate } from 'react-router-dom';

function Navigation({ active, setActive }) {
    const navigate = useNavigate();

    // Get userName and userRole from localStorage
    const userName = localStorage.getItem('userName') || 'John Doe'; // Default to 'John Doe' if not set
    const userRole = localStorage.getItem('userRole') || 'User'; // Default to 'User'

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName'); // Clear userName on logout
        localStorage.removeItem('userRole'); // Clear userRole on logout
        navigate('/login');
    };

    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="User Avatar" />
                <div className="text">
                    <h2>{userName}</h2>
                    <p>{userRole}</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            navigate(item.link);
                        }}
                        className={active === item.id ? 'active' : ''}
                    >
                        <div className="icon">{item.icon}</div>
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="bottom-nav">
                <ul>
                    <li onClick={handleLogout}>
                        <span>Sign Out</span>
                    </li>
                </ul>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 300px;
    height: 100%;
    background: rgba(252, 246, 249, 0.9);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(6px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .user-con {
        height: 120px;
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s ease-in-out;
            
            &:hover {
                transform: scale(1.1);
            }
        }

        h2 {
            color: rgba(34, 34, 96, 1);
            font-size: 1.2rem;
            font-weight: 600;
        }

        p {
            color: rgba(34, 34, 96, .6);
            font-size: 0.9rem;
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;

        li {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .3s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            padding: 10px 0;
            
            .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }

            span {
                font-size: 1rem;
            }

            &:hover {
                color: rgba(34, 34, 96, 1);
                background: rgba(34, 34, 96, 0.1);
                border-radius: 5px;
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
        ul {
            li {
                display: flex;
                align-items: center;
                font-weight: 500;
                cursor: pointer;
                color: rgba(34, 34, 96, 0.6);
                transition: all .3s ease-in-out;
                padding-left: 1rem;

                &:hover {
                    color: rgba(34, 34, 96, 1);
                    background: rgba(34, 34, 96, 0.1);
                    border-radius: 5px;
                }
            }
        }
    }
`;

export default Navigation;

// import React from 'react';
// import styled from 'styled-components';
// import avatar from '../../img/avatar.png'; // Adjust the path to your avatar image
// import { menuItems } from '../../utils/menuItems'; // Ensure this path is correct
// import { useNavigate } from 'react-router-dom';

// function Navigation({ active, setActive }) {
//     const navigate = useNavigate();

//     // Get user information from localStorage
//     const userName = localStorage.getItem('userName') || 'John Doe';
//     const userRole = localStorage.getItem('userRole') || 'User'; // Default to 'User' if no role is provided

//     const handleLogout = () => {
//         // Remove token and user details from localStorage
//         localStorage.removeItem('token');
//         localStorage.removeItem('userName');
//         localStorage.removeItem('userRole');
//         navigate('/login'); // Redirect to login page
//     };

//     return (
//         <NavStyled>
//             <div className="user-con">
//                 <img src={avatar} alt="User Avatar" />
//                 <div className="text">
//                     <h2>{userName}</h2>
//                     <p>{userRole}</p>
//                 </div>
//             </div>
//             <ul className="menu-items">
//                 {menuItems.map((item) => (
//                     <li
//                         key={item.id}
//                         onClick={() => {
//                             setActive(item.id);
//                             navigate(item.link);
//                         }}
//                         className={active === item.id ? 'active' : ''}
//                     >
//                         <div className="icon">{item.icon}</div>
//                         <span>{item.title}</span>
//                     </li>
//                 ))}
//             </ul>
//             <div className="bottom-nav">
//                 <ul>
//                     <li onClick={handleLogout}>
//                         <span>Sign Out</span>
//                     </li>
//                 </ul>
//             </div>
//         </NavStyled>
//     );
// }

// const NavStyled = styled.nav`
//     padding: 2rem 1.5rem;
//     width: 300px;
//     height: 100%;
//     background: rgba(252, 246, 249, 0.9);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(6px);
//     border-radius: 32px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     gap: 2rem;

//     .user-con {
//         height: 120px;
//         display: flex;
//         align-items: center;
//         gap: 1rem;

//         img {
//             width: 60px;
//             height: 60px;
//             border-radius: 50%;
//             object-fit: cover;
//             background: #fcf6f9;
//             border: 2px solid #FFFFFF;
//             padding: .2rem;
//             box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
//         }

//         h2 {
//             color: rgba(34, 34, 96, 1);
//             font-size: 1.2rem;
//         }

//         p {
//             color: rgba(34, 34, 96, .6);
//         }
//     }

//     .menu-items {
//         flex: 1;
//         display: flex;
//         flex-direction: column;

//         li {
//             display: flex;
//             align-items: center;
//             gap: 0.8rem;
//             margin: .6rem 0;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all .4s ease-in-out;
//             color: rgba(34, 34, 96, .6);
//             padding-left: 1rem;
//             position: relative;

//             .icon {
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 font-size: 1.2rem;
//             }

//             span {
//                 font-size: 1rem;
//             }

//             &:hover {
//                 color: rgba(34, 34, 96, 1);
//             }
//         }
//     }

//     .active {
//         color: rgba(34, 34, 96, 1) !important;

//         &::before {
//             content: "";
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 4px;
//             height: 100%;
//             background: #222260;
//             border-radius: 0 10px 10px 0;
//         }
//     }

//     .bottom-nav {
//         ul {
//             li {
//                 display: flex;
//                 align-items: center;
//                 font-weight: 500;
//                 cursor: pointer;
//                 color: rgba(34, 34, 96, 0.6);
//                 transition: all .3s ease-in-out;
//                 padding-left: 1rem;

//                 &:hover {
//                     color: rgba(34, 34, 96, 1);
//                 }
//             }
//         }
//     }
// `;

// export default Navigation;

