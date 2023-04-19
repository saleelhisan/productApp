import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
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
      .post("http://localhost:3002/api/signup", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        ((error) => {
          alert(error.response.data.message);
        })(err);
      });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-4 px-4 py-8 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-8">Sign up</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
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
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
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
              Sign up
            </button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Log in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
