import { useEffect, useState } from "react";
import { FaAppleAlt } from "react-icons/fa";
import "./Food.css";

function Food({ coordinates, type }) {
  // const [food, setFood] = useState({ x: 10, y: 10 });
  // useEffect(() => {
  //   setFood(coordinates);
  // }, []);
  let food;
  if (type === "apple") food = <FaAppleAlt />;

  const renderedFood = coordinates.map((coordinate, index) => {
    const style = {
      position: "absolute",
      left: `${coordinate.x * 21.7 + 16.5}px`,
      top: `${coordinate.y * 21.7 + 16.5}px`,
      width: "20px",
      height: "20px",
      // backgroundColor: "red",
    };

    return (
      <div key={index} style={style}>
        {food}
      </div>
    );
  });

  return <div>{renderedFood}</div>;
}

export default Food;
