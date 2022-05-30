import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { TrashIcon, EyeIcon, PencilIcon } from "@heroicons/react/outline";
import DrawerAntd from "../components/DrawerAntd";
import { useDispatch } from "react-redux";
import { SHOW_DRAWER } from "../redux/types/DrawerType";
import Preview from "../components/Preview";
import { CHANGE_PREVIEW_POST, SHOW_PREVIEW } from "../redux/types/PreviewType";
import { Link } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/types/LoadingType";
import { deletePost } from "../services/BaseServices";

const styleTag = {
  "1": "text-green-700 uppercase bg-green-100 border-green-300",
  "2": "text-red-700 uppercase bg-red-100 border-red-300",
  "3": "text-blue-700 uppercase bg-blue-100 border-blue-300",
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  const fetchPost = async () => {
    try {
      dispatch({ type: SHOW_LOADING })
      const { data, status } = await axios({
        url: "http://127.0.0.1:8000/posts",
        method: "GET",
      })
      if (status === 200) {
        setPosts(data)
        setTimeout(() => {
          dispatch({ type: HIDE_LOADING })
        }, 400);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: "25%",
      render: text => <p className="mb-0">{text.length > 38 ? text.slice(0, 38) + "..." : text}</p>
    },
    {
      title: 'Banner',
      dataIndex: 'mainImg',
      key: 'mainImg',
      width: "10%",
      render: (text) => <img className="h-10 w-10 object-cover" src={text} alt={text} />
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: "10%",
      render: (text) => <img className="h-10 w-10 rounded-full" src={text.avatar} alt={text.avatar} />
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: "20%",
      render: (text) => (
        <span key={text.categoryId} className={`px-2 py-1 mr-1 text-[0.7rem] border rounded-sm ${styleTag[text.categoryId]}`}>{text.categoryName}</span>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createAt',
      key: 'createAt',
      width: "15%",
    },
    {
      title: 'Actions',
      dataIndex: 'postId',
      key: 'postId',
      width: "15%",
      render: (text, record) => (
        <div className="flex justify-between">
          <button onClick={() => {
            handlePreivew(record)
          }} title="View" className="p-2 bg-green-500 text-white rounded-md transition duration-200 ease-in hover:bg-green-600"><EyeIcon className="h-5" /></button>
          <Link to={`/publish/${record.postId}`}><button title="Update" className="p-2 bg-blue-500 text-white rounded-md transition duration-200 ease-in hover:bg-blue-600"><PencilIcon className="h-5" /></button></Link>
          <button onClick={() => { handleDelete(record.postId) }} title="Delete" className="p-2 bg-red-500 text-white rounded-md transition duration-200 ease-in hover:bg-red-600"><TrashIcon className="h-5" /></button>
        </div>
      )
    },
  ];

  const handlePreivew = (record) => {
    dispatch({
      type: CHANGE_PREVIEW_POST,
      payload: {
        postPreview: record
      }
    })
    dispatch({ type: SHOW_PREVIEW })
  }

  const handleDelete = async (postId) => {
    const result = await deletePost(postId)
    if (result) {
      setVisible(false)
      await fetchPost()
    }
  }

  return (
    <>
      <ConfirmModal visible={visible} setVisible={setVisible} title="Are you sure to delete this post?" handleConfirm={handleDelete} />
      <Preview />
      <main className="w-[97%] mx-auto bg-white">

        <DrawerAntd />
        <Table rowKey={record => record.postId} columns={columns} dataSource={posts} pagination={{ position: ["bottomCenter"] }} />
      </main>
    </>
  );
}
