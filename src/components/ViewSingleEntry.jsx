import { useState } from "react";
import "quill/dist/quill.snow.css";
import {
  deleteJournalEntryById,
  toggleStarredEntries,
} from "../service/authService";
import { toast } from "react-toastify";

export function Modal({ setDeleteEntry, deleteEntry }) {
  return (
    <>
      <div className="top-0 w-full md:w-4/5 h-full md:left-[20%] fixed z-20 flex justify-center items-center backdrop-blur-[1px]">
        <div className="h-60 w-80 rounded-2xl p-4 border-2 shadow-2xl border-gray-200 bg-white flex flex-col items-center gap-3">
          <div className="h-18 w-18 bg-gray-200 rounded-full flex items-center justify-center">
            <img src="/delete.svg" alt="Delete Entry" className="w-12" />
          </div>
          <h1 className="text-lg font-medium text-center">
            Are you sure you want to permenantly delete this entry?
          </h1>
          <div className="flex gap-6 mt-2">
            <button
              className="h-10 w-24 text-white bg-gray-400 rounded-lg"
              onClick={() => setDeleteEntry((prev) => !prev)}
            >
              Cancel
            </button>
            <button
              className="h-10 w-24 text-white bg-red-500 rounded-lg"
              onClick={() => deleteEntry()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ViewSingleEntry({ data, onDelete, onEdit }) {
  const [isStarred, setIsStarred] = useState(data?.starred);
  const [deleteEntry, setDeleteEntry] = useState(false);

  async function handleStarredEntries() {
    let journalId = data.id;
    // console.log(journalId);
    try {
      const res = await toggleStarredEntries(journalId);
      setIsStarred(!isStarred);
    } catch (error) {
      console.log("Starred Journal Entry Error : ", error);
    }
  }

  async function deleteJournalEntry() {
    try {
      const response = await deleteJournalEntryById(data.id);
      // console.log(response.data);
      toast.success("Journal Entry Deleted Successfully!", {
        position: "top-center",
      });
      onDelete();
    } catch (error) {
      console.log("Error while deleting the Journal Entry : ", error);
    }
  }

  return (
    <>
      <div className="md:mx-6 pb-2 border-b-2 border-gray-400 ">
        <div className={`${deleteEntry ? "block" : "hidden"}`}>
          <Modal
            setDeleteEntry={setDeleteEntry}
            deleteEntry={deleteJournalEntry}
          />
        </div>
        {/* Title and Buttons */}
        <div className="mx-4 md:mx-0 flex flex-col md:flex-row items-center justify-between pb-2  ">
          <div className="w-full md:w-1/3">
            <h1 className="text-2xl font-bold mt-4">{data?.title}</h1>
            <div>
              <span className="text-gray-400 text-[10px] md:text-[12px] font-medium">
                {new Date(data?.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
              <span className="text-[10px] md:text-[12px] pl-2 font-medium text-gray-500 ">
                MOOD: {data?.mood}
              </span>
              {/* Tags */}
              <div className="mt-1 flex gap-2 items-center ">
                {data?.tags.map((tag) => {
                  return (
                    <div
                      className="flex gap-1 items-start justify-start"
                      key={tag}
                    >
                      <img src="/tags.svg" alt="Tags" className="w-[16px]" />
                      <p className="text-[10px] md:text-[12px] text-gray-400 font-medium">
                        {tag}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Starred Button */}
          <div className="w-full ml-2 md:ml-0 mt-4 md:mt-0 md:w-1/5 lg:w-1/7 flex gap-4 md:gap-8 mr-5">
            <button onClick={() => handleStarredEntries()}>
              <img
                src={`${isStarred ? "/star.svg" : "/empty-star.svg"} `}
                alt="Starred"
                className="w-7"
              />
            </button>
            {/* Edit Button */}
            <button onClick={() => onEdit()}>
              <img src="/edit.svg" alt="Edit" className="w-7" />
            </button>
            {/* Delete Button */}
            <button onClick={() => setDeleteEntry((prev) => !prev)}>
              <img src="/delete.svg" alt="Delete" className="w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Journal Content */}
      <div className="ql-container ql-snow md:px-6" style={{ border: "none" }}>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </>
  );
}

export default ViewSingleEntry;
