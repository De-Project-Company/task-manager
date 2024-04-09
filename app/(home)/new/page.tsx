"use client";

import React, { useState } from "react";

// const TaggableTextarea: React.FC = () => {
//   const [textareaContent, setTextareaContent] = useState<string>("");
//   const [showTagList, setShowTagList] = useState<boolean>(false);
//   const [caretPosition, setCaretPosition] = useState<number>(0); // To track caret position
//   const [selectedPerson, setSelectedPerson] = useState<string>("");
//   const [tagged, setTagged] = useState<boolean>(false); // Track if a person has been tagged

//   // List of people on the platform
//   const peopleList: string[] = ["John", "Jane", "Alice", "Bob"];

// const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   const content: string = e.target.value;
//   setTextareaContent(content);

//   // Check if "@" is typed or if the text is "!@"
//   const caretIndex: number = e.target.selectionStart || 0;
//   const lastAt: number = content.lastIndexOf("@", caretIndex);

//   if (lastAt !== -1 && lastAt < caretIndex && content[lastAt + 1] !== "!") {
//     if (lastAt === 0 || content.charAt(lastAt - 1) === " ") {
//       // Check if "@" is preceded by space or at the beginning of the content
//       if (!tagged) {
//         setShowTagList(true);
//         setCaretPosition(lastAt);
//       } else {
//         setShowTagList(false);
//       }
//     }
//   } else {
//     setShowTagList(false);
//     if (tagged) {
//       setTagged(false);
//     }
//   }

//   // Reset tagged state if "@" is typed again
//   if (content.charAt(caretIndex - 1) === "@" && tagged) {
//     setTagged(false);
//   }
// };

//   const handleTagSelection = (person: string) => {
//     // Add the selected person to the textarea content at the caret position
//     const newContent: string =
//       textareaContent.slice(0, caretPosition) +
//       `@${person} ` +
//       textareaContent.slice(caretPosition).replace(/^@+/, "");
//     setTextareaContent(newContent);
//     // Hide the tag list
//     setShowTagList(false);
//     setSelectedPerson(person);
//     setTagged(true); // Set tagged state to true after tagging a person
//   };

//   return (
//     <div className="flex items-center justify-center w-full">
//       <textarea
//         value={textareaContent}
//         onChange={handleInputChange}
//         style={{ border: "1px solid #ccc", padding: "5px" }}
//       />
//       {showTagList && !tagged && (
//         <div>
//           <p>Select a person:</p>
//           <ul>
//             {peopleList.map((person, index) => (
//               <li key={index} onClick={() => handleTagSelection(person)}>
//                 {person}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaggableTextarea;

const TaggableTextarea: React.FC = () => {
  const [textareaContent, setTextareaContent] = useState<string>("");
  const [showPeopleList, setShowPeopleList] = useState<boolean>(false);
  const [showProjectsList, setShowProjectsList] = useState<boolean>(false);
  const [caretPosition, setCaretPosition] = useState<number>(0); // To track caret position
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // List of people and projects
  const peopleList: string[] = ["John", "Jane", "Alice", "Bob"];
  const projectList: string[] = ["ProjectA", "ProjectB", "ProjectC"];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content: string = e.target.value;
    setTextareaContent(content);

    // Check if "@" or "#" is typed
    const caretIndex: number = e.target.selectionStart || 0;
    const lastAt: number = content.lastIndexOf("@", caretIndex);
    const lastHash: number = content.lastIndexOf("#", caretIndex);

    if (lastAt !== -1 && lastAt < caretIndex && content[lastAt + 1] !== "!") {
      setShowPeopleList(true);
      setShowProjectsList(false);
      setCaretPosition(lastAt);
    } else if (lastHash !== -1 && lastHash < caretIndex) {
      setShowPeopleList(false);
      setShowProjectsList(true);
      setCaretPosition(lastHash);
    } else {
      setShowPeopleList(false);
      setShowProjectsList(false);
    }
  };

  const handlePersonSelection = (person: string) => {
    setSelectedPeople([...selectedPeople, person]);
    appendTag(`@${person} `);
  };

  const handleProjectSelection = (project: string) => {
    setSelectedProjects([...selectedProjects, project]);
    appendTag(`#${project} `);
  };

const appendTag = (tag: string) => {
  // Remove trailing "@" or "#"
  const newContent: string =
    textareaContent.slice(0, caretPosition) +
    tag +
    textareaContent.slice(caretPosition).replace(/^[@#]+/, "");

  setTextareaContent(newContent);
  // Hide the tag lists
  setShowPeopleList(false);
  setShowProjectsList(false);
};


  return (
    <div className="items-center justify-center h-screen w-full">
      <textarea
        value={textareaContent}
        onChange={handleInputChange}
        style={{ border: "1px solid #ccc", padding: "5px" }}
      />
      {showPeopleList && (
        <div>
          <p>Select people:</p>
          <ul>
            {peopleList.map((person, index) => (
              <li key={index} onClick={() => handlePersonSelection(person)}>
                {person}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showProjectsList && (
        <div>
          <p>Select projects:</p>
          <ul>
            {projectList.map((project, index) => (
              <li key={index} onClick={() => handleProjectSelection(project)}>
                {project}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaggableTextarea;
