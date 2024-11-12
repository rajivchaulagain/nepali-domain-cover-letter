import html2canvas from "html2canvas";

// Function to scale the canvas with padding
const scaleCanvas = (canvas: HTMLCanvasElement, maxWidth: number, maxHeight: number, padding: number): HTMLCanvasElement => {
  const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
  const newWidth = Math.floor(canvas.width * ratio) + 2 * padding;
  const newHeight = Math.floor(canvas.height * ratio) + 2 * padding;

  const scaledCanvas = document.createElement("canvas");
  const ctx = scaledCanvas.getContext("2d");

  if (ctx) {
    scaledCanvas.width = newWidth;
    scaledCanvas.height = newHeight;
    ctx.fillStyle = "#ffffff"; // Set background color (e.g., white)
    ctx.fillRect(0, 0, newWidth, newHeight); // Fill canvas with background color
    ctx.drawImage(canvas, padding, padding, newWidth - 2 * padding, newHeight - 2 * padding); // Draw image with padding
  }

  return scaledCanvas;
};

// Function to export as image with a target file size of 200KB
const exportAsImage = async (element: HTMLElement, imageFileName: string) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;

  const newWidth = element.scrollWidth - element.clientWidth;

  if (newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }

  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";

  const canvas = await html2canvas(element);

  // Start with a higher quality and reduce if the image size is too large
  let image = canvas.toDataURL("image/jpeg", 1.0);

  // Add padding to the image
  const padding = 40; // Example padding value (40px)
  let targetSize = 200 * 1024; // 200KB in bytes
  let quality = 1.0;
  let scaledCanvas = canvas;

  while (image.length > targetSize && quality > 0.1) {
    quality -= 0.1; // Gradually decrease quality
    image = canvas.toDataURL("image/jpeg", quality);

    // Optionally scale the image down if still too large
    if (image.length > targetSize && quality <= 0.5) {
      scaledCanvas = scaleCanvas(canvas, 1000, 1000, padding); // Resize with padding
      image = scaledCanvas.toDataURL("image/jpeg", quality);
    }
  }

  downloadImage(image, imageFileName.endsWith(".jpeg") ? imageFileName : `${imageFileName}.jpeg`);
  html.style.width = ""; // Reset to default by using an empty string
  body.style.width = ""; // Reset to default by using an empty string
};

const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = document.createElement("a");
  fakeLink.style.display = "none";
  fakeLink.download = fileName;
  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export default exportAsImage;
