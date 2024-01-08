'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useCanvasContext } from '@/context/canvasContext';
import type { LogoProps } from '@/types';
import { Arrow } from '@radix-ui/react-tooltip';

type LogoListProps = {
  data: LogoProps[];
};

export default function LogoList({ data }: LogoListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { setCanvasImages } = useCanvasContext();

  const addLogoToCanvas = (image: LogoProps) => {
    image.isOnCanvas = true;
    setCanvasImages((prevImages) => [...prevImages, image]);
  };

  return (
    <TooltipProvider>
      <section>
        <div className={'mb-3 flex w-full justify-center gap-x-3'}>
          <label
            htmlFor={'search'}
            className={'text-white'}
          >
            Search
          </label>
          <input
            name={'search'}
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')}>
              <X className={'text-white'} />
            </button>
          )}
        </div>

        <div className={'mx-auto grid w-full grid-cols-logolist'}>
          {data.map((image) => {
            return (
              <Tooltip
                key={image.id}
                delayDuration={0}
              >
                {image.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) && (
                  <>
                    {!image.isOnCanvas && (
                      <TooltipTrigger
                        onClick={() => addLogoToCanvas(image)}
                        className={
                          'relative max-w-fit ease-in-out before:absolute before:inset-0 before:border-[2px] before:border-orange-400 before:opacity-0 before:transition before:duration-300 before:content-[""] hover:before:opacity-100'
                        }
                      >
                        <Image
                          src={image.url || ''}
                          width={500}
                          height={300}
                          id={image.name}
                          alt={image.name}
                        />
                      </TooltipTrigger>
                    )}
                    <TooltipContent
                      className={
                        'border-0 bg-orange-400 font-semibold uppercase text-white'
                      }
                    >
                      <Arrow className={'fill-orange-400'} />
                      {image.name}
                    </TooltipContent>
                  </>
                )}
              </Tooltip>
            );
          })}
        </div>
      </section>
    </TooltipProvider>
  );
}
