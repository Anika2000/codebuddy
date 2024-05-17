import React from 'react'

const MainLayout = ({childOne, childTwo}) => {
  return (
    <>
    <main className="grid grid-cols-1 md:grid-cols-5 mx-auto">
        <div className="col-span-4">
            {childOne}
        </div>
        <div className="col-span-1">
            {childTwo}
        </div>
    </main>
    </>
  )
}

export default MainLayout