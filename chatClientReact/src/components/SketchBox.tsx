import React from 'react';
import { useEffect } from 'react'
import client from '../feathers';

import Sketch from 'react-p5';
import { ISketchData}  from "../sharedInterfaces/ISketchData";

interface SketchBoxProps{
  sketchInfo: ISketchData[];
  userId: string;
  onUpdateSketchInfor: Function;
}

export const SketchBox = (props: SketchBoxProps) => {

  useEffect(() => {
    client.service('sketches').on('created', (r:ISketchData) => drawRemote(r) );
;
  }, []);

  const { sketchInfo, onUpdateSketchInfor, userId } = props;

  let _p5: any;
  const setup = (p5: any, canvasParentRef: any) => {    
    _p5 = p5;
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.stroke(100);
    p5.strokeWeight(10);
    
    for (const i of sketchInfo) {    
        p5.line(i.data.x, i.data.y, i.data.px, i.data.py);          
    }
  }

  const drawRemote = (sketch: ISketchData) => {
    //Don't draw if id same as the user as this will be draw locally.
    if (sketch.id === userId) return;

    _p5.strokeWeight(10);  
    let c = _p5.color(255, 10, 10);
    _p5.fill(c);
    _p5.line(sketch.data.x, sketch.data.y, sketch.data.px, sketch.data.py); 
  }

   const drawLocal = (p5: any, e: any) => {   
    onUpdateSketchInfor(
      {
        x:p5.mouseX,
        y: p5.mouseY,
        px: p5.pmouseX,
        py:p5.pmouseY,
        userId: userId
      });
 
    let c = p5.color(255, 255, 255);
    p5.fill(c);
    p5.strokeWeight(10);
  
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  }

  return (
    <div style={{ width: "500px", height: "500px", cursor:"crosshair"}}>
      <Sketch setup={setup} mouseDragged={drawLocal} />
    </div>
  )
}