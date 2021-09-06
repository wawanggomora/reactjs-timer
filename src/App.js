import { useRef, useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const timerId = useRef(0);
  const divRef = useRef("");
  const [count, setCount] = useState(0);
  const [boom, setBoom] = useState(false);

  const startTimer = () => {
    if (timerId.current) return;
    timerId.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    setBoom(false);
  };

  const kaboom = () => {
    resetTimer();
    setBoom(true);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const resetTimer = () => {
    stopTimer();
    setCount((count) => 0);
    setBoom(false);
    divRef.current.style.width = "150px";
  };

  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    divRef.current.style.backgroundColor = `#${randomColor}`;
    divRef.current.style.transition = "all .3s ease";

    if (count === 10) kaboom();

    if (timerId.current !== 0)
      divRef.current.style.width = `${divRef.current.offsetWidth + 15}px`;
  }, [count]);

  return (
    <div className="App">
      <div className="time-loader" ref={divRef}>
        <span className={boom ? "hidden" : "block"}>
          Timer: <span>{count}s</span>
        </span>
        <span className={boom ? "block" : "hidden"}>Kaboom</span>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
