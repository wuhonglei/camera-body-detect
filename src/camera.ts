// 获取本地音视频流
export async function getCameraStream(video: HTMLVideoElement) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream;
}
