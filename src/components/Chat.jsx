import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]); // Placeholder for messages
  const [newMessages, setNewMessages] = useState(""); // Placeholder for new message input
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // as soon as page loaded,socket connection made and joinChat event emitted to server with userId and targetUserId
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("message received", ({ firstName, lastName, text }) => {
      console.log("Message from " + firstName + ":" + " " + text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessages,
    });
    setNewMessages("");
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-2xl max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-lg transition-colors">
      {/* Header */}
      <h1 className="p-5 border-b border-gray-200 dark:border-gray-700 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Chat
      </h1>

      {/* Chat Display Area */}
      <div className="flex-1 overflow-y-auto p-5 h-96 space-y-3 bg-gray-50 dark:bg-gray-800 rounded-b-xl transition-colors">
        {/* Messages go here */}
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}   ${msg.lastName}`}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex gap-3 items-center bg-white dark:bg-gray-900 transition-colors">
        <input
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
