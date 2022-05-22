import React, { } from "react";
import { Table } from "antd";
import { TrashIcon, EyeIcon, PencilIcon } from "@heroicons/react/outline";
import DrawerAntd from "../components/DrawerAntd";
import { useDispatch } from "react-redux";
import { SHOW_DRAWER } from "../redux/types/DrawerType";
import Preview from "../components/Preview";
import { CHANGE_PREVIEW_POST, SHOW_PREVIEW } from "../redux/types/PreviewType";
import { Link } from "react-router-dom";

const fakeData = [
  {
    id: 1,
    name: "Revealing a Deeper Nature in Illustrations",
    description: "There exist many similar, albeit lesser known, forms of art. The artwork used in gallery, museum...",
    mainImg: "https://cdn.seventhqueen.com/typer.sq/wp-content/uploads/sites/2/2019/08/22115903/illustration_hills_04.min_-700x700.jpg",
    author: {
      id: 1,
      name: "Mangusta Rust",
      avatar: "https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg",
    },
    category: {
      id: 1,
      categoryName: "WORLDWIDE",
    },
    body: `
        <h2>Test title</h2>
        <p>The best time with your friends is the weekdays! We’re celebrating our Bubble Time milestone of 5 years! We’re hosting a bubble-stamp party on Tuesday night featuring live entertainment, face painting, bubble balloons, bubble rings, and a giant Bubble Time teddy bear!</p>
        <p>Come out, play the bubble bubble game on our Bubble Time teddy bear or play an amazing game of Bubble Time, just like on Nickelodeon Kids!</p>
        <p><img src="https://cdn.seventhqueen.com/typer.sq/wp-content/uploads/sites/2/2019/08/22115731/bubble_tea_01.min_-819x1024.png" alt="post image" /></p>
        <p>Spikey the Bubble Bobble debuted in A Fidgety Fowl’s Tale!, under the ownership of Fluttershy and Rainbow Dash, taking over Fluttershy’s home in Painted Friendship. As time went on, Spikey became a much larger annoyance to Twilight Sparkle. When Twilight asked her to send some more toys for Spikey to keep the home in check, Twilight decided to give them all to Spikey by giving him the entire collection of Fidgety Fowl Toys, which Spikey immediately loved.</p>
        <p></p>
        <p>Spikey was later placed under Spikey’s care and he returned to his roots in Hoofington Bay to find his dream of a better life being ripped away from him.</p>
    `,
    createdAt: "October 6, 2019",
  },
  {
    id: 2,
    name: "Revealing a Deeper Nature in Illustrations",
    description: "There exist many similar, albeit lesser known, forms of art. The artwork used in gallery, museum...",
    mainImg: "https://cdn.seventhqueen.com/typer.sq/wp-content/uploads/sites/2/2019/08/22115903/illustration_hills_04.min_-700x700.jpg",
    author: {
      id: 1,
      name: "Mangusta Rust",
      avatar: "https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg",
    },
    category: {
      id: 1,
      categoryName: "WORLDWIDE",
    },
    createdAt: "October 6, 2019",
  },
  {
    id: 3,
    name: "Revealing a Deeper Nature in Illustrations",
    description: "There exist many similar, albeit lesser known, forms of art. The artwork used in gallery, museum...",
    mainImg: "https://cdn.seventhqueen.com/typer.sq/wp-content/uploads/sites/2/2019/08/22115903/illustration_hills_04.min_-700x700.jpg",
    author: {
      id: 1,
      name: "Mangusta Rust",
      avatar: "https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg",
    },
    category: {
      id: 3,
      categoryName: "TECH",
    },
    createdAt: "October 6, 2019",
  },
  {
    id: 4,
    name: "Revealing a Deeper Nature in Illustrations",
    description: "There exist many similar, albeit lesser known, forms of art. The artwork used in gallery, museum...",
    mainImg: "https://cdn.seventhqueen.com/typer.sq/wp-content/uploads/sites/2/2019/08/22115903/illustration_hills_04.min_-700x700.jpg",
    author: {
      id: 1,
      name: "Mangusta Rust",
      avatar: "https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg",
    },
    category: {
      id: 2,
      categoryName: "GALLERY",
    },
    createdAt: "October 6, 2019",
  },
]

const styleTag = {
  1: "text-green-700 uppercase bg-green-100 border-green-300",
  2: "text-red-700 uppercase bg-red-100 border-red-300",
  3: "text-blue-700 uppercase bg-blue-100 border-blue-300",
}

export default function Home() {
  const dispatch = useDispatch()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: "25%",
      render: text => <p className="mb-0">{text.length > 38 ? text.slice(0, 38) + "...": text}</p>
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
        <span key={text.id} className={`px-2 py-1 mr-1 text-[0.7rem] border rounded-sm ${styleTag[text.id]}`}>{text.categoryName}</span>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: "15%",
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      width: "15%",
      render: (text, record) => (
        <div className="flex justify-between">
          <button onClick={() => {
            handlePreivew(record)
          }} title="View" className="p-2 bg-green-500 text-white rounded-md transition duration-200 ease-in hover:bg-green-600"><EyeIcon className="h-5" /></button>
          <Link to={`/publish/${record.id}`}><button title="Update" className="p-2 bg-blue-500 text-white rounded-md transition duration-200 ease-in hover:bg-blue-600"><PencilIcon className="h-5" /></button></Link>
          <button title="Delete" className="p-2 bg-red-500 text-white rounded-md transition duration-200 ease-in hover:bg-red-600"><TrashIcon className="h-5" /></button>
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
    dispatch({type: SHOW_PREVIEW})
  }

  return (
    <>
    <Preview />
    <main className="w-[97%] mx-auto bg-white">
      
      <DrawerAntd />
      <Table rowKey={record => record.id} columns={columns} dataSource={fakeData} pagination={{position: ["bottomCenter"]}} />
    </main>
    </>
  );
}
