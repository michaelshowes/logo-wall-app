'use client';

import { LogoProps } from '@/lib/figma';
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
	isSaving: boolean;
	setIsSaving: Dispatch<SetStateAction<boolean>>;
};

export const CanvasContext = createContext<CanvasImages | null>(null);

export default function CanvasContextProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [canvasImages, setCanvasImages] = useState<LogoProps[]>([]);
	const [isSaving, setIsSaving] = useState<boolean>(false);

	return (
		<CanvasContext.Provider
			value={{ canvasImages, setCanvasImages, ref, isSaving, setIsSaving }}
		>
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
