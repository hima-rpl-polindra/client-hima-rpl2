"use client";
import { useState, useRef, useEffect } from "react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Ada yang bisa dibantu?" },
  ]);

  const chatRef = useRef(null);

  // AUTO SCROLL KETIKA ADA PESAN BARU
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const quickReplies = [
    {
      text: "Perlu informasi",
      reply: "Berikut informasi yang kamu butuhkan...",
    },
    {
      text: "Cara daftar",
      reply: "Untuk daftar, silakan kunjungi halaman ini...",
    },
    {
      text: "Kontak admin",
      reply: "Admin dapat dihubungi melalui nomor berikut...",
    },
    { text: "Lokasi kampus", reply: "Kampus kami berada di pusat kota." },
    { text: "Biaya pendaftaran", reply: "Biaya pendaftaran adalah Rp150.000." },
    { text: "Jadwal kegiatan", reply: "Kegiatan berlangsung setiap Sabtu." },
    { text: "Penanggung jawab", reply: "Penanggung jawab adalah ketua HIMA." },
    {
      text: "Struktur organisasi",
      reply: "Berikut struktur organisasi HIMA...",
    },
    {
      text: "Tentang HIMA",
      reply: "HIMA adalah wadah pengembangan mahasiswa.",
    },
    {
      text: "Program kerja",
      reply: "Program kerja tahun ini mencakup pelatihan & lomba.",
    },

    // tambahan 10
    {
      text: "Agenda terdekat",
      reply: "Agenda terdekat adalah seminar teknologi.",
    },
    {
      text: "Pendaftaran anggota",
      reply: "Pendaftaran anggota baru dibuka bulan depan.",
    },
    { text: "Jam layanan", reply: "Layanan admin aktif 08.00–16.00." },
    {
      text: "Beasiswa",
      reply: "Beasiswa tersedia bagi mahasiswa berprestasi.",
    },
    { text: "Acara besar", reply: "Acara besar HIMA berlangsung akhir tahun." },
    { text: "Media sosial", reply: "Ikuti kami di Instagram resmi HIMA." },
    {
      text: "Pelatihan gratis",
      reply: "Pelatihan gratis tersedia untuk anggota aktif.",
    },
    { text: "Forum diskusi", reply: "Forum diskusi diadakan setiap Jumat." },
    { text: "Saran dan kritik", reply: "Silakan kirimkan saran Anda di sini." },
    { text: "Hubungi ketua", reply: "Kontak ketua HIMA ada di email resmi." },
  ];

  // ================================
  // JAWABAN BOT MUNCUL BERTAHAP
  // ================================
  const sendSelected = (text, reply) => {
    // tampilkan user dulu
    setMessages((prev) => [...prev, { sender: "user", text }]);

    // bot balas setelah delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 700);
  };

  const sendInput = () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    // tampilkan pesan user
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    // bot balas delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Pesan sudah diterima ya!" },
      ]);
    }, 700);
  };

  return (
    <>
      {/* BUBBLE CHAT */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          background: "#00897b",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "transform 0.25s ease",
          zIndex: 9999,
        }}
      >
        <img
          src="/img/logo-himarpl.png"
          alt="HIMA Logo"
          style={{ width: "35px", height: "35px", objectFit: "contain" }}
        />
      </div>

      {/* PANEL CHAT */}
      <div
        style={{
          position: "fixed",
          bottom: open ? "100px" : "50px",
          right: "30px",
          width: "320px",
          height: open ? "420px" : "0px",
          overflow: "hidden",
          background: "white",
          borderRadius: "12px",
          boxShadow: open ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.35s ease",
          transform: open ? "translateY(0)" : "translateY(20px)",
          opacity: open ? 1 : 0,
          zIndex: 9999,
        }}
      >
        {/* AREA PESAN */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            padding: "12px",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                background: msg.sender === "user" ? "#00897b" : "#eeeeee",
                color: msg.sender === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "10px",
                marginBottom: "8px",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                zIndex: 9999,
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* QUICK REPLIES */}
        <div
          style={{
            borderTop: "1px solid #ddd",
            padding: "8px",
            maxHeight: "120px",
            overflowY: "auto",
          }}
        >
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={() => sendSelected(qr.text, qr.reply)}
              style={{
                padding: "6px 10px",
                margin: "4px",
                borderRadius: "6px",
                border: "none",
                background: "#00897b",
                color: "white",
                cursor: "pointer",
                fontSize: "13px",
                zIndex: 9999,
              }}
            >
              {qr.text}
            </button>
          ))}
        </div>

        {/* INPUT TEXT */}
        <div
          style={{
            borderTop: "1px solid #ddd",
            padding: "8px",
            display: "flex",
            gap: "6px",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={sendInput}
            style={{
              padding: "8px 12px",
              background: "#00897b",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              zIndex: 9999,
            }}
          >
            Kirim
          </button>
        </div>
      </div>
    </>
  );
}
