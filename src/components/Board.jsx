import "./Board.css";
import { useState } from "react";

function Board({ children }) {
  let score = 0;
  const size = 20;
  let index = 0;
  let gameOver = true;
  const grid = [];
  // const [activeGrid, setActiveGrid] = useState(grid);

  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = <div key={index++} className="grid-item"></div>;
    }
  }

  // grid[0][0] = (
  //   <div key={index++} className="grid-item">
  //     <Snake />
  //   </div>
  // );
  // grid[10][10] = (
  //   <div key={index++} className="grid-item">
  //     <Food coordinate={{ x: 1, y: 10 }} type={"apple"} />
  //   </div>
  // );

  return (
    <div className="board-container">
      <div className="grid-container">{grid}</div>
      {children}
    </div>
  );
}

export default Board;
