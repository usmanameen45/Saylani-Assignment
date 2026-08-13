import React from "react";
import { ArrowRight } from "lucide-react";

const Card = (props) => {
  const customerStatus = [
    {
      label: "Satisfied",
      bgColor: "bg-indigo-400",
      hoverBgColor: "hover:bg-indigo-500",
    },
    {
      label: "Underserved",
      bgColor: "bg-indigo-400",
      hoverBgColor: "hover:bg-indigo-500",
    },
    {
      label: "Underbanked",
      bgColor: "bg-green-400",
      hoverBgColor: "hover:bg-green-500",
    },
  ];

  const foundStatus = customerStatus.find(
    (status) => status.label === props.status
  );
  return (
    <div className="flex flex-col justify-start items-start gap-12 md:gap-25 lg:gap-50 h-full p-5 rounded-3xl bg-cover " style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${props.image})`}}>
      <div className="font-semibold md:text-bold bg-white md:text-lg lg:text-xl p-1 rounded-full text-black aspect-square text-center">
        {props.id}
      </div>
      <div className="self-stretch flex flex-col justify-between grow">
        <p className="text-sm md:text-base text-white ">
          {props.description}
        </p>
        <div className="flex flex-row justify-between items-center gap-2 mt-2">
          <button
            className={`${
              foundStatus
                ? `${foundStatus.bgColor} ${foundStatus.hoverBgColor}`
                : "bg-black hover:bg-gray-700"
            } transition-all duration-300 cursor-pointer text-white font-medium text-sm py-2 px-4 rounded-full text-nowrap`}
          >
            {props.status}
          </button>
          <button
            className={`${
              foundStatus
                ? `${foundStatus.bgColor} ${foundStatus.hoverBgColor}`
                : "bg-black hover:bg-gray-700"
            } transition-all duration-300 cursor-pointer text-white font-medium text-sm p-2 rounded-full text-nowrap aspect-square text-center`}
          >
            <ArrowRight size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
