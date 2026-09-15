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

  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-20">
      {/* Tabs Header */}
      <div
        className="
          flex
          flex-wrap
          gap-4
          border-b
          border-gray-200
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
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
      <div className="py-8 text-gray-600">
        {/* Description */}
        {activeTab === "description" && (
          <div className="rounded-3xl bg-gray-50 p-6">
            <p className="leading-9">
              {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
            </p>
          </div>
        )}

        {/* Features */}
        {activeTab === "features" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="مبدأ"
              value={product.province}
            />

            <Feature
              title="کیفیت"
              value={product.quality}
            />

            <Feature
              title="نوع برنج"
              value={product.riceType}
            />

            <Feature
              title="سال برداشت"
              value={product.harvest}
            />

            <Feature
              title="میزان عطر"
              value={product.aroma}
            />

            <Feature
              title="زمان پخت"
              value={
                product.cookingTime
                  ? `${product.cookingTime} دقیقه`
                  : ""
              }
            />

            <Feature
              title="وزن"
              value={
                product.weight
                  ? `${product.weight} کیلوگرم`
                  : ""
              }
            />

            <Feature
              title="دسته‌بندی"
              value={product.category}
            />

            <Feature
              title="موجودی"
              value={
                Number(product.stock) > 0
                  ? `${product.stock} عدد`
                  : "ناموجود"
              }
            />
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div
            className="
              rounded-3xl
              bg-gray-50
              p-8
              text-center
            "
          >
            <p className="text-lg">
              هنوز نظری ثبت نشده است.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Feature({ title, value }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        bg-gray-50
        p-5
      "
    >
      <span className="text-gray-500">
        {title}
      </span>

      <span className="font-bold text-gray-800">
        {value || "ثبت نشده"}
      </span>
    </div>
  );
}

export default ProductTabs;