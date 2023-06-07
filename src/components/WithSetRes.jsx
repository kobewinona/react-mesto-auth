import {useState, useEffect} from 'react';


const WithSetRes = ({element: Component, ...props}) => {
  const higherRes = 768;
  const [isHigherResOn, setIsHigherResOn] = useState();
  
  const handleResize = () => {
    if(window.innerWidth >= higherRes) {
      setIsHigherResOn(true);
    } else {
      setIsHigherResOn(false);
    }
  }
  
  useEffect(() => {
    setIsHigherResOn(window.innerWidth >= higherRes);
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (<Component isHigherResOn={isHigherResOn} {...props}/>);
};

export default WithSetRes;