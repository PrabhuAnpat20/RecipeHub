import React from "react";
import Banner from "../components/home/Banner";
import TimelineComponent from "../components/home/Timeline";
import isNotAuth from "@/lib/hooks/isNotAuth";
import Landing from "../components/home/Landing";

function Home() {
  return (
    <>
      <Landing />
    </>
  );
}

export default Home;
