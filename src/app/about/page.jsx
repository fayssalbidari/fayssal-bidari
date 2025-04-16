"use client";
import React, { useEffect, useRef } from "react";
import "./about.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";
import { cvItems } from "./cvItems";
import Image from "next/image";

const AboutPage = () => {
  const container = useRef();
  const aboutCopyRef = useRef(null);
  const cvWrapperRef = useRef(null);
  const cvHeaderRef = useRef(null);
  const cvListRef = useRef(null);
  const heroImgRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(CustomEase, ScrollTrigger);
    CustomEase.create(
      "hop2",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    let splitInstances = [];

    const applySplitType = async (element) => {
      const { default: SplitType } = await import("@/app/lib/SplitType");

      const splitTexts = element.querySelectorAll("h1, h2, h3");
      splitTexts.forEach((text) => {
        const split = new SplitType(text, {
          types: "lines",
          tagName: "span",
        });

        // Ajout dans l'instance pour nettoyage
        splitInstances.push({ split, text });

        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.className = "line-wrapper";
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      });
    };

    const animate = async () => {
      if (aboutCopyRef.current) {
        await applySplitType(aboutCopyRef.current);
        gsap.to(aboutCopyRef.current.querySelectorAll(".line-wrapper span"), {
          y: 0,
          stagger: 0.05,
          delay: 1.5,
          duration: 1.5,
          ease: "power4.out",
        });
      }

      if (cvHeaderRef.current) await applySplitType(cvHeaderRef.current);
      if (cvListRef.current) await applySplitType(cvListRef.current);

      if (cvWrapperRef.current) {
        const cvHeaderSpans =
          cvHeaderRef.current.querySelectorAll(".line-wrapper span");
        const cvListSpans =
          cvListRef.current.querySelectorAll(".line-wrapper span");

        gsap.set([cvHeaderSpans, cvListSpans], { y: "100%" });

        ScrollTrigger.create({
          trigger: cvWrapperRef.current,
          start: "top 50%",
          onEnter: () => {
            gsap.to(cvHeaderSpans, {
              y: 0,
              stagger: 0.05,
              duration: 1.5,
              ease: "power4.out",
            });
            gsap.to(cvListSpans, {
              y: 0,
              stagger: 0.02,
              duration: 1.5,
              ease: "power4.out",
            });
          },
        });
      }

      if (heroImgRef.current) {
        ScrollTrigger.create({
          trigger: heroImgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const scale = 1 + self.progress * 0.5;
            gsap.to(heroImgRef.current.querySelector("img"), {
              scale,
              ease: "none",
              duration: 0.1,
            });
          },
        });
      }
    };

    animate();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      splitInstances.forEach(({ split, text }) => {
        if (split && typeof split.revert === "function") split.revert();

        text.querySelectorAll(".line-wrapper").forEach((wrapper) => {
          wrapper.replaceWith(...wrapper.childNodes);
        });
      });
    };
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.to(".about-portrait", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        delay: 0.8,
        duration: 1,
        ease: "hop",
      });

      gsap.to(".about-copy-wrapper .about-copy-title h1", {
        y: 0,
        delay: 1,
        duration: 1.5,
        ease: "power4.out",
      });
    },
    { scope: container }
  );

  return (
    <ReactLenis root>
      <div className="about-page" ref={container}>
        <div className="container">
          <div className="about-intro">
            <div className="col about-portrait-img">
              <div className="about-portrait">
                <Image
                  src="/about/portrait-min.jpg"
                  alt="Portrait principal"
                  width={500}
                  height={600}
                />
              </div>
            </div>
            <div className="col about-copy-wrapper">
              <div className="about-copy-title">
                <h1>Bio</h1>
              </div>

              <div className="about-copy" ref={aboutCopyRef}>
                <h3>
                Passionate about UX/UI design and web development, I’m currently completing my bachelor’s degree at Albert Jacquard School. My work blends creativity and technical expertise to craft immersive digital experiences, always focusing on usability, aesthetics, and innovation.
                </h3>
                <br />
                <h3>
                With a strong background in front-end development, I enjoy turning ideas into interactive and engaging interfaces. I’m constantly exploring new technologies to enhance user experiences. My goal is to create intuitive designs that seamlessly connect users with the digital world.
                </h3>
                <br />
                <h3>
                Beyond coding, I have a deep passion for outdoor adventures and sports. My experiences in sports inspire my creative approach, emphasizing exploration and adaptability. I’m eager to collaborate on projects that challenge me to push boundaries and redefine digital experiences.
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="about-hero-img" ref={heroImgRef}>
          <Image
            src="/about/portrait-2-min.jpg"
            alt="Portrait secondaire"
            width={1440}
            height={800}
          />
        </div>

        <div className="container">
          <div className="cv-wrapper" ref={cvWrapperRef}>
            <div className="cv-header" ref={cvHeaderRef}>
              <h2>CV</h2>
            </div>

            <div className="cv-list" ref={cvListRef}>
              {cvItems.map((item, index) => (
                <div className="cv-item" key={index}>
                  <div className="cv-name">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="cv-year">
                    <h3>{item.year}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default AboutPage;
