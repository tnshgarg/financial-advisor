import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import DropzoneComponent from "react-dropzone";
import toast from "react-hot-toast";
import { Progress } from "./ui/progress";
import axios from "axios";

function Dropzone({ uploadVideo }: any) {
  const maxSize = 2097152000;
  const [file, setFile] = useState<object>({});
  const [visible, setVisible] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      if (progress < 95) setProgress((prevProgress) => prevProgress + 1);
    }, 1000);
  }, [progress]);

  // async function uploadVideo(videoFile: File) {
  //   console.log("Videofile: ", videoFile);
  //   try {
  //     const response = await axios.post("/api/upload-video", {
  //       videoFile: videoFile,
  //     });
  //     console.log("<Upload Response>: ", response);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Video could not be uploaded, something went wrong!");
  //   }
  // }

  return (
    <div>
      {visible && (
        <DropzoneComponent
          minSize={0}
          maxSize={maxSize}
          onDrop={(acceptedFiles) => {
            const videoFiles = acceptedFiles.filter((file) =>
              file.type.startsWith("video/")
            );
            if (videoFiles.length > 0) {
              console.log("videofile: ", acceptedFiles[0]);
              setFile({
                name: acceptedFiles[0].name,
                type: acceptedFiles[0].type,
                size: acceptedFiles[0].size,
              });
              setVisible(false);
              setUploading(true);
              console.log("<Dropzone acceptedFiles[0]>: ", acceptedFiles[0]);
              const formData = new FormData();
              formData.append("videoFile", acceptedFiles[0]);
              uploadVideo(formData);
            } else {
              // Handle error: show a message or take any other action
              console.error("Only video files are allowed.");
              toast("It must be a video file only!", {
                style: { color: "red" },
              });
            }
          }}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            fileRejections,
          }) => {
            const isFileTooLarge =
              fileRejections.length > 0 &&
              fileRejections[0].file.size > maxSize;

            return (
              <section>
                <div
                  {...getRootProps()}
                  className={cn(
                    "w-full h-52 flex justify-center p-5 border border-dashed rounded-lg text-center items-center",
                    isDragActive
                      ? "bg-[#ff6666] text-white animate-pulse"
                      : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                  )}
                >
                  <input accept="video/*" {...getInputProps()} />
                  {!isDragActive && "Click here or Drop a Video to Upload!"}
                  {isDragActive &&
                    !isDragReject &&
                    "Drop to upload this video!"}
                  {isDragReject && "File not supported, Sorry!"}
                  {isFileTooLarge && (
                    <div className="text-danger mt-2">
                      File Too Large, Max File Size is 2GB
                    </div>
                  )}
                </div>
              </section>
            );
          }}
        </DropzoneComponent>
      )}
      {uploading && <Progress value={progress} />}
    </div>
  );
}

export default Dropzone;
