// Import necessary React hooks and constants
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";


// Define the DiscussionThreadReplies component as a forwardRef
import { BASE_URL } from "../utils/constants";
const DiscussionThreadReplies = forwardRef(  ({ data, onFetchCall, toggleShowAllThread}, ref) => {
    const replyBody=useRef('replyBody')
    const discussionReplies = data;
    
  

    useImperativeHandle(ref, () => ({
        // Expose parent function to parent component
        callParentFunction: publishThreadReply,
      }));
    
    // Define a function to publish a new thread reply
    const publishThreadReply=async()=>{
        const data = await fetch(
            BASE_URL + "/api/courses/discussions/createReply/",
            {
              method: "POST",
              body: JSON.stringify({
                threadId: sessionStorage.getItem('ThreadID'),
                createdByEmail: sessionStorage.getItem('email'),
                body: replyBody.current.value,
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
          replyBody.current.value=""
          // Call the parent component's onFetchCall function
          onFetchCall();
          
      }

  
  // Render the component
  return (
    <div>
         <button
          onClick={toggleShowAllThread}
          className="text-white font-bold p-4 mb-4 border-2 border-white rounded-lg"
        >
          Go to all discussion &gt;
        </button>

      {/* Render discussion thread and its replies */}
      {
        discussionReplies && <div className="text-black border-2 border-white bg-white rounded-md p-4">
        <h1 className="text-2xl">{discussionReplies.threadInfo.title}</h1>

        <h1>{discussionReplies.threadInfo.body}</h1>

        <p className="font-bold text-xl my-4">Replies:</p>

        {discussionReplies.replies.map((e) => {
          return (
            <div className="border-2 border-black my-4 rounded-md p-8">
              <h1 className="font-bold font-xl">{e.body}</h1>
              <h1 className="float-right flex ">&lt;{e.createdByEmail}</h1>
            </div>
          );
        })}

        {/* Reply form */}
        <div className="text-black">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-black p-2">Reply</h1>
            <textarea
              ref={replyBody}
              className="relative w-[100%] h-20 rounded-md p-2 border-2 border-slate-600"
              placeholder="Reply Goes Here"
            ></textarea>

            {/* Button to publish the reply */}
            <button
              onClick={publishThreadReply}
              className="w-[100%] h-10 border-2 bg-slate-400 mt-8 text-xl font-bold rounded-md"
            >
              Publish
            </button>
          </form>
        </div>
      </div>
      }
    </div>
  );
});

// Export the DiscussionThreadReplies component
export default DiscussionThreadReplies;
