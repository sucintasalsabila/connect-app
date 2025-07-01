"use client";

import { useState } from "react";
import {
  IconEdit,
  IconCheck,
  IconTrash,
  IconHeart,
  IconMessageCircle,
} from "@tabler/icons-react";
import ReplyBox from "./reply-box";

export default function CommentCard({ comment, localComments, setLocalComments }) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.body);
  const [replying, setReplying] = useState(false);

  const isInLocal = localComments.some((c) => c.id === comment.id);

  const handleSyncToLocal = (override = {}) => {
    const updated = {
      ...comment,
      local: true,
      timestamp: comment.timestamp || new Date().toLocaleString(),
      likes: comment.likes || 0,
      replies: comment.replies || [],
      ...override,
    };
    const updatedList = [updated, ...localComments.filter((c) => c.id !== comment.id)];
    setLocalComments(updatedList);
  };

  const handleEdit = () => {
    if (!isInLocal) handleSyncToLocal();
    setEditing(true);
  };

  const handleSave = () => {
    const updatedList = localComments.map((c) =>
      c.id === comment.id ? { ...c, body: editedText } : c
    );
    setLocalComments(updatedList);
    setEditing(false);
    alert("Komentar berhasil diperbarui.");
  };

  const handleDelete = () => {
    const updatedList = localComments.filter((c) => c.id !== comment.id);
    setLocalComments(updatedList);
    alert("Komentar berhasil dihapus.");
  };

  const handleLike = () => {
    if (!isInLocal) {
      handleSyncToLocal({ likes: 1 });
    } else {
      const updatedList = localComments.map((c) =>
        c.id === comment.id ? { ...c, likes: (c.likes || 0) + 1 } : c
      );
      setLocalComments(updatedList);
    }
  };

  const handleAddReply = (replyText) => {
    const newReply = {
      id: Date.now(),
      user: { username: "Anda" },
      body: replyText,
      timestamp: new Date().toLocaleString(),
    };

    if (!isInLocal) {
      handleSyncToLocal({ replies: [newReply] });
    } else {
      const updatedList = localComments.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              replies: [...(c.replies || []), newReply],
            }
          : c
      );
      setLocalComments(updatedList);
    }

    setReplying(false);
  };

  const timeLabel = comment.timestamp || new Date().toLocaleString();

  return (
    <div className="border p-4 rounded shadow-sm">
      <div className="font-bold">{comment.user?.username || "Anonim"}</div>
      <div className="text-sm text-gray-500">Post ID: {comment.postId}</div>
      <div className="text-xs text-gray-400 mb-1">Waktu: {timeLabel}</div>

      {editing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full border rounded p-1 mt-2"
        />
      ) : (
        <p className="text-gray-800 mt-1">{comment.body}</p>
      )}

      <div className="flex gap-3 mt-2 flex-wrap text-sm">
        {editing ? (
          <button
            onClick={handleSave}
            className="text-green-600 flex items-center gap-1"
          >
            <IconCheck size={16} />
            Simpan
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="text-blue-600 flex items-center gap-1"
          >
            <IconEdit size={16} />
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="text-red-600 flex items-center gap-1"
        >
          <IconTrash size={16} />
          Hapus
        </button>

        <button
          onClick={handleLike}
          className="text-pink-600 flex items-center gap-1"
        >
          <IconHeart size={16} />
          {comment.likes || 0}
        </button>

        <button
          onClick={() => setReplying(!replying)}
          className="text-purple-600 flex items-center gap-1"
        >
          <IconMessageCircle size={16} />
          Balas
        </button>
      </div>

      {replying && (
        <ReplyBox onReply={handleAddReply} onClose={() => setReplying(false)} />
      )}

      {/* Tampilkan balasan */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-3 border-l-2 pl-4 border-gray-200">
          <div className="text-sm text-gray-600 font-medium mb-1">Balasan:</div>
          {comment.replies.map((reply) => (
            <div key={reply.id} className="text-sm text-gray-800 mb-2">
              <div className="font-semibold">{reply.user?.username || "Anonim"}</div>
              <div className="text-xs text-gray-400 mb-1">{reply.timestamp}</div>
              <p>{reply.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
