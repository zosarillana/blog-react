import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
export default function Register() {
  const { setToken } = useContext(AppContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
      console.log(data);
    }
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-start lg:text-left">
            <h1 className="text-5xl text-start font-extrabold">Register now</h1>
            <p className="py-6">
              This website is made with laravel sanctum api, and react + vite as
              its front end. This website contains bearer tokens and
              authentication using sanctum.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
            <form onSubmit={handleRegister} className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
              {errors.name && (
                <span className="alert alert-error text-sm">
                  {errors.name[0]}
                </span>
              )}

              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
              {errors.email && (
                <span className="alert alert-error text-sm">
                  {errors.email[0]}
                </span>
              )}
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="border px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
              {errors.password && (
                <span className="alert alert-error text-sm">
                  {errors.password[0]}
                </span>
              )}
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
                className="border px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
              {errors.password && (
                <span className="alert alert-error text-sm">
                  {errors.password[0]}
                </span>
              )}
              <Link
                to="/login" // Adjust this path to match your login route
                className=" text-gray-800 cursor-pointer font-normal text-sm ">
                <span className="inline-block  mb-3 ml-1 mt-3">
                  Already have an account?
                </span>
              </Link>
              <button
                type="submit"
                className="transition duration-200 bg-black focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span className="inline-block mr-2">Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
