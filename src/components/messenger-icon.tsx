"use client";

import React from "react";
import Image from "next/image";
import MessengerIcon from "../images/Messenger-Icon.png";

const FloatingIcon = () => {
  return (
    <a
      href="https://m.me/275091755680907"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-2 right-4 z-[999] border-2 border-white bg-white p-2 shadow-lg rounded-full animate-bounce"
    >
      <Image
        src={MessengerIcon}
        alt="Messenger Icon"
        width={50}
        height={50}
        className="rounded-full"
      />
    </a>
  );
};

export default FloatingIcon;
