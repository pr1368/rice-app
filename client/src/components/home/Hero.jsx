import heroImage from "../../assets/images/hero/hero1.jpg";
import { FaArrowLeft } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-[#f8fbf5]">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-16 lg:flex-row">

        {/* متن */}
        <div className="flex-1 text-center lg:text-right">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            🌾 برنج اصیل شمال ایران
          </span>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight text-gray-900">
            خرید مستقیم
            <span className="block text-green-700">
              برنج تازه
            </span>
            از کشاورز
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-9 text-gray-600">
            بهترین برنج هاشمی، طارم و فجر
            با ارسال سریع، ضمانت کیفیت
            و خرید مستقیم از شالیزار.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">

            <button className="rounded-xl bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800">
              خرید آنلاین
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-green-700 px-8 py-4 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white">
              مشاهده محصولات
              <FaArrowLeft />
            </button>

          </div>

          <div className="mt-12 flex justify-center gap-10 lg:justify-start">

            <div>
              <h2 className="text-3xl font-bold text-green-700">
                +500
              </h2>
              <p className="text-gray-500">
                مشتری
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-700">
                +20
              </h2>
              <p className="text-gray-500">
                نوع محصول
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-700">
                100%
              </h2>
              <p className="text-gray-500">
                طبیعی
              </p>
            </div>

          </div>

        </div>

        {/* تصویر */}

        <div className="flex flex-1 justify-center">

          <img
            src={heroImage}
            alt="Rice"
            className="w-full max-w-xl rounded-[40px] shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;