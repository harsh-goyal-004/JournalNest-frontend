import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../service/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Regex for validation
  const usernameRegex = /^[a-zA-Z0-9]{6,12}$/; // Only letters/numbers, 6-12 chars
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 letter & 1 number
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   This function handles the form submission
  async function formSubmit(e) {
    e.preventDefault();

    setErrorMsg("");

    if (fullName === "") {
      setErrorMsg("Name cannot be empty");
    }

    if (!usernameRegex.test(username)) {
      setErrorMsg("Username must be 6-12 letters or numbers ");
      return;
    }

    if (email !== "") {
      if (!emailRegex.test(email)) {
        setErrorMsg("Email is Invalid");
      }
    }

    if (!passwordRegex.test(password)) {
      setErrorMsg(
        "Password must be atleast 8 characters and contain a letter, a special character and a number"
      );

      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // If everything is valid then send the data to the backend

    const formData = {
      name: fullName,
      username: username,
      email: email,
      password: password,
    };

    // call registerUser method from authService to send data to Backend
    try {
      const res = await registerUser(formData);
      console.log("Registration response : ", res.data);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setErrorMsg(err.response.data);
    }
  }

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <section className=" min-h-[45vh] w-[90vw] sm:w-[60vw] md:w-[50vw] lg:min-h-[50vh] lg:w-[35vw] rounded-2xl shadow-2xl flex flex-col ">
          <p className="font-medium text-2xl pt-5 px-8 relative inline-block pb-2  group ">
            Registration
            <span className="h-[3px] rounded-lg w-14 absolute bg-blue-500 group-hover:w-36 left-8 ease-in-out duration-500 bottom-0 transition-all"></span>
          </p>

          {/* Form */}
          <form
            className="mt-2  w-full flex flex-col gap-4 py-2 justify-start px-8 "
            onSubmit={(e) => formSubmit(e)}
          >
            <div>
              <InputField
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Enter Your Full Name"
                required={true}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <InputField
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Enter a username "
                required={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <InputField
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Enter Your Email ID (optional)"
                required={false}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <InputField
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Create password "
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <InputField
                type="password"
                id="confirm-password"
                name="confirm-password"
                autoComplete="new-password"
                placeholder="Confirm password "
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex w-full">
              <Button type="submit">Register Now</Button>
            </div>

            <span className="text-[14px] sm:text-[16px] md:text- w-full flex justify-center items-center">
              Already have an account? &nbsp;
              <Link to="/login" className="text-blue-600">
                Login now
              </Link>
            </span>

            <span className="w-full text-[14px] sm:text-[16px] flex justify-center items-center ">
              {errorMsg && (
                <div className="text-red-500 text-center pb-2 ">{errorMsg}</div>
              )}
            </span>
          </form>
        </section>
      </div>
    </>
  );
}

export default Register;
