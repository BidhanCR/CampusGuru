import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const RegisterForm = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    console.log(data);
    const formData = new FormData();
    formData.append("image", imageFile);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const photoUrl = imageData.data.display_url;
        createUser(data.email, data.password)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(data.name, photoUrl)
              .then(() => {
                const saveUser = {
                  name: data.name,
                  email: data.email,
                  image: photoUrl,
                  account_created_date: new Date(),
                };
                fetch("https://campus-guru-server.vercel.app/users", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(saveUser),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.insertedId) {
                      reset();
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User created successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate(from, { replace: true });
                    }
                  });
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            console.log(error);
            let errorMessage =
              "An error occurred during registration. Please try again later.";
            if (error.code === "auth/email-already-in-use") {
              errorMessage = "Email is already in use.";
            } else if (error.code === "auth/invalid-email") {
              errorMessage = "Invalid email.";
            } else if (error.code === "auth/weak-password") {
              errorMessage =
                "Weak password. Password should be at least 6 characters long.";
            }
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
              text: errorMessage,
            });
          });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-screen-lg bg-white p-8 shadow-md rounded-md">
        {/* Left Section - Registration Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-center md:text-left text-gray-800 mb-8">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Registration form fields */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Name is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-blue-500`}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="Email" className="block text-gray-700 mb-2">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-blue-500`}
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
                    } focus:outline-none focus:border-blue-500`}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 mb-2">
                Upload Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                required
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              {errors.image && (
                <span className="text-red-500">Invalid Image File</span>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-2 rounded-md ${
                loading ? "cursor-not-allowed opacity-75" : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            <p>
              Have an Account?{" "}
              <Link className="btn-link" to={"/login"}>
                Login here
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section - Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default RegisterForm;
