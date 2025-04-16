"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./portfolio.css";
import projectsData from "../data/projectsData";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "@studio-freight/react-lenis";

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const projects = [
    { name: "Into the Trail", img: "project-1.jpg", size: "lg" },
    { name: "Muzic PLZ", img: "project-2.jpg", size: "sm" },
    { name: "Casa Lunara", img: "project-3.jpg", size: "lg" },
    { name: "La Cabane Studio", img: "project-4.jpg", size: "sm" },
    { name: "ParaLab", img: "project-5.jpg", size: "lg" },
    { name: "Rethinking UX", img: "project-6.jpg", size: "lg" },
  ];

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = projects.map((project) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `/portfolio/${project.img}`;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(imagePromises);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  useGSAP(
    () => {
      if (isLoaded && containerRef.current) {
        const header = containerRef.current.querySelectorAll(
          ".portfolio-header h1"
        );
        const cols = containerRef.current.querySelectorAll(".col");

        gsap.to(header, {
          y: 0,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });

        gsap.to(cols, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.5,
          delay: 0.9,
          ease: "power4.out",
          stagger: 0.1,
        });

        cols.forEach((col) => {
          const img = col.querySelector("img");
          const titleP = col.querySelector(".project-title h3");

          col.addEventListener("mouseenter", () => {
            gsap.to(img, {
              scale: 1.25,
              duration: 2,
              ease: "power4.out",
            });
            gsap.to(titleP, {
              y: 0,
              duration: 1,
              ease: "power4.out",
            });
          });

          col.addEventListener("mouseleave", () => {
            gsap.to(img, {
              scale: 1,
              duration: 2,
              ease: "power4.out",
            });
            gsap.to(titleP, {
              y: 24,
              duration: 1,
              ease: "power4.out",
            });
          });
        });
      }
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  const renderProjectRows = () => {
    const rows = [];
    for (let i = 0; i < projects.length; i += 3) {
      rows.push(
        <div className="portfolio-row" key={i}>
          {projects.slice(i, i + 3).map((project, index) => {
            // Calculer correctement l'index du projet suivant
            const currentIndex = i + index;
            const nextProjectIndex = (currentIndex + 1) % projects.length;
            const nextProject = projects[nextProjectIndex];
            
            // Récupérer les données détaillées du projet
            const projectDetails = projectsData[project.name];
            
            return (
              <div className={`col ${project.size}`} key={i + index}>
                <Link 
                  href={{
                    pathname: '/portfolio/project',
                    query: { 
                      name: project.name, 
                      img: projectDetails?.images?.[0] || project.img,
                      date: projectDetails?.date || "",
                      desc1: projectDetails?.desc1 || "",
                      desc2: projectDetails?.desc2 || "",
                      desc3: projectDetails?.desc3 || "",
                      img2: projectDetails?.images?.[1] || "",
                      img3: projectDetails?.images?.[2] || "",
                      img4: projectDetails?.images?.[3] || "",
                      img5: projectDetails?.images?.[4] || "",
                      img6: projectDetails?.images?.[5] || "",
                      externalLink: projectDetails?.externalLink || ""
                    }
                  }}
                >
                  <img src={`/portfolio/${project.img}`} alt={project.name} />
                  <div className="project-title">
                    <h3>{project.name}</h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
    return rows;
  };

  return (
    <ReactLenis root>
      <div
        className={`portfolio-page ${isLoaded ? "loaded" : ""}`}
        ref={containerRef}
      >
        <div className="container">
          <div className="portfolio-header">
            <h1>Portfolio</h1>
            <h1>({projects.length.toString().padStart(2, '0')})</h1>
          </div>
          {isLoaded && renderProjectRows()}
        </div>
      </div>
    </ReactLenis>
  );
};

export default Page;
