"use client";

import Link from "next/link";

type IndustryCardProps = {
  number: string;
  title: string;
  description?: string;
  href?: string;
};

export default function IndustryCard({
  number,
  title,
  description = "Surface systems engineered for the operational demands of the environment.",
  href = "#",
}: IndustryCardProps) {
  return (
    <Link href={href} className="industry-card">
      <div className="industry-card__number">
        {number}
      </div>

      <div className="industry-card__content">
        <h3 className="industry-card__title">
          {title}
        </h3>

        <p className="industry-card__description">
          {description}
        </p>
      </div>

      <div className="industry-card__arrow">
        ↗
      </div>
    </Link>
  );
}