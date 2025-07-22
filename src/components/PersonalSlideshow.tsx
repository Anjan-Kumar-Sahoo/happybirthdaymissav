import React from 'react';
import SmoothSlideshow from './SmoothSlideshow';

const PersonalSlideshow: React.FC = () => {
  const personalImages = [
    { src: "/src/assets/images/personal/av1.jpg", label: "Av #1" },
    { src: "/src/assets/images/personal/av2.jpg", label: "Av #2" },
    { src: "/src/assets/images/personal/av3.jpg", label: "Av #3" },
    { src: "/src/assets/images/personal/av4.jpg", label: "Av #4" },
    { src: "/src/assets/images/personal/av5.jpg", label: "Av #5" },
    { src: "/src/assets/images/personal/av6.jpg", label: "Av #6" },
    { src: "/src/assets/images/personal/av7.jpg", label: "Av #7" },
    { src: "/src/assets/images/personal/av8.jpg", label: "Av #8" },
    { src: "/src/assets/images/personal/av9.jpg", label: "Av #9" },
    { src: "/src/assets/images/personal/av10.jpg", label: "Av #10" },
  ];

  return (
    <SmoothSlideshow 
      images={personalImages}
      direction="right"
      theme="pink"
      title="Miss Av"
      subtitle="Diary Friend"
      emoji="💖"
      floatingEmoji="💖"
    />
  );
};

export default PersonalSlideshow;
