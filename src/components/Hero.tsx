/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [ currentIndex, setCurrentIndex ] = useState(1)
    const [ hasClicked, setHasClicked ] = useState(false)

    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const [isGlitching, setIsGlitching] = useState({ glitch: false, by:"" })

    const totalVideos = 4;
    const nextVdRef = useRef<HTMLVideoElement>(null);
    const vid1Ref = useRef<HTMLVideoElement>(null);
    const vid2Ref = useRef<HTMLVideoElement>(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };
    
    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
          setLoading(false);
        }
    }, [loadedVideos]);
    
    const handleMiniVidClick = (by: string) => {
        setHasClicked(true)
        setCurrentIndex(prevIndex => (prevIndex % totalVideos) + 1);
        
        if(by === "mouse"){
            setIsGlitching({ glitch: false, by: "" })
        }else if(by === "touch"){
            setIsGlitching({ glitch: true, by: "" })
        }
        
    }

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const debouncedHandleVidClick = (by: string) => {
        // If a previous timeout is still pending, clear it
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set a new timeout to call the function after 500ms
        debounceTimer = setTimeout(() => {
            handleMiniVidClick(by);
        }, 500);
    }    

    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });
                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => {
                        nextVdRef.current?.play()
                        vid1Ref.current?.play()
                    },
                });
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        {
            dependencies: [currentIndex],
            revertOnUpdate: true,
        }
    );

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
            borderRadius: "0 0 40% 10%",
        });

        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });        
    });

    const videos = [
        'https://iqdjihq5te.ufs.sh/f/DflywCg2UTE8jEL3i6XbyXz5crRJFSNio7uqPI3HVLagKEh1',
        'https://iqdjihq5te.ufs.sh/f/DflywCg2UTE8NFcABP0ZaZ95JqMcOuWiVAzvkUL703G8Kg1s',
        'https://iqdjihq5te.ufs.sh/f/DflywCg2UTE8qzU8Icyj8soINkO39LTvWmKyYlAX0ijcbeaQ',
        'https://iqdjihq5te.ufs.sh/f/DflywCg2UTE8IBQZfeiaoDdR9hyAYslLCk7vJ2QOHf5WSebZ'
    ]

    const getVideoSrc = (index: string) => videos[parseInt(index) - 1] || videos[0];    
    //const getVideoSrc = (index: string) => `videos/hero-${index}.mp4`        

    const allVidsReady = vid1Ref.current?.readyState === 4 && vid2Ref.current?.readyState === 4    

    return (
        <div 
            id="nexus"
            className="relative h-dvh w-screen overflow-x-hidden"
        >            
            <div 
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                {loading && <></>/*(
                    <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                    </div>
                )*/}
                <div>
                    {
                        !allVidsReady &&
                        <TechLogo />
                    }
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div 
                            onClick={()=>{debouncedHandleVidClick("mouse")}}
                            className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
                            onMouseMove={()=>{setIsGlitching({ glitch: true, by: "mouse"})}}
                            onMouseOut={()=>{setIsGlitching({ glitch: false, by: ""})}}
                            onTouchStart={()=>{debouncedHandleVidClick("touch")}}
                            onTouchEnd={()=>{setIsGlitching({ glitch: true, by: "touch" })}}
                        >
                            <video 
                                ref={nextVdRef} 
                                src={getVideoSrc((currentIndex + 1).toString())}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                            
                        </div>
                    </div>
                    <video
                        ref={vid1Ref}
                        src={getVideoSrc(currentIndex.toString())}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        src={getVideoSrc(
                            (currentIndex === totalVideos - 1 ? 1 : currentIndex).toString()
                        )}
                        ref={vid2Ref}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                    
                </div>

                <h1 
                    className={`special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ${isGlitching.glitch && "glitch"}`}
                    data-text="GAMING"
                >
                    <span aria-hidden={true} className={`${isGlitching.glitch?"inline":"hidden"}`}>
                        G<b>A</b>MING
                    </span>
                    G<b>A</b>MING
                    <span aria-hidden={true} className={`${isGlitching.glitch?"inline":"hidden"}`}>
                        G<b>A</b>MING
                    </span>
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className={`special-font hero-heading text-blue-100 ${isGlitching.glitch && "glitch"}`}>                            
                            redefi<b>n</b>e                        
                        </h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button
                            id="watch-trailer"
                            title="Watch trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="flex-center gap-1"
                        />

                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>A</b>MING
            </h1>
        </div>
    )
}

