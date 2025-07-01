"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import CommentCard from "@/components/comments-card";
import { IconPlus, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export default function CommentsPage() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("https://dummyjson.com/comments", fetcher);

  const [searchTerm, setSearchTerm] = useState("");
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  // Ambil dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("localComments");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setLocalComments(parsed);
        }
      } catch (e) {
        console.error("Gagal parsing localComments dari localStorage");
      }
    }
  }, []);

  // Simpan ke localStorage jika localComments berubah
  useEffect(() => {
    localStorage.setItem("localComments", JSON.stringify(localComments));
  }, [localComments]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Gagal memuat data</p>;

  // ✅ Ganti bagian ini untuk merge komentar API dan lokal
  const localMap = new Map(localComments.map((c) => [c.id, c]));

  const mergedComments = data.comments.map((c) =>
    localMap.has(c.id) ? localMap.get(c.id) : c
  );

  const onlyLocal = localComments.filter(
    (c) => !data.comments.some((d) => d.id === c.id)
  );

  const allComments = [...onlyLocal, ...mergedComments];

  // 🔍 Filter pencarian
  const filteredComments = allComments.filter((comment) =>
    comment.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);
  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  // ➕ Tambah komentar baru
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newItem = {
      id: Date.now(),
      user: { username: "Anda" },
      postId: "local",
      body: newComment,
      local: true,
      timestamp: new Date().toLocaleString(),
      likes: 0,
    };

    setLocalComments([newItem, ...localComments]);
    setNewComment("");
    setCurrentPage(1);
  };

  // 🔄 Update local comments dari child
  const handleUpdateLocalComments = (updatedList) => {
    setLocalComments(updatedList);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Komentar</h1>

      <input
        type="text"
        placeholder="Cari Komentar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
        className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 flex items-center gap-2"
      >
        <IconPlus size={18} />
        Tambah Komentar
      </button>

      <div className="flex flex-col gap-4">
        {paginatedComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            localComments={localComments}
            setLocalComments={handleUpdateLocalComments}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
          >
            <IconArrowLeft size={16} />
            Prev
          </button>
          <span className="text-sm">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
          >
            Next
            <IconArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
