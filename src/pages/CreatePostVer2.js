import React, { useEffect, useRef, useState } from "react";
import { BookmarkIcon, UploadIcon } from "@heroicons/react/outline";
import EditablePost from "../components/EditablePost/EditablePost";
import { uploadImageService } from "../services/UploadImageServices";
import { Select } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addPost, fetchCategory, fetchPost, updatePost } from "../services/BaseServices";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/types/LoadingType";

export default function CreatePostVer2() {
  const { id } = useParams()
  const [categories, setCategory] = useState([])
  const { userInfo } = useSelector(state => state.UserReducer)
  const navigate = useNavigate()

  const [post, setPost] = useState({
    name: "",
    description: "",
    mainImg: null,
    author: {
      userId: "",
      userName: "",
      avatar: "",
    },
    category: null,
    body: [
      {
        bodyId: Date.now().toString(),
        tittleBody: "",
        content: "",
        imageBody: "",
      },
    ],
    createAt: "",
  });
  const dispatch = useDispatch()

  useEffect(() => {
    const handleFetchCategory = async () => {
      const data = await fetchCategory()
      if (data) {
        setCategory(data)
      }
    }

    const handleFetchPost = async (id) => {
      dispatch({ type: SHOW_LOADING })
      const post = await fetchPost(id)
      console.log("after fetch", post)
      if (post) {
        setPost(post)
        setTimeout(() => {
          dispatch({ type: HIDE_LOADING })
        }, 400);
      }
    }

    handleFetchCategory()

    if (id) {
      console.log("fetched post")
      handleFetchPost(id)
    }
  }, [])

  useEffect(() => {
    if (userInfo.userId && !id) {
      setPost(post => ({
        ...post,
        author: {
          userId: userInfo?.userId,
          userName: userInfo?.userName,
          avatar: userInfo?.avatar,
        },
      }))
    }
  }, [userInfo.userId])


  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const fileUploadRef = useRef(null);

  const handleFileUpload = async (files) => {
    try {
      const data = await uploadImageService.upload(files);
      setPost({ ...post, mainImg: data.secure_url });
    } catch (error) {
      console.log("error: ", { ...error });
    }
  };

  const setBodyContent = (index) => {
    return (editableContent) => {
      let bodyClone = [...post.body];
      bodyClone[index] = { ...bodyClone[index], ...editableContent };
      setPost({ ...post, body: bodyClone });
    };
  };

  const insertBodyContent = (currentIndex) => {
    return () => {
      let bodyClone = [...post.body];
      bodyClone.splice(currentIndex + 1, 0, {
        bodyId: Date.now().toString(),
        tittleBody: "",
        content: "",
        imageBody: "",
      });
      setPost({ ...post, body: bodyClone });
    };
  };

  const handleChangeCategory = (value) => {
    const cate = categories.find((item) => item.categoryId === value);
    setPost({ ...post, category: cate });
  };

  const handlePublish = async () => {
    // handle content
    let postClone = { ...post }
    postClone.body = postClone.body.map((bodyItem, index) => {
      return {
        ...bodyItem,
        tittleBody: `<h2>${bodyItem.tittleBody}</h2>`,
        content: `<p>${bodyItem.content}</p>`,
      }
    })

    //create at
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let nameMonth = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const strDate = `${nameMonth} ${day}, ${year}`;
    postClone.createAt = strDate

    //submit
    let result = false
    if (postClone.postId) {
      postClone.body = postClone.body.map((bodyItem, index) => {
        return {
          ...bodyItem,
          postId: postClone.postId
        }
      })
      result = await updatePost(postClone)
    }
    else {
      postClone = { ...postClone, categoryId: postClone.category.categoryId }
      postClone = { ...postClone, userId: postClone.author.userId }

      delete postClone.category
      delete postClone.author

      postClone.postId = Date.now().toString()
      result = await addPost([postClone])
    }

    if (result) {
      navigate("/")
    }
  };


  return (
    <div>
      <div className="py-6 mx-auto mb-4 p-4 w-[950px] h-full bg-white rounded-xl shadow-lg">
        <h4>Description:</h4>
        <textarea
          onChange={handleChange}
          name="description"
          value={post.description}
          className="focus:outline-none border-0 w-full text-gray-500 font-semibold text-lg leading-relaxed resize-none"
          placeholder="Type something..."
          rows={4}
        />
      </div>
      <div className="py-6 mx-auto mb-4 p-4 w-[950px] h-full bg-white rounded-xl shadow-lg">
        <h4 className="mb-2">Categories:</h4>
        <Select
          value={post?.category?.categoryId}
          placeholder="Please select categories"
          size="large"
          onChange={handleChangeCategory}
          style={{ width: "100%" }}
          options={categories.map((cate, index) => ({ label: cate.categoryName, value: cate.categoryId }))}
        ></Select>
      </div>
      <main className="py-6 mx-auto w-[950px] h-full bg-white rounded-xl shadow-lg">
        <section className="max-w-7xl mx-auto p-4 pb-0">
          <div className="mb-4">
            {!!post.category ? (
              <span className="text-sm font-bold text-red-500 px-4 py-1 border-2 border-red-500 rounded-full cursor-pointer ">
                {post.category.categoryName}
              </span>
            ) : (
              ""
            )}
          </div>
          <input
            onChange={handleChange}
            name="name"
            value={post.name}
            className="text-4xl w-full font-bold tracking-wider leading-snug mb-6 placeholder-gray-700 focus:border-0 focus:outline-none placeholder:text-gray-300"
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
                    {post.author?.userName}
                  </span>
                </h4>
                {/* <p className="text-sm font-semibold text-gray-500">Posted on September 12, 2022</p> */}
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
              <div
                onClick={() => {
                  fileUploadRef.current.click();
                }}
                className="w-48 mx-auto py-3 rounded text-white text-md bg-red-500 flex justify-center cursor-pointer"
              >
                <UploadIcon className="h-6 pr-2" /> Upload banner
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col post-content">
            {post.body.map((bodyItem, index) => {
              return (
                <EditablePost
                  item={bodyItem}
                  key={bodyItem.bodyId}
                  setBodyContent={setBodyContent(index)}
                  insertBodyContent={insertBodyContent(index)}
                />
              );
            })}
          </div>
          <div className="flex gap-x-4 mt-10">
            {!!post.category ? (
              <p className="px-5 py-1 rounded-sm bg-red-500 text-white font-bold text-sm border-2 border-red-500 cursor-default hover:bg-white hover:text-red-500 transition duration-150 ease-out">
                {post.category.categoryName}
              </p>
            ) : (
              ""
            )}
          </div>
        </section>
      </main>

      <button
        onClick={handlePublish}
        className="block mx-auto mt-12 w-44 h-10 rounded text-white text-lg font-semibold bg-red-500 hover:bg-red-700 cursor-pointer"
      >
        Publish
      </button>
    </div>
  );
}
