'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { useCanvasContext } from '@/context/canvasContext';
import { exportAsImage } from '@/utils/exportAsImage';
import { Button } from '@/components/ui/button';

export default function Controls() {
  const { ref, canvasImages, setCanvasImages } = useCanvasContext();
  const [fileName, setFileName] = useState('logo-wall');

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            message: `${fileName}.png has been saved!`
          }),
        2000
      )
    );

  const downloadImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(promise, {
      loading: 'Downloading your logo wall...',
      success: (data) => {
        // @ts-expect-error
        return data.message;
      },
      error: 'Error'
    });

    exportAsImage(ref.current, `${fileName}.png`);
  };

  const clearCanvas = () => {
    setCanvasImages([]);
  };

  return (
    <div className={'p-10'}>
      <form
        className={'mx-auto flex max-w-[350px] flex-col items-center'}
        onSubmit={(e) => downloadImage(e)}
      >
        <input
          type='text'
          placeholder={'File Name'}
          onChange={(e) => setFileName(e.target.value)}
          disabled={canvasImages.length === 0}
          className={
            'mb-2 w-full rounded border-0 px-4 py-[8px] focus-visible:outline-0'
          }
        />
        <div className={'mb-5 text-xs text-white'}>
          Files are saved in PNG format
        </div>
        <div className={'flex w-full justify-center gap-x-6'}>
          <Button
            type={'submit'}
            disabled={canvasImages.length === 0}
          >
            Download
          </Button>
          <Button
            onClick={clearCanvas}
            type={'button'}
            variant={'outline'}
            disabled={canvasImages.length === 0}
          >
            Clear All
          </Button>
        </div>
      </form>
    </div>
  );
}
