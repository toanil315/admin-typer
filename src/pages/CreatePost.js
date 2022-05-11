import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {EDITOR_API_KEY} from "../utils/utils"
import axios from "axios";
import loadingEditorGif from "../assets/img/loading-editor.gif"

export default function CreatePost() {
  const [editorContent, setEditorContent] = useState("");
  const [loadingEditor, setLoadingEditor] = useState(false);
  const fileUploadRef = useRef(null);

  const handleEditorChange = (value) => {
    console.log(value);
    setEditorContent(value);
  };

  const handleFileUpload = async (files) => {
    if (!!files[0]) {
      const formUpload = new FormData();
      formUpload.append("file", files[0]);
      formUpload.append("upload_preset", "typer-upload");

      const {data, status} = await axios({
        url: "https://api.cloudinary.com/v1_1/toanil315/image/upload",
        method: "POST",
        data: formUpload,
      })
      
      if(status === 200) {
        setEditorContent(`
            ${editorContent}
            <p><img src="${data.secure_url}" alt="${data.secure_url}" /></p>
        `)
        setLoadingEditor(false);
      }

    } else {
      setLoadingEditor(false);
    }
  };

  return (
    <div>
      <form className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl text-gray-700 font-bold mb-4 tracking-wide">
          Blog Post Submission Form
        </h2>
        <div>
          <p className="font-semibold text-gray-700 mb-2">Title:</p>
          <input className="form-input" type="text" placeholder="Enter blog title" />
        </div>
        <div>
          <p className="font-semibold text-gray-700 mb-2">Banner Image:</p>
          <input className="form-input" type="text" placeholder="Enter blog title" />
        </div>
        <div>
          <p className="font-semibold text-gray-700 mb-2">Description:</p>
          <textarea
            className="form-input h-28"
            type="text"
            placeholder="Enter blog description..."
          />
        </div>
        <div>
          <p className="font-semibold text-gray-700 mb-2">Body:</p>
          <div className="h-[400px] relative">
            {loadingEditor ? (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 z-20">
                <img className="h-10" src={loadingEditorGif} alt="loading" />
              </div>
            ) : (
              ""
            )}
            <Editor
              value={editorContent}
              name="description"
              onEditorChange={handleEditorChange}
              apiKey={EDITOR_API_KEY}
              init={{
                height: 400,
                menubar: false,
                resize: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help | myCustomToolbarButton",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                setup: (editor) => {
                  editor.ui.registry.addButton("myCustomToolbarButton", {
                    icon: "image",
                    tooltip: "add image",
                    onAction: () => {
                      fileUploadRef.current.click();
                    },
                  });
                },
              }}
            />
          </div>
          <input
            onChange={(event) => {
              setLoadingEditor(true);
              handleFileUpload(event.target.files);
            }}
            style={{ display: "none" }}
            type="file"
            ref={fileUploadRef}
          />
        </div>
        <button className="px-6 py-2 font-semibold text-white rounded-md bg-red-500 block mt-4 hover:bg-red-700 transition duration-200 ease-out ml-auto">
          Create Post
        </button>
      </form>
    </div>
  );
}
