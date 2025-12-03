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
      <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-8 my-8 px-4 pb-20">
        {/* Edit Form */}
        <div className="card bg-base-100 w-full lg:w-96 shadow-2xl border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-2xl">✏️</span>
              </div>
              <h2 className="card-title text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Edit Profile
              </h2>
            </div>
            
            <div className="space-y-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full focus:input-primary transition-all"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full focus:input-primary transition-all"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full focus:input-primary transition-all"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered w-full focus:input-primary transition-all"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Gender</span>
                  </div>
                  <select
                    value={gender}
                    className="select select-bordered w-full focus:select-primary transition-all"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">About</span>
                </div>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full focus:textarea-primary transition-all resize-none"
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </label>
            </div>

            {error && (
              <div className="alert alert-error mt-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="card-actions justify-center mt-6">
              <button 
                className="btn btn-primary btn-lg w-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all" 
                onClick={saveProfile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-auto">
          <div className="mb-4 text-center lg:text-left">
            <h3 className="text-xl font-bold text-base-content">Live Preview</h3>
            <p className="text-sm text-base-content/70">See how your profile looks</p>
          </div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
