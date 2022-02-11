import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { firestore } from "../firebase/utils";

const Editor = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = React.useState("placement");
  const [title, setTitle] = useState("");

  const handleCategoryChange = (category) => {
    setCategory(category);
    console.log(category);
  };

  const handleSubmit = () => {
    const allData = {
      name,
      title,
      data,
      type: category
    };

    console.log(allData);
    firestore
      .collection("interviews")
      .add(allData)
      .then(() => {
        alert("Document successfully written!");
      })
      .catch((error) => {
        alert("Error writing document: ", error);
      });
  };

  console.log(data);
  return (
    <div className="App">
      <h1>IIITN SPHERE</h1>
      <div>
        <Link to="/">Go Back</Link>
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

      <div style={{ margin: "1rem" }}>
        <label htmlFor="title">Role</label>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
          id="title"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          id="name"
          type="text"
        />
      </div>
      <CKEditor
        editor={ClassicEditor}
        data="<p></p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />

      <input
        onClick={handleSubmit}
        style={{ margin: "1rem" }}
        type="button"
        value="Click to submit"
      />
    </div>
  );
};

export default Editor;
