import React, { use, useContext } from "react";
import { Link, NavLink } from "react-router";
import { CiGrid42 } from "react-icons/ci";
import { AuthContext } from "../../provider/AuthProvider";



const Navbar = () => {
   const { user, logOut } = use(AuthContext);


  const handleLogOut = () => {
    console.log("user trying to LogOut");
    logOut()
      .then(() => {
        alert("You Logged Out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="">{user && user.email}</div>
     
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
      <ul className="flex gap-4 text-lg font-medium items-center border-gray-400">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-700 font-bold" : "hover:text-green-700"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
      
          <NavLink
            to="/all-crops"
            className={({ isActive }) =>
              isActive ? "text-green-700 font-bold" : "hover:text-green-700"
            }
          >
           All Crops
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
                to="/auth/register"
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
                Add Crops
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-posts"
                className={({ isActive }) =>
                  isActive ? "text-green-700 font-bold" : "hover:text-green-700"
                }
              >
               My Posts
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

           <button onClick={handleLogOut} className="btn  bg-green-700 px-10 ">
            LogOut
          </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-lg bg-green-700 text-white hover:bg-green-800"
          >
            Login
          </Link>
        )
        }
      </div>
    </nav>
  );
};

export default Navbar;













