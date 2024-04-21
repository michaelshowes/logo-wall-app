import html2canvas from 'html2canvas';

/**
 * Export the given element as an image
 * @param el - The element to export
 * @param imageFileName - The name of the image file
 * @returns void
 * @example
 * exportAsImage(element, 'filename.png');
 */
export const exportAsImage = async (
  el: HTMLElement | null,
  imageFileName: string
) => {
  if (!el) {
    console.error('Element not found');
    return;
  }
  const canvas = await html2canvas(el, {
    logging: true,
    removeContainer: true,
    windowWidth: 2752
  });
  const image = canvas.toDataURL('image/png', 1.0);
  downloadImage(image, imageFileName);
};

const downloadImage = (blob: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = blob;
  link.download = fileName;
  link.click();
};
