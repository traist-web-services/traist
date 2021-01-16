import Image from 'next/image';
import Button from '../button/Button';

import InlineTextarea from 'react-tinacms-inline';

export default function Hero() {
  return (
    <section className="px-4 md:px-24 z-0 flex flex-col flex-grow justify-center overflow-hidden relative bg-gradient-to-br from-brand-50 via-brand-200 to-brand-300">
      <div className="w-1/3 absolute right-0 bottom-2 aspect-h-1 aspect-w-6">
        <Image
          src="/images/mountain.svg"
          alt=""
          role="presentation"
          layout="fill"
        />
      </div>
      <h1 className="font-bold text-6xl md:text-9xl py-3">
        <InlineTextarea name="title" />
      </h1>
      <div className="max-w-3xl text-brand-600">
        <p className="py-3 text-3xl">
          Need a partner to help you make the most of web technologies?
      </p>
        <p className="py-3 text-3xl">
          Traist specialises in building bespoke solutions to maximise value
          across your business.
      </p>
        <p className="py-5 text-3xl">
          <Button type="link" href="/learn-more" colour="secondary" size="lg">Learn More</Button>
        </p>
      </div>
    </section>
  )
}