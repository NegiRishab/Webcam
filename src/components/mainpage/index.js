import React, { useState } from 'react'
import WebcamRecord from './WebcamRecord'

export default function Recording() {
  const [webcam1,setWebCam]=useState(false)
  const [screenrecord,setscreenrecore]=useState(false)
  const [audio,setaudio]=useState(false)

  const handlewhichOpen=(data)=>{
     if(data===1){
      setWebCam(true);
      setscreenrecore(false);
      setaudio(false)
     }else if(data===2){
      setWebCam(false);
      setscreenrecore(true);
      setaudio(false)
     }else{
      setWebCam(false);
      setscreenrecore(false);
      setaudio(true)
     }
  }
  return (
    <div>
      <h1>recording start
        <WebcamRecord/>
      </h1>
    </div>
  )
}
