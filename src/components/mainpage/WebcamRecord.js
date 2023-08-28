


import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from "axios";

function WebcamStreamCapture() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const accessToken=localStorage.getItem('token');
  const userid=localStorage.getItem('userId');

  const handleStartCaptureClick =() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => [...prev, data]);
    }
  }

  const handleStopCaptureClick =() => {
    mediaRecorderRef.current.stop();
    createVideoFile(recordedChunks)
    setCapturing(false);
  }
  const createVideoFile = useCallback(chunks => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const file = new File([blob], 'captured-video.webm', { type: 'video/webm' });
    console.log(file)
    const webcamdta=new FormData();
    webcamdta.append('uploder',file);
    webcamdta.append('id',userid);
    console.log(accessToken)
    let submitwebcam = {
        method: "POST",
        url: `http://localhost:3002/upload/webcam`,
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + accessToken,
          },
        data:webcamdta,
    };
    axios(submitwebcam)
        .then((response) => {
            console.log(response)
          
        })
        .catch((error) => {
            console.log(error)
        });
  }, []);
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'react-webcam-stream-capture.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam audio={false} ref={webcamRef} />
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </header>
    </div>
  );
}

export default WebcamStreamCapture;

