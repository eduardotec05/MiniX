import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import TweetComposer from "../components/TweetComposer";
import TweetFeed from "../components/TweetFeed";

const initialTweets = [
  {
    id: 1,
    user: "demo_user",
    avatar: "🚀",
    text: "Bienvenido a MiniX! Este es un tweet de ejemplo…",
    timestamp: Date.now() - 3600000,
    likes: 15,
    retweets: 4,
    replies: 0,
    comments: ["Esta interesante!", "¡Me gusta!"],
  },
  {
    id: 2,
    user: "tech_lover",
    avatar: "💻",
    text: "Acabo de terminar mi proyecto en React con hooks…",
    timestamp: Date.now() - 7200000,
    likes: 23,
    retweets: 7,
    replies: 0,
    comments: [],
  },
  {
    id: 3,
    user: "designer_pro",
    avatar: "🎨",
    text: "El diseño responsive con Tailwind CSS es increíble.",
    timestamp: Date.now() - 10800000,
    likes: 8,
    retweets: 2,
    replies: 0,
    comments: [],
  },
];

const Home = ({ onViewDetail, onViewProfile }) => {
  const { user, isAuthenticated } = useAuth();
  const [tweets, setTweets] = useState(() => {
    try {
      const savedTweets = localStorage.getItem("tweets");
      return savedTweets ? JSON.parse(savedTweets) : initialTweets;
    } catch (error) {
      console.error("Error al leer tweets del localStorage:", error);
      return initialTweets;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tweets", JSON.stringify(tweets));
    } catch (error) {
      console.error("Error al guardar tweets:", error);
    }
  }, [tweets]);

  const publishTweet = useCallback(
    (text) => {
      if (!isAuthenticated || !user) return;
      const newTweet = {
        id: Date.now(),
        user: user.username,
        avatar: user.avatar,
        text,
        timestamp: Date.now(),
        likes: 0,
        retweets: 0,
        replies: 0,
        comments: [],
      };
      setTweets((prev) => [newTweet, ...prev]);
    },
    [isAuthenticated, user]
  );

  const handleLike = useCallback((id, isLiking) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, likes: Math.max(0, t.likes + (isLiking ? 1 : -1)) }
          : t
      )
    );
  }, []);

  const handleRetweet = useCallback((id, isRetweeting) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              retweets: Math.max(0, t.retweets + (isRetweeting ? 1 : -1)),
            }
          : t
      )
    );
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl"
    >
      <TweetComposer onTweet={publishTweet} />
      <TweetFeed
        tweets={tweets}
        onLike={handleLike}
        onRetweet={handleRetweet}
        onViewDetail={(tweet) => onViewDetail(tweet)}
        onViewProfile={onViewProfile}
      />
    </motion.div>
  );
};

export default Home;
