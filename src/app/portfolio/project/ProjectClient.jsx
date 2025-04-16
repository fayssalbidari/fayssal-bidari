"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";
import "./project.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectClient = () => {
  const searchParams = useSearchParams();

  const projectName = searchParams.get("name");
  const projectImg = searchParams.get("img");
  const projectDate = searchParams.get("date");
  const projectDesc1 = searchParams.get("desc1");
  const projectDesc2 = searchParams.get("desc2");
  const projectDesc3 = searchParams.get("desc3");
  const projectImg2 = searchParams.get("img2");
  const projectImg3 = searchParams.get("img3");
  const projectImg4 = searchParams.get("img4");
  const projectImg5 = searchParams.get("img5");
  const projectImg6 = searchParams.get("img6");
  const externalLink = searchParams.get("externalLink");

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const firstImgRef = useRef(null);
  const imgRefs = useRef([]);
  const copyH3Refs = useRef([]);
  const nextProjectRef = useRef(null);
  const nextProjectTitleRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(titleRef.current, { y: 100 }, { y: 0, duration: 1.5, ease: "power4.out" });

      tl.fromTo(
        dateRef.current,
        { y: 100 },
        { y: 0, duration: 1.5, ease: "power4.out" },
        "-=1.4"
      );

      tl.fromTo(
        firstImgRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "power4.out",
        },
        "-=1"
      );

      imgRefs.current.forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: img,
              start: "top 50%",
            },
          }
        );
      });

      // Dynamically import SplitType only on client
      import("@/app/lib/SplitType").then(({ default: SplitType }) => {
        copyH3Refs.current.forEach((h3) => {
          if (!h3) return;
          const split = new SplitType(h3, { types: "lines" });

          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.className = "line";
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          gsap.from(h3.querySelectorAll(".line"), {
            y: 36,
            duration: 1,
            stagger: 0.02,
            ease: "power4.out",
            scrollTrigger: {
              trigger: h3,
              start: "top 80%",
            },
          });
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <ReactLenis root>
      <div className="project-page" ref={containerRef}>
        <div className="container">
          <div className="project-page-title">
            <h1 ref={titleRef}>{projectName}</h1>
          </div>
          <div className="project-date">
            <p ref={dateRef}>{projectDate}</p>
          </div>

          <div className="project-content">
            <div className="img img-1" ref={firstImgRef}>
              <Image
                src={`/portfolio/${projectImg}`}
                alt={projectName || "project image"}
                width={800}
                height={500}
              />
            </div>

            <div className="copy">
              <h3 ref={(el) => (copyH3Refs.current[0] = el)}>{projectDesc1}</h3>
            </div>

            {[projectImg2, projectImg3, projectImg4, projectImg5, projectImg6].map(
              (img, index) =>
                img && (
                  <div
                    key={index}
                    className={`img img-${index + 2}`}
                    ref={(el) => (imgRefs.current[index] = el)}
                  >
                    <Image
                      src={`/portfolio/${img}`}
                      alt={projectName || `project image ${index + 2}`}
                      width={800}
                      height={500}
                    />
                  </div>
                )
            )}

            <div className="copy">
              <h3 ref={(el) => (copyH3Refs.current[1] = el)}>{projectDesc2}</h3>
            </div>

            <div className="copy">
              <h3 ref={(el) => (copyH3Refs.current[2] = el)}>{projectDesc3}</h3>
            </div>

            <div className="next-project" ref={nextProjectRef}>
              <p>Visit Project</p>
            </div>
            <div className="next-project-title" ref={nextProjectTitleRef}>
              <Link href={externalLink || "#"} target="_blank" rel="noopener noreferrer">
                <h2>{projectName}</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default ProjectClient;
