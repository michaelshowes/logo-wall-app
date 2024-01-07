'use client';

import { LogoProps } from '@/types';
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useRef,
	useState
} from 'react';

type CanvasImages = {
	canvasImages: LogoProps[];
	setCanvasImages: Dispatch<SetStateAction<LogoProps[]>>;
	ref: React.RefObject<HTMLDivElement>;
};

export const CanvasContext = createContext<CanvasImages | null>(null);

export default function CanvasContextProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [canvasImages, setCanvasImages] = useState<LogoProps[]>([]);

	return (
		<CanvasContext.Provider value={{ canvasImages, setCanvasImages, ref }}>
			{children}
		</CanvasContext.Provider>
	);
}

export function useCanvasContext() {
	const context = useContext(CanvasContext);
	if (!context) {
		throw new Error(
			'useCanvasContext must be used within a CanvasContextProvider'
		);
	}

	return context;
}
