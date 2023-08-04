import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import "./DetailPage.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DataStore } from "@aws-amplify/datastore";
import { Blog } from "../models";
import { Button, TextField } from "@mui/material";
import { PASSWORD, EXAMPLE_TEXT } from "../components/Constant";

const components = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={dark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [password, setPassWord] = useState("");

  useEffect(() => {
    setValue(decodeURI(location.state.body));
    setTitle(decodeURI(location.state.title));
    setCreatedAt(location.state.createdAt);
  }, []);

  return (
    <div>
      <Header
        buttonName="新規作成"
        onClick={() =>
          navigate("/edit", {
            state: {
              id: "-1",
              title: "タイトル",
              description: "説明文",
              body: EXAMPLE_TEXT,
            },
          })
        }
      />
      <div className="Container">
        <div className="Content">
          <h1>{title}</h1>
          作成日: {createdAt.split("T")[0].replaceAll("-", "/")}
          <ReactMarkdown components={components}>{value}</ReactMarkdown>
        </div>
        <TextField
          fullWidth
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          value={password}
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
        />
        <Button
          onClick={async () => {
            if (password === PASSWORD) {
              const modelToDelete = await DataStore.query(
                Blog,
                location.state.id
              );
              await DataStore.delete(modelToDelete);
              navigate("/");
            }
          }}
          style={{
            height: "80px",
            width: "200px",
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#192947",
          }}
        >
          削除
        </Button>
      </div>
    </div>
  );
}
