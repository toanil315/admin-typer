import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'

function AdminLayout({children, namePage}) {

    useEffect(() => {
        //Call API get User Info...
    }, [])

    console.log("render admin layout")

  return (
    <main className='flex'>
        <section className='w-1/5'>
            <SideBar />
        </section>
        <section className='flex-grow'>
            <div style={{backgroundColor: "#20222A"}} className="w-full flex items-center justify-between px-4 py-2">
                <h3 className='font-semibold text-xl text-white'>{namePage}</h3>
                <div className='flex items-center'>
                    <img className='h-12 w-12 rounded-full mr-2' src="https://typer.seventhqueen.com/publisher/wp-content/uploads/sites/2/front-user-profile/1571672984_mangusta.jpg" alt="avatar" />
                    <span className='font-semibold text-white'>Steve</span>
                </div>
            </div>
            <div style={{backgroundColor: "#EDF1F5"}}>
                {children}
            </div>
        </section>
    </main>
  )
}

export default AdminLayout;