import { useState } from "react";
import "quill/dist/quill.snow.css";
import { toggleStarredEntries } from "../service/authService";

function ViewSingleEntry({ data }) {
  const [isStarred, setIsStarred] = useState(data?.starred);

  async function handleStarredEntries() {
    let journalId = data.id;
    console.log(journalId);
    try {
      const res = await toggleStarredEntries(journalId);
      setIsStarred(!isStarred);
    } catch (error) {
      console.log("Starred Journal Entry Error : ", error);
    }
  }

  return (
    <>
      <div className="mx-6 pb-2 border-b-2 border-gray-400 ">
        {/* Title and Buttons */}
        <div className="flex items-center justify-between pb-2  ">
          <div className="w-1/3">
            <h1 className="text-2xl font-bold mt-4">{data?.title}</h1>
            <span className="text-gray-400 text-[12px] font-medium">
              {new Date(data?.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
            <span className="text-[12px] pl-2 font-medium text-gray-500 ">
              MOOD: {data?.mood}
            </span>
          </div>
          {/* Starred Button */}
          <div className="2/3 flex gap-8 mr-5">
            <button onClick={() => handleStarredEntries()}>
              <img
                src={`${isStarred ? "/star.svg" : "/empty-star.svg"} `}
                alt="Starred"
                className="w-7"
              />
            </button>
            {/* Edit Button */}
            <button>
              <img src="/edit.svg" alt="Edit" className="w-7" />
            </button>
            <button>
              <img src="/delete.svg" alt="Delete" className="w-7" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 items-center ">
          {data?.tags.map((tag) => {
            return (
              <div className="flex gap-1 items-start justify-start" key={tag}>
                <img src="/tags.svg" alt="Tags" className="w-[16px]" />
                <p className="text-[12px] text-gray-400 font-medium">{tag}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Journal Content */}
      <div className="ql-container ql-snow px-6" style={{ border: "none" }}>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </>
  );
}

export default ViewSingleEntry;
