import React from "react";
import { colors } from "../../constants/theme";

const FormArea = () => {
  return (
    <div className="w-4/5 sm:w-3/5 mx-auto my-auto flex flex-col gap-8 sm:gap-12">
      <h1 className="text-2xl sm:text-4xl mt-8 text-center sm:text-left">
        E-MAIL REGISTER
      </h1>
      <div className="text-lg sm:text-2xl ">
        <p>
          GET <span style={{ color: colors.primary }}>10% DISCOUNT!</span>
        </p>
        <p>ON LIVE PRINTING T-SHIRT AND TOTE BAG</p>
      </div>
      <div className="text-center sm:text-left">
        <input className="w-3/4 rounded-full h-10 sm:h-12 border border-1 border-gray-700 px-6" />
      </div>
      <div className="text-center sm:text-left">
        <button
          className="sm:p-2 w-2/3 sm:w-1/3 h-10 sm:h-12 text-white font-bold rounded-full"
          style={{ backgroundColor: colors.primary }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

const Register = () => {
  return (
    <div
      id="register"
      className="min-h-screen flex flex-col-reverse sm:flex-row"
    >
      <div className="flex w-full sm:w-1/2 sm:my-auto mb-12">
        <FormArea />
      </div>
      <div
        style={{
          background: `url('${require("./banner.jpg")}') no-repeat center center`,
          backgroundSize: "cover",
        }}
        className=" flex-auto w-full sm:w-1/2"
      ></div>
    </div>
  );
};

export default Register;
