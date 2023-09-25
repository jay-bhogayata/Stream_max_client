"use client";
import "plyr/dist/plyr.css";

import VideoPlayer from "@/app/components/VideoPlayer";
import React from "react";

const page = () => {
  return (
    <div className="h-fit">
      <VideoPlayer
        videoSource={
          "https://stream-max-prod.s3.ap-south-1.amazonaws.com/videos/Satyaprem_Ki_Katha/master.m3u8"
        }
      />
    </div>
  );
};

export default page;
