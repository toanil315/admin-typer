import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar'

function AdminLayout({children, namePage}) {

    useEffect(() => {
        //Call API get User Info...
    }, [])

  return (
    <main className='flex'>
        <section className='w-1/5'>
            <SideBar />
        </section>
        <section className='min-h-screen flex-grow' style={{backgroundColor: "#EDF1F5"}}>
            <div style={{backgroundColor: "#20222A"}} className="w-full flex items-center justify-between px-4 py-2">
                <h3 className='font-semibold text-xl text-white'>{namePage}</h3>
                <div className='flex items-center'>
                    <img className='h-12 w-12 rounded-full mr-2' src="https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg" alt="avatar" />
                    <span className='font-semibold text-white'>Steve</span>
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