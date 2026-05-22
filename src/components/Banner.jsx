"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const vaultSlide = [
  {
    title: "Validate Your Next Big Idea",
    description:"Share startup concepts with founders, mentors, and innovators who help refine your vision through real feedback.",
    image: "/assets/banner-1.webp",
  },
  {
    title: "Collaborate With the Community",
    description:"Explore ideas across Tech, Health, AI, and more. Comment, discuss, and build momentum together.",
    image: "/assets/banner-2.jpg",
  },
  {
    title: "Turn Inspiration Into Action",
    description:"From problem statements to proposed solutions — IdeaVault helps you structure and showcase your startup pitch.",
    image: "/assets/banner-3.jpg",
  },
];

const Banner = () => {
  const myRef = useRef(null)

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % vaultSlide.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-5 flex justify-center my-5">
      <div className="w-11/12 md:rounded-2xl overflow-hidden h-[55vh] md:h-[70vh] relative">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {
            vaultSlide.map((vault, index) => (
              <div
                key={index}
                className="w-full shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${vault.image})` }}
              >
                <div className="h-full w-full bg-black/50 flex flex-col justify-center px-6 md:px-20">
                  <h3 className="text-3xl md:text-6xl font-bold text-white mb-3 max-w-2xl">
                    {vault.title}
                  </h3>
                  <p className="text-white/90 md:text-lg max-w-xl mb-6">{vault.description}</p>
                  <Link href="/ideas">
                    <Button className="bg-indigo-600 text-white w-fit">Explore Ideas</Button>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {
            vaultSlide.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Banner;
