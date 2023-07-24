/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Header from "../components/Header";
import MDEditor from "@uiw/react-md-editor";
import "./EditPage.css";
import rehypeSanitize from "rehype-sanitize";
import { TextField } from "@mui/material";

const mkdStr = `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`;

export default function EditPage(props) {
  const [value, setValue] = useState(mkdStr);
  return (
    <>
      <Header buttonName="登録"  onClick={()=>{}}/>
      <div className="Container">
        <TextField
          fullWidth
          class={"TextField"}
          defaultValue={props.title} />
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