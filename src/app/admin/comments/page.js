"use client";

import { useState } from "react";
import { IconPlus, IconTrash, IconEdit, IconCheck } from "@tabler/icons-react";
import useSWR from "swr";

export default function CommentsPage() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: commentsData, error, isLoading } = useSWR(
    "https://dummyjson.com/comments",
    fetcher
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Gagal memuat data</p>;

  const allComments = [...localComments, ...commentsData.comments];

  const filteredComments = allComments.filter((comment) =>
    comment.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newItem = {
      id: Date.now(),
      user: { username: "Anda" },
      postId: "local",
      body: newComment,
      local: true,
    };
    setLocalComments([newItem, ...localComments]);
    setNewComment("");
  };

  const handleDelete = (id) => {
    setLocalComments(localComments.filter((comment) => comment.id !== id));
  };

  const handleEdit = (id, body) => {
    setEditingId(id);
    setEditedText(body);
  };

  const handleSaveEdit = (id) => {
    setLocalComments(
      localComments.map((comment) =>
        comment.id === id ? { ...comment, body: editedText } : comment
      )
    );
    setEditingId(null);
    setEditedText("");
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <input
        type="text"
        placeholder="Cari Komentar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Cari Komentar"
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      />

      <textarea
        className="w-full border border-gray-300 rounded-md p-2 mb-2"
        placeholder="Tulis komentar baru..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        onClick={handleAddComment}
        className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Tambah Komentar
      </button>

      <div className="flex flex-col gap-4">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm"
          >
            <div className="font-bold text-black">
              {comment.user.username}
            </div>
            <div className="text-sm text-gray-500 mb-1">
              Post ID: {comment.postId}
            </div>

            {editingId === comment.id ? (
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full border rounded p-1 mt-2"
              />
            ) : (
              <p className="text-gray-800">{comment.body}</p>
            )}

            {comment.local && (
              <div className="flex gap-2 mt-2">
                {editingId === comment.id ? (
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="text-green-600 hover:underline flex items-center gap-1"
                  >
                    <IconCheck size={16} />
                    Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(comment.id, comment.body)}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <IconEdit size={16} />
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <IconTrash size={16} />
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}