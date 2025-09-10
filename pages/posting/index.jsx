import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { HiBookmark } from "react-icons/hi2";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

export default function Postings() {
  // pagnation
  const [currentPage, setCurrentPage] = useState(1); // for page 1
  const [perPage] = useState(6);

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata: allData, loading } = useFetchData("/api/postings");
  const publishData = allData.filter((posting) => posting.status === "publish");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // auto scroll ke atas
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

  const truncateText = (text, maxWords) => {
    const words = text.split(" "); // split text into word array
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "..."; // cut text and add ellipsis
    }
    return text;
  };

  // filter all data based on search query
  const filteredPostings =
    searchQuery.trim() === ""
      ? publishData
      : publishData.filter((posting) =>
          posting.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Count the total items that have been filtered
  const totalFilteredItems = filteredPostings.length;

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(totalFilteredItems / perPage);

  // calculate index of the first posting displayed on the current page
  const indexOfFirstPosting = (currentPage - 1) * perPage;
  const indexOfLastPosting = currentPage * perPage;

  // Get the current page's postings
  const currentPostings = filteredPostings.slice(
    indexOfFirstPosting,
    indexOfLastPosting
  );

  // Create an array for page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Kegiatan HIMA-RPL</title>
      </Head>
      <div className="relative py-24 md:py-24 lg:py-24 px-4 bg-gray-50 dark:bg-[#0c0c0c]">
        {loading ? (
          <Spinner />
        ) : filteredPostings.length === 0 ? (
          <h1 className="text-gray-400 text-center text-lg md:text-xl lg:text-2xl">
            Tidak ada postingan
          </h1>
        ) : (
          <div className="container mx-auto">
            <div className="px-2 py-8 md:py-12 lg:py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
              <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
                {currentPostings.map((posting) => (
                  <div
                    key={posting._id}
                    className="border dark:border-[#232222] p-3 md:p-4 rounded-lg flex flex-col h-full"
                  >
                    <Link href={`/posting/${posting.slug}`}>
                      <div className="overflow-hidden transition-shadow duration-300 bg-transparent rounded">
                        <img
                          className="object-cover w-full h-auto rounded"
                          src={posting.images[0]}
                          alt={posting.title}
                        />
                      </div>
                    </Link>
                    <div className="py-3 md:py-5 flex-grow">
                      <h3 className="mb-1 text-xs font-semibold text-[#545454] dark:text-[#838282] uppercase">
                        {formatDate(new Date(posting.createdAt))}
                      </h3>
                      <p className="mb-4 text-xs sm:text-sm text-[#545454] dark:text-[#838282] line-clamp-2 md:line-clamp-3">
                        {posting.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <HiBookmark
                          size={24}
                          className="text-[#004aad] flex-shrink-0"
                        />
                        <div className="flex flex-wrap gap-1">
                          {posting.tags.map((tag, index) => (
                            <h4
                              key={index}
                              className="font-semibold text-sm text-[#000000] dark:text-[#ffffff] mr-1"
                            >
                              {tag}
                            </h4>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {currentPostings.length === 0 ? (
        ""
      ) : (
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
      )}
    </>
  );
}
