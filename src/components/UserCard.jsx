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
    <div className="card bg-base-100 w-96 shadow-2xl relative">
      <figure className="h-96 relative">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover"
        />

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6">
          <h2 className="text-white text-3xl font-bold">
            {firstName} {lastName}
          </h2>
          <div className="flex gap-2 mt-2">
            <span className="text-white text-lg">
              {age} • {gender}
            </span>
          </div>

          {about && <p className="text-white/90 text-sm mt-3">{about}</p>}

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </figure>

      {/* Floating Action Buttons */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4">
        <button
          className="px-6 py-3 bg-red-500/90 backdrop-blur-sm text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignore
        </button>
        <button
          className="px-6 py-3 bg-green-500/90 backdrop-blur-sm text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all"
          onClick={() => {
            handleSendRequest("interested", _id);
          }}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
