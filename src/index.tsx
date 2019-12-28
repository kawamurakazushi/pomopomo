import React, { FC, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useInterval from "./useInterval";

import "./assets/css/index.css";

const workIcons = [
  require("./assets/favicons/work/0.png"),
  require("./assets/favicons/work/1.png"),
  require("./assets/favicons/work/2.png"),
  require("./assets/favicons/work/3.png"),
  require("./assets/favicons/work/4.png"),
  require("./assets/favicons/work/5.png"),
  require("./assets/favicons/work/6.png"),
  require("./assets/favicons/work/7.png"),
  require("./assets/favicons/work/8.png"),
  require("./assets/favicons/work/9.png"),
  require("./assets/favicons/work/10.png"),
  require("./assets/favicons/work/11.png"),
  require("./assets/favicons/work/12.png"),
  require("./assets/favicons/work/13.png"),
  require("./assets/favicons/work/14.png"),
  require("./assets/favicons/work/15.png"),
  require("./assets/favicons/work/16.png"),
  require("./assets/favicons/work/17.png"),
  require("./assets/favicons/work/18.png"),
  require("./assets/favicons/work/19.png"),
  require("./assets/favicons/work/20.png"),
  require("./assets/favicons/work/21.png"),
  require("./assets/favicons/work/22.png"),
  require("./assets/favicons/work/23.png"),
  require("./assets/favicons/work/24.png"),
  require("./assets/favicons/work/25.png")
];

const restIcons = [
  require("./assets/favicons/rest/0.png"),
  require("./assets/favicons/rest/1.png"),
  require("./assets/favicons/rest/2.png"),
  require("./assets/favicons/rest/3.png"),
  require("./assets/favicons/rest/4.png"),
  require("./assets/favicons/rest/5.png")
];

const work = 25;
const restShort = 5;
// const restLong = 20;

const Root: FC = () => {
  const [minutes, setMinutes] = useState(work);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState<"restShort" | "work">("work");

  const [delay, setDelay] = useState<number | null>(null);

  useInterval(() => {
    // Done resting, or working
    if (minutes === 0 && seconds === 0) {
      // TODO: Send notification
      if (status === "work") {
        setMinutes(restShort);
        setSeconds(0);
        setStatus("restShort");
        alert("Time to Rest!");
      } else {
        setMinutes(work);
        setSeconds(0);
        setStatus("work");
        alert("Time to Work!");
      }

      return;
    }

    if (seconds === 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      return;
    }

    setSeconds(seconds - 1);
  }, delay);

  const time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  useEffect(() => {
    document.title = `${time} | PomoPomo`;

    const href =
      status === "restShort" ? restIcons[minutes] : workIcons[minutes];
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement<any>("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = href;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [time]);

  return (
    <>
      <div className="main">
        <div className="header">PomoPomo</div>
        <div className="time">{time}</div>
        <button
          className="button"
          onClick={() => {
            if (delay === null) {
              setDelay(1000);
              return;
            }
            setDelay(null);
          }}
        >
          {delay !== null ? "STOP" : "START"}
        </button>
      </div>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
