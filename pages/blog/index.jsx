import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import { TfiWrite } from "react-icons/tfi";
import Link from "next/link";
import Blogsearch from "@/components/BlogSearch";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

export default function Blogs() {
  // pagnation
  const [currentPage, setCurrentPage] = useState(1); // for page 1
  const [perPage] = useState(10);

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata: allData, loading } = useFetchData("/api/blogs");
  const publishData = allData.filter((blog) => blog.status === "publish");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  };
  const handleSearchClose = () => {
    setSearchInput(false);
  };

  // filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? publishData
      : publishData.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Count the total items that have been filtered
  const totalFilteredItems = filteredBlogs.length;

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(totalFilteredItems / perPage);

  // calculate index of the first blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  // Get the current page's postings
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Create an array for page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blog HIMA-RPL</title>
      </Head>
      <div className="blog__page">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <section className="blog__page__side">
              <div className="container">
                <div className="blog__top__title">
                  <div className="blog__content__title flex">
                    <h1>Blog HIMA-RPL</h1>
                    <p>
                      Kami berusaha menghadirkan tulisan-tulisan inspiratif,
                      informatif, dan penuh makna untuk menemani perjalanan Kamu
                      dalam menemukan perspektif baru.
                    </p>
                    <div className="blog__search__wrap">
                      <form className="flex">
                        <input
                          onClick={handleSearchOpen}
                          type="text"
                          readOnly
                          placeholder="Cari"
                        />
                        <button>Search</button>
                      </form>
                    </div>
                  </div>
                  <div className="blog__content__list">
                    <div className="container">
                      <div className="horizontal__line"></div>
                      <div className="select__blog">
                        <div className="select__blog__title flex">
                          <h3>Blog Terbaru</h3>
                        </div>
                        <div className="uploaded__blog flex">
                          <Swiper
                            slidesPerView={"auto"}
                            freeMode={true}
                            spaceBetween={30}
                            className="mySwiper"
                            modules={[FreeMode]}
                          >
                            {filteredBlogs.slice(0, 6).map((blog) => (
                              <SwiperSlide key={blog._id}>
                                <div className="blog__list">
                                  <Link
                                    key={blog.slug}
                                    href={`/blog/${blog.slug}`}
                                  >
                                    <img
                                      src={blog.images[0]}
                                      alt={blog.title}
                                    />
                                  </Link>
                                  <div className="blog__list__information">
                                    <div className="blog__list__marker flex">
                                      {blog.blogCategory.map(
                                        (category, categoryIndex) => (
                                          <Link
                                            key={`${blog._id}-category-${categoryIndex}`}
                                            href={`/blog/category/${category}`}
                                          >
                                            {category}
                                          </Link>
                                        )
                                      )}
                                    </div>
                                    <h2>
                                      <Link
                                        key={blog.slug}
                                        href={`/blog/${blog.slug}`}
                                      >
                                        {blog.title}
                                      </Link>
                                    </h2>
                                    <div className="blog__list__image flex">
                                      <img src="/img/logo-himarpl.png" alt="" />
                                      <p>HIMA RPL</p>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* LATEST BLOG  */}
            <section className="blog__content__list">
              <div className="container">
                <div className="horizontal__line"></div>
                <div className="latest__blog__post__data">
                  <div className="select__blog__title">
                    <h3>Semua Blog</h3>
                  </div>
                  <div className="latest__blog__content">
                    {currentBlogs.map((blog) => (
                      <div className="latest__blog__wrapper" key={blog._id}>
                        <div className="latest__blog__images">
                          <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                            <img src={blog.images[0]} alt={blog.title} />
                          </Link>
                          <div className="blog__list__marker flex">
                            {blog.blogCategory.map(
                              (category, categoryIndex) => (
                                <Link
                                  key={`${blog._id}-category-${categoryIndex}`}
                                  href={`/blog/category/${category}`}
                                  className="blog__marker__point"
                                >
                                  {category}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                        <div className="latest__blog__information">
                          <h3>
                            <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h3>
                          <p>{blog.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div className="pagination__button flex justify-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <GrFormPrevious size={30} />
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${currentPage === number ? "active" : ""}`}
                  >
                    {number}
                  </button>
                ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <MdNavigateNext size={30} />
              </button>
            </div>
          </>
        )}
      </div>
      {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
    </>
  );
}
