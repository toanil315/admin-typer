import React, { useEffect, useRef, useState } from "react";
import { PlusCircleIcon, PhotographIcon, CheckCircleIcon } from "@heroicons/react/outline";
import style from "./Editable.module.css";
import { uploadImageService } from "../../services/UploadImageServices";
import parse from "html-react-parser";

export default function EditablePost({ item, setBodyContent, insertBodyContent }) {
  const [editableContent, setEditableContent] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [isEditting, setIsEditting] = useState(true);

  useEffect(() => {
    setEditableContent({
      title: item.title,
      content: item.content,
      image: item.image,
    })
  }, [])

  

  const fileUploadRef = useRef(null);
  const handleFileUpload = async (files) => {
    try {
      const data = await uploadImageService.upload(files);
      setEditableContent({
        ...editableContent,
        image: `<p><img className="block w-4/6 object-cover mx-auto" src=${data.secure_url} alt=${data.secure_url} /></p>`,
      });
    } catch (error) {
      console.log("error", { ...error });
    }
  };

  const itemContent = `<h2>${editableContent["title"]}</h2> <p>${editableContent["content"]}</p> ${editableContent["image"]}`;

  return (
    <>
      {isEditting ? (
        <div className="w-full flex items-center my-4">
          <div className="flex flex-col justify-center pr-1">
            <CheckCircleIcon
              onClick={() => {
                setBodyContent(editableContent);
                setIsEditting(false);
              }}
              className="h-10 w-10 text-gray-300 hover:text-red-500 transition duration-150 ease-out cursor-pointer"
            />
            <PlusCircleIcon
              onClick={() => {
                insertBodyContent()
              }}
              className="h-10 w-10 mt-2 text-gray-300 hover:text-red-500 transition duration-150 ease-out cursor-pointer"
            />
            
          </div>
          <div style={{ width: "calc(100% - 2.5rem)" }} className="pl-4 border-l-2 border-gray-300">
            <div
              onInput={(e) =>
                setEditableContent({
                  ...editableContent,
                  title: e.currentTarget.textContent,
                })
              }
              className="border-0 focus:outline-none w-full text-gray-800 font-semibold text-3xl mb-3 cursor-text"
              contentEditable
              data-placeholder="Title"
              suppressContentEditableWarning={true}
            >
              {item.title}
            </div>
            <div
              onInput={(e) =>
                setEditableContent({
                  ...editableContent,
                  content: e.currentTarget.textContent,
                })
              }
              className="border-0 focus:outline-none w-full cursor-text"
              contentEditable
              data-placeholder="Tell your story here..."
              suppressContentEditableWarning={true}
            >
              {item.content}
            </div>
            <div>
              {!!editableContent.image ? (
                <div className="mt-3">{parse(editableContent.image)}</div>
              ) : (
                <>
                  <input
                    onChange={(event) => {
                      handleFileUpload(event.target.files);
                    }}
                    style={{ display: "none" }}
                    type="file"
                    ref={fileUploadRef}
                  />
                  <button
                    className="pt-3 "
                    onClick={() => {
                      fileUploadRef.current.click();
                    }}
                  >
                    <PhotographIcon className="h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setIsEditting(true);
          }}
        >
          {parse(itemContent)}
        </div>
      )}

    </>
  );
}
