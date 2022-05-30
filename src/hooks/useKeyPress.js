import { useEffect, useState } from "react";

export const useKeyPress = () => {
  useEffect(()=>{
      document.addEventListener("keypress", handle);
      return () => document.removeEventListener("keypress", handle);
  })

  const [keysPressed , SetKeyPressed] = useState('0');
  
  const handle =(e)=>{
    SetKeyPressed(e.key);
  }

  return {keysPressed};
};
