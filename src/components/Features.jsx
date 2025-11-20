import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div id="suggestions" className="relative size-full">
            <video
                src={src}
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

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        {/* Radial gradient hover effect */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => (
    <section id="why" className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
                <p className="font-circular-web text-lg text-blue-50">
                    why you should watch anime ?
                </p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Anime isn’t just entertainment — it’s a whole world people are seriously missing out on. It delivers emotions deeper than most movies, stories richer than regular TV, and visuals that hit harder than reality itself. From mind-blowing battles to heart-melting moments, anime pulls you into experiences you can’t get anywhere else. If you’re not watching it, you’re skipping one of the most creative, inspiring, and unforgettable forms of storytelling out there.
                </p>
            </div>

            <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                <BentoCard
                    src="videos/feature-1.mp4"
                    title={
                        <>
                            <b>na</b>ruto
                        </>
                    }                    
                />
            </BentoTilt>

            <div className="grid w-full gap-7 grid-cols-1 md:grid-cols-2 auto-rows-[350px] md:auto-rows-[45vh]">
                <BentoTilt className="bento-tilt_1 md:row-span-2">
                    <BentoCard
                        src="videos/feature-2.mp4"
                        title={<>one <b>pie</b>ce</>}
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1">
                    <BentoCard
                        src="videos/feature-3.mp4"
                        title={<>b<b>lea</b>ch</>}
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1">
                    <BentoCard
                        src="videos/feature-4.mp4"
                        title={<>hunter <b>x</b> hunter</>}
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <video
                        src="videos/feature-5.mp4"
                        loop
                        muted
                        autoPlay
                        className="size-full object-cover object-center"
                    />
                </BentoTilt>
            </div>

        </div>
    </section>
);

export default Features;