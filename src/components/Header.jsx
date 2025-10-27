import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";

import { navItems } from "../constants";
import Logo from "../assets/icons/privyr_logo.svg";
import { setUser } from "../redux/reducers/userReducer";
import { fetchUser } from "../api";
import { API_BARE_BASE_URL } from "../../config";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const profileMenuRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleProfileMenu = useCallback(() => {
    setIsProfileMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [dispatch, navigate]);

  const fetchUserData = useCallback(async (id) => {
    try {
      const fetchedUser = await fetchUser(id);
      setProfileUser(fetchedUser);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchUserData(storedUser._id);
    } else {
      setLoading(false);
    }
  }, [fetchUserData]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderNavItems = useCallback(
    (isMobile = false) =>
      navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            isMobile
              ? `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? "bg-teal-50 border-teal-500 text-teal-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`
              : `text-semibold inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive
                    ? "border-teal-500 text-teal-800"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`
          }
          onClick={() => isMobile && setIsOpen(false)}
        >
          <div className="flex items-center">
            <item.icon className="mr-2 h-5 w-5" />
            {item.name}
          </div>
        </NavLink>
      )),
    []
  );

  const renderProfileButton = () => (
    <button
      className="bg-gray-800 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      onClick={toggleProfileMenu}
    >
      <span className="sr-only">View profile</span>
      {profileUser?.avatar ? (
        <img
          src={`${API_BARE_BASE_URL}${profileUser.avatar}`}
          alt="Profile"
          className="w-8 h-8 object-cover rounded-full"
        />
      ) : (
        <div className="w-6 h-6 text-xl font-bold text-white flex justify-center items-center">
          {profileUser?.name[0].toUpperCase()}
        </div>
      )}
    </button>
  );

  const renderProfileMenu = () =>
    isProfileMenuOpen && (
      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        {/* Profile menu content */}
        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
          <div className="h-14 flex items-center justify-center mb-4">
            <div className="flex justify-center items-center bg-gray-800 rounded-full p-0">
              {profileUser?.avatar ? (
                <img
                  src={`${API_BARE_BASE_URL}${profileUser.avatar}`}
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
    );


    if(!navigator.onLine) return;

  // if (loading) {
  //   return (
  //     <Loading height="2">
  //       <PuffLoader color="#09e34f" speedMultiplier={3} />
  //     </Loading>
  //   );
  // }

  return (
    <div>
      {navigator.onLine && !loading && <IconContext.Provider value={{ className: "react-icons" }}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side (logo and nav items) */}
              <div className="flex">
                <Link to={`/clients`} className="flex-shrink-0 flex items-center">
                  <img className="h-10 w-auto" src={Logo} alt="Logo" />
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {renderNavItems()}
                </div>
              </div>

              {/* Right side (profile and mobile menu) */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 relative" ref={profileMenuRef}>
                  {renderProfileButton()}
                  {renderProfileMenu()}
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

          {/* Mobile menu */}
          <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
            <div className="pt-2 pb-3 space-y-1">{renderNavItems(true)}</div>
          </div>
        </nav>
      </IconContext.Provider>}
    </div>
  );
};

export default Header;
