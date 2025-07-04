import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Profile = ({ username, tweets, onBack }) => {
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  const userTweets = tweets.filter((t) => t.user === username);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("following") || "{}"); // Seguidores: cuántos usuarios siguen a este perfil

    const followers = Object.values(stored).filter((list) =>
      list.includes(username)
    ).length; // Seguidos: cuántos sigue el usuario actual

    const following = stored[username]?.length || 0;

    setFollowersCount(followers);
    setFollowingCount(following);
  }, [username, isFollowing]);

  const avatar =
    tweets.find((t) => t.user === username)?.avatar ??
    (isOwnProfile ? currentUser?.avatar : "👤");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("following") || "{}");
    setIsFollowing(stored[currentUser?.username]?.includes(username));
  }, [currentUser?.username, username]); // Alternar seguimiento

  const toggleFollow = () => {
    const stored = JSON.parse(localStorage.getItem("following") || "{}");
    const current = stored[currentUser.username] || [];

    let updated;
    if (current.includes(username)) {
      updated = current.filter((u) => u !== username);
    } else {
      updated = [...current, username];
    }

    stored[currentUser.username] = updated;
    localStorage.setItem("following", JSON.stringify(stored));
    setIsFollowing(updated.includes(username));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white border-b border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={onBack}
            className="text-blue-500 hover:underline text-sm"
          >
            ← Volver
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-6xl">{avatar}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">@{username}</h1>
              <p className="text-gray-500 mb-3">
                {isOwnProfile ? "Tu perfil" : `Perfil de ${username}`}
              </p>
              <div className="flex gap-6 text-sm">
                <span>
                  <strong>{userTweets.length}</strong>{" "}
                  <span className="text-gray-600">Tweets</span>
                </span>
                <span>
                  <strong>{followingCount}</strong>  {" "}
                  <span className="text-gray-600">Siguiendo</span>
                </span>
                <span>
                  <strong>{followersCount}</strong>  {" "}
                  <span className="text-gray-600">Seguidores</span>
                </span>
              </div>

              {currentUser && !isOwnProfile && (
                <button
                  onClick={toggleFollow}
                  className={`mt-4 px-6 py-2 rounded-full font-bold text-white ${
                    isFollowing
                      ? "bg-gray-400 hover:bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isFollowing ? "Siguiendo" : "Seguir"} {" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white border-t border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Tweets de @{username}</h3>
        {userTweets.length === 0 ? (
          <p className="text-gray-500">
            Este usuario aún no ha publicado nada.
          </p>
        ) : (
          <div className="space-y-4">
            {userTweets.map((tweet) => (
              <div
                key={tweet.id}
                className="border border-gray-100 p-4 rounded hover:bg-gray-50"
              >
                <p className="mb-2">{tweet.text}</p>
                <div className="text-sm text-gray-500 flex gap-4">
                  <span>❤️ {tweet.likes}</span>
                  <span>🔄 {tweet.retweets}</span>
                  <span>💬 {tweet.replies}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
