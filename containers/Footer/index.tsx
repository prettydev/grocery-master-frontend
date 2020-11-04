import React from "react";
import { FaPhone } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Logo from "../../components/Logo";
import FooterBar from "../../layouts/FooterBar";

const Footer = () => {
  return (
    <div id="footer" className="flex flex-col-reverse sm:flex-row bg-gray-100">
      <div className="flex flex-col w-4/5 justify-center mx-auto">
        <div className="flex flex-row w-full justify-around gap-8 my-20">
          <div className="w-full mx-auto flex justify-center">
            <div className="w-4/5 flex flex-col gap-4">
              <Logo />
              <p>
                Whether you are running a single grocery store, a food
                supermarket chain or if you are responsible for the IT
                department of a food retailer have a look at our Grosery
                Commerce Software. We think you’ll be impressed.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex flex-col w-1/2 gap-2">
              <div className="text-2xl font-semibold">Pages</div>
              <div>Home</div>
              <div>Join us</div>
              <div>Pricing</div>
              <div>Terms & Conditions</div>
              <div>Privacy Policy</div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center">
            <div className="flex flex-col w-4/5 gap-2">
              <div className="text-2xl font-semibold">Contact</div>
              <div className="text-red-500 flex flex-row text-lg items-center gap-4">
                <AiOutlineMail />
                <span>hello@byebyeGROCERY.com</span>
              </div>
              <div className="text-red-500 flex flex-row text-lg items-center gap-4">
                <FaPhone />
                <span>+44 7920 800082</span>
              </div>
              <div>570 Glenferrie Road</div>
              <div>Hawthorn, Victoria 3143</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
