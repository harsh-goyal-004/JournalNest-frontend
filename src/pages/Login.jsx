import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginUser } from "../service/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Regex for validation
  const usernameRegex = /^[a-zA-Z0-9]{6,12}$/; // Only letters/numbers, 6-12 chars
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 letter & 1 number

  //   This function handles the form submission
  async function formSubmit(e) {
    e.preventDefault();

    setErrorMsg("");

    if (!usernameRegex.test(username)) {
      setErrorMsg("Username must be 6-12 letters or numbers ");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMsg(
        "Password must be atleast 8 characters and contain a letter, a special character and a number"
      );

      return;
    }

    // If everything is valid then send the data to the backend

    const formData = {
      username: username,
      password: password,
    };

    // call loginUser method from authService to send data to Backend
    try {
      const res = await loginUser(formData);
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data);
        navigate("/home");
      }
    } catch (err) {
      setErrorMsg(err.response.data);
    }
  }

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <section className=" min-h-[30vh] w-[90vw] sm:w-[60vw] md:w-[50vw] lg:min-h-[30vh] lg:w-[35vw] rounded-2xl shadow-2xl flex flex-col ">
          <p className="font-medium text-2xl pt-5 px-8 relative inline-block pb-2  group ">
            Login
            <span className="h-[3px] rounded-lg w-14 absolute bg-blue-500 group-hover:w-36 left-8 ease-in-out duration-500 bottom-0 transition-all"></span>
          </p>

          {/* Form */}
          <form
            className="mt-2  w-full flex flex-col gap-4 py-2 justify-start px-8"
            onSubmit={(e) => formSubmit(e)}
          >
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
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter password "
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex w-full">
              <Button type="submit">Login</Button>
            </div>

            <span className="text-[14px] sm:text-[16px] md:text- w-full flex justify-center items-center">
              Don't have an account? &nbsp;
              <Link to="/" className="text-blue-600">
                Register now
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

export default Login;
