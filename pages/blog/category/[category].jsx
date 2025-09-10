import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

export default function BlogCategory() {
  const router = useRouter();
  const { category } = router.query;

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // fetch blog category data
  const { alldata: allData, loading } = useFetchData(
    `/api/blogs?blogCategory=${category}`
  );

    // function to handle page change
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  

  const filteredBlogs = allData
    .filter((item) => item.blogCategory.includes(category))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);

  const blogCategoryData = [...filteredBlogs].reverse();

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

  // Changes each word in a string to uppercase the first letter
  const capitalizeCategoryTitle = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <>
      <Head>
      <title>{`Blog ${category ? capitalizeCategoryTitle(category) : ""}`}</title>
      </Head>
      <div className="blog__category">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <section className="blog__category__post">
              <div className="container">
                <div className="blog__category__title">
                  <h3>Blog <span className="capitalize">{category}</span></h3>
                </div>
                <div className="blog__category__content">
                  {currentBlogs.map((blog) => {
                    return (
                      <div className="blog__category__wrapper" key={blog._id}>
                        <div className="blog__category__images">
                          <Link href={`/blog/${blog.slug}`}>
                            <img src={blog.images[0]} alt={blog.title} />
                          </Link>
                          <div className="blog__list__marker">
                            {blog.blogCategory.map((cat) => {
                              return (
                                <Link key={cat} href={`/blog/category/${cat}`}>
                                  <span></span>
                                  {cat}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div className="blog__category__information">
                          <h3>
                            <Link href={`/blog/${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h3>
                          <p>{blog.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <div className="pagination__button flex flex-center">
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
    </>
  );
}
