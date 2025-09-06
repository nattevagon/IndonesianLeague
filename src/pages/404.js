import React from 'react'

const NotFound = () => {
  return (
    <div className="container flex items-center justify-center h-[500px]">
      404 Error Not Found
    </div>
  )
}

NotFound.getLayout = function getLayout(page) {
  return <div>{page}</div>;
};


export default NotFound