import React from 'react';
import { useEffect } from 'react'
import client from '../feathers';
import Sketch from 'react-p5';
import { ISketchData } from "../sharedInterfaces/sketchInterfaces";
import { User } from "../sharedInterfaces/userInterfaces";
import {sketchInfo} from "../sharedInterfaces/sketchInterfaces";

interface SketchBoxProps {
  users: User[]; 
  activeUserId: string;  
  cahedUserSketch: sketchInfo[];
  sketchInfo:sketchInfo[];
  onUpdateSketchInfor: Function;
  setCahedUserSketch: Function;    
}

export const SketchBox = (props: SketchBoxProps) => {

  const { 
    onUpdateSketchInfor,
    activeUserId, 
    users,
    setCahedUserSketch,
    cahedUserSketch,
    sketchInfo } = props;
  let _p5: any;
  
  useEffect(() => {
    client.service('sketches').on('created', (r: ISketchData) => drawRemote(r));    
  }, []);
 

  const setup = (p5: any, canvasParentRef: any) => {
    _p5 = p5;
    p5.frameRate(20)
    p5.createCanvas(720, 500).parent(canvasParentRef);
    p5.strokeWeight(10);    

    for (const i of sketchInfo) {      
      const user = users.find(x => x._id === i.userId);
      p5.stroke(user ? user.sketchColour : null);
    
      p5.line(i.x, i.y, i.px, i.py);
    }
  }

  const drawRemote = (sketch: ISketchData) => {
    //Don't draw if id same as the user as this will be draw locally.    
    if (sketch.data.userId === activeUserId) return;   
    const user = users.find(x => x._id === sketch.data.userId);
    _p5.stroke(user ? user.sketchColour : null);
    _p5.strokeWeight(10);
    _p5.line(sketch.data.x, sketch.data.y, sketch.data.px, sketch.data.py);
  }

  const drawLocal = (p5: any, e: any) => {

    const  sd =   {
      x: p5.mouseX,
      y: p5.mouseY,
      px: p5.pmouseX,
      py: p5.pmouseY,
      userId: activeUserId
    };

    onUpdateSketchInfor(sd);

    setCahedUserSketch([...cahedUserSketch, sd])
    const user = users.find(x => x._id === activeUserId);    
    p5.stroke(user ? user.sketchColour : null);
    p5.strokeWeight(10);

    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  }

  return (
    <div style={{ width: "500px", height: "500px", cursor: "crosshair" }}>
      <Sketch setup={setup} mouseDragged={drawLocal} />
    </div>
  )
}