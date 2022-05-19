import React, { useRef, useState } from "react";
import { BookmarkIcon, UploadIcon, PlusCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import EditablePost from "../components/EditablePost/EditablePost";
import { uploadImageService } from "../services/UploadImageServices";

export default function CreatePostVer2() {
  const [post, setPost] = useState({
    name: "",
    description: "",
    mainImg: null,
    author: {
      id: 1,
      name: "Mangusta Rust",
      avatar:
        "https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg",
    },
    category: [
      {
        id: 1,
        categoryName: "WORLDWIDE",
      },
      {
        id: 2,
        categoryName: "GALLERY",
      },
    ],
    body: "",
    createdAt: "October 6, 2019",
  });

  const [body, setBody] = useState([
    {
      id: Date.now(),
      title: "",
      content: "",
      image: "",
    }
  ])

  const handleChangeName = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const fileUploadRef = useRef(null);

  const handleFileUpload = async (files) => {
    try {
      const data = await uploadImageService.upload(files)
      setPost({...post, mainImg: data.secure_url})
    }
    catch(error) {
      console.log("error: ", {...error})
    }
  };

  const setBodyContent = (index) => {
    return (editableContent) => {
      const bodyClone = [...body]
      bodyClone[index] = {...bodyClone[index], ...editableContent}
      setBody(bodyClone)
    }
  }

  const insertBodyContent = (currentIndex) => {
    return () => {
      let bodyClone = [...body]
      bodyClone.splice(currentIndex + 1, 0, {
        id: Date.now(),
        title: "",
        content: "",
        image: "",
      })
      setBody(bodyClone);
    }
  }

  const handlePublish = () => {
    
  }

  return (
    <div>
      <main className="relative z-50 py-10 mx-auto w-[950px] h-full bg-white rounded-xl overflow-y-scroll">
        <section className="max-w-7xl mx-auto p-4 pb-0">
          <div className="flex gap-x-6 mb-4">
            <span className="text-sm font-bold text-red-500 px-4 py-1 border-2 border-red-500 rounded-full cursor-pointer ">
              GALLERY
            </span>
          </div>
          <input
            onChange={handleChangeName}
            name="name"
            value={post.name}
            className="text-4xl w-full font-bold tracking-wider leading-snug mb-6 placeholder-gray-700 focus:border-0 focus:outline-none"
            placeholder="Enter blog's name here"
            autoComplete="off"
          />
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full mr-3"
                src={
                  "https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg"
                }
                alt="avatar"
              />
              <div>
                <h4 className="font-semibold text-gray-800 cursor-default mb-1">
                  Written by{" "}
                  <span className="hover:text-red-500 transition duration-200 ease-out">
                    Toanil
                  </span>
                </h4>
                <p className="text-sm font-semibold text-gray-500">Posted on September 12, 2022</p>
              </div>
            </div>
            <BookmarkIcon className="h-7 hover:text-red-500 transition duration-200 ease-out cursor-pointer" />
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 py-2">
          <div className="pb-2">
            <input
              onChange={(event) => {
                handleFileUpload(event.target.files);
              }}
              style={{ display: "none" }}
              type="file"
              ref={fileUploadRef}
            />
            {!!post.mainImg ? (
              <img
                className="block w-full max-h-[500px] object-cover rounded-xl"
                src={post.mainImg}
                alt="banner"
              />
            ) : (
              <div onClick={() => {fileUploadRef.current.click();}} className="w-48 mx-auto py-3 rounded text-white text-md bg-red-500 flex justify-center cursor-pointer">
                <UploadIcon className="h-6 pr-2" /> Upload banner
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col post-content">
              {
                body.map((bodyItem, index) => {
                  return <EditablePost item={bodyItem} key={bodyItem.id} setBodyContent={setBodyContent(index)} insertBodyContent={insertBodyContent(index)} />
                })
              }
          </div>
          <div className="flex gap-x-4 mt-10">
            <p className="px-5 py-1 rounded-sm bg-red-500 text-white font-bold text-sm border-2 border-red-500 cursor-default hover:bg-white hover:text-red-500 transition duration-150 ease-out">
              Gallery
            </p>
          </div>
        </section>

        <button onClick={handlePublish} className="block mx-auto mt-12 w-44 h-10 rounded text-white text-lg font-semibold bg-red-500 hover:bg-red-700 cursor-pointer">Publish</button>
      </main>
    </div>
  );
}
