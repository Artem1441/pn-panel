// import { apiCloudUpload } from "@/api/cloud.api";
// import { apiCloudUploadFile } from "@/api/cloud.api";
import apiCloudUploadFile from "@/api/cloud/apiCloudUploadFile.api";
import React, { FC, JSX, memo, useRef, useState } from "react";
import Webcam from "react-webcam";
// import switchCameraIcon from "@/assets/icons/switch_camera.svg";
import styles from "./Camera.module.scss";

interface IProps {
  action: (fileKey: string) => void
  close: () => void
}

const Camera: FC<IProps> = memo(({action, close}): JSX.Element => {
  const webcamRef = useRef<Webcam>(null);
  const [isUploading, setIsUploading] = useState(false);
  //   const [isRecording, setIsRecording] = useState(false);
  //   const [facingMode, setFacingMode] = useState("environment");
  //   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  //   const recordedChunksRef = useRef<Blob[]>([]);

  //   const videoConstraints = {
  //     facingMode: facingMode,
  //     width: { ideal: 1280 },
  //     height: { ideal: 720 },
  //   };

  const captureAndUpload = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    setIsUploading(true);

    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], `photo_${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    const response = await apiCloudUploadFile(file);

    console.log(response)
    if (response.status) {
      action(response.data || "")
    }

    // if (response.status) {
    //   console.log("Файл успешно загружен:", response.data);
    // } else {
    //   console.error("Ошибка загрузки:", response.message);
    // }

    setIsUploading(false);
  };

  //   const startRecording = () => {
  //     if (webcamRef.current) {
  //       const stream: any = webcamRef.current.stream;

  //       const mediaRecorder: any = new MediaRecorder(stream);
  //       mediaRecorderRef.current = mediaRecorder;

  //       mediaRecorder.ondataavailable = (event: any) => {
  //         recordedChunksRef.current.push(event.data);
  //       };

  //       mediaRecorder.onstop = async () => {
  //         const blob = new Blob(recordedChunksRef.current, {
  //           type: "video/webm",
  //         });
  //         const videoFile = new File([blob], `video_${Date.now()}.webm`, {
  //           type: "video/webm",
  //         });

  //         setIsUploading(true);
  //         const response = await apiCloudUpload([videoFile], true);

  //         if (response.status) {
  //           console.log("Видео успешно загружено:", response.data);
  //         } else {
  //           console.error("Ошибка загрузки видео:", response.message);
  //         }

  //         setIsUploading(false);
  //         recordedChunksRef.current = [];
  //       };

  //       mediaRecorder.start();
  //       setIsRecording(true);
  //     }
  //   };

  //   const stopRecording = () => {
  //     if (mediaRecorderRef.current) {
  //       mediaRecorderRef.current.stop();
  //       setIsRecording(false);
  //     }
  //   };

  //   const toggleCamera = () => {
  //     setFacingMode(facingMode === "environment" ? "user" : "environment");
  //   };

  return (
    <div className={styles.camera}>
      <button onClick={close}>Close</button>
        <div className="webcam-wrapper">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            //   videoConstraints={videoConstraints}
            className={styles.camera_webcam}
            //   audio={true}
            //   key={facingMode}
          />

          <button
            title="click"
            // className="capture-btn"
            className={styles.camera_webcam_btn}
            onClick={captureAndUpload}
            //   disabled={isUploading || isRecording}
          />

          {/* <button
          title="click"
          className={`capture-btn-2 ${
            isRecording ? "capture-btn-2-active" : ""
          }`}
          onClick={!isRecording ? startRecording : stopRecording}
        /> */}

          {/* <div className="toggle-camera-btn" onClick={toggleCamera}>
          <img
            src={switchCameraIcon.src}
            alt="Switch Camera"
            width={32}
            height={32}
          />
        </div> */}
        </div>
    </div>
  );
});

export default Camera;
