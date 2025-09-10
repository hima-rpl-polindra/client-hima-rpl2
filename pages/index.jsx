import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import {
  FaCalendarDays,
  FaFacebook,
  FaInstagram,
  FaLessThanEqual,
  FaYoutube,
} from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { MdModelTraining } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import { BiNotepad } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
import { VscLayoutActivitybarLeft } from "react-icons/vsc";
import { TiLocationArrowOutline } from "react-icons/ti";
import Spinner from "@/components/Spinner";
import { LucideMedal } from "lucide-react";
import blogs from "./blog";
import Typewriter from "typewriter-effect";
import { useInView } from "react-intersection-observer";
import useFetchData from "@/hooks/useFetchData";
import { HiBookmark } from "react-icons/hi";
import { GrWorkshop, GrAchievement } from "react-icons/gr";
import { FiChevronsDown } from "react-icons/fi";

export default function Home() {
  // active service background color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // set the first item as
    // active when mouse leaves
  };

  const [loading, setLoading] = useState(true);
  const [allData, setAlldata] = useState([]);
  const [allWork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPostings, setFilteredPostings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postingsResponse, blogsResponse] = await Promise.all([
          fetch("/api/postings"),
          fetch("/api/blogs"),
          fetch("/api/informations"),
        ]);

        const postingsData = await postingsResponse.json();

        const blogsData = await blogsResponse.json();

        setAlldata(postingsData);
        setAllwork(blogsData);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { alldata } = useFetchData("/api/blogs");

  useEffect(() => {
    // filter postings based on selectedCategory
    if (selectedCategory === "All") {
      setFilteredPostings(
        allData.filter((postings) => postings.status === "publish")
      );
    } else {
      setFilteredPostings(
        allData.filter(
          (postings) =>
            postings.status === "publish" &&
            postings.postingCategory[0] === selectedCategory
        )
      );
    }
  }, [selectedCategory, allData]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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

  // Use useInView to detect when an element is visible
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.5,
  });

  const truncateText = (text, maxWords) => {
    const words = text.split(" "); // Separate text into array words
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "..."; // Cut text and add ellipsis
    }
    return text;
  };

  // Slide services
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Pengembangan Mahasiswa",
      description:
        "Generasi penerus yang memiliki kompetensi, integritas, dan komitmen!",
      image: "/img/model-pengurus-2.png",
      features: [
        {
          name: "Kepemimpinan",
          desc: "Pengembangan menjadi calon pemimpin",
          icon: "/img/icon-leadership.svg",
        },
        {
          name: "Soft skill",
          desc: "Kembangkan komunikasi dan kerja tim",
          icon: "/img/icon-softskill.svg",
        },
      ],
      moreButton: "/informasi/pengembangan-mahasiswa",
    },
    {
      id: 2,
      title: "Internal & Eksternal",
      description:
        "Membangun dan menjaga hubungan baik dengan pihak internal maupun eksternal.",
      image: "/img/model-pengurus-3.png",
      features: [
        {
          name: "Komunitas",
          desc: "Membangun jaringan antar organisasi",
          icon: "/img/icon-community.svg",
        },
        {
          name: "Sponsorship",
          desc: "Menjalin kerja sama internal dan external",
          icon: "/img/icon-sponsorship.svg",
        },
      ],
      moreButton: "/informasi/hubungan-internal-eksternal",
    },
    {
      id: 3,
      title: "Akademik & Informasi",
      description:
        "Menciptakan sinergi dukungan akademis dan penyebaran informasi yang efektif.",
      image: "/img/model-pengurus-4.png",
      features: [
        {
          name: "Dukungan Akademik",
          desc: "Memahami materi kuliah dan persiapan ujian",
          icon: "/img/icon-academy.svg",
        },
        {
          name: "Publikasi",
          desc: "Mempublikasi informasi, kegiatan dan blog",
          icon: "/img/icon-media.svg",
        },
      ],
      moreButton: "/informasi/akademik-media-informasi",
    },
  ];

  // Disable tight click for images (<img/>)
  const DisableRightClick = () => {
    useEffect(() => {
      const handleContextMenu = (e) => {
        if (e.target.tagName === "IMG") {
          e.preventDefault();
        }
      };

      document.addEventListener("contextmenu", handleContextMenu);
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }, []);

    return null;
  };

  return (
    <>
      <DisableRightClick />
      <Head>
        <title>HIMA-RPL POLINDRA</title>
        <meta
          name="description"
          content="Himpunan Mahasiswa Rekayasa Perangkat Lunak - Politeknik Negeri Indramayu."
        />
        <meta
          name="keywords"
          content="HIMA-RPL, Polindra, Mahasiswa, Kegiatan, Informasi, Dokumentasi"
        />
        <meta name="author" content="HIMA-RPL POLINDRA" />
        <meta property="og:title" content="HIMA-RPL POLINDRA" />
        <meta
          property="og:description"
          content="🧑‍💻 Temukan informasi, dokumentasi kegiatan, serta blog terbaru dari Himpunan Mahasiswa Rekayasa Perangkat Lunak – Politeknik Negeri Indramayu."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://himarpl-polindra.com/" />
        <meta
          property="og:image"
          content="https://himarpl-polindra.com/img/og-image.png"
        />
      </Head>
      {/* HERO SECTION */}
      <section className="hero__section relative bg__heroBannerImage">
        <div className="container">
          <div className="hero__wrapper">
            <div className="hero__title__left">
              <span
                className="hero__first__title"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                Himpunan Mahasiswa
              </span>
              <h1
                className="hero__second__title"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                Rekayasa
                <br />
                Perangkat Lunak
              </h1>
              <h2
                className="hero__third__title"
                data-aos="fade-right"
                data-aos-delay="600"
              >
                Politeknik Negeri Indramayu
              </h2>
              <div
                className="hero__image__content hero__image__display"
                data-aos="fade-up"
              >
                <img src="/img/hero-illustration.svg" alt="Hero Image" />
              </div>
              <div className="hero__social__media__links">
                <div className="button__social__media" data-aos="fade-right">
                  <span>Sosial Media</span>
                  <ul className="social__links">
                    <li>
                      <Link
                        className="social__link"
                        href="https://www.instagram.com/official_himarpl"
                        target="_blank"
                      >
                        <FaInstagram className="size-6" />
                      </Link>
                    </li>
                    <li title="Coming soon">
                      <Link className="social__link" href="/">
                        <FaFacebook className="size-6" />
                      </Link>
                    </li>
                    <li title="Coming soon">
                      <Link className="social__link" href="/">
                        <FaYoutube className="size-6" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* RIGHTSIDE IMAGE SECTION */}
            <div className="hero__image__right" data-aos="fade-left">
              <div className="hero__image__content">
                <img src="/img/hero-illustration.svg" alt="Hero Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* INTRODUCE SECTION */}
      <section className="flex items-center justify-center px-6 py-20 bg-gray-50 dark:bg-[#0c0c0c] border border-[#eeeded] dark:border-[#232222]">
        <div className="flex flex-col md:flex-row items-center max-w-7xl w-full gap-16">
          <div className="relative w-full md:w-5/12">
            <div className="relative">
              <div className="">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[120px] font-bold">
                  {"{}"}
                </div>
                <img
                  src="/img/model-pengurus.png"
                  alt="Code Your Future"
                  className="relative z-10 w-[90%] mx-auto h-auto"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-7/12 flex flex-col items-start space-y-4">
            <div className="relative w-full mt-4">
              <div className="flex items-center" data-aos="fade-right">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-black dark:text-white">
                  Code Your
                </h1>
                <img
                  src="/img/icon-engineering.svg"
                  alt="Icon Engineering"
                  className="w-[2.4rem] h-auto ml-[0.65rem] sm:w-10 md:w-[4.5rem] lg:w-24 image-stroke"
                />
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-black dark:text-white"
                data-aos="fade-left"
              >
                Future{" "}
                <span className="text-[#ffff00] text-stroke">with Us!</span>
              </h2>

              <h3
                className="text-[1rem] sm:text-xl md:text-2xl lg:text-3xl font-semibold italic text-black dark:text-white"
                data-aos="fade-left"
              >
                An organization dedicated to technology.
                <br />
                <span className="bg-[url('/img/shape.svg')] bg-cover bg-center px-4 text-black">
                  HIMA-RPL
                </span>
              </h3>
            </div>
          </div>
        </div>
      </section>
      {/* ATTACHMENT SECTION */}
      <section className="relative bg-gray-50 dark:bg-black">
        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          {/* Vertical Line */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Left Line */}
            <div className="absolute top-[0%] bottom-[0%] w-[0.8px] left-[2%] sm:left-[1%] md:left-[2%] xl:left-0 bg-[#dbdbdb] dark:bg-[#232222] overflow-hidden">
              <div
                className="absolute inset-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-[#2c6bf5] to-transparent animate-lightFlow"
                style={{ transform: "scale(1.5)" }}
              />
            </div>
            {/* Right Line */}
            <div className="absolute top-[0%] bottom-[0%] w-[0.8px] right-[2%] sm:right-[1%] md:right-[2%] xl:right-0 bg-[#dbdbdb] dark:bg-[#232222] overflow-hidden">
              <div
                className="absolute inset-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#2c6bf5] to-transparent animate-lightFlow"
                style={{ transform: "scale(1.5)" }}
              />
            </div>
          </div>
          {/* Content Header */}
          <div className="relative mb-12 w-full text-center md:mb-16 lg:mb-[4.5rem] before:content-[''] before:absolute before:w-[114%] before:h-[0.8px] before:bg-[#dbdbdb] before:dark:bg-[#232222] before:top-[-20px] before:left-1/2 before:-translate-x-1/2 after:content-[''] after:absolute after:w-[114%] after:h-[0.8px] after:bg-[#dbdbdb] after:dark:bg-[#232222] after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2">
            <h1 className="relative mb-5 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black dark:text-white">
              <span data-aos="fade-left">Software</span>{" "}
              <span data-aos="fade-right" data-aos-delay="300">
                Engineering
              </span>
            </h1>
            <h2
              className="relative mb-5 mx-auto max-w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#545454] dark:text-[#838282] my-5"
              ref={ref}
            >
              {inView && (
                <Typewriter
                  options={{
                    strings: ["Dedication to Development."],
                    autoStart: true,
                    loop: false,
                    deleteSpeed: Infinity,
                  }}
                />
              )}
            </h2>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-3xl mb-[2.5rem]">
            <div className="bg-[#ffffff] dark:bg-[#121212] border-[0.8px] border-[#d2d1d1] dark:border-[#232222] p-6 rounded-lg flex flex-col md:flex-row items-center gap-6">
              {/* Model Image 1 */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-72 h-72 relative">
                  <img
                    src="/img/model-pengurus-1.png"
                    alt="HIMA-RPL"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Content of Attachment */}
              <div className="flex-grow w-full md:w-2/3">
                <h3 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-bold italic mb-1 text-black dark:text-white">
                  Organisasi Mahasiswa
                </h3>
                <p className="text-sm text-[#545454] dark:text-[#838282] mb-4">
                  Dedikasi kami dalam meningkatkan keterampilan dan keahlian
                  pada bidang rekayasa perangkat lunak.
                </p>
                {/* Badges Icon - FIXED RESPONSIVE DESIGN */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 min-w-[40px]">
                      <img
                        src="/img/icon-coc.svg"
                        className="w-full h-full object-contain"
                        alt="Icon COC"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="text-sm font-medium text-black dark:text-white">
                        Class of competition
                      </span>
                      <p className="text-xs text-[#545454] dark:text-[#838282]">
                        Mengasah kemampuan kompetitif mahasiswa.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 min-w-[40px]">
                      <img
                        src="/img/icon-seminar.svg"
                        className="w-full h-full object-contain"
                        alt="Icon Seminar"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="text-sm font-medium text-black dark:text-white">
                        Seminar Teknologi
                      </span>
                      <p className="text-xs text-[#545454] dark:text-[#838282]">
                        Meningkatkan pengetahuan di bidang teknologi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Feature Cards */}
          <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {/* Card 1: Tutorial */}
            <div className="p-10 duration-300 transform bg-[#ffffff] dark:bg-[#121212] border-[0.8px] border-[#d2d1d1] dark:border-[#232222] rounded-lg relative">
              <div className="flex items-center justify-between mb-1">
                <div className="relative">
                  <img
                    src="/img/fd-tutorial.png"
                    alt="Image Content HIMA-RPL"
                    className="mb-5 w-32 h-32 md:w-32 md:h-32 mr-2 text-black dark:text-white"
                  />
                  <h3 className="text-lg font-bold text-black dark:text-white leading-5">
                    Tutorial
                  </h3>
                </div>
                {/* Top Right Badge */}
                <span className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 p-7 text-xl font-bold text-white rounded-full bg-[#2c6bf5]">
                  {
                    alldata.filter(
                      (ab) =>
                        ab.blogCategory[0] === "tutorial" &&
                        ab.status === "publish"
                    ).length
                  }
                  +
                  <span className="absolute rounded-full w-10 h-10 border-2 border-[#2c6bf5] animate-ping opacity-95"></span>
                </span>
              </div>
              <p className="text-sm text-[#545454] dark:text-[#838282]">
                Sebagai dedikasi untuk memudahkan proses pembelajaran
                programming dan pengembangan software.
              </p>
            </div>
            {/* Card 2: Pengetahuan Umum */}
            <div className="p-10 duration-300 transform bg-[#ffffff] dark:bg-[#121212] border-[0.8px] border-[#d2d1d1] dark:border-[#232222] rounded-lg relative">
              <div className="flex items-center justify-between mb-1">
                <div className="relative">
                  <img
                    src="/img/fd-pengetahuan-umum.png"
                    alt="Image Content HIMA-RPL"
                    className="mb-5 w-32 h-32 md:w-32 md:h-32 mr-2 text-black dark:text-white"
                  />
                  <h3 className="text-lg font-bold text-black dark:text-white leading-5">
                    Pengetahuan Umum
                  </h3>
                </div>
                {/* Top Right Badge */}
                <span className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 p-7 text-xl font-bold text-white rounded-full bg-[#2c6bf5]">
                  {
                    alldata.filter(
                      (ab) =>
                        ab.blogCategory[0] === "pengetahuan umum" &&
                        ab.status === "publish"
                    ).length
                  }
                  +
                  <span className="absolute rounded-full w-10 h-10 border-2 border-[#2c6bf5] animate-ping opacity-95"></span>
                </span>
              </div>
              <p className="text-sm text-[#545454] dark:text-[#838282]">
                Sharing tentang bidang IT untuk meningkatkan pemahaman dan
                keterampilan di dunia teknologi.
              </p>
            </div>
            {/* Card 3: Karya Pengurus */}
            <div className="p-10 duration-300 transform bg-[#ffffff] dark:bg-[#121212] border-[0.8px] border-[#d2d1d1] dark:border-[#232222] rounded-lg relative">
              <div className="flex items-center justify-between mb-1">
                <div className="relative">
                  <img
                    src="/img/fd-karya-pengurus.png"
                    alt="Image Content HIMA-RPL"
                    className="mb-5 w-32 h-32 md:w-32 md:h-32 text-black dark:text-white"
                  />
                  <h3 className="text-lg font-bold text-black dark:text-white leading-5">
                    Karya Pengurus
                  </h3>
                </div>
                {/* Top Right Badge */}
                <span className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 p-7 text-xl font-bold text-white rounded-full bg-[#2c6bf5]">
                  {
                    alldata.filter(
                      (ab) =>
                        ab.blogCategory[0] === "karya pengurus" &&
                        ab.status === "publish"
                    ).length
                  }
                  +
                  <span className="absolute rounded-full w-10 h-10 border-2 border-[#2c6bf5] animate-ping opacity-95"></span>
                </span>
              </div>
              <p className="text-sm text-[#545454] dark:text-[#838282]">
                Karya dan kontribusi pengurus sebagai bentuk dedikasi dalam
                mendukung kemajuan bidang IT dan teknologi.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES SECTION */}
      <section className="relative pb-8 pt-8 bg-services bg-cover">
        <div className="w-full text-center py-6 mb-10">
          <h1 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-2xl">
            PUSAT INFORMASI & INOVASI
          </h1>
          <h2 className="text-white font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
            MAHASISWA RPL POLINDRA
          </h2>
        </div>
        {/* Selection Button  */}
        <div className="flex justify-center p-5 space-x-2 sm:space-x-2 md:space-x-4 lg:space-x-32 mb-6">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-colors ${
                current === index ? "bg-[#2c6bf5] text-white" : "text-white"
              } text-xs sm:text-lg lg:text-lg font-medium`}
              onClick={() => setCurrent(index)}
            >
              {slide.title}
            </button>
          ))}
        </div>
        {/* Content of Services */}
        <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6">
          <div className="relative flex flex-col md:flex-row items-center bg-[#2c6bf5] p-6 pt-6 pb-0 md:p-10  rounded-lg overflow-hidden">
            {/* Left Content */}
            <div className="w-full md:w-[60%] space-y-4 text-white z-10">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold">
                {slides[current].title}
              </h2>
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm">
                {slides[current].description}
              </p>
              <div className="space-y-4">
                {slides[current].features.map((feature, index) => (
                  <div
                    className="flex items-start gap-2  sm:w-[80%] lg:w-[80%] bg-white/10 p-3 rounded-lg"
                    key={index}
                  >
                    {/* Container Icon */}
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={feature.icon}
                        className="w-10 h-10"
                        alt="Flat Icon HIMA-RPL"
                      />
                    </div>
                    {/* Container Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{feature.name}</h3>
                      <p className="text-xs opacity-90">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={slides[current].moreButton}
                className="inline-block cursor-default pointer-events-none"
              >
                <button className="mt-6 px-6 py-2 text-[#ffff00] font-semibold bg-[#004aad] hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1">
                  HIMA-RPL
                </button>
              </a>
            </div>
            {/* Right Image */}
            <div className="relative md:absolute md:bottom-0 md:right-0 lg:absolute lg:bottom-0 lg:right-0 w-full lg:w-1/2 flex justify-center md:justify-end lg:justify-end mt-8 lg:mt-0">
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-auto h-auto max-h-[270px] lg:max-h-[340px] object-contain z-20"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
