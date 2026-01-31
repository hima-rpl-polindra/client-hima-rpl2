"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // State loading
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Saya Asisten HIMA. Ada yang bisa dibantu?" },
  ]);

  const chatRef = useRef(null);

  // --- 1. DATA PENGETAHUAN (KAMUS BOT) ---
  const knowledgeBase = [
    {
      keywords: ["daftar", "gabung", "join", "masuk"],
      answer:
        "Pendaftaran anggota baru dibuka bulan depan. Cek website kami untuk detailnya!",
    },
    {
      keywords: ["agenda", "acara", "kegiatan", "event"],
      answer:
        "Agenda terdekat kami adalah Seminar Teknologi pada tanggal 25 ini.",
    },
    {
      keywords: ["kontak", "admin", "wa", "whatsapp", "nomor"],
      answer: "Kamu bisa hubungi admin via WhatsApp di 0812-3456-7890.",
    },
    {
      keywords: ["lokasi", "alamat", "tempat", "sekre", "gedung"],
      answer: "Sekretariat HIMA berada di Gedung B, Lantai 2, Ruang 204.",
    },
    {
      keywords: ["struktur", "ketua", "divisi", "organisasi"],
      answer:
        "HIMA dipimpin oleh Ketua, Wakil, Sekretaris, dan 4 Divisi utama.",
    },
    {
      keywords: ["proker", "program", "kerja"],
      answer: "Proker unggulan kami: Tech Fair, Coding Camp, dan Bakti Sosial.",
    },
    // Menambahkan contoh pertanyaan spesifik Anda
    {
      keywords: ["kapan", "didirikan", "tahun", "lahir", "sejarah"],
      answer:
        "HIMA RPL didirikan pada tanggal 12 Januari 2015 oleh para pendiri jurusan.",
    },
    {
      keywords: ["halo", "hi", "pagi", "siang", "sore", "malam"],
      answer: "Halo juga! Ada yang bisa saya bantu seputar HIMA?",
    },
  ];

  // --- 2. LOGIKA MENCARI JAWABAN ---
  const findAnswer = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Mencari kecocokan keyword
    const match = knowledgeBase.find((item) =>
      item.keywords.some((keyword) => lowerInput.includes(keyword)),
    );

    if (match) {
      return match.answer;
    }

    return "Maaf, saya belum mengerti pertanyaan itu. Coba gunakan kata kunci lain atau hubungi Admin.";
  };

  // LOGIKA LOADING PERTAMA KALI
  useEffect(() => {
    if (open && isFirstLoad) {
      setInitialLoading(true);
      setIsFirstLoad(false);
      setTimeout(() => {
        setInitialLoading(false);
      }, 3000);
    }
  }, [open, isFirstLoad]);

  // Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, initialLoading]);

  const quickReplies = [
    { text: "Info Pendaftaran", keyword: "daftar" },
    { text: "Agenda Terdekat", keyword: "agenda" },
    { text: "Kontak Admin", keyword: "kontak" },
    { text: "Lokasi Sekretariat", keyword: "lokasi" },
    { text: "Struktur Organisasi", keyword: "struktur" },
    { text: "Program Kerja", keyword: "proker" },
  ];

  // Fungsi membalas pesan (UI update)
  const handleReply = (userText, botReply) => {
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setIsTyping(false);
    }, 1000);
  };

  // --- 3. HANDLE INPUT KETIKAN MANUAL ---
  const handleSendInput = () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    // Cari jawaban berdasarkan teks user (Logika Baru)
    const answer = findAnswer(userText);

    // Tampilkan chat
    handleReply(userText, answer);
  };

  // --- 4. HANDLE KLIK TOMBOL SHORTCUT ---
  const handleQuickReplyClick = (textLabel, keywordContext) => {
    // Cari jawaban berdasarkan keyword shortcut
    const answer = findAnswer(keywordContext);
    handleReply(textLabel, answer);
  };

  return (
    <>
      <div
        className={`fixed bottom-24 right-5 w-[300px] md:w-[320px] bg-white rounded-xl shadow-2xl overflow-hidden z-[9999] transition-all duration-300 ease-in-out border border-gray-200 font-sans
        ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        }`}
      >
        {/* HEADER (Warna ASLI: from-kuning2 to-kuning2) */}
        <div className="bg-gradient-to-r from-kuning2 to-kuning2 p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  src="/img/logo-himarpl.png"
                  alt="Bot"
                  className="w-6 h-6 object-contain"
                />
              </div>
              {/* Dot Status (Warna ASLI) */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-kuning border-2 border-kuning rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">
                Asisten HIMA
              </h3>
              {/* Text Online (Warna ASLI) */}
              <p className="text-teal-100 text-[10px]">Online</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div
          ref={chatRef}
          className="h-[250px] overflow-y-auto p-3 bg-gray-50 flex flex-col gap-2 custom-scrollbar relative"
        >
          {initialLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="flex space-x-2">
                {/* Animasi Loading (Warna ASLI: bg-kuning2) */}
                <div className="w-3 h-3 bg-kuning2 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-kuning2 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-kuning2 rounded-full animate-bounce"></div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex w-full ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 text-xs shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                        : "bg-white text-gray-800 border border-gray-300 rounded-r-lg rounded-tl-lg"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-2.5 rounded-r-lg rounded-tl-lg shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* QUICK REPLIES */}
        {!initialLoading && (
          <div className="bg-gray-50 px-2 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide px-1">
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  // Menggunakan handler baru
                  onClick={() => handleQuickReplyClick(qr.text, qr.keyword)}
                  // Styling Quick Reply (Warna ASLI: border-kuning2 text-kuning2)
                  className="whitespace-nowrap px-3 py-1 bg-white border border-kuning2 text-kuning2 text-[10px] rounded-full hover:bg-teal-50 hover:border-blue-300 transition shadow-sm flex-shrink-0"
                >
                  {qr.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER INPUT */}
        <div className="p-2 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendInput()}
            disabled={initialLoading}
            placeholder={initialLoading ? "Menghubungkan..." : "Ketik pesan..."}
            // Styling Input (Warna ASLI: focus:ring-kuning2)
            className="flex-1 bg-gray-100 text-gray-700 text-xs rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-kuning2 transition"
          />
          <button
            onClick={handleSendInput}
            disabled={!input.trim() || initialLoading}
            // Styling Tombol Kirim (Warna ASLI: bg-kuning2)
            className={`p-2 rounded-full text-white transition-all shadow-md flex items-center justify-center ${
              input.trim() && !initialLoading
                ? "bg-kuning2 hover:bg-blue-300 scale-100"
                : "bg-gray-300 cursor-not-allowed scale-90"
            }`}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* FLOATING BUTTON (LAUNCHER) */}
      <button
        onClick={() => setOpen(!open)}
        // Styling Tombol Buka Tutup (Warna ASLI: bg-kuning2)
        className={`fixed bottom-6 right-6 p-3.5 rounded-full shadow-2xl transition-all duration-300 z-[9999] flex items-center justify-center group ${
          open ? "bg-red-500 rotate-90" : "bg-kuning2 hover:bg-kuning2 rotate-0"
        }`}
      >
        {open ? (
          <X size={24} color="white" />
        ) : (
          <>
            <MessageCircle
              size={24}
              color="white"
              className="absolute group-hover:scale-0 transition-transform duration-200"
            />
            <img
              src="/img/logo-himarpl.png"
              className="w-6 h-6 object-contain scale-0 group-hover:scale-100 transition-transform duration-200"
              alt="Chat"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-pulse">
              1
            </span>
          </>
        )}
      </button>
    </>
  );
}
