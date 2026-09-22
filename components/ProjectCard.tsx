import { ArrowUpRight } from "lucide-react";
export default function ProjectCard({ title, type, location, tone }: { title: string; type: string; location: string; tone: string }) {
  const bg = tone === "clean" ? "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85" : tone === "warehouse" ? "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1400&q=85" : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85";
  return <a href="#contact" className="project-card" style={{backgroundImage:`url(${bg})`}}><div className="project-shade"/><div className="project-content"><div><p>{type}</p><h3>{title}</h3><span>{location}</span></div><span className="project-icon"><ArrowUpRight size={18}/></span></div></a>;
}
