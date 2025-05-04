import { useState } from "react";
import { FaSquare } from "react-icons/fa";
import snakeFace from "../assets/snake_face.png";

function Snake({ coordinates, direction }) {
  const renderedSnake = coordinates.map((coordinate, index) => {
    const style = {
      position: "absolute",
      left: `${coordinate.x * 21.7 + 17.5}px`,
      top: `${coordinate.y * 21.7 + 17.5}px`,
      width: "16px",
      height: "16px",
      // display: "flex",
      // backgroundColor: "red",
    };

    if (index == 0) {
      // enlarge head by 50%
      style.width = "16px";
      style.height = "24px";
      style.left = `${coordinate.x * 21.7 + 17.5}px`;
      style.top = `${coordinate.y * 21.7 + 14.5}px`;

      if (direction.x == 1) style.transform = `rotate(270deg)`;
      if (direction.x == -1) style.transform = `rotate(90deg)`;
      if (direction.y == 1) style.transform = `rotate(0deg)`;
      if (direction.y == -1) style.transform = `rotate(180deg)`;
      return <img key={index} src={snakeFace} alt="snake head" style={style} />;
    }

    return (
      <div key={index} style={style}>
        {<FaSquare />}
      </div>
    );
  });

  return <div>{renderedSnake}</div>;
}

export default Snake;
