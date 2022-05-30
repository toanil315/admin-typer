import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../components/SideBar'
import { SET_USER_INFO } from '../redux/types/UserType';
import { TOKEN } from '../utils/utils';

function AdminLayout({ children, namePage }) {

    const { userInfo } = useSelector(state => state.UserReducer)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()


    if (!localStorage.getItem(TOKEN) && !searchParams.get('token')) {
        window.location.href = "http://localhost:3000";
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data, status } = await axios({
                    url: 'http://127.0.0.1:8000/users/1',
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                    }
                })

                if (status === 200) {
                    dispatch({
                        type: SET_USER_INFO,
                        payload: {
                            userInfo: data
                        }
                    })
                }
            }
            catch (error) {
                window.location.href = "http://localhost:3000";
            }
        }


        if (searchParams.get('token')) {
            localStorage.setItem(TOKEN, searchParams.get('token'));
            navigate("/")
        }

        fetchUserInfo();

    }, [])

    return (
        <main className='flex'>
            <section className='w-1/5'>
                <SideBar />
            </section>
            <section className='min-h-screen flex-grow' style={{ backgroundColor: "#EDF1F5" }}>
                <div style={{ backgroundColor: "#20222A" }} className="w-full flex items-center justify-between px-4 py-2">
                    <h3 className='font-semibold text-xl text-white'>{namePage}</h3>
                    <div className='flex items-center'>
                        <img className='h-12 w-12 rounded-full mr-2' src={userInfo?.avatar} alt="avatar" />
                        <span className='font-semibold text-white'>{userInfo?.userName}</span>
                    </div>
                </div>
                <div className="py-6">
                    {children}
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default AdminLayout;