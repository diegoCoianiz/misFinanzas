import React, { useState, useEffect } from "react";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlideOpacity, setActiveSlideOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlideOpacity(0);
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % children.length);
        setActiveSlideOpacity(1);
      }, 500);
    }, 8000);
  
    return () => clearInterval(intervalId);
  }, [currentIndex, children]);
  

  const prevSlideIndex = (currentIndex - 1 + children.length) % children.length;
  const nextSlideIndex = (currentIndex + 1) % children.length;
  const slides = [
    children[prevSlideIndex],
    children[currentIndex],
    children[nextSlideIndex],
  ];

  const styles = {
    carouselSlides: {
      height: '257px',
      overflow: 'hidden',
      padding: '0px'
    },
    activeSlide: {
      display: 'flex',
      margin: '0px',
      padding: '0px',
      opacity: activeSlideOpacity,
      transition: 'opacity 0.5s ease-in-out'
    },
    prevSlide: {
      display: 'none',
      opacity: '0'
    },
    nextSlide: {
      display: 'none',
      opacity: '0'
    }
  };

  return (
    <div className="carousel">
      <br></br>
      <div style={styles.carouselSlides}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={index === 1 ? styles.activeSlide : index === 0 ? styles.prevSlide : styles.nextSlide}
          >
            {slide}
          </div>
        ))}
      </div>
      {/* <hr></hr> */}
    </div>
  );
};

export default Carousel;