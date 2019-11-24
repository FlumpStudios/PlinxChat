import React from 'react';
import Sketch from 'react-p5';

export const SketchBox = () => {
  const setup = (p5: any, canvasParentRef: any) => {
    
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.stroke(255);
  }
  
   const drawImage = (p5: any, e: any) => {
    
    p5.strokeWeight(10);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);

    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
  }

  return (
    <div style={{ width: "500px", height: "500px", cursor:"crosshair"}}>
      <Sketch  setup={setup} mouseDragged={drawImage} />
    </div>
  )
}