import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { IoHome } from "react-icons/io5";
import { PiPlantBold } from "react-icons/pi";
import { FaPenToSquare, FaOpencart } from "react-icons/fa6";
import { CiGrid42 } from "react-icons/ci";

// Example user context or mock user
// Replace with your actual AuthContext when ready
// import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // const { user, logOut } = useContext(AuthContext);
  const user = null; // mock (change later)

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="flex items-center gap-3">
        <img
          src="/src/assets/logo.jpg"
          alt="Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold">
          Krishi<span className="text-green-700">Link</span>
        </h1>
      </div>
      <ul className="flex gap-6 text-lg font-medium items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-700 font-bold" : "hover:text-green-700"
            }
          >
            <IoHome className="inline mr-1" /> Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/all-crops"
            className={({ isActive }) =>
              isActive ? "text-green-700 font-bold" : "hover:text-green-700"
            }
          >
            <PiPlantBold className="inline mr-1" /> All Crops
          </NavLink>
        </li>

        {!user ? (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-green-700 font-bold" : "hover:text-green-700"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-green-700 font-bold" : "hover:text-green-700"
                }
              >
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-green-700 font-bold" : "hover:text-green-700"
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-crop"
                className={({ isActive }) =>
                  isActive ? "text-green-700 font-bold" : "hover:text-green-700"
                }
              >
                <FaPenToSquare className="inline mr-1" /> Add Crops
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-posts"
                className={({ isActive }) =>
                  isActive ? "text-green-700 font-bold" : "hover:text-green-700"
                }
              >
                <FaOpencart className="inline mr-1" /> My Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-interests"
                className={({ isActive }) =>
                  isActive ? "text-green-700 font-bold" : "hover:text-green-700"
                }
              >
                <CiGrid42 className="inline mr-1" /> My Interests
              </NavLink>
            </li>
          </>
        )}
      </ul>


      {/* Right: User / Logout */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <img
              src={user?.photoURL || "/src/assets/user.png"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <button
              onClick={() => alert("Log out function here")}
              className="btn btn-sm bg-green-700 text-white hover:bg-green-800"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-lg bg-green-700 text-white hover:bg-green-800"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;














// import React from 'react';
// import { CiGrid42 } from 'react-icons/ci';
// import { FaOpencart, FaPenToSquare } from 'react-icons/fa6';
// import { IoHome } from 'react-icons/io5';
// import { PiPlantBold } from 'react-icons/pi';
// import { Link, NavLink } from 'react-router';


// const Navbar = () => {


//  const links = (
//     <>
//       <li>
//         <NavLink to={"/"}>
//           <IoHome />
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to={"/"}>
//           <PiPlantBold />
//           All Crops
//         </NavLink>
//       </li>
//       {/* {user && (
//         <>
//           <li>
//             <NavLink to={"/"}>
//               {" "}
//               <FaPenToSquare />
//               Add Crops
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to={"/"}>
//               <FaOpencart />
//               My Posts
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to={"/"}>
//               <CiGrid42 />
//               My interests
//             </NavLink>
//           </li>
//         </>
//       )} */}
//     </>
//   );







//     return (
//         <div className="flex justify-between items-center ">
//       <div className="">{user && user.email}</div>
//      <div className="h-[70px] flex items-center gap-3 font-bold">
//   <img
//     src="/src/assets/logo.jpg"
//     alt="Logo"
//     className="h-full w-auto object-contain"
//   />
//   <p>Green <span className="text-emerald-800">Nest</span></p>
// </div>

//       <div className="nav flex gap-5 text-accent">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/allplants">Plants</NavLink>
//         <NavLink to="/profile">My profile</NavLink>
//       </div>
//       <div className="login-btn flex gap-5">
//         <img
//           className="w-12 rounded-full"
//           src="../src/assets/user.png"
//           alt=""
//         />
//         {/* {user ? (
//           <button onClick={handleLogOut} className="btn btn-primary px-10 ">
//             LogOut
//           </button>
//         ) : (
//           <Link to="/auth/login" className="btn btn-primary px-10 ">
//             Login
//           </Link>
//         )} */}

//         <Link to="/auth/login" className="btn btn-primary px-10 ">
//             Login
//           </Link>
        
        
//       </div>
//     </div>
//     );
// }

// export default Navbar;
