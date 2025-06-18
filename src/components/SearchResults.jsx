import React from "react";

function SearchResults({ data, setView }) {
  function stripHtml(content) {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent;
    return text;
  }

  return (
    <>
      {data === null ? (
        <>
          <div className="h-full w-full flex flex-col gap-2 items-center justify-center">
            <div className="text-4xl font-bold ">No Journal Entry Found</div>
            <p className="text-md text-gray-500 mt-2">
              Try adjusting your filters or search terms.
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1 className="text-2xl my-4 font-medium pl-4">Search Results: </h1>
            {data.map((journal) => (
              <div
                className="flex w-full border-b-1 h-18 items-center px-4 hover:cursor-pointer hover:bg-gray-200"
                key={journal.id}
                onClick={() => setView({ type: "Entry", data: journal })}
              >
                <img src="/journal.svg" alt="Journal" className="w-10" />
                <div>
                  <h1 className="pl-4 text-lg font-medium">{journal.title}</h1>
                  <p className="pl-4 text-sm">
                    {stripHtml(journal.content).slice(0, 150) + "...."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default SearchResults;
