import React from 'react';
import SmoothSlideshow from './SmoothSlideshow';

const MemoriesSlideshow: React.FC = () => {
  const memoryImages = [
    { src: "/images/memories/m1.jpg", label: "Memory 1" },
    { src: "/images/memories/m2.jpg", label: "Memory 2" },
    { src: "/images/memories/m3.jpg", label: "Memory 3" },
    { src: "/images/memories/m4.jpg", label: "Memory 4" },
    { src: "/images/memories/m5.jpg", label: "Memory 5" },
    { src: "/images/memories/m6.jpg", label: "Memory 6" },
    { src: "/images/memories/m7.jpg", label: "Memory 7" },
    { src: "/images/memories/m8.jpg", label: "Memory 8" },
    { src: "/images/memories/m9.jpg", label: "Memory 9" },
    { src: "/images/memories/m10.jpg", label: "Memory 10" },
  ];

  return (
    <SmoothSlideshow 
      images={memoryImages}
      direction="left"
      theme="green"
      title="Memories"
      subtitle="Beautiful moments to cherish"
      emoji="🌸"
      floatingEmoji="🌿"
    />
  );
};

export default MemoriesSlideshow;