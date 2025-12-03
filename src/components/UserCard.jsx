import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

// export default UserCard;

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, age, gender, photoUrl, skills, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/send/request/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card bg-base-100 w-full max-w-xs md:max-w-sm mx-auto shadow-lg rounded-2xl relative border border-base-300">
      <figure className="h-[320px] md:h-[360px] relative overflow-hidden">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-1 drop-shadow-lg">
              {firstName} {lastName}
            </h2>
            <div className="flex items-center gap-2 text-sm md:text-base">
              {age && gender && (
                <span className="text-white/90 text-base font-medium">
                  {age} • {gender}
                </span>
              )}
            </div>
          </div>

          {about && (
            <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-2 drop-shadow-md">
              {about}
            </p>
          )}

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-white text-xs font-medium border border-white/30 shadow-lg"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-3 py-1.5 bg-white/35 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/30 shadow-lg">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </figure>

      {/* Floating Action Buttons */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-none">
        <button
          className="btn btn-circle bg-white/90 hover:bg-white text-red-500 hover:text-red-600 border border-red-200 shadow-xl transform hover:scale-105 transition-all duration-200 w-12 h-12 pointer-events-auto backdrop-blur-md"
          onClick={() => handleSendRequest("ignored", _id)}
          title="Ignore"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          className="btn btn-circle bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 border-0 text-white shadow-xl transform hover:scale-105 transition-all duration-200 w-12 h-12 pointer-events-auto"
          onClick={() => {
            handleSendRequest("interested", _id);
          }}
          title="Interested"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
