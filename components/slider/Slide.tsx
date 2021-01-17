import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Button from '../button/Button';

export interface SlideObject {
  text: string,
  image: string,
  title: string,
  linkTo: string
}
interface Slide {
  active: boolean,
  slide: SlideObject,
  index: number
}

export default function Slide({ active, slide, index }: Slide) {
  const { text, image, title, linkTo } = slide;
  return (
    <>
      <div key={index}
        className={`hidden lg:flex absolute left-full top-0 bg-white flex-grow w-full min-h-full shadow-md transform z-10 duration-1000 rounded-xl ${active ? '-translate-x-full' : ''}`}
      >
        <div className="relative w-1/2">
          <Image src={image} layout="fill" objectFit="cover" />
        </div>

        <div className="relative w-1/2 p-8">
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-5xl font-bold mb-4">{title}</h2>
            <div className="prose prose-sm lg:prose-lg xl:prose-xl max-w-prose">
              <ReactMarkdown>
                {text}
              </ReactMarkdown>
            </div>
            <Button size="lg" href={linkTo} type="link">Find out more</Button>
          </div>
        </div>
      </div>

      <div className={`flex flex-col lg:hidden my-4 md:my-8 rounded-md overflow-hidden bg-white`}>
        <div className="w-full aspect-w-4 aspect-h-3">
          <Image src={image} layout="fill" objectFit="cover" />
        </div>
        <div className="w-full p-2 md:p-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div className="prose prose-md md:prose-xl">
            <ReactMarkdown>
              {text}
            </ReactMarkdown>
          </div>
          <Button size="sm" href={linkTo}>Find out more</Button>
        </div>
      </div>
    </>
  )
}