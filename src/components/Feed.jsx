// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { addFeed } from "../utils/feedSlice";
// import { useEffect } from "react";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     // if (feed) return;
//     try {
//       const res = await axios.get(BASE_URL + "/feed", {
//         withCredentials: true,
//       });
//       dispatch(addFeed(res?.data?.data));
//     } catch (err) {}
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if(!feed) return;
//   if(feed.length<=0) return <h1 className="flex justify-center my-10">No new users found!!</h1>

//   return (
//     feed && (
//       <div className="flex justify-center my-15">
//         <UserCard user={feed[0]} />
//       </div>
//     )
//   );
// };

// export default Feed;


import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async () => {
    // if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70 font-medium">Finding amazing developers...</p>
        </div>
      </div>
    );
  }

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">No new users found!</h1>
          <p className="text-base-content/70">Check back later for more developers</p>
        </div>
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center items-center min-h-[70vh] py-8 px-4">
        <div className="transform transition-all hover:scale-[1.02]">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;