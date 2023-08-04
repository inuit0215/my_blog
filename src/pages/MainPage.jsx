import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import "./MainPage.css";
import { DataStore } from "@aws-amplify/datastore";
import { Blog } from "../models";
import { EXAMPLE_TEXT } from "../components/Constant";

const mkdStr = EXAMPLE_TEXT;

export default function MainPage() {
  const [blogs, setBlogs] = useState([]);

  async function fetchBlogs() {
    try {
      const apiData = await DataStore.query(Blog);
      setBlogs(apiData);
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
          createdAt={decodeURI(blog.createdAt)}
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
