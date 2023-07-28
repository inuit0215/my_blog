/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import "./MainPage.css";
import axios from "axios";

// モックサーバーのURL db.json
const blogsUrl = "http://localhost:3000/blogs";

const mkdStr = `
# マークダウンの例

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`;

export default function MainPage() {
  const [blogs, setBlogs] = useState([]);

  const FetchJsonData = async () => {
    const response = await axios.get(blogsUrl);
    setBlogs(response.data);
  };

  useEffect(() => {
    FetchJsonData();
  }, []);

  const navigate = useNavigate();

  const listBlogs = blogs.map((blog, index) => {
    return (
      <div key={index}>
        <BlogCard
          id={blog.id}
          title={blog.title}
          body={blog.body}
          createdAt={blog.createdAt}
          description={blog.description}
        />
      </div>
    );
  });

  return (
    <div>
      <Header
        buttonName="新規作成"
        onClick={() =>
          navigate("/edit", {
            state: {
              id: -1,
              title: "タイトル",
              description: "説明文",
              body: mkdStr,
            },
          })
        }
      />
      <div className="wrapper">{listBlogs}</div>
    </div>
  );
}
