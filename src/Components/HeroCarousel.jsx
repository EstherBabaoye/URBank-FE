import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slide1 from '../assets/Secure Banking.png';
import Slide2 from '../assets/Bank Anywhere.png';
import Slide3 from '../assets/Open Account.jpg';
import Slide4 from '../assets/Smart Card.jpg';
import Slide5 from '../assets/Track Finances.jpg';
import Slide6 from '../assets/Grow Business.png';
import Slide7 from '../assets/Customer Support.png';

const slides = [
  {
    id: 1,
    background: Slide1,
    title: 'Secure Banking',
    subtitle: 'Your money, your security',
    description:
      'Enjoy peace of mind with fingerprint and face ID login features. Our app is built with next-gen protection for modern banking.',
    route: '/services/secure-banking',
  },
  {
    id: 2,
    background: Slide2,
    title: 'Bank Anywhere, Anytime',
    subtitle: 'Total freedom at your fingertips',
    description:
      'Whether you’re on a beach or in bed, check balances and make transfers with ease. Banking that moves with you.',
    route: '/services/mobile-banking',
  },
  {
    id: 3,
    background: Slide3,
    title: 'Open an Account in Minutes',
    subtitle: 'Banking made simple',
    description:
      'Start your financial journey from your phone. Open an account in just a few steps—fast, friendly, and easy.',
    route: '/accounts/open-account',
  },
  {
    id: 4,
    background: Slide4,
    title: 'Smart Cards for Smart Spending',
    subtitle: 'Tap. Pay. Done.',
    description:
      'Make purchases quickly with our sleek debit and credit cards. Designed for speed, security, and style.',
    route: '/cards-loans/smart-cards',
  },
  {
    id: 5,
    background: Slide5,
    title: 'Track Your Finances Like a Pro',
    subtitle: 'Know where every naira goes',
    description:
      'Visualize spending habits and set goals with ease. Our app gives you clarity and control over your finances.',
    route: '/services/track-finances',
  },
  {
    id: 6,
    background: Slide6,
    title: 'Grow Your Business With Us',
    subtitle: 'Tailored support for entrepreneurs',
    description:
      'From transactions to tools, we’re here for your business every step of the way. Let’s build success together.',
    route: '/support/help-center/business-tools',
  },
  {
    id: 7,
    background: Slide7,
    title: '24/7 Customer Support',
    subtitle: 'Real help, anytime',
    description:
      'Talk to real humans, anytime. Our support team is always on standby to resolve issues and answer your questions.',
    route: '/support',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const handleClick = (e) => {
    const x = e.nativeEvent.offsetX;
    const width = e.currentTarget.offsetWidth;
    if (x < width / 2) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden h-[500px] mt-24 md:h-[600px] select-none"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-[500px] md:h-[600px] relative cursor-pointer"
            onClick={handleClick}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.background})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-transparent" />
            <div className="relative z-10 left-4 sm:left-6 md:left-[70px] top-[80px] md:top-[140px] inline-flex flex-col justify-start items-start gap-4 sm:gap-5 md:gap-6 pr-4">
              <div className="flex flex-col justify-start items-start gap-2 sm:gap-3">
                <div className="flex justify-start items-center">
                  <span className="text-white/70 text-sm sm:text-base md:text-xl font-medium leading-tight">
                    {slide.subtitle}
                  </span>
                </div>
                <h1 className="w-full max-w-xs sm:max-w-md md:w-[667px] text-white text-2xl sm:text-3xl md:text-6xl font-bold leading-snug md:leading-[64px]">
                  {slide.title}
                </h1>
                <p className="max-w-xs sm:max-w-md md:w-[561px] text-white text-sm sm:text-base font-normal leading-normal">
                  {slide.description}
                </p>
              </div>
              <Link to={slide.route}>
                <button className="w-44 sm:w-52 md:w-60 h-10 sm:h-12 md:h-14 p-2 sm:p-3 bg-[#72cded] rounded-lg flex justify-center items-center">
                  <span className="hover:text-[#fbbf24] text-[#051d40] text-sm sm:text-base md:text-lg font-semibold">
                    LEARN MORE
                  </span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}
