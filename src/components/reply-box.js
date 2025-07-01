"use client";

import { useState } from "react";

export default function ReplyBox({ onReply, onClose }) {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText("");
    }
  };

  return (
    <div className="mt-2">
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 text-sm"
        placeholder="Tulis balasan..."
      />
      <div className="flex gap-2 mt-1">
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Kirim
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
