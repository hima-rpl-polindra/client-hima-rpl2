import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import information from "../information";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export default function Informations() {
  // pagnation
  const [currentPage, setCurrentPage] = useState(1); // for page 1
  const [perPage] = useState(6);

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata: allData, loading } = useFetchData("/api/informations");
  const publishData = allData.filter(
    (information) => information.status === "publish"
  );

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const createdAtDate =
    allData && allData[0]?.createdAt
      ? new Date(allData && allData[0]?.createdAt)
      : null;

  // filter all data based on search query
  const filteredInformations =
    searchQuery.trim() === ""
      ? publishData
      : publishData.filter((information) =>
          information.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Count the total items that have been filtered
  const totalFilteredItems = filteredInformations.length;

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(totalFilteredItems / perPage);

  // calculate index of the first information displayed on the current page
  const indexOfFirstInformation = (currentPage - 1) * perPage;
  const indexOfLastInformation = currentPage * perPage;

  // Get the current page's informations
  const currentInformations = filteredInformations.slice(
    indexOfFirstInformation,
    indexOfLastInformation
  );

  // Create an array for page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
        <title>Informasi HIMA-RPL</title>
      </Head>
      <div className="information__page">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="place__information">
              <div className="container">
                <div className="information__cards">
                  {currentInformations.map((information) => {
                    return (
                      <Link
                        href={`/information/${information.slug}`}
                        key={information._id}
                        className="information__card__contents"
                      >
                        <div className="information__card__image">
                          <img
                            src={information.images[0]}
                            alt={information.title}
                          />
                        </div>
                        <div className="information__card__title">
                          <h2>{information.title}</h2>
                          <div className="information__tags">
                            {information.tags.map((tag) => {
                              return <span key={tag}>{tag}</span>;
                            })}
                          </div>
                          <p>{formatDate(new Date(information.createdAt))}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
        {currentInformations.length === 0 ? (
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
      </div>
    </>
  );
}
