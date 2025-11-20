import React, { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

// Button component
const Button = ({ id, title, leftIcon, containerClass }) => (
    <button id={id} className={`px-6 py-3 rounded-lg font-semibold ${containerClass}`}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {title}
    </button>
);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);
    const miniVideoRef = useRef(null); // Separate ref for mini video

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos])

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play(),
            })
            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            })
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true })

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%'
        })
        gsap.from('#video-frame', { // Fixed: added # selector
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div id="home" className="relative h-screen w-screen overflow-x-hidden">
            {isLoading && (
                <div className='flex absolute z-[100] h-screen w-screen overflow-hidden bg-violet-50 items-center justify-center'>
                    <div className='flex space-x-2'>
                        <div className='w-4 h-4 bg-violet-500 rounded-full animate-bounce' />
                        <div className='w-4 h-4 bg-violet-500 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }} />
                        <div className='w-4 h-4 bg-violet-500 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }} />
                    </div>
                </div>
            )}
            <div id="video-frame" className="relative z-10 h-screen w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-64 h-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                ref={miniVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="w-64 h-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invisible z-20 w-64 h-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />

                    <video
                        src={getVideoSrc(upcomingVideoIndex)}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 w-full h-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 text-6xl font-bold">
                    <b>a</b>nime
                </h1>

                <div className="absolute left-0 top-0 z-40 w-full h-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100 text-7xl font-bold mb-4">
                            <b>ma</b>noha<b>r</b>
                        </h1>
                        <p className='mb-5 text-lg text-blue-100'>
                            Giving Anime recommendation <br /> Using ReactJs, TailwindCss, Gsap
                        </p>
                        <a href="https://youtu.be/uLjqpXde7pU?si=ymb9RcOlRfPvw_Hn" target="_blank" rel="noopener noreferrer">
                            <Button
                                id="watch-trailer"
                                title="Watch Trailer"
                                leftIcon={<TiLocationArrow />}
                                containerClass="bg-yellow-300 flex items-center gap-1 cursor-pointer"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black text-6xl font-bold">
                <b>a</b>nime
            </h1>
        </div>
    )
}

export default Hero