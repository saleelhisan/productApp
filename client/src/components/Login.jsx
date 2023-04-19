import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/store";

const Login = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must contain at least one letter and one number"
      )
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    setIsSubmitting(true);

    axios
      .post("http://localhost:3002/api/login", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-4 px-4 py-8 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-8">Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <Field
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.username && touched.username ? "border-red-500" : ""
                }`}
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password && touched.password ? "border-red-500" : ""
                }`}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center mt-4">
        Need to create an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
