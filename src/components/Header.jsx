import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navItems } from "../constants";
import Logo from "../assets/icons/privyr_logo.svg";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../config";
import { setUser } from "../redux/reducers/userReducer";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const [profileUser, setProfileUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        console.log(response.data.user);
        setProfileUser(response.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      fetchUser(user._id);
    }
  }, [user]);

  console.log(profileUser);

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side (logo and nav items) */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src={Logo} alt="" />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-semibold inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? "border-teal-500 text-teal-800"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`
                    }
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right side (profile and mobile menu) */}
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 relative" ref={profileMenuRef}>
                <button
                  className="bg-gray-800 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={toggleProfileMenu}
                >
                  <span className="sr-only">View profile</span>
                  {profileUser?.avatar ? (
                    <img
                      src={`http://localhost:4000${profileUser.avatar}`}
                      alt="Profile"
                      className="w-6 h-6 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 text-xl font-bold text-white flex justify-center items-center">
                      {profileUser?.name[0].toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Profile Flyout Menu */}
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <div className="h-14 flex items-center justify-center mb-4">
                        <div className="flex justify-center items-center bg-gray-800 rounded-full p-0">
                        {profileUser?.avatar ? (
                          <img
                            src={`http://localhost:4000${profileUser.avatar}`}
                            alt="Profile"
                            className="w-14 h-14 object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-14 h-14 text-3xl font-bold text-white flex justify-center items-center">
                            {profileUser.name[0].toUpperCase()}
                          </div>
                        )}
                        </div>
                      </div>
                      <div className="font-medium text-center">{user.name}</div>
                    </div>
                    <div className="py-0">
                      <Link
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        to="/account/profile"
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </div>
                    <div className="py-0  hover:bg-red-100 cursor-pointer">
                      <button
                        onClick={handleLogout}
                        className=" block font-semibold px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <FaTimes className="h-6 w-6" />
                  ) : (
                    <FaBars className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive
                      ? "bg-teal-50 border-teal-500 text-teal-700"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Header;
