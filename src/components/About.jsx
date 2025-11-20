import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      }
    })

    // Fixed: Added dot before class name and fixed property names
    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0
    })
  })

  return (
    <div id="advice" className='min-h-screen w-screen'>
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-sm uppercase md:text-[10px]'>
          Welcome
        </h2>
        <AnimatedTitle title="<b>a</b>nime is an <b>a</b>rt form <br />everyone should experience it"
          containerClass="mt-5 !text-black text-center" />
        <div className='about-subtext mt-10'>
          <p className='font-general'><b>you are missing out.</b></p><br/>
          <p className='font-general'><b>Anime teaches many life lessons with such a beautiful story</b></p>
        </div>
      </div>
      <div className='h-dvh w-screen' id='clip'>
        <div className='mask-clip-path about-image'>
          <img
            src='img/about.png'
            alt="Background"
            className='absolute left-0 top-0 size-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default About