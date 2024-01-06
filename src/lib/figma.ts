import * as Figma from 'figma-js';

export type LogoProps = {
  id: string;
  name: string;
  url: string;
  isOnCanvas: boolean;
};

export const figmaClient = Figma.Client({
  personalAccessToken: process.env.NEXT_PUBLIC_FIGMA_TOKEN
});

export async function getFigma() {
  const { data } = await figmaClient.file(
    process.env.NEXT_PUBLIC_FIGMA_DOCUMENT as string
  );

  // TODO: figure out the proper type definition for logos
  // @ts-ignore
  const logos: LogoProps[] = data.document.children[0].children;

  const ids = logos
    .filter((logo) => logo.name.startsWith('Logo'))
    .map((logo) => logo.id.replace(' ', ''));

  const images = await figmaClient.fileImages(
    process.env.NEXT_PUBLIC_FIGMA_DOCUMENT as string,
    {
      ids: ids,
      format: 'svg'
    }
  );

  // converts object to array
  const imagesArray = Object.entries(images.data.images).map(([id, url]) => ({
    id,
    name: logos.find((logo) => logo.id === id)?.name || '',
    url,
    isOnCanvas: false
  }));

  return imagesArray;
}
