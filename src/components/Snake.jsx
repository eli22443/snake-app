import { useState } from "react";
import { FaRegCircle } from "react-icons/fa6";
import { GiSnakeBite } from "react-icons/gi";

function Snake({ coordinates, direction }) {
  const renderedSnake = coordinates.map((coordinate, index) => {
    const style = {
      position: "absolute",
      left: `${coordinate.x * 21.7 + 1.5}px`,
      top: `${coordinate.y * 21.7 + 1.5}px`,
      width: "16px",
      height: "16px",
      // display: "flex",
      // backgroundColor: "red",
    };

    if (index == 0) {
      if (direction.x == 1) style.transform = `rotate(270deg)`;
      if (direction.x == -1) style.transform = `rotate(90deg)`;
      if (direction.y == 1) style.transform = `rotate(0deg)`;
      if (direction.y == -1) style.transform = `rotate(180deg)`;
      return (
        <div key={index} style={style}>
          {<GiSnakeBite />}
        </div>
      );
    }

    return (
      <div key={index} style={style}>
        {<FaRegCircle />}
      </div>
    );
  });

  return <div>{renderedSnake}</div>;
}

export default Snake;
