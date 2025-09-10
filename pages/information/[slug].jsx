import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

export default function InformationPage() {
  const router = useRouter();
  const { title: queryTitle } = router.query;
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (queryTitle) {
      fetch(`/api/informations?title=${queryTitle}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.title) {
            setTitle(data.title);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [queryTitle]);

  const { slug } = router.query;

  const { alldata: allData, loading } = useFetchData(
    `/api/informations?slug=${slug}`
  );

  const [mainImage, setMainImage] = useState("");

  const [showSwiper, setShowSwiper] = useState(false);
  const swiperRef = useRef(null);

  // useEffect for mainImage
  useEffect(() => {
    if (allData && allData.length > 0 && allData[0]?.images?.length > 0) {
      setMainImage(allData[0].images[0]);

      const loadImages = async () => {
        const promises = allData[0].images.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve();
            })
        );

        await Promise.all(promises);

        setShowSwiper(true); // only show after all slide images are loaded
      };

      loadImages();
    }
  }, [allData]);

  // function to handle click on information list image
  const handleImageClick = (imageSource) => {
    setMainImage(imageSource);
  };

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
          content={`https://himarpl-polindra.com/information/${slug}`}
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
      <div className="information__slug__page">
        <div className="information__slug__content">
          <div className="container">
            <div className="information__content__box">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <div className="left__information__box">
                    <div className="left__information__image">
                      <img src={mainImage} alt="Information Image" />
                    </div>
                    <div className="information__image__list">
                      {showSwiper && (
                        <Swiper
                          ref={swiperRef}
                          slidesPerView={"auto"}
                          spaceBetween={30}
                          freeMode={true}
                          grabCursor={false}
                          modules={[FreeMode]}
                          className="mySwiper"
                          onSwiper={(swiper) => {
                            // Pastikan di slide pertama saat init
                            swiper.slideTo(0, 0);
                          }}
                        >
                          {allData &&
                            allData[0]?.images.map((image, index) => (
                              <SwiperSlide key={index}>
                                <img
                                  src={image}
                                  onClick={() => handleImageClick(`${image}`)}
                                />
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      )}
                    </div>
                  </div>
                  {allData?.map((data, index) => (
                    <div
                      key={index}
                      className="right__information__content__box"
                    >
                      <h1>{data.title}</h1>
                      <div key={index} className="information__description">
                        <ReactMarkdown rehypePlugins={[remarkGfm]}>
                          {data.description}
                        </ReactMarkdown>
                        <div className="information__tags">
                          {data.tags?.map((tag, tagIndex) => (
                            <span key={tagIndex} className="tags__content">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
