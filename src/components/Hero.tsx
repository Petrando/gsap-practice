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

    const getVideoSrc = (index: string) => `videos/hero-${index}.mp4`   

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {loading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
                </div>
            )}
            <div 
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
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
                    <span aria-hidden={true} className={`${isGlitching.glitch?"inline":"hidden"}`}>G<b>A</b>MING</span>
                    G<b>A</b>MING
                    <span aria-hidden={true} className={`${isGlitching.glitch?"inline":"hidden"}`}>G<b>A</b>MING</span>
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
                            containerClass="bg-yellow-300 flex-center gap-1"
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

export default Hero