'use client';

import { Fragment } from 'react';
import Image from 'next/image';

import { useCanvasContext } from '@/context/canvasContext';
import type { LogoProps } from '@/types';

type LogoListProps = {
	data: LogoProps[];
};

export default function LogoList({ data }: LogoListProps) {
	const { setCanvasImages } = useCanvasContext();

	const addLogoToCanvas = (image: LogoProps) => {
		image.isOnCanvas = true;
		setCanvasImages((prevImages) => [...prevImages, image]);
	};

	return (
		<section className={'grid grid-cols-logolist mx-auto w-full'}>
			{data.map((image) => (
				<Fragment key={image.id}>
					{!image.isOnCanvas && (
						<button
							onClick={() => addLogoToCanvas(image)}
							className={
								'relative hover:before:opacity-100 before:absolute before:content-[""] before:inset-0 before:border-[2px] before:border-orange-400 before:opacity-0 before:transition before:duration-300 ease-in-out'
							}
						>
							<Image
								src={image.url || ''}
								width={500}
								height={300}
								id={image.name}
								alt={image.name}
							/>
						</button>
					)}
				</Fragment>
			))}
		</section>
	);
}