const TechLogo = () => {
  return (
    <div className="absolute left-0 top-0 size-full object-cover object-center flex items-center justify-center h-screen bg-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="225"
        height="225"
        viewBox="0 0 1024 1024"
        className="drop-shadow-[0_0_20px_rgba(100,200,255,0.8)]"
      >
        <path
          d="M490.5 298.8c-11.6 10.3-41.2 36.4-65.8 58.1L380 396.2v46.4l13.8 11.8 13.7 11.8.3-28.4.2-28.4 51.6-45.5c28.3-25 51.9-45.4 52.4-45.4.9 0 13.7 11.1 59.4 51.5 12.2 10.7 27.2 23.9 33.4 29.4l11.2 9.9.2 21.6c.1 11.9.1 24.5 0 27.9-.3 5.2-.1 6.3 1.1 6 .8-.1 6.9-5 13.6-10.8l12.1-10.5v-48.3l-65.1-57.3c-35.7-31.6-65.3-57.5-65.7-57.6s-10.2 8.2-21.7 18.5m2.5 69.3c-10.2 8.9-31 27.2-46.3 40.6l-27.8 24.5.1 21.8.1 21.7 4.2 4c8.2 7.8 23.4 20.2 24.1 19.6.3-.3.6-12.7.6-27.4v-26.8l31.7-28.1c17.5-15.4 32.1-28 32.5-28s10.5 8.6 22.5 19.2c12 10.5 26.4 23.2 32 28.1l10.3 9 .2 27.4.3 27.3 10-8.6c5.5-4.8 11.7-10.2 13.8-12.1l3.7-3.4v-43.7l-19.2-17c-21.2-18.5-39.2-34.4-59.7-52.4-7.3-6.5-13.6-11.8-14-11.8-.3 0-8.9 7.3-19.1 16.1m-202.3 18.6c-.2.4-.2 9 .1 19.1l.5 18.3 37.6 33.1c20.7 18.2 41.2 36.2 45.7 40.2 4.4 3.9 16.2 14.3 26.2 23.1l18.2 16v160.3l13.7 12.1c7.5 6.6 14 12.1 14.5 12.1 1 0 1-196.1 0-197.6-.6-.8-58.6-52.1-96.2-84.9-11.3-9.8-38.6-33.8-52.7-46.3-3.9-3.4-7.3-5.9-7.6-5.5m437.8 3c-10.3 8.9-63.2 55.6-86 75.8-14.9 13.2-35.7 31.6-46.3 40.9L577 523.2v98.9c0 54.4.2 98.9.6 98.9.5 0 13.5-11.3 22.7-19.7l4.7-4.4.1-80.2v-80.2l18.7-16.5c10.3-9.1 33.5-29.5 51.7-45.4 18.1-15.9 38.5-33.8 45.3-39.8l12.2-10.9v-18.4c0-10.2-.3-18.5-.7-18.5-.5 0-2.1 1.2-3.8 2.7M361 413.1l-6.5 5.9 6 5.5c3.3 3 6.6 5.5 7.3 5.5.9 0 1.2-2.8 1.2-10.9 0-6.1-.3-11.2-.8-11.4-.4-.3-3.6 2.2-7.2 5.4m294.6-5.4c-.3.3-.6 5.5-.6 11.5 0 8 .3 10.8 1.3 10.8 2-.1 13.1-10.5 12.4-11.7-1.4-2.3-12.4-11.2-13.1-10.6m-149.1 7.2c-13.3 3.5-21.2 14.1-20.3 27.3.5 7.8 3 13 8.5 18.5l4.3 4.1V713h27V464.5l4.4-4.3c2.4-2.3 5.2-5.9 6.2-8 2.3-4.8 3-14.1 1.4-19.7s-7.7-12.7-13.3-15.4c-4.8-2.3-13.7-3.4-18.2-2.2m212.4 43.9-13.4 11.8-.3 50.1-.2 50.2-21.3 18.8c-11.7 10.3-31.5 27.8-43.9 38.8l-22.7 20v18.2c-.1 10.1.3 18.3.7 18.3s5.8-4.4 11.8-9.8c6.1-5.3 31.8-28.1 57.2-50.7l46.2-40.9v-68.3c0-37.6-.2-68.3-.4-68.3s-6.4 5.3-13.7 11.8M291 515.9v68l32.3 28.3c17.7 15.5 38.3 33.7 45.7 40.3 27.5 24.5 36.8 32.5 37.4 32.5.4 0 .5-8.2.4-18.2l-.3-18.2-13-11.7c-7.1-6.5-26.7-23.8-43.5-38.6l-30.5-26.9-.5-50.4-.5-50.4-12.9-11.3c-7.1-6.2-13.2-11.3-13.7-11.3s-.9 29.8-.9 67.9m368.7-15.5-6.7 6.1v30.1c0 28.8-.1 30.2-2 31.9-2 1.8-2 1.7-2-27.8 0-16.4-.3-29.7-.6-29.7s-3.5 2.5-7 5.6l-6.4 5.6V553c0 24.5-.3 31-1.3 31.9-.8.6-1.7.8-2 .4-.4-.3-.7-13.6-.7-29.5 0-15.8-.3-28.8-.6-28.8s-3.4 2.6-7 5.7l-6.4 5.8v44.7c0 25.9.4 44.8.9 44.8s12.8-10.4 27.3-23.2c35.4-31.2 40.8-36 40.8-36.8 0-.3-4.3-4.3-9.5-8.8l-9.5-8.3-.2-28.3-.3-28.4zm-302.8 22.8v28.3l-9.5 7.9c-5.2 4.4-9.4 8.2-9.4 8.6 0 1 67 59.5 68.6 59.8 1.3.3 1.5-5.6 1.2-44.3l-.3-44.7-6.5-5.9c-3.6-3.2-6.8-5.8-7.2-5.9-.5 0-.8 13.3-.8 29.6 0 26.2-.2 29.5-1.5 28.4s-1.5-5.8-1.5-31.6v-30.3l-6.6-5.8c-3.6-3.2-7-6-7.5-6.1-.5-.2-.9 11.4-.9 29.5-.1 29.8-.1 29.8-2 27.4-1.9-2.2-2-4-2-32v-29.6l-6.4-5.8c-3.6-3.1-6.7-5.7-7-5.7s-.6 12.7-.7 28.2m105.7 13.5c-.3.3-.6 45.1-.6 99.4v98.7l8.3 7.3 8.2 7.3.3-100 .3-99.9-4.3-3.9c-7.1-6.4-11.5-9.6-12.2-8.9m90.1 5.9-7.7 6.5V649c0 55 .3 100 .8 100 .4 0 4.2-3.2 8.5-7.1l7.8-7.2-.2-97.6c-.1-53.7-.5-98.4-.8-99.3-.5-1.4-2-.6-8.4 4.8"
          fill="none"
          stroke="#80d8ff"
          strokeWidth="7.5"
          strokeDasharray="2000"
          strokeDashoffset="-2000"
          style={{ animation: "dashmove 15s linear infinite" }}
        />
        <style>{`
          @keyframes dashmove {
            0% { stroke-dashoffset: 0; }
            25% { stroke-dashoffset: -2000; }
            50% { stroke-dashoffset: 0; }
            75% { stroke-dashoffset: -2000; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default Hero