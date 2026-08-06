import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 bg-[#0B7A36] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">

        {/* معرفی */}
        <div>
          <h2 className="mb-4 text-2xl font-black">
            RiceShop
          </h2>

          <p className="leading-8 text-green-100">
            فروش مستقیم برنج ایرانی از کشاورز،
            با تضمین کیفیت، ارسال سریع و قیمت مناسب.
          </p>
        </div>

        {/* لینک‌ها */}
        <div>
          <h3 className="mb-4 text-xl font-bold">
            دسترسی سریع
          </h3>

          <ul className="space-y-3">

            <li>
              <Link to="/">خانه</Link>
            </li>

            <li>
              <Link to="/products">محصولات</Link>
            </li>

            <li>
              <Link to="/about">درباره ما</Link>
            </li>

            <li>
              <Link to="/contact">تماس با ما</Link>
            </li>

          </ul>
        </div>

        {/* تماس */}
        <div>
          <h3 className="mb-4 text-xl font-bold">
            ارتباط با ما
          </h3>

          <div className="space-y-4">

            <p className="flex items-center gap-3">
              <FaPhoneAlt />
              0912 000 0000
            </p>

            <p className="flex items-center gap-3">
              <FaEnvelope />
              info@riceshop.ir
            </p>

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt />
              مازندران
            </p>

          </div>
        </div>

        {/* شبکه اجتماعی */}
        <div>
          <h3 className="mb-4 text-xl font-bold">
            شبکه‌های اجتماعی
          </h3>

          <div className="flex gap-4 text-2xl">

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTelegram />
            </a>

            <a href="#">
              <FaWhatsapp />
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-green-600 py-5 text-center text-sm text-green-100">
        © {new Date().getFullYear()} تمامی حقوق این وب‌سایت محفوظ است.
      </div>
    </footer>
  );
}

export default Footer;