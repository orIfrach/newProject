import React from 'react';
import { useSpring, animated } from 'react-spring';
import './HomePage.css'

//homepage component
function HomePage() {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 2000 },
  });

    return (
      <div className='home-page'>
        <div className="welcome-banner">
          <animated.h1 style={animationProps}>Welcome to My New Project</animated.h1>
        </div>
      


      </div>  
  );
}

export default HomePage;
