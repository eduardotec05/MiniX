import { motion } from "framer-motion";
import CommentSection from "./CommentSection";

const PostDetail = ({ tweet, onBack, onViewProfile, onAddComment }) => {
  if (!tweet) return null; // Manejo de seguridad por si no hay tweet

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-white"
    >
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="text-blue-500 hover:underline text-sm"
        >
          ← Volver
        </button>
      </div>
      <div className="p-6">
        <div className="flex gap-4">
          <div className="text-4xl">{tweet.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => onViewProfile(tweet.user)}
                className="font-bold text-lg hover:underline"
              >
                @{tweet.user}
              </button>
              <span className="text-gray-500">
                {new Date(tweet.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-xl leading-relaxed mb-6">{tweet.text}</p>
            <div className="flex items-center gap-8 text-gray-600 text-lg border-t border-gray-100 pt-4">
              <span className="flex items-center gap-2">❤️ {tweet.likes}</span>
              <span className="flex items-center gap-2">
                🔄 {tweet.retweets}
              </span>
              <span className="flex items-center gap-2">
                💬 {tweet.replies}
              </span>
              <span className="flex items-center gap-2">📤</span>
            </div>
            <CommentSection tweet={tweet} onAddComment={onAddComment} />
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetail;
