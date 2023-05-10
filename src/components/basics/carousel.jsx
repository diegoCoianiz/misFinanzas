import React, { useState, useEffect } from "react";

const Carousel = ({ children, setTime = 4000, timeCondition = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlideOpacity, setActiveSlideOpacity] = useState(1);

  if(timeCondition)
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

  const prevSlide = () => {
    const lastIndex = children.length - 1;
    const shouldResetIndex = currentIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentIndex - 1;
  
    setCurrentIndex(index < 0 ? lastIndex : index);
  };
  
  const nextSlide = () => {
    const lastIndex = children.length - 1;
    const shouldResetIndex = currentIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentIndex + 1;
  
    setCurrentIndex(index > lastIndex ? 0 : index);
  };

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
      transform: 'translateX(0%)',
      // height: "esta categoría debe ser asignada en CSS <activeSlideCarouselDiv> para darle mediaQuerys"
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
    },
    silderButtonNoTime: {
      cursor: "pointer"
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
      <div className="silderButtonTime" style={styles.buttonContainer}>
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
            {timeCondition === false ? 
      <div style={{display:"flex"}}>
        <button style={styles.silderButtonNoTime} onClick={() => prevSlide()}>{"<"}</button>
        <button style={styles.silderButtonNoTime}onClick={() => nextSlide()}>{">"}</button>
      </div> : ""
      }
    </div>
  );
};

export default Carousel;

