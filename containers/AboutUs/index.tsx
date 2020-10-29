import React from "react";
import { colors } from "../../constants/theme";

const AboutUs = () => {
  return (
    <div
      id="about"
      style={{
        background: `url('${require("./banner.svg")}') no-repeat center center`,
        backgroundSize: "cover",
      }}
      className="w-screen min-h-screen flex"
    >
      <div className="w-full sm:w-1/2 h-full flex">
        <div className="text-left justify-items-start mx-auto my-8 sm:mt-48 flex flex-col gap-12 w-4/5 sm:w-3/5">
          <h1 className="text-black text-4xl mt-8">DEPT_X EVENT</h1>
          <p className="text-xl">
            We will hold the Kanahei's live printing during the Hunger Run.
            Comel Design and create your own T-shirt or Tote bag with your
            favorite image. Let's go and have fun.
          </p>
          <table>
            <tr>
              <td>
                <span className="font-bold">Date:</span>
              </td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>
                <span className="font-bold">Location:</span>
              </td>
              <td>
                {"Tseung Kwan O Jockey Club HKFA Football Traning Centre"}
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-bold">Time:</span>
              </td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
          </table>
          <div className="text-center sm:text-left">
            <button
              className="p-4 w-2/3 sm:w-1/3 text-white font-bold rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
