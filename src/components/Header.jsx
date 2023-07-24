/* eslint-disable react/prop-types */
import * as React from "react";
import logo from "../assets/icon.png";
import { Button, Typography } from "@mui/material";
import "./Header.css";

export default function Header(props) {
  return (
    <div>
      <div className="App_Header">
        <Button class="App_Header_Logo">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "80px",
              width: "80px",
              verticalAlign: "middle",
              paddingLeft: "10px",
            }}
          />
          <Typography
            style={{
              display: "flex",
              width: "150px",
              height: "80px",
              fontSize: 28,
              fontWeight: "bold",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
            }}
          >
            My Blog
          </Typography>
        </Button>
        <Button
          onClick={props.onClick}
          style={{
            height: "80px",
            width: "200px",
            margin: "10px",
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            border: "2px solid white",
          }}
        >
          {props.buttonName}
        </Button>
      </div>
    </div>
  );
}
