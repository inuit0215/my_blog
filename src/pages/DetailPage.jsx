/* eslint-disable react/prop-types */
import React , {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import './DetailPage.css';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

const components = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} >
          {children}
        </code>
      )
    },
  }

export default function MainPage() {
    
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    useEffect(() => { 
        setValue(location.state.body);
        setTitle(location.state.title);
        setCreatedAt(location.state.createdAt);
      }, []);

    return (
        <div>
            <Header 
                buttonName="新規作成" 
                onClick={() => 
                    navigate(
                        "/edit", 
                        {state: {
                            id: -1,
                            title: 'タイトル', 
                            description: '説明文', 
                            body: mkdStr
                        }}
                )
            }/>
            <div className="Container">
                <h1>
                    {title}
                </h1>
                    {createdAt}
                <ReactMarkdown components={components}>
                    {value}
                </ReactMarkdown>
            </div>
         </div>
    );
}