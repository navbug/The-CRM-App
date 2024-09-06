import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import Logo from "../assets/icons/privyr_logo.svg";
import { setUser } from "../redux/reducers/userReducer";
import { register } from "../api";
import GoogleLoginButton from "../components/GoogleLoginButton";

const InputField = React.memo(
  ({ type, id, name, label, placeholder, value, onChange }) => (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privyr-teal"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
);

const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full flex items-center justify-center gap-2 ${
      loading ? "bg-opacity-80 cursor-not-allowed" : ""
    } bg-teal-600 font-semibold text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300`}
  >
    {loading ? <ClipLoader color="white" size={20} /> : "NEXT →"}
  </button>
);

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      if (userData.password.length < 8) {
        setUserData((prev) => ({ ...prev, password: "" }));
        toast.error("Password must be at least 8 characters long");
        return;
      }

      try {
        setLoading(true);
        const data = await register(userData);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
        navigate(`/clients`);
        toast.success("New User Registered & Signed In 👤");
      } catch (error) {
        console.error(
          "Registration failed",
          error.response?.data?.message || error.message
        );
        toast.error(`Registration failed, please try again`);
      } finally {
        setLoading(false);
      }
    },
    [userData, dispatch, navigate]
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <img src={Logo} alt="logo" className="h-8 mb-4" />
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Register to Privyr
        </h2>

        <GoogleLoginButton />

        <div className="flex items-center my-4 font-semibold">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={registerUser}>
          <InputField
            type="text"
            id="name"
            name="name"
            label="Username"
            placeholder="e.g. rohan"
            value={userData.name}
            onChange={handleInputChange}
          />
          <InputField
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="e.g. email@example.com"
            value={userData.email}
            onChange={handleInputChange}
          />
          <InputField
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="should be min 8 characters"
            value={userData.password}
            onChange={handleInputChange}
          />
          <SubmitButton loading={loading} />
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-800 font-semibold">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
