// const UserCard = ({ user }) => {
// const {firstName,lastName,age,gender,photoUrl,skills,about}=user
//   return (
//     <div className="card bg-base-100 w-80 h-100 shadow-sm">
//       <figure>
//         <img alt="user image" src={user.photoUrl} />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">Card Title</h2>
//         <p>
//           A card component has a figure, a body part, and inside body there are
//           title and actions parts
//         </p>
//         <div className="card-actions justify-end">
//           <button className="btn btn-primary">Buy Now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, skills, about } = user;

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
        <button className="btn btn-circle btn-lg btn-error shadow-lg">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button className="btn btn-circle btn-lg btn-success shadow-lg">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserCard;