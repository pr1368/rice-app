import { Link } from "react-router-dom";

import Card from "../../ui/Card";

const CategoryCard = ({ title, image }) => {
  return (
    <Link to="/products">
      <Card
        padding={false}
        className="group overflow-hidden cursor-pointer"
      >
        <div className="relative h-72 overflow-hidden">

          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <h3 className="absolute bottom-6 right-6 text-3xl font-bold text-white">
            {title}
          </h3>

        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;