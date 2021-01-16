import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function Slide({active, slide}) {
  const {text, image} = slide;
  return (
    <div
                className={`absolute left-full top-0 bg-white flex-grow w-full min-h-full flex shadow-md transform z-10 duration-1000 rounded-xl ${active ? '-translate-x-full' : ''}`}
              >
              <div className="relative w-1/2">
                <Image src={image} layout="fill" objectFit="cover" />
              </div>

              <div className="relative w-1/2 p-8">
                <div className="flex flex-col justify-center h-full text-lg 2xl:text-xl 2xl:text-2xl">
                  <ReactMarkdown>
                    {text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
  )
}