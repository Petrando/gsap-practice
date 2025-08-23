/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useRef } from 'react'
import AnimatedTitle from './AnimatedTitle';
import Button from './Button';
import ImageClipBox from './image-clipbox';

interface IImageClipBox {
    src: string;
    clipClass: string;
}

const ImageClipBox1:FC<IImageClipBox> = ({ src, clipClass }) => (
    <div className={clipClass}>
      <img src={src} />
    </div>
);

const Contact = () => {
    const contactRef = useRef<HTMLDivElement | null>(null)
    return (
        <div 
            ref={ contactRef }
            id="contact" 
            className="my-20 min-h-96 w-screen px-10"
        >
            <div className="relative rounded-lg bg-blue-50 text-black dark:bg-black py-24 dark:text-blue-50">
                <div 
                    className={`absolute left-0 bottom-0 right-auto top-auto 
                        md:right-auto md:bottom-auto md:-left-20 md:top-0 
                        h-32 w-full
                        md:h-full md:w-72 
                        lg:left-20 lg:w-96`}
                >
                    <ImageClipBox
                        src="/img/contact-1.webp"
                        clipClass="contact-clip-path-1"
                        parentRef={ contactRef }
                        slices={14}
                    />
                    <ImageClipBox
                        src="/img/contact-2.webp"
                        clipClass="contact-clip-path-2 translate-y-10 lg:translate-y-0 hidden md:block"
                        parentRef={ contactRef }
                        slices={16}
                        direction='vertical'
                    />
                </div>

                <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
                    <div className='absolute'>
                        <ImageClipBox
                            src="/img/swordman-partial.webp"
                            clipClass="md:scale-125"
                            parentRef={ contactRef }
                            direction='vertical'
                            slices={10}
                        />
                    </div>
                    <ImageClipBox
                        src="/img/swordman.webp"
                        clipClass="sword-man-clip-path md:scale-125"
                        parentRef={ contactRef }
                    />
                </div>

                <div className="flex flex-col items-center text-center overflow-hidden">
                    <p className="mb-10 font-general text-[10px] uppercase">
                        Join Zentry
                    </p>

                    <AnimatedTitle
                        title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
                        containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
                    />

                    <Button id="contact-button" title="contact us" containerClass="mt-10 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Contact