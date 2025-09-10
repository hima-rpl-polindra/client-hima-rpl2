import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { FaGoogleDrive } from "react-icons/fa";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function PostingPage() {
  const router = useRouter();

  const { slug } = router.query;

  const { alldata: allData, loading } = useFetchData(
    `/api/postings?slug=${slug}`
  );

  const [mainImage, setMainImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // useEffect to set mainImage once allData is available
  useEffect(() => {
    if (allData && allData.length > 0 && allData[0]?.images[0]) {
      setMainImage(allData[0]?.images[0]);
      setSelectedImageIndex(0);
    }
  }, [allData]);

  // function to handle click on information list image
  const handleImageClick = (imageSource, index) => {
    setMainImage(imageSource);
    setSelectedImageIndex(index);
  };

  const createdAtDate =
    allData && allData[0]?.createdAt
      ? new Date(allData && allData[0]?.createdAt)
      : null;

  // function to format the date
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ""; // or handle the error as needed
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true, // use 12-hour format
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  return (
    <>
      <Head>
        <title>{allData?.[0]?.title || "Information Page"}</title>
        <meta
          property="og:title"
          content={allData?.[0]?.title || "Information Page"}
        />
        <meta name="description" content={allData?.[0]?.description} />
        <meta property="og:description" content={allData?.[0]?.description} />
        <meta
          property="og:url"
          content={`https://himarpl-polindra.com/posting/${slug}`}
        />
        <meta
          property="og:image"
          content={
            allData?.[0]?.images?.[0] ||
            "https://himarpl-polindra.com/img/og-image.png"
          }
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
                <div className="posting__main__image">
                  <img src={mainImage} alt={allData && allData[0]?.title} />
                </div>
                <div className="posting__slug__info">
                  <div className="detail__posting__content">
                    <a
                      target="_blank"
                      href={allData && allData[0]?.livePreview}
                    >
                      <FaGoogleDrive /> Dokumentasi
                    </a>
                    <h1>{allData && allData[0]?.title}</h1>
                    <p>{allData[0]?.description}</p>
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
