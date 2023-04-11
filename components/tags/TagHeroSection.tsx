import React from "react";

interface TagHeroSectionProps {
  subtitle?: string;
  title?: string;
}

const TagHeroSection = ({
  subtitle = "Tag Collection",
  title = "All Tags",
}: TagHeroSectionProps) => {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto py-16 flex flex-col gap-4">
        <p className="font-medium text-gray-500 text-2xl">{subtitle}</p>

        <h2 className="font-bold text-7xl">{title}</h2>
      </div>
    </section>
  );
};

export default TagHeroSection;
