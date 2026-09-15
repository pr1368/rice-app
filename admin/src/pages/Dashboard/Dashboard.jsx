import {
  FiShoppingCart,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";

const stats = [
  {
    title: "کل سفارش‌ها",
    value: "0",
    icon: FiShoppingCart,
    description: "از ابتدای فعالیت",
  },
  {
    title: "کل فروش",
    value: "۰ تومان",
    icon: FiDollarSign,
    description: "مجموع فروش",
  },
  {
    title: "محصولات",
    value: "0",
    icon: FiPackage,
    description: "محصولات فعال",
  },
  {
    title: "کاربران",
    value: "0",
    icon: FiUsers,
    description: "کاربران ثبت‌نام‌شده",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          داشبورد
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          نمای کلی فروشگاه RiceShop
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-gray-800">
                    {item.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Orders */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="font-semibold text-gray-800">
                  آخرین سفارش‌ها
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  جدیدترین سفارش‌های ثبت‌شده
                </p>
              </div>
            </div>

            <div className="flex min-h-52 items-center justify-center px-5">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <FiShoppingCart size={24} />
                </div>

                <p className="mt-4 text-sm font-medium text-gray-600">
                  هنوز سفارشی ثبت نشده است
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  سفارش‌های جدید در این قسمت نمایش داده می‌شوند.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="font-semibold text-gray-800">
                وضعیت سفارش‌ها
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                خلاصه وضعیت فعلی
              </p>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <FiClock size={17} />
                  در انتظار بررسی
                </span>

                <span className="font-semibold text-gray-800">
                  0
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  تأیید شده
                </span>

                <span className="font-semibold text-gray-800">
                  0
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  ارسال شده
                </span>

                <span className="font-semibold text-gray-800">
                  0
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  تکمیل شده
                </span>

                <span className="font-semibold text-gray-800">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;