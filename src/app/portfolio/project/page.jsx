// src/app/portfolio/project/page.js

import dynamic from "next/dynamic";

// 👇 Désactive le rendu serveur (ssr) pour supporter useSearchParams
const ProjectClient = dynamic(() => import("./ProjectClient"), {
  ssr: false,
});

export default function Page() {
  return <ProjectClient />;
}
