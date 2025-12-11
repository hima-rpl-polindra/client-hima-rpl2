"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // State baru untuk loading awal (3 detik)
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Cek apakah ini pertama kali buka?
  const [initialLoading, setInitialLoading] = useState(false); // Cek apakah sedang loading?

  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Saya Asisten HIMA. Ada yang bisa dibantu?" },
  ]);

  const chatRef = useRef(null);

  // LOGIKA LOADING PERTAMA KALI BUKA
  useEffect(() => {
    if (open && isFirstLoad) {
      setInitialLoading(true); // Mulai loading
      setIsFirstLoad(false); // Tandai sudah pernah dibuka

      // Tunggu 3 detik
      setTimeout(() => {
        setInitialLoading(false); // Selesai loading, tampilkan chat
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
  }, [messages, isTyping, initialLoading]); // Tambahkan initialLoading ke dependency

  const quickReplies = [
    {
      text: "Info Pendaftaran",
      reply:
        "Pendaftaran anggota baru dibuka bulan depan. Cek website kami untuk detailnya!",
    },
    {
      text: "Agenda Terdekat",
      reply:
        "Agenda terdekat kami adalah Seminar Teknologi pada tanggal 25 ini.",
    },
    {
      text: "Kontak Admin",
      reply: "Kamu bisa hubungi admin via WhatsApp di 0812-3456-7890.",
    },
    {
      text: "Lokasi Sekretariat",
      reply: "Sekretariat HIMA berada di Gedung B, Lantai 2, Ruang 204.",
    },
    {
      text: "Struktur Organisasi",
      reply: "HIMA dipimpin oleh Ketua, Wakil, Sekretaris, dan 4 Divisi utama.",
    },
    {
      text: "Program Kerja",
      reply: "Proker unggulan kami: Tech Fair, Coding Camp, dan Bakti Sosial.",
    },
  ];

  const handleReply = (userText, botReply) => {
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendInput = () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    handleReply(
      text,
      "Terima kasih pesannya! Admin kami akan segera merespons pertanyaan spesifik ini."
    );
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
        {/* HEADER */}
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
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-kuning border-2 border-kuning rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">
                Asisten HIMA
              </h3>
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

        {/* BODY (MESSAGES vs LOADING) */}
        <div
          ref={chatRef}
          className="h-[250px] overflow-y-auto p-3 bg-gray-50 flex flex-col gap-2 custom-scrollbar relative"
        >
          {/* JIKA SEDANG INITIAL LOADING (3 DETIK PERTAMA) */}
          {initialLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="flex space-x-2">
                {/* Animasi 3 titik berdenyut seperti contoh gambar */}
                <div className="w-3 h-3 bg-kuning2 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-kuning2 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-kuning2 rounded-full animate-bounce"></div>
              </div>
            </div>
          ) : (
            // JIKA TIDAK LOADING, TAMPILKAN CHAT NORMAL
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

              {/* Typing Animation (saat bot mikir balasan) */}
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
        {/* Disembunyikan saat loading awal agar bersih */}
        {!initialLoading && (
          <div className="bg-gray-50 px-2 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide px-1">
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => handleReply(qr.text, qr.reply)}
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
            disabled={initialLoading} // Input mati saat loading
            placeholder={initialLoading ? "Menghubungkan..." : "Ketik pesan..."}
            className="flex-1 bg-gray-100 text-gray-700 text-xs rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-kuning2 transition"
          />
          <button
            onClick={handleSendInput}
            disabled={!input.trim() || initialLoading}
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
