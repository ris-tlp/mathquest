import React, { useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import DiscussionThreadReplies from "./DiscussionThreadReplies";

const DiscussionThreads = (props) => {
  const [showAllThreads, setShowAllThread] = useState(true);

  const [discussionReplies, setDiscussionReplies] = useState({});

  const childRef = useRef(null);

  const handleShowThreads = (threadId) => {
    sessionStorage.setItem("ThreadID", threadId);

    fetchAllThreadReplies(threadId);
  };

  const fetchAllThreadReplies = async (threadId) => {
    const data = await fetch(
      BASE_URL + "/api/courses/discussions/getAllReplies",
      {
        method: "POST",
        body: JSON.stringify({
          threadId: threadId,
        }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-control-allow-origin": "*",
          "Access-control-allow-methods": "*",
        },
      }
    );
    const json = await data.json();
    setDiscussionReplies(json);
    setShowAllThread(false);
  };

  return (
    <div>
      {showAllThreads &&
        props.threads.map((e) => {
          return (
            <div
              onClick={() => handleShowThreads(e._id)}
              className="h-24 border-2 border-slate-600 bg-white text-black shadow-slate-500 font-mono p-2 rounded-lg flex cursor-pointer"
            >
              <img className="h-[60px] rounded-xl" src={e.user.image}></img>
              <div className="mx-4 w-[100%]">
                <h1 className="text-lg font-bold">{e.title}</h1>

                <p>Created By: {e.user.name}</p>

                <p className="flex float-right text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-reply-all-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                    <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                  </svg>
                  {e.numberOfReplies}
                </p>
              </div>
            </div>
          );
        })}

      {!showAllThreads && (
        <div>
          <DiscussionThreadReplies
            data={discussionReplies}
            ref={childRef}
            onFetchCall={() => {
              fetchAllThreadReplies(sessionStorage.getItem("ThreadID"));
            }}
            toggleShowAllThread={()=>setShowAllThread(true)}
          />
        </div>
      )}
    </div>
  );
};

export default DiscussionThreads;
