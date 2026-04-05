// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const AuthPage = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [animating, setAnimating] = useState(false);

//   // Login state
//   const [loginData, setLoginData] = useState({ username: "", password: "" });
//   // Signup state
//   const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleToggle = () => {
//     if (animating) return;
//     setError("");
//     setAnimating(true);
//     setTimeout(() => {
//       setIsLogin((prev) => !prev);
//       setAnimating(false);
//     }, 500);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/user/login",
//         { username: loginData.username, password: loginData.password },
//         { withCredentials: true }
//       );
//       if (res.data.token) {
//         localStorage.setItem("user_token", res.data.token);
//         navigate("/");
//       } else {
//         setError(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/user/signup",
//         { username: signupData.username, email: signupData.email, password: signupData.password },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         handleToggle();
//       } else {
//         setError(res.data.message || "Signup failed");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         .auth-root {
//           font-family: 'Poppins', sans-serif;
//           min-height: 100vh;
//           background: #f0f0f0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .auth-card {
//           position: relative;
//           width: 750px;
//           height: 450px;
//           background: #fff;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.25);
//         }

//         /* ── DIAGONAL BLACK PANEL ── */
//         .black-panel {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: #000;
//           clip-path: polygon(0 0, 45% 0, 38% 100%, 0 100%);
//           transition: clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1);
//           z-index: 2;
//         }

//         .auth-card.signup-mode .black-panel {
//           clip-path: polygon(55% 0, 100% 0, 100% 100%, 62% 100%);
//         }

//         /* ── WELCOME TEXT ── */
//         .welcome-text {
//           position: absolute;
//           z-index: 3;
//           color: white;
//           top: 50%;
//           transform: translateY(-50%);
//           left: 36px;
//           transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);
//           pointer-events: none;
//         }

//         .auth-card.signup-mode .welcome-text {
//           left: auto;
//           right: 36px;
//           text-align: right;
//         }

//         .welcome-text h2 {
//           font-size: 26px;
//           font-weight: 700;
//           line-height: 1.2;
//           letter-spacing: 0.02em;
//         }

//         .welcome-text p {
//           font-size: 11px;
//           font-weight: 300;
//           margin-top: 10px;
//           opacity: 0.75;
//           line-height: 1.6;
//           max-width: 160px;
//         }

//         .auth-card.signup-mode .welcome-text p {
//           margin-left: auto;
//         }

//         /* ── FORM PANELS ── */
//         .form-panel {
//           position: absolute;
//           top: 0;
//           height: 100%;
//           width: 58%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 40px 48px;
//           z-index: 1;
//           transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.76,0,0.24,1);
//         }

//         .login-panel {
//           right: 0;
//           opacity: 1;
//           transform: translateX(0);
//         }

//         .auth-card.signup-mode .login-panel {
//           opacity: 0;
//           transform: translateX(30px);
//           pointer-events: none;
//         }

//         .signup-panel {
//           left: 0;
//           opacity: 0;
//           transform: translateX(-30px);
//           pointer-events: none;
//         }

//         .auth-card.signup-mode .signup-panel {
//           opacity: 1;
//           transform: translateX(0);
//           pointer-events: all;
//         }

//         /* ── TITLE ── */
//         .form-title {
//           font-size: 22px;
//           font-weight: 600;
//           color: #111;
//           margin-bottom: 4px;
//           width: 100%;
//           text-align: center;
//         }

//         .title-underline {
//           width: 30px;
//           height: 2.5px;
//           background: #111;
//           margin: 0 auto 20px;
//           border-radius: 2px;
//         }

//         /* ── INPUT BOX ── */
//         .input-box {
//           position: relative;
//           width: 100%;
//           margin-bottom: 16px;
//         }

//         .input-box input {
//           width: 100%;
//           background: transparent;
//           border: none;
//           border-bottom: 1.5px solid #ccc;
//           padding: 10px 32px 10px 0;
//           font-size: 13px;
//           font-family: 'Poppins', sans-serif;
//           color: #111;
//           outline: none;
//           transition: border-color 0.25s;
//         }

//         .input-box input:focus {
//           border-bottom-color: #111;
//         }

//         .input-box label {
//           position: absolute;
//           top: 10px;
//           left: 0;
//           font-size: 13px;
//           color: #999;
//           pointer-events: none;
//           transition: all 0.22s ease;
//           font-weight: 400;
//         }

