import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

interface ResizableConfig {
  horizontal: ResizableBoxProps;
  vertical: ResizableBoxProps;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  // prevent width jump when resizing the window
  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: number | undefined;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        // need to update width if window innerWidth is too small
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  let resizableConfig: ResizableConfig = {
    horizontal: {
      className: "resize-horizontal",
      maxConstraints: [innerWidth, Infinity],
      minConstraints: [innerWidth * 0.05, Infinity],
      height: Infinity,
      width: width * 0.75,
      resizeHandles: ["e"],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      },
    },
    vertical: {
      className: "resize-vertical",
      maxConstraints: [Infinity, innerHeight * 0.8],
      minConstraints: [Infinity, 25],
      width: Infinity,
      height: 450,
      resizeHandles: ["s"],
    },
  };

  return (
    <ResizableBox {...resizableConfig[direction]}>{children}</ResizableBox>
  );
};

Resizable.defaultProps = {
  direction: "vertical",
};

export default Resizable;
