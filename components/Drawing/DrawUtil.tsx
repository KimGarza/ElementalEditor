import React, { useState } from "react";
import { View } from "react-native";
import usePanResponder from "./usePanResponder";
import Svg, { Path } from 'react-native-svg';

type Point = {
    x: number;
    y: number;
  };
  type PathData = Point[];

// if an updated props value is passed in bc user clicked the pencil again, whatever strokes were being made will now be grouped as one and that drawing is now finished
interface DrawUtilProps {
    isDrawing: boolean;
  }
  
  const DrawUtil: React.FC<DrawUtilProps> = ({ isDrawing }) => {

    const [activePath, setActivePath] = useState<PathData>([]); // this is the LIVE stroke/gesture, the current path being drawn

    const handlePathUpdate = (newActivePath: PathData) => { // ??? it's a callback
        console.log("newActivePath", newActivePath);
        setActivePath(newActivePath);
    }

    // // by passing in the function, the return data will return as the arg for the func and (i forget how it returns that value speicifcally to the prop), but
    // // that allows above handlepathupdate to have a newPath t set as the current active path
    // const { panResponder } = usePanResponder(handlePathUpdate); THIS IS THE PROBLEM CHILD

    const pathData = activePath.length
    ? `M${activePath.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

return (
    <View>
        {/* {isDrawing ? (
            <View {...panResponder.panHandlers}>
                <Svg height="100%" width="100%">
                    <Path
                    // the current activePath is queried for having content, if so then it will map the points by x and y location and then join L whatever that means
                    // otherwise '' bc there is nothing to be = to pathData currently
                    d={pathData} // so this = the current M and L which are speicifc to how d works in Path comp is svg library
                    stroke="black"
                    strokeWidth="3"
                    fill="none"
                    />
                </Svg>
            </View>
        ) : (<></>)} */}
 
    </View>
);
}

export default DrawUtil;