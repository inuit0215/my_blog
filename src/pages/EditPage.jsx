/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import "./EditPage.css";

export default function EditPage() {
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { 
    setValue(location.state.body);
  }, [location.state.body]);

  return (
    <>
      <Header buttonName="登録"  onClick={()=>{
        //TODO: 登録処理
        navigate("/")
      }}/>
      <div className="Container">
        <TextField
          fullWidth
          class={"TextField"}
          defaultValue={location.state.title} />
        <TextField
          fullWidth
          class={"TextField"}
          defaultValue={location.state.description} />
        <MDEditor
          value={value}
          height={"100%"}
          onChange={setValue}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }} />
      </div>
    </>
  )
}