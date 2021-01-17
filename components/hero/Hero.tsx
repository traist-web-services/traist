import Image from "next/image";
import Button from "../button/Button";
import ReactMarkdown from "react-markdown";

import { useContext } from "react";
import { InlineTextarea } from "react-tinacms-inline";
import { InlineWysiwyg } from "../inline-wysiwyg/InlineWysiwyg";
import DataContext from "../../contexts/DataContext";

export default function Hero() {
  const { subtitle }: { subtitle?: string } = useContext(DataContext);
  return (
    <section className="px-4 md:px-12 lg:px-24 z-0 flex flex-col flex-grow justify-center overflow-hidden relative bg-gradient-to-br from-brand-50 via-brand-200 to-brand-300">
      <div className="hidden lg:block w-1/3 absolute right-0 bottom-2 aspect-h-1 aspect-w-6">
        <Image
          src="/images/mountain.svg"
          alt=""
          role="presentation"
          layout="fill"
        />
      </div>
      <h1 className="font-bold text-6xl lg:text-9xl py-3">
        <InlineTextarea name="title" />
      </h1>
      <div className="max-w-3xl prose text-brand-600 text-xl md:text-2xl lg:text-3xl">
        <InlineWysiwyg name="subtitle" format="markdown">
          <ReactMarkdown source={subtitle} />
        </InlineWysiwyg>
      </div>
      <p className="py-5 text-3xl">
        <Button type="link" href="/learn-more" colour="secondary" size="lg">
          Learn More
        </Button>
      </p>
    </section>
  );
}
