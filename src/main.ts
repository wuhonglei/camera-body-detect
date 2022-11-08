import { detectBodySegmentation } from "./body-detect";
import { getCameraStream } from "./camera";

const realCameraVideo: HTMLVideoElement =
  document.querySelector("#real-camera")!;
const maskVideo: HTMLVideoElement = document.querySelector("#mask-video")!;

const startRecordBtn: HTMLButtonElement =
  document.querySelector("#startRecordBtn")!;
const startBodyDetect: HTMLButtonElement =
  document.querySelector("#startBodyDetect")!;

startRecordBtn.onclick = (): void => {
  getCameraStream(realCameraVideo);
};

startBodyDetect.onclick = (): void => {
  detectBodySegmentation(realCameraVideo, maskVideo);
};
