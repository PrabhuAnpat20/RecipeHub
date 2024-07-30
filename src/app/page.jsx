import Image from "next/image";
import NavBar from "./components/layout/NavBar";
import Banner from "./components/home/banner";
import Timeline from "./components/home/Timeline";
import Card from "./components/home/Card";
export default function Home() {
  return (
    <>
      <NavBar />
      <Banner />

      <Timeline />
    </>
  );
}
