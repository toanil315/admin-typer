import React from "react";
import { BookmarkIcon } from "@heroicons/react/outline";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_PREVIEW } from "../redux/types/PreviewType";

export default function Preview({}) {

  const { visible, postPreview } = useSelector((state) => state.PreviewReducer);
  const dispatch = useDispatch()

  return visible ? (
    <div className="fixed top-0 h left-0 w-screen h-full  z-40 p-12">
      <div onClick={() => {dispatch({type: HIDE_PREVIEW})}} className="absolute top-0 left-0 w-full h-full bg-slate-700 bg-opacity-60 z-[45]"></div>
      <main className="relative z-50 py-10 mx-auto w-[850px] h-full bg-white rounded-xl overflow-y-scroll">
        <section className="max-w-7xl mx-auto p-4 pb-0">
          <div className="flex gap-x-6 mb-4">
            <span className="text-sm font-bold text-red-500 px-4 py-1 border-2 border-red-500 rounded-full cursor-pointer ">
              GALLERY
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-wider leading-snug mb-6">
            Happy Bubble Time With Your Friends!
          </h1>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img className="h-14 w-14 rounded-full mr-3" src={postPreview?.author?.avatar} alt="avatar" />
              <div>
                <h4 className="font-semibold text-gray-800 cursor-default">
                  Written by{" "}
                  <span className="hover:text-red-500 transition duration-200 ease-out">
                    {postPreview?.author?.name}
                  </span>
                </h4>
                <p className="text-sm font-semibold text-gray-500">Posted on {postPreview?.createdAt}</p>
              </div>
            </div>
            <BookmarkIcon className="h-7 hover:text-red-500 transition duration-200 ease-out cursor-pointer" />
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 py-2">
          <div className="pb-2">
            <img
              className="block w-full max-h-[600px] object-cover rounded-xl"
              src={postPreview?.mainImg}
              alt="banner"
            />
          </div>
          <div className="flex flex-col gap-y-4 post-content">{postPreview ? parse(postPreview?.body) : ""}</div>
          <div className="flex gap-x-4 mt-10">
            <p className="px-5 py-1 rounded-sm bg-red-500 text-white font-bold text-sm border-2 border-red-500 cursor-default hover:bg-white hover:text-red-500 transition duration-150 ease-out">
              Gallery
            </p>
          </div>
        </section>
      </main>
    </div>
  ) : (
    ""
  );
}
