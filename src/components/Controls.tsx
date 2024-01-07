'use client';

import { useCanvasContext } from '@/context/canvasContext';
import { exportAsImage } from '@/utils/exportAsImage';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
				className={'flex flex-col items-center max-w-[350px] mx-auto'}
				onSubmit={(e) => downloadImage(e)}
			>
				<input
					type='text'
					placeholder={'File Name'}
					onChange={(e) => setFileName(e.target.value)}
					disabled={canvasImages.length === 0}
					className={'w-full p-4 mb-2 border-0 rounded focus-visible:outline-0'}
				/>
				<div className={'text-white mb-5'}>Files are saved in PNG format</div>
				<div className={'flex justify-center gap-x-6 w-full'}>
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
