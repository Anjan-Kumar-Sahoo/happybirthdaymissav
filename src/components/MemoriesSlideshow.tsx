import React from 'react';
import SmoothSlideshow from './SmoothSlideshow';

const MemoriesSlideshow: React.FC = () => {
  const memoryImages = [
    { src: "/src/assets/images/memories/m1.jpg", label: "Memory 1" },
    { src: "/src/assets/images/memories/m2.jpg", label: "Memory 2" },
    { src: "/src/assets/images/memories/m3.jpg", label: "Memory 3" },
    { src: "/src/assets/images/memories/m4.jpg", label: "Memory 4" },
    { src: "/src/assets/images/memories/m5.jpg", label: "Memory 5" },
    { src: "/src/assets/images/memories/m6.jpg", label: "Memory 6" },
    { src: "/src/assets/images/memories/m7.jpg", label: "Memory 7" },
    { src: "/src/assets/images/memories/m8.jpg", label: "Memory 8" },
    { src: "/src/assets/images/memories/m9.jpg", label: "Memory 9" },
    { src: "/src/assets/images/memories/m10.jpg", label: "Memory 10" },
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