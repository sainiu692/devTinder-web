import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
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
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-8 gap-5 px-4">
        <div className="card bg-base-300 w-72 shadow-xl">
          <div className="card-body p-4">
            <h2 className="card-title justify-center text-lg mb-1">
              Edit Profile
            </h2>
            <div className="space-y-1.5">
              <label className="form-control w-full">
                <div className="label py-0.5">
                  <span className="label-text text-sm">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full input-sm"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label py-0.5">
                  <span className="label-text text-sm">Last Name:</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full input-sm"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label py-0.5">
                  <span className="label-text text-sm">Photo URL:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full input-sm"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label py-0.5">
                  <span className="label-text text-sm">Age:</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full input-sm"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label py-0.5">
                  <span className="label-text text-sm">Gender:</span>
                </div>
                <select
                  value={gender}
                  className="select select-bordered w-full select-sm"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label py-0.5">
                  <span className="label-text text-sm">About:</span>
                </div>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full text-sm h-16 resize-none"
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </label>
            </div>

            {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}

            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary btn-sm" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
