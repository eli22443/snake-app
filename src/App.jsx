import Board from "./components/Board";
import Snake from "./components/Snake";
import Food from "./components/Food";
import { useEffect, useState } from "react";

function App() {
  const [foodPos, setFoodPos] = useState([{ x: 10, y: 10 }]);

  const [snakePos, setSnakePos] = useState([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 2, y: 5 },
    { x: 1, y: 5 },
  ]);
  const [snakeDirect, setSnakeDirect] = useState({ x: 1, y: 0 });
  const [snakeSpeed, setSnakeSpeed] = useState(2);

  const [gameRunning, setGameRunning] = useState(true);

  const delay = async () => {
    await new Promise((res) => setTimeout(res, 50)).then(moveSnake);
  };

  const randomPos = () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return { x, y };
  };

  const endGame = () => {
    console.log("END");
    setGameRunning(false);
  };
  const moveSnake = () => {
    if (snakeCollision()) {
      endGame();
      return;
    }

    let lastNode;
    let newPos = snakePos.map((node, index) => {
      if (index === 0) return node;
      if (index === snakePos.length - 1) lastNode = { x: node.x, y: node.y };
      return {
        x: snakePos[index - 1].x,
        y: snakePos[index - 1].y,
      };
    });
    newPos[0] = {
      x: (newPos[0].x += snakeDirect.x),
      y: (newPos[0].y += snakeDirect.y),
    };
    if (snakePos[0].x === foodPos[0].x && snakePos[0].y === foodPos[0].y) {
      newPos.push(lastNode);
      setFoodPos([randomPos()]);
      // setSnakeSpeed((snakeSpeed % 4) + 1);
    }
    setSnakePos(newPos);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "ArrowRight" && snakeDirect.x != -1 && snakeDirect.x != 1)
      setSnakeDirect({ x: 1, y: 0 });
    else if (
      event.key === "ArrowDown" &&
      snakeDirect.y != -1 &&
      snakeDirect.y != 1
    )
      setSnakeDirect({ x: 0, y: 1 });
    else if (
      event.key === "ArrowLeft" &&
      snakeDirect.x != 1 &&
      snakeDirect.x != -1
    )
      setSnakeDirect({ x: -1, y: 0 });
    else if (
      event.key === "ArrowUp" &&
      snakeDirect.y != 1 &&
      snakeDirect.y != -1
    )
      setSnakeDirect({ x: 0, y: -1 });
  };

  const snakeCollision = () => {
    if (
      (snakePos[0].x === 0 && snakeDirect.x === -1) ||
      (snakePos[0].y === 0 && snakeDirect.y === -1) ||
      (snakePos[0].x === 19 && snakeDirect.x === 1) ||
      (snakePos[0].y === 19 && snakeDirect.y === 1)
    )
      return true;

    for (const p of snakePos) {
      if (
        (snakeDirect.x != 0 &&
          snakePos[0].x + snakeDirect.x === p.x &&
          snakePos[0].y === p.y) ||
        (snakeDirect.y != 0 &&
          snakePos[0].y + snakeDirect.y === p.y &&
          snakePos[0].x === p.x)
      )
        return true;
    }

    return false;
  };

  useEffect(() => {
    if (!gameRunning) return;
    const interval = setInterval(moveSnake, 200 / snakeSpeed);
    return () => clearInterval(interval);
  }, [snakePos, snakeDirect, gameRunning]);

  useEffect(() => {
    if (!gameRunning) return;
    window.addEventListener("keydown", handleKeyDown);
    delay();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [snakeDirect, gameRunning]);

  return (
    <Board>
      <Food coordinates={foodPos} type={"apple"} />
      <Snake coordinates={snakePos} direction={snakeDirect} />
    </Board>
  );
}

export default App;
