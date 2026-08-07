import heroImage from "../../assets/images/hero/hero.jpg";
import { FaArrowLeft } from "react-icons/fa";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Container from "../ui/Container";

const Hero = () => {
  return (
    <section className="bg-[#f8fbf5] py-16">
      <Container className="flex min-h-[80vh] flex-col-reverse items-center justify-between gap-12 lg:flex-row">
        {/* Text */}
        <div className="flex-1 text-center lg:text-right">
          <Badge>🌾 برنج اصیل شمال ایران</Badge>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900 lg:text-6xl">
            خرید مستقیم
            <span className="block text-green-700">برنج تازه</span>
            از کشاورز
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-gray-600">
            بهترین برنج هاشمی، طارم و فجر با ارسال سریع، تضمین کیفیت و خرید
            مستقیم از شالیزار.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button>خرید آنلاین</Button>
            <Button
              variant="outline"
              icon={<FaArrowLeft />}
              iconPosition="right"
            >
              مشاهده محصولات
            </Button>
          </div>

          <div className="mt-12 flex justify-center gap-10 lg:justify-start">
            <div>
              <h2 className="text-3xl font-black text-green-700">+۵۰۰</h2>

              <p className="text-gray-500">مشتری</p>
            </div>

            <div>
              <h2 className="text-3xl font-black text-green-700">+۲۰</h2>

              <p className="text-gray-500">نوع محصول</p>
            </div>

            <div>
              <h2 className="text-3xl font-black text-green-700">۱۰۰٪</h2>

              <p className="text-gray-500">طبیعی</p>
            </div>
          </div>
        </div>

        {/* Image */}

        <div className="flex flex-1 justify-center">
          <img
            src={heroImage}
            alt="برنج ایرانی"
            className="w-full max-w-xl rounded-[40px] object-cover shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
