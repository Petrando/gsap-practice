/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactNode } from 'react'

interface IBento { 
    src: string;
    title: ReactNode;
    description: string;
    isComingSoon: boolean;
}

export const BentoCard:FC<IBento> = ({ src, title, description, isComingSoon }) => {

    return (
        <div className="relative size-full">
            <video
                src={`videos/${src}`}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center"
            />
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                <h1 className="bento-title special-font">{title}</h1>
                {description && (
                    <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                )}
                </div>
            </div>
        </div>
    )
}
const Features = () => {
    const bentoTop = 
        {
            src: "feature-1.mp4",
            title: <>radia<b>n</b>t</>,
            description: "A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.",
            isComingSoon: true
        }
    

    const bentoBottomMain = {
        src: "feature-2.mp4",
        title: <>zig<b>m</b>a</>,
        description: "An anime and gaming-inspired NFT collection - the IP primed for expansion.",
        isComingSoon: true
    }

    const bentos = [        
        {
            src: "feature-3.mp4",
            title: <> n<b> e </b>xus </>,
            description: "A gamified social hub, adding a new dimension of play to social interaction for Web3 communities.",
            isComingSoon: true
        },
        {
            src: "feature-4.mp4",
            title: <>az<b>u</b>l</>,
            description: "A cross-world AI Agent - elevating your gameplay to be more fun and productive.",
            isComingSoon: true
        }
    ]

    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="font-circular-web text-lg text-blue-50">
                        Into the Metagame Layer
                    </p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        Immerse yourself in a rich and ever-expanding universe where a vibrant
                        array of products converge into an interconnected overlay experience
                        on your world.
                    </p>
                </div>

                <div className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard {...bentoTop} />
                </div>

                <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                    <div className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard {...bentoBottomMain} />
                    </div>

                    <div className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard {...bentos[0]} />
                    </div>

                    <div className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                        <BentoCard {...bentos[1]} />
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Features