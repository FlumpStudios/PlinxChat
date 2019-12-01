import React from 'react';
import { useEffect } from 'react'
import client from '../feathers';

import Sketch from 'react-p5';
import { ISketchData } from "../sharedInterfaces/sketchInterfaces";
import { User } from "../sharedInterfaces/UserInterfaces";

interface SketchBoxProps {
  sketchInfo: ISketchData[];
  activeUserId: string;
  onUpdateSketchInfor: Function;
  users: User[]
}

export const SketchBox = (props: SketchBoxProps) => {

  useEffect(() => {
    client.service('sketches').on('created', (r: ISketchData) => drawRemote(r));
    ;
  }, []);

  const { sketchInfo, onUpdateSketchInfor, activeUserId, users } = props;

  let _p5: any;
  const setup = (p5: any, canvasParentRef: any) => {
    _p5 = p5;
    p5.frameRate(20)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.strokeWeight(10);
    //p5.stroke(users.find(x => x._id == activeUserId));


    for (const i of sketchInfo) {
      p5.line(i.data.x, i.data.y, i.data.px, i.data.py);
    }
  }

  const drawRemote = (sketch: ISketchData) => {
    //Don't draw if id same as the user as this will be draw locally.    
    if (sketch.data.userId === activeUserId) return;

   

    const user = users.find(x => x._id === sketch.data.userId);
    console.log(user);
    _p5.stroke(user ? user.sketchColour : null);

    _p5.strokeWeight(10);
    _p5.line(sketch.data.x, sketch.data.y, sketch.data.px, sketch.data.py);
  }

  const drawLocal = (p5: any, e: any) => {
    onUpdateSketchInfor(
      {
        x: p5.mouseX,
        y: p5.mouseY,
        px: p5.pmouseX,
        py: p5.pmouseY,
        userId: activeUserId
      });

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