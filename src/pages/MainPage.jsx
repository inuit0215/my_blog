/* eslint-disable react/prop-types */
import React from "react";
import data from '../json/blogs.json';
import Header from "../components/Header";

export default function MainPage() {
    console.log(data.blogs);
    const listBlogs = data.blogs.map((blog, index) => {
        return (
            <>
                <h1 key={index}>{blog.title}</h1>
                <h1 key={index}>{blog.createdAt}</h1>
                <h1 key={index}>{blog.body}</h1>
            </>
        );
    });
    console.log(listBlogs);
    return (
        <div>  
            <Header buttonName="新規作成"  onClick={()=>{}}/>
            <div height="100">
                {listBlogs}
            </div>
         </div>
    );
}