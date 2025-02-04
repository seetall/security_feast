

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Error state
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // Validation function
//   const validation = () => {
//     let isValid = true;

//     if (email === "" || !email.includes("@")) {
//       setEmailError("Email is empty or invalid");
//       isValid = false;
//     }
//     if (password.trim() === "") {
//       setPasswordError("Password is empty");
//       isValid = false;
//     }

//     return isValid;
//   };

//   // Resend Verification Email
//   const resendVerificationEmail = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/user/resend-verification",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       if (response.ok) {
//         toast.success("Verification email resent. Please check your inbox.");
//       } else {
//         const errorMessage = await response.text();
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       toast.error("Failed to resend verification email. Please try again.");
//     }
//   };

//   // Login function
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validation()) {
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();

//         if (
//           response.status === 401 &&
//           errorMessage.includes("Email not verified")
//         ) {
//           toast.error(
//             "Your email is not verified. Resending verification email..."
//           );
//           resendVerificationEmail();
//         } else {
//           toast.error(errorMessage);
//         }
//       } else {
//         const data = await response.json();
//         toast.success("Login successful!");

//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.userData));
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       toast.error("An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="login-box shadow-lg rounded">
//         <div className="row">
//           {/* Left Side - Image */}
//           <div className="col-md-6 p-0">
//             <img
//               src="https://i.pinimg.com/564x/64/5f/ef/645fef09c3f45b7d94d316b6493594b1.jpg"
//               alt="Login"
//               className="img-fluid login-image"
//             />
//           </div>

//           {/* Right Side - Login Form */}
//           <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
//             <h2 className="text-center mb-4">Welcome Back!</h2>

//             <form onSubmit={handleLogin}>
//               <div className="form-group mb-3">
//                 <label>Email Address:</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 {emailError && <p className="text-danger">{emailError}</p>}
//               </div>

//               <div className="form-group mb-3">
//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {passwordError && (
//                   <p className="text-danger">{passwordError}</p>
//                 )}
//               </div>

//               <button type="submit" className="btn btn-orange w-100">
//                 Login
//               </button>

//               <div className="text-center mt-3">
//                 <p>
//                   Don't have an account? <a href="../register">Register</a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Validation function
  const validation = () => {
    let isValid = true;

    if (email === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    }

    return isValid;
  };

  // Resend Verification Email
  const resendVerificationEmail = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("Verification email resent. Please check your inbox.");
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Failed to resend verification email. Please try again.");
    }
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        if (
          response.status === 401 &&
          errorMessage.includes("Email not verified")
        ) {
          toast.error(
            "Your email is not verified. Resending verification email..."
          );
          resendVerificationEmail();
        } else {
          toast.error(errorMessage);
        }
      } else {
        const data = await response.json();
        toast.success("Login successful!");

        // Save token and user data to local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userData));

        // Check user role and navigate accordingly
        if (data.userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-box shadow-lg rounded">
        <div className="row">
          {/* Left Side - Image */}
          <div className="col-md-6 p-0">
            <img
              src="https://i.pinimg.com/564x/64/5f/ef/645fef09c3f45b7d94d316b6493594b1.jpg"
              alt="Login"
              className="img-fluid login-image"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
            <h2 className="text-center mb-4">Welcome Back!</h2>

            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label>Email Address:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>

              <div className="form-group mb-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}
              </div>

              <button type="submit" className="btn btn-orange w-100">
                Login
              </button>

              <div className="text-center mt-3">
                <p>
                  Don't have an account? <a href="../register">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
