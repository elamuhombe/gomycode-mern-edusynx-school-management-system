import React from "react";
import Hero from "./Hero";
// import Features from "./Features";
import Contacts from "../../components/Contacts/ContactForm"

export default function Main() {
  return (
    <div className="flex flex-col px-6 min-h-[600px]">
      <Hero />
      {/* <Features /> */}
      <Contacts />
    </div>
  );
}
