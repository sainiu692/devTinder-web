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
    <div className="max-w-4xl mx-auto mt-6 mb-20 px-4">
      <div className="card bg-base-100 border border-base-300 shadow-2xl">
        {/* Header */}
        <div className="card-body p-0">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-base-content">Chat</h1>
                <p className="text-sm text-base-content/70">Real-time messaging</p>
              </div>
            </div>
          </div>

          {/* Chat Display Area */}
          <div className="flex-1 overflow-y-auto p-6 h-[500px] space-y-4 bg-base-200/30">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-4 opacity-50">💭</div>
                <p className="text-base-content/70 font-medium">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isOwnMessage = user.firstName === msg.firstName;
                return (
                  <div
                    key={index}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? "items-end" : "items-start"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-base-content/70">
                          {msg.firstName} {msg.lastName}
                        </span>
                        <span className="text-xs text-base-content/50">2h ago</span>
                      </div>
                      <div
                        className={`chat-bubble ${
                          isOwnMessage
                            ? "chat-bubble-primary"
                            : "chat-bubble-secondary"
                        } shadow-lg`}
                      >
                        {msg.text}
                      </div>
                      <div className="text-xs text-base-content/50 mt-1">
                        ✓✓ Seen
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-base-300 bg-base-100">
            <div className="flex gap-3 items-center">
              <input
                value={newMessages}
                onChange={(e) => setNewMessages(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && newMessages.trim()) {
                    sendMessage();
                  }
                }}
                className="flex-1 input input-bordered focus:input-primary transition-all"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                disabled={!newMessages.trim()}
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
