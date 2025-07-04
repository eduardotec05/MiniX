// App.js
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import PostDetail from "./components/PostDetail";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tweets, setTweets] = useState(() => {
    try {
      const saved = localStorage.getItem("tweets");
      return saved ? JSON.parse(saved) : initialTweets;
    } catch {
      return initialTweets;
    }
  });

  const handleViewDetail = useCallback((tweet) => {
    setSelectedTweet(tweet);
    setCurrentView("detail");
  }, []);

  const handleViewProfile = useCallback((username) => {
    setSelectedUser(username);
    setCurrentView("profile");
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView("home");
    setSelectedTweetId(null);
    setSelectedUser(null);
  }, []);
  const handleAddComment = useCallback((tweetId, commentText) => {
    setSelectedTweet((prevTweet) => {
      if (!prevTweet || prevTweet.id !== tweetId) return prevTweet;

      const updatedTweet = {
        ...prevTweet,
        comments: [...(prevTweet.comments || []), commentText],
        replies: prevTweet.replies + 1,
      };

      // Actualiza también en localStorage
      try {
        const stored = JSON.parse(localStorage.getItem("tweets")) || [];
        const updated = stored.map((t) =>
          t.id === tweetId ? updatedTweet : t
        );
        localStorage.setItem("tweets", JSON.stringify(updated));
      } catch (error) {
        console.error("Error al actualizar localStorage:", error);
      }

      return updatedTweet;
    });
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <Home
            tweets={tweets}
            setTweets={setTweets}
            onViewDetail={handleViewDetail}
            onViewProfile={handleViewProfile}
          />
        );

      case "detail":
        return (
          <PostDetail
            tweet={selectedTweet}
            onBack={handleBack}
            onViewProfile={handleViewProfile}
            onAddComment={handleAddComment}
          />
        );

      case "profile":
        return (
          <Profile
            username={selectedUser}
            tweets={tweets}
            onBack={handleBack}
          />
        );
      default:
        return (
          <Home
            onViewDetail={handleViewDetail}
            onViewProfile={handleViewProfile}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} onViewProfile={handleViewProfile} />
        <main className="flex justify-center py-4">
          <AnimatePresence mode="wait">{renderCurrentView()}</AnimatePresence>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-gray-500 text-sm">
          <p>MiniX – Clon educativo de Twitter con React Hooks 🚀</p>
          <p>Mejorado por <a href="https://github.com/eduardotec05" target="_blank" rel="noreferrer">@eduardotec05</a></p>
        </footer>
      </div>
    </AuthProvider>
  );
}
