import video from "../assets/video.mp4";

import * as React from 'react';
export const BackgroundVid = () => {
    return (
        <div className="video-container">
            <video
                className="video"
                loop
                autoPlay
                playsInline
                muted
                src={video}
                onLoadedData={() => { console.log("HELLO") }}
            />
        </div>)}