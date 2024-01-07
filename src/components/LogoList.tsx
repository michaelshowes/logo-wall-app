'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import type { LogoProps } from '@/types';
import { useCanvasContext } from '@/context/canvasContext';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';
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
				<div className={'mb-3 justify-center flex w-full gap-x-3'}>
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

				<div className={'grid grid-cols-logolist mx-auto w-full'}>
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
													'relative hover:before:opacity-100 before:absolute before:content-[""] before:inset-0 before:border-[2px] before:border-orange-400 before:opacity-0 before:transition before:duration-300 ease-in-out max-w-fit'
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
												'bg-orange-400 text-white border-0 uppercase font-semibold'
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
