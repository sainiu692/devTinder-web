import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      // handle error case
      console.error("Error fetching connections:", err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🤝</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">No connections yet!</h1>
          <p className="text-base-content/70">Start connecting with developers in the feed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 pb-20 min-h-screen bg-gradient-to-br from-base-200/50 via-base-100 to-base-200/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg">
            <span className="text-3xl">🤝</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Your Connections
          </h1>
          <p className="text-base-content/70">
            {connections.length} {connections.length === 1 ? 'connection' : 'connections'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="card bg-base-100 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="card-body p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="avatar">
                        <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            alt="photo"
                            className="object-cover"
                            src={photoUrl}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="card-title text-xl font-bold text-base-content mb-1">
                        {firstName + " " + lastName}
                      </h2>
                      {age && gender && (
                        <p className="text-sm text-base-content/70 mb-2">
                          {age} • {gender}
                        </p>
                      )}
                      {about && (
                        <p className="text-sm text-base-content/80 line-clamp-2 mb-4">
                          {about}
                        </p>
                      )}
                      <Link to={"/chat/" + _id} className="w-full">
                        <button className="btn btn-primary btn-sm w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Start Chat
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
