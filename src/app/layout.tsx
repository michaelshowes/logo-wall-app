import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import CanvasContextProvider from '@/context/canvasContext';
import { Toaster } from '@/components/ui/sonner';

import '@/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Logo Wall Generator',
	description: 'Generates a logo wall for use in presentations.'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<CanvasContextProvider>
					{children}
					<Toaster position={'top-center'} />
				</CanvasContextProvider>
			</body>
		</html>
	);
}
