import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const {signIn} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("logged in successfully");
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-sm bg-white p-8 shadow-md rounded-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-purple-500`}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-purple-500`}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-500 text-white py-2 rounded-md ${
              loading ? "cursor-not-allowed opacity-75" : "hover:bg-purple-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-2">New here! <Link className="btn-link" to={"/register"}>Create an Account</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
