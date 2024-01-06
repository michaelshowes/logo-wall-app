import scss from './header.module.scss';
import Logo from '@/assets/svg/is_logo.svg';

export default function Header() {
	return (
		<header className={'py-16'}>
			<h1 className={'text-white text-center font-semibold'}>
				<div className={'text-4xl uppercase'}>Interactive Strategies</div>
				<div className={'text-xl'}>Logo Wall Generator</div>
			</h1>
		</header>
	);
}
