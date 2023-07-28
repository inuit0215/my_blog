/* eslint-disable react/prop-types */
import * as React from "react";
import logo from "../assets/icon.png";
import { Button, Typography } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="App_Header">
        <Button
          style={{
            display: "flex",
            height: "80px",
            alignItems: "self-start",
            justifyContent: "flex-start",
            verticalAlign: "middle",
            margin: "10px",
            padding: "0px",
            backgroundColor: "#192947",
            border: "none",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "80px",
              width: "80px",
              verticalAlign: "middle",
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
