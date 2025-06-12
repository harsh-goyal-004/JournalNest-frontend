import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputField from "./InputField";
import Button from "./Button";
import { toast } from "react-toastify";
import {
  createJournalEntry,
  updateJournalEntryById,
} from "../service/authService";

//React Quill Toolbars
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
  ],
};

function CreateJournal({ onCreate, edit }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (edit !== null) {
      setTitle(edit.title);
      setTags(edit.tags);
      setContent(edit.content);
      setMood(edit.mood);
    }
  }, [edit]);

  const journalTags = {
    WORK: "💼 Work",
    PERSONAL: "🧍Personal",
    HEALTH: "🏥 Health",
    STUDY: "📚 Study",
    TRAVEL: "✈️ Travel",
    IDEAS: "💡 Ideas",
    GOALS: "🎯 Goals",
    FAMILY: "👨‍👩‍👧‍👦 Family",
    MISC: "🗂️ Miscellaneous",
  };

  async function formSubmit(e) {
    e.preventDefault();

    const data = {
      title: title,
      content: content,
      tags: tags,
      mood: mood,
    };
    // New Journal Entry
    if (
      edit === null &&
      title.trim() !== "" &&
      content.replace(/<(.|\n)*?>/g, "").trim() !== ""
    ) {
      try {
        setIsSubmitting(true); //To prevent multiple same requests

        const response = await createJournalEntry(data);
        if (response.status === 201) {
          console.log(response.data);
          toast.success("Journal Entry Created Successfully!", {
            position: "top-center",
          });
          onCreate();

          // Reset the form fields
          setTitle("");
          setContent("");
          setMood("");
          setTags([]);
          setIsSubmitting(false);
        } else {
          toast.info("Please enter both title and journal content", {
            position: "top-center",
          });
          setIsSubmitting(false);
        }
      } catch (error) {
        toast.error("Failed to create journal entry. Please try again.");
        setIsSubmitting(false);
      }
    }
    // For Updating already exisiting Journal Entry
    else if (
      edit !== null &&
      title.trim() !== "" &&
      content.replace(/<(.|\n)*?>/g, "").trim() !== ""
    ) {
      try {
        setIsSubmitting(true); //To prevent multiple same requests

        const response = await updateJournalEntryById(edit.id, data);
        if (response.status === 200) {
          console.log(response.data);
          toast.success("Journal Entry Updated Successfully!", {
            position: "top-center",
          });
          onCreate();

          // Reset the form fields
          setTitle("");
          setContent("");
          setMood("");
          setTags([]);
          setIsSubmitting(false);
        } else {
          toast.info("Please enter both title and journal content", {
            position: "top-center",
          });
          setIsSubmitting(false);
        }
      } catch (error) {
        toast.error("Failed to create journal entry. Please try again.");
        setIsSubmitting(false);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center mb-10 px-4">
        <div className="text-3xl font-medium text-center mt-4">
          <h1>
            {edit !== null ? "Update Journal Entry" : "New Journal Entry"}
          </h1>
        </div>
        <div>
          <form
            onSubmit={(e) => formSubmit(e)}
            className="h-full w-full justify-center items-center px-2 mt-4 font-medium flex flex-col gap-6"
          >
            <div className="w-full">
              <label htmlFor="title" className="text-lg">
                Journal Title :
              </label>
              <InputField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full font-normal"
                name="title"
                id="title"
                placeholder="Enter a Title"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="tags" className="text-lg">
                Journal Tags :
              </label>

              <div className="flex gap-5 items-center flex-wrap ">
                {Object.entries(journalTags).map(([key, tag], index) => (
                  <div className="flex items-center gap-1" key={index}>
                    <input
                      type="checkbox"
                      value={key}
                      name={tag}
                      id={tag}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTags((prev) => [...prev, key]); // add tag in the array
                        } else {
                          setTags((prev) => prev.filter((t) => t !== key)); // remove tag from the array
                        }
                      }}
                      checked={tags.includes(key)}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="mood" className="text-lg">
                Journal Mood :
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                required
                name="mood"
                id="mood"
                className="py-2 w-full px-2 shadow-sm border-2 border-gray-50 rounded-sm font-normal"
              >
                <option value="">Select a Mood</option>
                <option value="HAPPY">😄 Happy</option>
                <option value="SAD">😢 Sad</option>
                <option value="EXCITED">🤩 Excited</option>
                <option value="CALM">😌 Calm</option>
                <option value="ANXIOUS">😟 Anxious</option>
                <option value="STRESSED">😣 Stressed</option>
                <option value="NEUTRAL">😐 Neutral</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="content" className="text-lg">
                Journal Content :
              </label>
              <div className="w-full rounded-sm shadow-sm border-2 border-gray-50">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  className="h-[80vh] overflow-hidden"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full uppercase tracking-wide ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              {edit === null
                ? isSubmitting
                  ? "Saving..."
                  : "Save Journal Entry"
                : isSubmitting
                ? "Updating..."
                : "Update Journal Entry"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateJournal;
