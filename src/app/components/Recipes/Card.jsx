import React from "react";
import { Card as MUICard, CardContent, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";

function Card({ data }) {
  const { recipeName, cookingTime, numServings, imageUrl } = data;

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:z-20">
      <MUICard className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50  hover:opacity-0 hover:bg-none transition-opacity duration-300 "></div>
        <CardContent className="relative z-10 text-white p-4 flex flex-col justify-between h-full transition-opacity duration-300 hover:opacity-0">
          <Typography variant="h5" component="div" className="font-bold">
            {recipeName}
          </Typography>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AccessTimeIcon className="mr-1" />
              <Typography variant="body2">{cookingTime}</Typography>
            </div>
            <div className="flex items-center">
              <PeopleIcon className="mr-1" />
              <Typography variant="body2">{numServings} servings</Typography>
            </div>
          </div>
        </CardContent>
      </MUICard>
    </div>
  );
}

export default Card;