//         .input-box input:focus ~ label,
//         .input-box input:not(:placeholder-shown) ~ label {
//           top: -10px;
//           font-size: 10px;
//           color: #555;
//           letter-spacing: 0.04em;
//         }

//         .input-box .icon {
//           position: absolute;
//           right: 0;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #aaa;
//           font-size: 15px;
//           pointer-events: none;
//         }

//         /* ── BUTTON ── */
//         .submit-btn {
//           width: 100%;
//           padding: 11px;
//           background: #111;
//           color: #fff;
//           border: none;
//           border-radius: 25px;
//           font-size: 14px;
//           font-family: 'Poppins', sans-serif;
//           font-weight: 500;
//           cursor: pointer;
//           margin-top: 8px;
//           transition: background 0.2s, transform 0.15s;
//           letter-spacing: 0.02em;
//         }

//         .submit-btn:hover:not(:disabled) {
//           background: #333;
//           transform: translateY(-1px);
//         }

//         .submit-btn:active:not(:disabled) {
//           transform: translateY(0);
//         }

//         .submit-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* ── BOTTOM LINK ── */
//         .bottom-link {
//           margin-top: 14px;
//           font-size: 11px;
//           color: #888;
//           text-align: center;
//         }

//         .bottom-link span {
//           color: #3b5bdb;
//           font-weight: 500;
//           cursor: pointer;
//           text-decoration: none;
//         }

//         .bottom-link span:hover {
//           text-decoration: underline;
//         }

//         /* ── ERROR ── */
//         .error-msg {
//           font-size: 10.5px;
//           color: #e53e3e;
//           text-align: center;
//           margin-top: 6px;
//         }

//         /* ── RESPONSIVE ── */
//         @media (max-width: 800px) {
//           .auth-card {
//             width: 95vw;
//             height: auto;
//             min-height: 420px;
//           }

//           .black-panel {
//             clip-path: polygon(0 0, 50% 0, 43% 100%, 0 100%);
//           }

//           .auth-card.signup-mode .black-panel {
//             clip-path: polygon(57% 0, 100% 0, 100% 100%, 64% 100%);
//           }

//           .welcome-text {
//             left: 20px;
//           }

//           .auth-card.signup-mode .welcome-text {
//             right: 20px;
//           }

//           .welcome-text h2 { font-size: 20px; }
//           .welcome-text p { display: none; }

//           .form-panel {
//             padding: 32px 28px;
//             width: 60%;
//           }
//         }

//         @media (max-width: 500px) {
//           .auth-card {
//             width: 100vw;
//             border-radius: 0;
//             height: 100vh;
//             flex-direction: column;
//           }

//           .black-panel {
//             clip-path: polygon(0 0, 100% 0, 100% 28%, 0 35%);
//             transition: clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1);
//           }

//           .auth-card.signup-mode .black-panel {
//             clip-path: polygon(0 65%, 100% 72%, 100% 100%, 0 100%);
//           }

//           .welcome-text {
//             top: 14%;
//             left: 50%;
//             transform: translateX(-50%);
//             text-align: center;
//             transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);
//           }

//           .auth-card.signup-mode .welcome-text {
//             top: auto;
//             bottom: 8%;
//             left: 50%;
//             right: auto;
//             transform: translateX(-50%);
//             text-align: center;
//           }

//           .welcome-text p { display: none; }
//           .welcome-text h2 { font-size: 20px; }

//           .form-panel {
//             width: 100%;
//             height: 70%;
//             padding: 28px 32px;
//           }

//           .login-panel {
//             bottom: 0;
//             top: auto;
//             right: 0;
//             left: 0;
//             justify-content: flex-start;
//             padding-top: 40px;
//           }

//           .signup-panel {
//             top: 32%;
//             left: 0;
//             right: 0;
//             height: auto;
//             padding-top: 20px;
//           }

//           .auth-card.signup-mode .signup-panel {
//             top: 32%;
//           }
//         }
//       `}</style>

//       <div className="auth-root">
//         <div className={`auth-card ${!isLogin ? "signup-mode" : ""}`}>

//           {/* BLACK DIAGONAL PANEL */}
//           <div className="black-panel" />

