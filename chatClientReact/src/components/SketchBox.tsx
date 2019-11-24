import React, { useState } from 'react'
import Sketch from 'react-p5'
 
export const SketchBox = () => {

  let offsets = {x:0,y:0};

    const [x, setX] = useState<number>(1);
    const [y, setY] = useState<number>(1);
 
  const setup = (p5:any, canvasParentRef:any) => {
    p5.createCanvas(500, 500).parent(canvasParentRef)
  }

  const refCallback = (e:any) => {
    if (e){
      const bc = e.getBoundingClientRect();  
      console.log(e);  
      offsets = {x:bc.x, y:bc.y};    
    }
    };

  const getClickPosition = (e:any) => {
    setX(e.screenX - offsets.x );
    setY(e.screenY  - offsets.y );
}
  
  const draw = (p5:any) => {
    p5.background(0)
    p5.ellipse(x, y, 70, 70)
    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
   }
 
     return (
     <div ref={refCallback} style={{width:"500px", height:"500px"}} onMouseMove={getClickPosition}>>
        <Sketch onMouseMove={getClickPosition} setup={setup} draw={draw} />
      </div>
     ) 
}