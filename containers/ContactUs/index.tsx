import React from "react";
import { colors } from "../../constants/theme";

const FormArea = () => {
  return (
    <div className="w-4/5 sm:w-3/5 mx-auto my-auto flex flex-col gap-8 sm:gap-12">
      <h1 className="text-2xl sm:text-4xl mt-8 text-center sm:text-left font-bold">
        We're here to help.
      </h1>
      <div className="text-center sm:text-left">
        <input className="w-full h-10 sm:h-12 border border-1 border-gray-700 px-6" />
      </div>
      <div className="text-center sm:text-left">
        <button className="w-full bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
          Send Message
        </button>
      </div>
    </div>
  );
};

const ContactUs = () => {
  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col-reverse sm:flex-row"
    >
      <div className="flex w-full sm:w-1/2 sm:my-auto mb-12">
        <FormArea />
      </div>
    </div>
  );
};

export default ContactUs;
