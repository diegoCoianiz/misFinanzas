import React, { useState, useEffect } from "react";

const Carousel = ({ children, setTime = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlideOpacity, setActiveSlideOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlideOpacity(0);
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % children.length);
        setActiveSlideOpacity(1);
      }, 500);
    }, setTime);
  
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
      overflow: 'hidden',
      padding: '0px'
    },
    activeSlide: {
      display: 'flex',
      margin: '0px',
      padding: '0px',
      opacity: activeSlideOpacity,
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      transform: 'translateX(0%)'
    },
    prevSlide: {
      display: 'none',
      margin: '0px',
      padding: '0px',
      opacity: '0',
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      transform: 'translateX(100%)'
    },
    nextSlide: {
      display: 'none',
      margin: '0px',
      padding: '0px',
      opacity: '0',
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      transform: 'translateX(-100%)'
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px"
    },
    button: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      margin: "0px 5px",
      cursor: "pointer"
    },
    activeButton: {
      backgroundColor: "red"
    },
    inactiveButton: {
      backgroundColor: "gray"
    }
  };
  

  return (
    <div className="carousel">
      <br></br>
      <div style={styles.carouselSlides}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="activeSlideCarouselDiv"
            style={index === 1 ? styles.activeSlide : index === 0 ? styles.prevSlide : styles.nextSlide}
          >
            {slide}
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              ...styles.button,
              ...(index === currentIndex
                ? styles.activeButton
                : styles.inactiveButton)
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;