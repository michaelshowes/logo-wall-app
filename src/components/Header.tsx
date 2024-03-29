import Image from 'next/image';

export default function Header() {
  return (
    <header className={'py-16'}>
      <h1 className={'text-center font-semibold text-white'}>
        <div className={'text-4xl uppercase'}>
          <Image
            src='/is_logo.svg'
            alt=''
            width={100}
            height={100}
            className={'inline'}
          />
          Interactive Strategies
        </div>
        <div className={'text-xl'}>Logo Wall Generator</div>
      </h1>
    </header>
  );
}
