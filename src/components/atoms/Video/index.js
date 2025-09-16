import React from 'react'

const Video = ({ src }) => {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  )
}

export default Video