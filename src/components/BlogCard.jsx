import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import logo from "../assets/icon.png";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function cuttingString(str, max_length) {
  var modStr;
  if (str.length > max_length) {
    modStr = str.substr(0, max_length) + "...";
  } else {
    modStr = str;
  }
  return modStr;
}

export default function BlogCard(props) {
  const navigate = useNavigate();
  const title = cuttingString(props.title, 30);
  const description = cuttingString(props.description, 22);
  return (
    <div style={{ height: "350px", width: "420px" }}>
      <Card sx={{ Width: 420, Height: 350 }}>
        <CardActionArea
          onClick={() =>
            navigate("/detail", {
              state: {
                id: props.id,
                title: props.title,
                description: props.description,
                body: props.body,
                createdAt: props.createdAt,
              },
            })
          }
        >
          <CardMedia component="img" alt="記事" height={200} image={logo} />
          <CardContent height={150}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ height: "60px", width: "400px" }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              style={{ height: "30px", width: "400px" }}
              color="text.secondary"
            >
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              作成日: {props.createdAt.split("T")[0].replaceAll("-", "/")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Fab
        style={{
          position: "relative",
          top: "-70px",
          left: "350px",
          backgroundColor: "#192947",
        }}
        onClick={() =>
          navigate("/edit", {
            state: {
              id: props.id,
              title: props.title,
              description: props.description,
              body: props.body,
            },
          })
        }
      >
        <EditIcon style={{ height: "25px", color: "white" }} />
      </Fab>
    </div>
  );
}

BlogCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
