import React from "react";
import Instagram from "../SVGs/Instagram";
import Facebook from "../SVGs/Facebook";

const FooterSocialMedia: React.FC = () => {
  return (
    <div className="flex space-x-4 mb-6">
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        <Instagram />
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        <Facebook />
      </a>
    </div>
  );
};

export default FooterSocialMedia;
