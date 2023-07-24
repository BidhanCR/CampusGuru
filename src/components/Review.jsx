import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://campus-guru-server.vercel.app/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);

  //   for icon colors
  const starStyles = {
    color: "#ffd700",
  };

  return (
    <div className="rounded-lg p-4 bg-gray-400">
      <h2 className="text-2xl text-center font-bold mb-16 mt-8">
        What Our Customers Are Saying
      </h2>

      <div>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
        >
          {reviews.map((review) => (
            <div
              key={review._id}
              className="px-4 flex items-center justify-center"
            >
              <div className="mb-4">
                <div>
                  <img src={review.image} alt="image" />
                </div>
                <p className="text-gray-600">- {review.username}</p>
                <p className="text-lg">{review.comment}</p>
                <Rating
                  initialRating={review.rating}
                  emptySymbol={<FaRegStar style={starStyles} />}
                  fullSymbol={<FaStar style={starStyles} />}
                  readonly
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Reviews;
