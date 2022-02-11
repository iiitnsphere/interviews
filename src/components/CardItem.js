import React, { useState } from "react";

const CardItem = (interview) => {
  const [show, setShow] = useState(false);
  const [displayText, setDisplayText] = useState("Read More...");
  const handleReadMore = () => {
    setShow(!show);
    setDisplayText(!show ? "Collapse" : "ReadMore...");
  };
  return (
    <div style={{ border: "1px solid green", marginTop: "0.5rem" }}>
      <div style={{ margin: "1rem" }}>
        <span>{interview.interview.interview.title}</span>
        <span onClick={handleReadMore}>: {displayText}</span>
      </div>
      {show && (
        <div
          style={{ margin: "1rem" }}
          dangerouslySetInnerHTML={{
            __html: interview.interview.interview.data
          }}
        />
      )}
    </div>
  );
};

export default CardItem;
