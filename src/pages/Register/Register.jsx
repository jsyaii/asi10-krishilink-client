



import React, { useContext, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../firebase/firebase.config"; // your firebase config file
import { Link, useLocation, useNavigate } from "react-router";

const SignUp = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate(from, { replace: true });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Create your account
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />
            {nameError && <p className="text-xs text-error">{nameError}</p>}

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
              required
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* Password */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* 🌍 Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-success"
            >
              Continue with Google
            </button>

            {/* Already have account */}
            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link className="text-secondary" to="/auth/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;






