import React from "react";
import Card from "./components/Card";
import { MoveUpRight } from "lucide-react";
import { useTheme } from "./context/themeContext";
import ThemeBtn from "./context/themeButton";

const App = () => {
  const data = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/38356838/pexels-photo-38356838.jpeg?_gl=1*d8igq1*_ga*MTAyOTgzNjEwMi4xNzg1MjI3OTky*_ga_8JE65Q40S6*czE3ODUyMjc5OTEkbzEkZzEkdDE3ODUyMjgwODgkajMxJGwwJGgw",
      description:
        "Prime customers that have access to bank credit and are satisfied with the current product.",
      status: "Satisfied",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/38153590/pexels-photo-38153590.jpeg?_gl=1*14v8hhm*_ga*MTAyOTgzNjEwMi4xNzg1MjI3OTky*_ga_8JE65Q40S6*czE3ODUyMjc5OTEkbzEkZzEkdDE3ODUyMzE0OTIkajQwJGwwJGgw",
      description:
        "Prime customers that have access to bank credit and are not satisfied with the current service.",
      status: "Underserved",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/37808531/pexels-photo-37808531.jpeg",
      description:
        "Customers from near-prime and sub-prime segments with no access to bank credit.",
      status: "Underbanked",
    },
  ];

  return (
    <div className={`bg-primary text-foreground transition-all duration-500 h-full p-3 sm:p-6 lg:p-8 xl:p-12`}>
      <div className={`bg-secondary transition-all duration-500 rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12`}>
        <div className="flex flex-row justify-between gap-3 items-center">
          <button className="bg-button hover:bg-button-hover transition-all duration-500 cursor-pointer text-button-text font-medium text-xs md:text-sm py-2 px-4 rounded-full text-nowrap">
            TARGET AUDIENCE
          </button>
          <div className="flex flex-row gap-3 items-center outline-none">
            <h3 className="font-medium text-xs md:text-sm">
              DIGITAL BANKING PLATFORM
            </h3>
            <ThemeBtn />
          </div>
        </div>
        <div className="mt-4 md:mt-5 lg:flex lg:gap-5">
          <div className="flex flex-col lg:pt-14 gap-4 lg:basis-1/4">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
              Prospective Customer Segmentation
            </h1>
            <p className="mt-2 text-sm md:text-base">
              Depending on customer satisfaction and access to the product, the
              potential customers can be divided into different groups.
            </p>
            <MoveUpRight size={20} className="lg:mt-25" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 lg:basis-3/4">
            {data.map((item) => (
              <div key={item.id}>
                <Card
                  id={item.id}
                  image={item.image}
                  description={item.description}
                  status={item.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
