import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      //   console.log(res?.data?.data)
      dispatch(addRequests(res?.data?.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📨</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">No requests found!</h1>
          <p className="text-base-content/70">You're all caught up</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 pb-20 min-h-screen bg-gradient-to-br from-base-200/50 via-base-100 to-base-200/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg">
            <span className="text-3xl">📨</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Connection Requests
          </h1>
          <p className="text-base-content/70">
            {requests.length} pending {requests.length === 1 ? 'request' : 'requests'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="card bg-base-100 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="card-body p-6">
                  <div className="flex items-start gap-4 mb-4">
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
                        <p className="text-sm text-base-content/70">
                          {age} • {gender}
                        </p>
                      )}
                      {about && (
                        <p className="text-sm text-base-content/80 mt-2 line-clamp-2">
                          {about}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="divider my-2"></div>
                  
                  <div className="flex gap-3">
                    <button
                      className="btn btn-error btn-sm flex-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                    <button
                      className="btn btn-success btn-sm flex-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Accept
                    </button>
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

export default Requests;
