import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/selfie_segmentation";

const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
const segmenterConfig = {
  runtime: "mediapipe",
  solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
  modelType: "general",
} as const;

const segmenter = await bodySegmentation.createSegmenter(
  model,
  segmenterConfig
);

const WIDTH = 640; // 视频宽度
const HEIGHT = 480; // 视频高度

function createCanvasContext() {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  return { canvas, context: canvas.getContext("2d")! };
}

export async function detectBodySegmentation(
  realVideo: HTMLVideoElement,
  virtualVideo: HTMLVideoElement,
  bulletContainer: HTMLDivElement
): Promise<void> {
  const { canvas: virtualCanvas, context: virtualContext } =
    createCanvasContext();
  const detectFn = async () => {
    console.time("detect body");
    const segmentation = await segmenter.segmentPeople(realVideo);
    const coloredPartImage = await bodySegmentation.toBinaryMask(segmentation);
    console.timeEnd("detect body");

    virtualContext.putImageData(coloredPartImage, 0, 0);
    const dataUri = virtualCanvas.toDataURL("image/png");
    bulletContainer.style.webkitMaskImage = `url(${dataUri})`;
    setTimeout(detectFn, 30);
  };
  detectFn();
  playVirtualStream(virtualCanvas, virtualVideo);
}

function playVirtualStream(
  canvas: HTMLCanvasElement,
  virtualVideo: HTMLVideoElement
): void {
  const stream = canvas.captureStream(30);
  virtualVideo.srcObject = stream;
}