//           {/* WELCOME TEXT */}
//           <div className="welcome-text">
//             <h2>WELCOME<br />BACK!</h2>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,rem?</p>
//           </div>

//           {/* ── LOGIN FORM ── */}
//           <div className="form-panel login-panel">
//             <div className="form-title">Login</div>
//             <div className="title-underline" />

//             <form onSubmit={handleLogin} style={{ width: "100%" }}>
//               <div className="input-box">
//                 <input
//                   type="text"
//                   placeholder=" "
//                   value={loginData.username}
//                   onChange={e => setLoginData(p => ({ ...p, username: e.target.value }))}
//                   required
//                 />
//                 <label>Username</label>
//                 <span className="icon">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </span>
//               </div>

//               <div className="input-box">
//                 <input
//                   type="password"
//                   placeholder=" "
//                   value={loginData.password}
//                   onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
//                   required
//                 />
//                 <label>Password</label>
//                 <span className="icon">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </span>
//               </div>

//               {error && isLogin && <p className="error-msg">{error}</p>}

//               <button type="submit" className="submit-btn" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>

//             <p className="bottom-link">
//               Don't have an account?{" "}
//               <span onClick={handleToggle}>Sign Up</span>
//             </p>
//           </div>

//           {/* ── SIGNUP FORM ── */}
//           <div className="form-panel signup-panel">
//             <div className="form-title">Sign Up</div>
//             <div className="title-underline" />

//             <form onSubmit={handleSignup} style={{ width: "100%" }}>
//               <div className="input-box">
//                 <input
//                   type="text"
//                   placeholder=" "
//                   value={signupData.username}
//                   onChange={e => setSignupData(p => ({ ...p, username: e.target.value }))}
//                   required
//                 />
//                 <label>Username</label>
//                 <span className="icon">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </span>
//               </div>

//               <div className="input-box">
//                 <input
//                   type="email"
//                   placeholder=" "
//                   value={signupData.email}
//                   onChange={e => setSignupData(p => ({ ...p, email: e.target.value }))}
//                   required
//                 />
//                 <label>Email</label>
//                 <span className="icon">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </span>
//               </div>

//               <div className="input-box">
//                 <input
//                   type="password"
//                   placeholder=" "
//                   value={signupData.password}
//                   onChange={e => setSignupData(p => ({ ...p, password: e.target.value }))}
//                   required
//                 />
//                 <label>Password</label>
//                 <span className="icon">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </span>
//               </div>

//               {error && !isLogin && <p className="error-msg">{error}</p>}

//               <button type="submit" className="submit-btn" disabled={loading}>
//                 {loading ? "Creating..." : "Sign Up"}
//               </button>
//             </form>

//             <p className="bottom-link">
//               Already have an account?{" "}
//               <span onClick={handleToggle}>Login</span>
//             </p>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthPage;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOGIN_CLIP  = "polygon(55% 0, 100% 0, 100% 100%, 48% 100%)";
const SIGNUP_CLIP = "polygon(0 0, 52% 0, 45% 100%, 0 100%)";
const FULL_CLIP   = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
const EASE        = "cubic-bezier(0.86, 0, 0.07, 1)";

