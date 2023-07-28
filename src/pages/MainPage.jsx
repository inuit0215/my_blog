import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import "./MainPage.css";
import { API, graphqlOperation } from "aws-amplify";

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

const listBlogsQuery = `
  query ListBlogs {
    listBlogs {
      items {
        id
        title
        body
        createdAt
        description
      }
    }
  }
`;

export default function MainPage() {
  const [blogs, setBlogs] = useState([]);

  async function fetchBlogs() {
    try {
      const apiData = await API.graphql(graphqlOperation(listBlogsQuery));
      const blogsData = apiData.data.listBlogs.items;
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const navigate = useNavigate();

  const listBlogs = blogs.map((blog, index) => {
    return (
      <div key={index}>
        <BlogCard
          id={blog.id}
          title={decodeURI(blog.title)}
          body={decodeURI(blog.body)}
          createdAt={blog.createdAt}
          description={decodeURI(blog.description)}
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
              id: "-1",
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
