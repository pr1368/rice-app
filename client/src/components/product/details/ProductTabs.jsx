import { useState } from "react";

function ProductTabs({ product }) {

  const tabs = [
    {
      id: "description",
      title: "توضیحات محصول",
    },
    {
      id: "features",
      title: "مشخصات",
    },
    {
      id: "reviews",
      title: "نظرات کاربران",
    },
  ];


  const [activeTab, setActiveTab] = useState(
    "description"
  );


  return (
    <div className="mt-20">

      {/* Tabs Header */}

      <div className="
        flex
        flex-wrap
        gap-4
        border-b
        border-gray-200
      ">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6
              py-4
              font-bold
              transition
              ${
                activeTab === tab.id
                  ? "border-b-2 border-green-700 text-green-700"
                  : "text-gray-500 hover:text-green-700"
              }
            `}
          >
            {tab.title}
          </button>

        ))}

      </div>


      {/* Content */}

      <div className="py-8 text-gray-600 leading-9">


        {activeTab === "description" && (

          <p>
            {product.description}
          </p>

        )}



        {activeTab === "features" && (

          <div className="grid gap-4 md:grid-cols-2">

            <Feature
              title="مبدا"
              value={product.province}
            />

            <Feature
              title="کیفیت"
              value={product.quality}
            />

            <Feature
              title="وزن"
              value={product.weight}
            />

            <Feature
              title="سال برداشت"
              value={product.harvest}
            />

          </div>

        )}



        {activeTab === "reviews" && (

          <div className="
            rounded-2xl
            bg-gray-50
            p-8
            text-center
          ">

            <p>
              هنوز نظری ثبت نشده است.
            </p>

          </div>

        )}


      </div>

    </div>
  );
}



function Feature({
  title,
  value,
}) {

  return (
    <div className="
      flex
      justify-between
      rounded-2xl
      bg-gray-50
      p-5
    ">

      <span className="text-gray-500">
        {title}
      </span>


      <span className="font-bold text-gray-800">
        {value}
      </span>

    </div>
  );

}


export default ProductTabs;