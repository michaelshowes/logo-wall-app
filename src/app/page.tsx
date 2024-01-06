import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import LogoList from '@/components/LogoList';
import { getFigma } from '@/lib/figma';

export default async function Home() {
	const data = await getFigma();

	return (
		<main>
			<Layout>
				<Header />
				<Canvas />
				<Controls />
				<LogoList data={data} />
			</Layout>
		</main>
	);
}

export const revalidate = 60 * 60 * 24; // revalidate this page once a day
