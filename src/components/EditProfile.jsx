import axios from "axios";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");

  const dispatch=useDispatch()

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data))
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-start gap-8 my-10 px-4">
      <div className="flex justify-center items-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-8 py-8 rounded-2xl shadow-2xl">
        <div className="backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl rounded-2xl p-4 w-96 text-white">
          <h2 className="text-xl font-semibold text-center bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Edit Profile
          </h2>

          <div className="mt-4 space-y-3">
            {/* firstName */}
            <div>
              <label className="block mb-0.5 text-xs font-medium text-gray-200">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* lastName */}
            <div>
              <label className="block mb-0.5 text-xs font-medium text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* photoUrl */}
            <div>
              <label className="block mb-0.5 text-xs font-medium text-gray-200">
                Photo URL:
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* age */}
            <div>
              <label className="block mb-0.5 text-xs font-medium text-gray-200">
                Age
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* gender */}
            <div>
              <label className="block mb-0.5 text-xs font-medium text-gray-200">
                Gender
              </label>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* about */}
            <div>
              <label className="block mb-0.5 text-xs font-medium text-gray-200">
                About
              </label>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Save Profile Btn */}
            <div>
              <p className="text-red-500 text-xs">{error}</p>

              <button className="w-full py-2 mt-2 text-sm font-semibold rounded-lg bg-linear-to-r from-blue-500 to-purple-600 hover:scale-[1.03] transition-all shadow-lg" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
