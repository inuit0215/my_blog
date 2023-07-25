/* eslint-disable react/prop-types */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import logo from "../assets/icon.png";
import { useNavigate } from "react-router-dom"

export default function BlogCard(props) {
  const navigate = useNavigate();
  
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea 
        onClick={()=>
          navigate(
            "/edit",
            {state: {
              id: props.id,
              title: props.title, 
              description: props.description, 
              body: props.body,
            }}
        )}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={logo}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.createdAt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}