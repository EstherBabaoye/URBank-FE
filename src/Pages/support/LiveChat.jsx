import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveChat() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    document.title = "Live Chat";
  }, []);

  return (
    <div className="pt-20 mt-24 mb-24 px-4 sm:px-6 max-w-2xl mx-auto text-center">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-[#051d40] mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Live Chat Support
      </motion.h1>

      <motion.p
        className="text-gray-700 dark:text-gray-300 mb-6 text-base sm:text-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Connect instantly with a URBank support specialist for real-time help.
      </motion.p>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowChat(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
      >
        Start Chat
      </motion.button>

      <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
        Available Mon–Fri, 8am – 6pm.
      </p>

      {/* Chat Box */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="mt-10 mx-auto w-full max-w-md text-left bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Chat with URBank
              </h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg h-40 overflow-y-auto mb-4 text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-2">👋 Hi there! How can we help you today?</p>
              <p className="italic text-gray-400">Live chat support coming soon...</p>
            </div>

            <input
              type="text"
              disabled
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




// 🟨 Option 2: Build your own live chat with backend + sockets
// This is better for full control but more complex.

// 🧩 Stack:
// Frontend: React + socket.io-client

// Backend: Node.js + Express + socket.io

// Database: (Optional) MongoDB to save messages

// 👣 Steps:
// Install socket.io-client in your frontend:

// bash
// Copy
// Edit
// npm install socket.io-client
// Connect in LiveChat.jsx:

// js
// Copy
// Edit
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // Or your server URL

// export default function LiveChat() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   useEffect(() => {
//     socket.on("chat message", (msg) => {
//       setChat((prev) => [...prev, msg]);
//     });

//     return () => socket.off("chat message");
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("chat message", message);
//       setMessage("");
//     }
//   };

//   return (
//     // Your styled UI
//     <>
//       {chat.map((msg, idx) => (
//         <p key={idx}>{msg}</p>
//       ))}
//       <input value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//     </>
//   );
// }
// Create a backend (e.g., server.js):

// js
// Copy
// Edit
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// server.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });
// 🧠 Recommendation:
// 🔹 For most real-world apps like URBank, start with Tawk.to or Crisp — they save you time, security work, and money.
// If you want help:

// Integrating Tawk.to right now

// Or building a Socket.io-based chat system

// Just let me know!