const AuthPage = () => {
  const navigate    = useNavigate();
  const bpRef       = useRef(null);
  const wbRef       = useRef(null);
  const busyRef     = useRef(false);
  const isLoginRef  = useRef(true); // track without re-render

  const [isLogin, setIsLogin]       = useState(true);
  const [loginData, setLoginData]   = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const setWelcomePos = (loginMode) => {
    const wb = wbRef.current;
    if (!wb) return;
    if (loginMode) {
      wb.style.right = "40px"; wb.style.left = "auto"; wb.style.textAlign = "right";
    } else {
      wb.style.left = "40px"; wb.style.right = "auto"; wb.style.textAlign = "left";
    }
  };

  useEffect(() => {
    // Set initial black panel — no transition on mount
    const bp = bpRef.current;
    bp.style.transition = "none";
    bp.style.clipPath = LOGIN_CLIP;
    setWelcomePos(true);
  }, []);

  const handleToggle = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setError("");

    const bp = bpRef.current;
    const wb = wbRef.current;

    // Hide welcome text
    wb.style.opacity = "0";

    // Step 1 — sweep full black
    bp.style.transition = `clip-path 0.46s ${EASE}`;
    bp.style.clipPath = FULL_CLIP;

    // Step 2 — at peak: flip React state + contract to new side
    setTimeout(() => {
      const next = !isLoginRef.current;
      isLoginRef.current = next;
      setIsLogin(next);
      setWelcomePos(next);
      bp.style.transition = `clip-path 0.52s ${EASE}`;
      bp.style.clipPath = next ? LOGIN_CLIP : SIGNUP_CLIP;
    }, 480);

    // Step 3 — show welcome text again
    setTimeout(() => {
      wb.style.opacity = "1";
      busyRef.current = false;
    }, 1040);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        { username: loginData.username, password: loginData.password },
        { withCredentials: true }
      );
      if (res.data.token) {
        localStorage.setItem("user_token", res.data.token);
        navigate("/");
      } else { setError(res.data.message || "Login failed"); }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally { setLoading(false); }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/signup",
        { username: signupData.username, email: signupData.email, password: signupData.password },
        { withCredentials: true }
      );
      if (res.data.success) { handleToggle(); }
      else { setError(res.data.message || "Signup failed"); }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally { setLoading(false); }
  };

  const UserIcon = () => (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  );
  const LockIcon = () => (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
    </svg>
  );
  const MailIcon = () => (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          background: #d9d9d9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-card {
          position: relative;
          width: 780px;
          height: 460px;
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 72px rgba(0,0,0,0.26);
        }

        /* Both forms always rendered & visible (opacity:1 always)
           Black panel on z-index:10 covers the inactive form naturally */
        .form-side {
          position: absolute;
          top: 0;
          height: 100%;
          width: 55%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 62px;
          z-index: 1;
          opacity: 1;
        }

        /* Login on RIGHT white area */
        .form-login { right: 0; }

        /* Signup on LEFT white area */
        .form-signup { left: 0; }

        .form-title {
          font-size: 23px;
          font-weight: 600;
          color: #111;
          width: 100%;
          text-align: center;
          margin-bottom: 6px;
        }
        .title-bar {
          width: 30px;
          height: 2.5px;
          background: #111;
          border-radius: 2px;
          margin: 0 auto 28px;
        }

        .input-box {
          position: relative;
          width: 100%;
          margin-bottom: 24px;
        }
        .input-box input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #ccc;
          padding: 10px 28px 10px 0;
          font-size: 13.5px;
          font-family: 'Poppins', sans-serif;
          color: #111;
          outline: none;
          transition: border-color 0.22s;
        }
        .input-box input:focus { border-bottom-color: #111; }
        .input-box label {
          position: absolute;
          top: 10px;
          left: 0;
          font-size: 13.5px;
          color: #999;
          pointer-events: none;
          transition: top 0.2s, font-size 0.2s, color 0.2s;
        }
        .input-box input:focus ~ label,
        .input-box input:not(:placeholder-shown) ~ label {
          top: -11px;
          font-size: 10px;
          color: #555;
          letter-spacing: 0.05em;
        }
        .input-box .ico {
          position: absolute;
          right: 2px;
          top: 50%;
          transform: translateY(-50%);
          color: #bbb;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .btn-submit {
          width: 92%;
          margin-left: auto;
          margin-right: auto;
          display: block;
          padding: 11px 0;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 30px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          cursor: pointer;
          margin-top: 10px;
          letter-spacing: 0.03em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .btn-submit:hover:not(:disabled) {
          background: #2a2a2a;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.22);
        }
        .btn-submit:active:not(:disabled) { transform: none; }
        .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        .bottom-link {
          margin-top: 20px;
          font-size: 11.5px;
          color: #888;
          text-align: center;
        }
        .toggle-btn {
          color: #1a73e8;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Poppins', sans-serif;
          font-size: 11.5px;
          padding: 0;
        }
        .toggle-btn:hover { text-decoration: underline; }

        .error-msg {
          font-size: 10.5px;
          color: #e53e3e;
          text-align: center;
          margin-bottom: 4px;
        }

        /* BLACK SWEEP PANEL — z-index 10, covers inactive form */
        .black-panel {
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 10;
          pointer-events: none;
          /* clip-path set via ref on mount, no inline style flash */
        }

        /* WELCOME TEXT — z-index 11, always above black panel */
        .welcome-box {
          position: absolute;
          z-index: 11;
          color: #fff;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          max-width: 185px;
          transition: opacity 0.2s ease;
        }
        .welcome-box h2 {
          font-size: 26px;
          font-weight: 700;
          line-height: 1.15;
        }
        .welcome-box p {
          font-size: 11px;
          font-weight: 300;
          margin-top: 10px;
          opacity: 0.72;
          line-height: 1.65;
        }

        @media (max-width: 820px) {
          .auth-card { width: 95vw; }
          .form-side { padding: 34px 32px; }
          .welcome-box p { display: none; }
          .welcome-box h2 { font-size: 21px; }
        }
        @media (max-width: 540px) {
          .auth-card { width: 100vw; min-height: 100vh; border-radius: 0; height: auto; }
          .form-side { width: 100%; position: relative; right: auto; left: auto; }
          .welcome-box { display: none; }
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">

          {/* LOGIN FORM — always visible, black panel covers it when inactive */}
          <div className="form-side form-login">
            <div className="form-title">Login</div>
            <div className="title-bar" />
            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <div className="input-box">
                <input type="text" placeholder=" "
                  value={loginData.username}
                  onChange={e => setLoginData(p => ({ ...p, username: e.target.value }))}
                  required tabIndex={isLogin ? 0 : -1}
                />
                <label>Username</label>
                <span className="ico"><UserIcon /></span>
              </div>
              <div className="input-box">
                <input type="password" placeholder=" "
                  value={loginData.password}
                  onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                  required tabIndex={isLogin ? 0 : -1}
                />
                <label>Password</label>
                <span className="ico"><LockIcon /></span>
              </div>
              {error && isLogin && <p className="error-msg">{error}</p>}
              <button className="btn-submit" type="submit" disabled={loading} tabIndex={isLogin ? 0 : -1}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="bottom-link">
              Don't have an account?{" "}
              <button className="toggle-btn" type="button" onClick={handleToggle} tabIndex={isLogin ? 0 : -1}>
                Sign Up
              </button>
            </p>
          </div>

          {/* SIGNUP FORM — always visible, black panel covers it when inactive */}
          <div className="form-side form-signup">
            <div className="form-title">Sign Up</div>
            <div className="title-bar" />
            <form onSubmit={handleSignup} style={{ width: "100%" }}>
              <div className="input-box">
                <input type="text" placeholder=" "
                  value={signupData.username}
                  onChange={e => setSignupData(p => ({ ...p, username: e.target.value }))}
                  required tabIndex={!isLogin ? 0 : -1}
                />
                <label>Username</label>
                <span className="ico"><UserIcon /></span>
              </div>
              <div className="input-box">
                <input type="email" placeholder=" "
                  value={signupData.email}
                  onChange={e => setSignupData(p => ({ ...p, email: e.target.value }))}
                  required tabIndex={!isLogin ? 0 : -1}
                />
                <label>Email</label>
                <span className="ico"><MailIcon /></span>
              </div>
              <div className="input-box">
                <input type="password" placeholder=" "
                  value={signupData.password}
                  onChange={e => setSignupData(p => ({ ...p, password: e.target.value }))}
                  required tabIndex={!isLogin ? 0 : -1}
                />
                <label>Password</label>
                <span className="ico"><LockIcon /></span>
              </div>
              {error && !isLogin && <p className="error-msg">{error}</p>}
              <button className="btn-submit" type="submit" disabled={loading} tabIndex={!isLogin ? 0 : -1}>
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>
            <p className="bottom-link">
              Already have an account?{" "}
              <button className="toggle-btn" type="button" onClick={handleToggle} tabIndex={!isLogin ? 0 : -1}>
                Login
              </button>
            </p>
          </div>

          {/* BLACK SWEEP PANEL — clip-path set via ref in useEffect */}
          <div ref={bpRef} className="black-panel" />

          {/* WELCOME TEXT */}
          <div
            ref={wbRef}
            className="welcome-box"
            style={{ right: "40px", left: "auto", textAlign: "right", opacity: 1 }}
          >
            <h2>WELCOME<br />BACK!</h2>
            <p>Apke BHAROSHE ki DUKAN</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default AuthPage;