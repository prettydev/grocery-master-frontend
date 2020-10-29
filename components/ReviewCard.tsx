import React from "react";
import { IGrocery, IReview } from "../constants/types";

const ReviewCard = ({ review }: { review: IReview }) => {
  return review ? (
    <div className="max-w-sm rounded overflow-hidden shadow-xl p-8">
      <div className="flex justify-start items-center">
        <div className="flex items-center mt-2 mb-4">
          {[1, 2, 3, 4, 5].map((s, i) => (
            <svg
              className="mx-1 w-6 h-6 fill-current text-yellow-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="text-xl mx-auto text-black my-4">"{review.review}"</div>
      <div className="text-lg mx-auto text-black">{review.customer}</div>
      <div className="text-sm mx-auto">{review.location}</div>
    </div>
  ) : (
    <></>
  );
};

export default ReviewCard;
