import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Input, Logo } from "../Components";
import { useDispatch } from "react-redux";
import { authservice } from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.Login(data);
      if (session) {
        const userdata = await authservice.getCurrentUser();
        if (userdata) {
          dispatch(authLogin(userdata));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

            <Input
              label="Password:"
              placeholder="Enter Your Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

            <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
