"use client";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Competition from "@/components/competition/Competition";

export default function Comp() {
  return (
    <>
      <Navbar />

      <div className="homeContainer">
        <Competition />
      </div>
    </>
  );
}
