// import React, { useState } from "react";
// import { register } from "../authService";
// import { AxiosError } from "axios"; // ✅ Type-safe error handling

// const Register: React.FC = () => {
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await register(username, email, password);
//       setMessage(response.data.message);
//     } catch (err) {
//       // ✅ Type-safe Axios error handling
//       const error = err as AxiosError<{ message?: string }>;
//       setMessage(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleRegister}
//         className="bg-white shadow-lg rounded-xl p-6 w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4">Register</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border w-full p-2 mb-3 rounded"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border w-full p-2 mb-3 rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border w-full p-2 mb-3 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
//         >
//           Register
//         </button>

//         {message && <p className="mt-3 text-center text-red-500">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { register as registerApi } from "../authService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerApi(username, email, password);
      setMessage(response.data.message);

      // ✅ Automatically log in after registration
      const loginResponse = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json());

      localStorage.setItem("token", loginResponse.token);
      navigate("/"); // ✅ Redirect to Index.tsx
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-xl p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
