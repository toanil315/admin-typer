import React, { useRef, useState } from "react";
import InputField from "../components/InputField";
import EditorTinyMCE from "../components/EditorTinyMCE";

export default function CreatePost() {

  return (
    <div>
      <form className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl text-gray-700 font-bold mb-4 tracking-wide">
          Blog Post Submission Form
        </h2>
        <InputField title={"Title"} type="text" placeholder="Enter blog title" />
        <InputField title={"Banner Image"} type="text" placeholder="Enter blog title" />
        <InputField title={"Description"} typeComponent="text-area" type="text" placeholder="Enter blog title"  />
        <EditorTinyMCE title="Body" />
        <button className="px-6 py-2 font-semibold text-white rounded-md bg-red-500 block mt-4 hover:bg-red-700 transition duration-200 ease-out ml-auto">
          Create Post
        </button>
      </form>
    </div>
  );
}
