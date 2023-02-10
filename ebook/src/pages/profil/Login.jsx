import React from 'react';

function login() {
  return <div>login</div>;
}

export default login;

// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get("/api/login", {
//         params: {
//           email,
//           password,
//         },
//       });
//       console.log(response.data);
//       // handle successful login
//     } catch (error) {
//       setError("Authentication failed. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Login</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("/api/login", {
//         email,
//         password,
//       });
//       console.log(response.data);
//       // handle successful login
//     } catch (error) {
//       setError("Authentication failed. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Login</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
