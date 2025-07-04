import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";

const TweetCard = memo(
  ({ tweet, onLike, onRetweet, onViewDetail, onViewProfile }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);

    const handleLike = useCallback(
      (e) => {
        e.stopPropagation();
        setIsLiked((prev) => !prev);
        onLike(tweet.id, !isLiked);
      },
      [tweet.id, isLiked, onLike]
    );

    const handleRetweet = useCallback(
      (e) => {
        e.stopPropagation();
        setIsRetweeted((prev) => !prev);
        onRetweet(tweet.id, !isRetweeted);
      },
      [tweet.id, isRetweeted, onRetweet]
    );

    return (
      <motion.div
        className="border-b border-gray-200 p-6 bg-white hover:bg-gray-50 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => onViewDetail(tweet)}
      >
        <div className="flex gap-3">
          <div className="text-2xl">{tweet.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProfile(tweet.user);
                }}
                className="font-bold hover:underline cursor-pointer"
              >
                  @{tweet.user}
              </span>

              <span className="text-gray-500 text-sm">
                {new Date(tweet.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-900 mb-3 leading-relaxed">{tweet.text}</p>
            <div className="flex items-center gap-6 text-gray-500">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 ${
                  isLiked ? "text-red-500" : "hover:text-red-500"
                }`}
              >
                ❤️
                <span className="text-sm">{tweet.likes}</span>
              </button>
              <button
                onClick={handleRetweet}
                className={`flex items-center gap-1 ${
                  isRetweeted ? "text-green-500" : "hover:text-green-500"
                }`}
              >
                🔄
                <span className="text-sm">
                  {tweet.retweets}
                </span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                💬 <span className="text-sm">{tweet.replies}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                📤
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

export default TweetCard;
