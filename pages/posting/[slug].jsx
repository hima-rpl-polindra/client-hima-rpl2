import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
// 1. Pastikan import ini ada dan digunakan
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaGoogleDrive } from "react-icons/fa";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

// Optional: Jika ingin styling khusus untuk markdown images
const markdownComponents = {
  img: ({ node, ...props }) => (
    <img
      {...props}
      style={{
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
        margin: "20px 0",
      }}
      alt={props.alt || "Posting Image"}
    />
  ),
  // Agar link di dalam deskripsi terbuka di tab baru
  a: ({ node, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {props.children}
    </a>
  ),
};

export default function PostingPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { alldata: allData, loading } = useFetchData(
    `/api/postings?slug=${slug}`,
  );

  const [mainImage, setMainImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // Cek apakah data ada dan array images memiliki isi
    if (allData && allData.length > 0 && allData[0]?.images?.length > 0) {
      setMainImage(allData[0]?.images[0]);
      setSelectedImageIndex(0);
    }
  }, [allData]);

  const handleImageClick = (imageSource, index) => {
    setMainImage(imageSource);
    setSelectedImageIndex(index);
  };

  return (
    <>
      <Head>
        <title>{allData?.[0]?.title || "Information Page"}</title>
      </Head>
      <div className="posting__slug__page">
        <div className="posting__slug__content">
          <div className="container">
            {loading ? (
              <div className="posting__loading">
                <Spinner />
              </div>
            ) : (
              <>
                {/* --- 1. MAIN IMAGE SECTION --- */}
                <div
                  className="posting__main__image_container"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {/* Gambar Utama */}
                  <div className="posting__main__image">
                    {/* Tambahkan onError untuk handle jika link gambar rusak/bukan gambar */}
                    <img
                      src={mainImage}
                      alt={allData && allData[0]?.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/800x400?text=Gambar+Tidak+Ditemukan"; // Fallback image
                      }}
                    />
                  </div>

                  {/* --- 2. THUMBNAIL GALLERY (Agar gambar link lain bisa dipilih) --- */}
                  {allData?.[0]?.images?.length > 1 && (
                    <div
                      className="posting__gallery"
                      style={{
                        display: "flex",
                        gap: "10px",
                        overflowX: "auto",
                        paddingBottom: "10px",
                      }}
                    >
                      {allData[0].images.map((imgSrc, index) => (
                        <div
                          key={index}
                          onClick={() => handleImageClick(imgSrc, index)}
                          style={{
                            cursor: "pointer",
                            border:
                              selectedImageIndex === index
                                ? "2px solid #007bff"
                                : "2px solid transparent",
                            borderRadius: "8px",
                            minWidth: "80px",
                            height: "60px",
                          }}
                        >
                          <img
                            src={imgSrc}
                            alt={`thumb-${index}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="posting__slug__info">
                  <div className="detail__posting__content">
                    {allData?.[0]?.livePreview && (
                      <a
                        target="_blank"
                        href={allData[0].livePreview}
                        rel="noreferrer"
                      >
                        <FaGoogleDrive /> Dokumentasi
                      </a>
                    )}

                    <h1>{allData && allData[0]?.title}</h1>

                    <div className="single-box-content">
                      <article className="prose max-w-none dark:prose-invert">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {allData?.[0]?.description}
                        </ReactMarkdown>
                      </article>
                    </div>

                    {/* Tags */}
                    {allData &&
                      allData[0]?.tags &&
                      allData[0].tags.length > 0 && (
                        <div className="posting__tags">
                          {allData[0].tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
