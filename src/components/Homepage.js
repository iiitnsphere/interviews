import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/utils";
import Card from "./Card";
import image from "../assests/ezgif.com-gif-maker.gif";
const Homepage = () => {
  const [interviewsData, setInterviewsData] = useState([]);
  const [category, setCategory] = React.useState("placement");

  const handleCategoryChange = (category) => {
    setCategory(category);
    console.log(category);
  };

  useEffect(() => {
    firestore
      .collection("interviews")
      .where("type", "==", category)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setInterviewsData((previousData) => [...previousData, doc.data()]);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setInterviewsData(
      interviewsData.filter((interview) => interview.type === category)
    );
  }, [category]);

  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>IIITN SPHERE</h1>
          <div>
            <img
              style={{ display: "block" }}
              width="70px"
              height="70px"
              src={image}
              alt="logo"
            />
          </div>
        </div>
        <div>
          <Link to="/create">To write your experience click here</Link>
        </div>
        <select
          style={{ margin: "1rem" }}
          name="category"
          value={category}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option id="0">placement</option>
          <option id="1">internship</option>
        </select>
        {interviewsData.map((interview) => (
          <Card key={interview.name} interview={interview} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
