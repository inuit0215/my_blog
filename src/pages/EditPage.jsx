import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Add this import
import { useNavigate, useLocation } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import "./EditPage.css";
import { PASSWORD } from "../components/Constant";
import { API, graphqlOperation } from "aws-amplify";

export default function EditPage() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
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
                const createdAt = encodeURI(new Date().toLocaleString());
                console.log(`
                mutation MyMutation {
                  createBlog(input: { 
                    title: "${encodeURI(title)}",
                    description: "${encodeURI(description)}",
                    body: "${encodeURI(body)}",
                    createdAt: "${createdAt}",
                   } ) {
                    id
                    title
                    description
                    body
                    createdAt
                  }
                }
              `);
                const result = await API.graphql(
                  graphqlOperation(`
                  mutation MyMutation {
                    createBlog(input: { 
                      title: "${encodeURI(title)}",
                      description: "${encodeURI(description)}",
                      body: "${encodeURI(body)}",
                      createdAt: "${createdAt}",
                     } ) {
                      id
                      title
                      description
                      body
                      createdAt
                    }
                  }
                `)
                );
                console.log("New blog created:", result.data.createBlog);
              } catch (error) {
                console.error("Error adding new blog:", error);
              }
              navigate("/");
            } else {
              try {
                const createdAt = encodeURI(new Date().toLocaleString());
                const result = await API.graphql(
                  graphqlOperation(`
                  mutation MyMutation {
                    updateBlog(input: { 
                      id: "${location.state.id}",
                      title: "${encodeURI(title)}",
                      description: "${encodeURI(description)}",
                      body: "${encodeURI(body)}",
                      createdAt: "${createdAt}",
                     } ) {
                      id
                      title
                      description
                      body
                      createdAt
                    }
                  }
                `)
                );
                console.log("New blog created:", result.data.createBlog);
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
          value={body}
          height="100%"
          onChange={setBody}
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
