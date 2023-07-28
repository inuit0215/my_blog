import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Add this import
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import "./EditPage.css";
import { PASSWORD } from "../components/Constant";

export default function EditPage() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [password, setPassWord] = useState("パスワード");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValue(location.state.body);
    setTitle(location.state.title);
    setDesc(location.state.description);
  }, []);

  return (
    <>
      <Header
        buttonName="登録"
        onClick={async () => {
          if (password === PASSWORD) {
            if (location.state.id === -1) {
              await axios.post("http://localhost:3000/blogs/", {
                title: title,
                description: description,
                body: value,
                createdAt: new Date().toLocaleString(),
              });
              navigate("/");
            } else {
              await axios.put(
                "http://localhost:3000/blogs/" + location.state.id,
                {
                  title: title,
                  description: description,
                  body: value,
                  createdAt: new Date().toLocaleString(),
                }
              );
              navigate("/");
            }
          }
        }}
      />
      <div className="Container">
        <TextField
          fullWidth
          class={"TextField"}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          fullWidth
          class={"TextField"}
          value={description}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <MDEditor
          value={value}
          height="100%"
          onChange={setValue}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
        <TextField
          fullWidth
          class={"TextField"}
          value={password}
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
        />
      </div>
    </>
  );
}

EditPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      body: PropTypes.string,
    }),
  }).isRequired,
};
