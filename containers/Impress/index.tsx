import React from "react";
import { colors } from "../../constants/theme";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosPhonePortrait } from "react-icons/io";

const CustomInput = ({ icon, label }) => {
  return (
    <div className="relative">
      <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
        <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
          {icon}
        </div>
      </div>

      <input
        id="name"
        name="name"
        type="text"
        placeholder={label}
        value=""
        className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
      />
    </div>
  );
};

const Impress = () => {
  return (
    <div id="contact" className="flex flex-col-reverse sm:flex-row my-24">
      <div className="flex w-full sm:my-auto mb-12">
        <div className="w-4/5 mx-auto my-auto flex flex-row gap-8 sm:gap-12">
          <div className="mx-auto w-full flex justify-center">
            <div className="w-4/5">
              <h1 className="text-3xl sm:text-4xl mt-8 text-center sm:text-left font-bold">
                We think you'll be impressed.
              </h1>
              <h1 className="text-lg">byebyeGrocery Team</h1>
            </div>
          </div>
          <div className="mx-auto w-full justify-center flex">
            <div className="w-3/5 flex flex-col gap-4">
              <CustomInput
                icon={<FaRegUserCircle className="text-red-500" />}
                label="Name"
              />
              <CustomInput
                icon={<AiOutlineMail className="text-red-500" />}
                label="Email Address"
              />
              <CustomInput
                icon={<IoIosPhonePortrait className="text-red-500" />}
                label="Phone Number"
              />

              <div className="text-center sm:text-left">
                <button className="w-full bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Request Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impress;
