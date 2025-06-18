"use client";

import { useState } from "react";
import useSWR from "swr";
import { IconPlus, IconMessage } from "@tabler/icons-react";

export default function Chat_Page() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: doctors, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    setChatMessages([...chatMessages, { from: "user", text: inputMessage }]);
    setInputMessage("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { from: "doctor", text: "Terima kasih, kami akan bantu!" },
      ]);
    }, 1000);
  };

  if (isLoading) return <p>Loading data dokter...</p>;
  if (error) return <p>Gagal memuat data dokter</p>;

  return (
    <div className="p-6">
      {!selectedDoctor ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">Pilih Dokter</h1>
          <div className="grid grid-cols-1 gap-4">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className="border p-4 rounded-md shadow hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <p className="font-bold">{doc.name}</p>
                  <p className="text-sm text-gray-600">{doc.email}</p>
                </div>
                <IconMessage size={20} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Chat dengan Dr. {selectedDoctor.name}</h2>
            <button
              onClick={() => {
                setSelectedDoctor(null);
                setChatMessages([]);
              }}
              className="text-sm text-blue-600"
            >
              Kembali ke daftar dokter
            </button>
          </div>
          <div className="h-64 border rounded p-4 overflow-y-auto bg-gray-50 mb-4">
            {chatMessages.length === 0 ? (
              <p className="text-gray-500 text-sm">Mulai percakapan...</p>
            ) : (
              chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"
                    }`}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded ${msg.from === "user"
                        ? "bg-blue-200 text-blue-900"
                        : "bg-green-200 text-green-900"
                      }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 border border-gray-300 rounded-l-md p-2"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 rounded-r-md"
            >
              Kirim
            </button>
          </div>
        </>
      )}
    </div>
  );
}
