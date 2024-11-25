/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react'

const Hero = () => {
    const [ currentIdx, setCurrentIdx ] = useState(1)
    const [ hasClicked, setHasClicked ] = useState(false)

    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVdRef = useRef(null);

    const handleMiniVidClick = () => {
        setHasClicked(true)
        setCurrentIdx(prev => {
            const nextIdx = prev + 1
            return nextIdx > 3? 0 : nextIdx
        })
    }

    const getVideoSrc = (index: string) => `videos/hero-${index}.mp4`

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
      };
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <div 
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div 
                            onClick={handleMiniVidClick}
                            className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
                        >
                            <video 
                                ref={nextVdRef} 
                                src={getVideoSrc((currentIdx + 1).toString())}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                            
                        </div>
                    </div>
                    <video
                        ref={nextVdRef}
                        src={getVideoSrc(currentIdx.toString())}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        src={getVideoSrc(
                            (currentIdx === totalVideos - 1 ? 1 : currentIdx).toString()
                        )}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero