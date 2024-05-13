import React from 'react'

function MenuItem() {
  return (
    <div className="bg-babyYellow p-4 rounded-lg text-center" >
        <img src="/cheetos.webp" alt="cheetos"/>
        <h4 className="font-semibold text-lg my-3">Cheetos</h4>
        <p className="text-sm">125gr "Descripcion"</p>
        <button className="bg-yellow font-semibold rounded-2xl px-6 py-2 mt-3">Add to cart $25</button>
    </div>
  )
}

export default MenuItem