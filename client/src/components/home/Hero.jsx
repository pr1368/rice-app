import { FaArrowLeft } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 py-16 lg:flex-row">

        {/* متن */}
        <div className="flex-1 text-center lg:text-right">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            🌾 برنج اصیل شمال ایران
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-800">
            خرید مستقیم
            <span className="block text-green-700">
              برنج تازه و باکیفیت
            </span>
            از کشاورز
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            انواع برنج هاشمی، طارم و فجر با تضمین کیفیت،
            ارسال سریع و خرید مستقیم از تولیدکننده.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">

            <button className="rounded-xl bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800">
              خرید آنلاین
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-green-700 px-8 py-3 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white">
              مشاهده محصولات
              <FaArrowLeft />
            </button>

          </div>

        </div>

        {/* تصویر */}
        <div className="flex flex-1 justify-center">

          <img
            src="https://images.unsplash.com/photo-1592997572594-34be01bc36c5?w=900"
            alt="Rice"
            className="rounded-3xl shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;