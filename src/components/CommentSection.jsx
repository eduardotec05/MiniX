import { useState } from "react";

const CommentSection = ({ tweet, onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      onAddComment(tweet.id, comment.trim());
      setComment("");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comentarios</h3>
      <ul className="mb-4 space-y-2">
        {tweet.comments?.map((c, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded">{c}</li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Comentar
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
