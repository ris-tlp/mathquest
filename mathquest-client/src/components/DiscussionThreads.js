import React from 'react'

const DiscussionThreads = (props) => {
  return (
    <div>


{
        props.threads.map((e) => {
          return (
            <div  className="h-24 border-2 border-slate-600 bg-white text-black shadow-slate-500 font-mono p-2 rounded-lg flex cursor-pointer">
              <img className="h-[60px] rounded-xl" src={e.user.image}></img>
              <div className="mx-4">
                <h1 className="text-lg font-bold">{e.title}</h1>


                <p>Created By: {e.user.name}</p>

                <p>{e.numberOfReplies}</p>
              </div>

              <p></p>
            </div>
          );
        })}


    </div>
  )
}

export default DiscussionThreads