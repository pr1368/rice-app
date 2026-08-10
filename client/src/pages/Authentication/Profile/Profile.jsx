import { Link } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";

function Profile() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            پروفایل من
          </h1>

          <p className="mt-2 text-gray-500">
            اطلاعات حساب کاربری خود را مدیریت کنید.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Profile Card */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-4xl text-green-700">
                <FaUser />
              </div>

              <h2 className="mt-5 text-xl font-black text-gray-900">
                کاربر RiceShop
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                حساب کاربری
              </p>

            </div>

            <div className="mt-8 space-y-3">

              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-2xl bg-green-50 px-4 py-3 font-bold text-green-700"
              >
                <FaUser />
                پروفایل
              </Link>

              <Link
                to="/orders"
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-green-700"
              >
                <FaShoppingBag />
                سفارش‌های من
              </Link>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-red-500 transition hover:bg-red-50"
              >
                <FaSignOutAlt />
                خروج از حساب
              </button>

            </div>
          </div>

          {/* Information */}

          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="mb-8 text-2xl font-black text-gray-900">
                اطلاعات شخصی
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">

                <ProfileInfo
                  icon={<FaUser />}
                  label="نام و نام خانوادگی"
                  value="هنوز ثبت نشده"
                />

                <ProfileInfo
                  icon={<FaPhone />}
                  label="شماره موبایل"
                  value="هنوز ثبت نشده"
                />

                <ProfileInfo
                  icon={<FaEnvelope />}
                  label="ایمیل"
                  value="هنوز ثبت نشده"
                />

                <ProfileInfo
                  icon={<FaMapMarkerAlt />}
                  label="آدرس"
                  value="هنوز ثبت نشده"
                />

              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">

                <button
                  type="button"
                  className="rounded-2xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
                >
                  ویرایش اطلاعات
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ProfileInfo({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">

      <div className="mb-3 flex items-center gap-3 text-green-700">
        <span className="text-lg">
          {icon}
        </span>

        <span className="text-sm font-bold">
          {label}
        </span>
      </div>

      <p className="font-bold text-gray-800">
        {value}
      </p>

    </div>
  );
}

export default Profile;