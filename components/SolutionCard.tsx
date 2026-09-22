"use client";

import { ArrowUpRight } from "lucide-react";

type SolutionCardProps = {
  no: string;
  title: string;
  text: string;
  tag: string;
  image: string;
};

export default function SolutionCard({
  no,
  title,
  text,
  tag,
  image,
}: SolutionCardProps) {
  return (
    <a href="#contact" className="solution-card">
      <div className="solution-card-image">
        <img src={image} alt={title} />

        <div className="solution-card-overlay" />

        <div className="solution-card-top">
          <span>{no}</span>
          <span className="solution-card-tag">{tag}</span>
        </div>

        <div className="solution-card-arrow">
          <ArrowUpRight size={19} strokeWidth={1.8} />
        </div>

        <div className="solution-card-content">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </a>
  );
}