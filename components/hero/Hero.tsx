import Image from 'next/image';
import Button from '../button/Button';
import ReactMarkdown from 'react-markdown';

import { InlineTextarea } from 'react-tinacms-inline';
import { InlineWysiwyg } from '../inline-wysiwyg/InlineWysiwyg';

export default function Hero({ data }) {
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
      <div className="max-w-3xl prose text-brand-600 text-3xl">
        <InlineWysiwyg name="subtitle" format="markdown">
          <ReactMarkdown source={data?.subtitle} />
        </InlineWysiwyg>
      </div>
      <p className="py-5 text-3xl">
          <Button type="link" href="/learn-more" colour="secondary" size="lg">Learn More</Button>
        </p>
    </section>
  )
}