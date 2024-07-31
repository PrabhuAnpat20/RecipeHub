import React from "react";
import Banner from "./Banner";
import TimelineComponent from "./Timeline";
import isAuth from "@/lib/hooks/isAuth";
import isNotAuth from "@/lib/hooks/isNotAuth"; // Ensure this path is correct

function Landing() {
  return (
    <div>
      <Banner />
      <TimelineComponent />
    </div>
  );
}

export default Landing;
