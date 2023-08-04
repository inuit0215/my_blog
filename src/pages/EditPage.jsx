import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Add this import
import { useNavigate, useLocation } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import "./EditPage.css";
import { PASSWORD } from "../components/Constant";
import { DataStore } from "@aws-amplify/datastore";
import { Blog } from "../models";

export default function EditPage() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [password, setPassWord] = useState("パスワード");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setBody(location.state.body);
    setTitle(location.state.title);
    setDesc(location.state.description);
  }, []);

  return (
    <>
      <Header
        buttonName="登録"
        onClick={async () => {
          if (password === PASSWORD) {
            if (location.state.id === "-1") {
              try {
                await DataStore.save(
                  new Blog({
                    title: encodeURI(title),
                    description: encodeURI(description),
                    createdAt: createdAt,
                    body: encodeURI(body),
                  })
                );
              } catch (error) {
                console.error("Error adding new blog:", error);
              }
              navigate("/");
            } else {
              try {
                setCreatedAt(location.state.createdAt);
                const original = await DataStore.query(Blog, location.state.id);
                await DataStore.save(
                  Blog.copyOf(original, (item) => {
                    item.title = encodeURI(title);
                    item.description = encodeURI(description);
                    item.body = encodeURI(body);
                    item.createdAt = createdAt;
                  })
                );
              } catch (error) {
                console.error("Error adding new blog:", error);
              }
              navigate("/");
            }
          }
        }}
      />
      <div className="Container">
        <TextField
          fullWidth
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          fullWidth
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          value={description}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <MDEditor
          value={body}
          height="100%"
          onChange={setBody}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
        <TextField
          fullWidth
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          value={password}
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
        />
      </div>
    </>
  );
}

EditPage.propTypes = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
}).isRequired;
