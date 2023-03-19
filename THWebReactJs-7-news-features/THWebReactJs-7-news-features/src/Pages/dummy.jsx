import React from "react";
import "../../src/index.css";

const list = [
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
  "Licensed Bar",
];

const styles = {};

const Dummy = () => {
  return (
    // <div>
    //     <div>
    //         <div>sknsknsakcckmcksm</div>
    //         <div>sknsknsakcckmcksm</div>
    //         <div>sknsknsakcckmcksm</div>
    //     </div>
    // </div>

    <div className="grid-conainer">
      {list.map((v, i) => {
        return (
          <>
            <div className="grid-item">{v}</div>
          </>
        );
      })}
    </div>
  );
};

export default Dummy;
