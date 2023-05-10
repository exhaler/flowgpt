import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Image src="/bot-image.png" alt="AI" width="40" height="40" priority />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}
