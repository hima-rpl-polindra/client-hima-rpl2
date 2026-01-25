import { useState, useEffect } from "react";
import alumniData from "../../src/dataMaster/data.json";

export default function MasterDataAlumni() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredData = alumniData.filter(
    (alumni) =>
      alumni.nama_alumni.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (index) => {
    const colors = [
      "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-neutral-700",
      "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-neutral-700",
      "bg-green-100 text-green-600 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-neutral-700",
      "bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-neutral-700",
      "bg-red-100 text-red-600 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-neutral-700",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-neutral-100 font-sans py-10 px-4 sm:px-6 lg:px-8 mt-20 md:mt-24 transition-colors duration-300">
      <div className="text-center mb-10">
        <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
          Master Data Alumni
        </h2>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Daftar Alumni Rekayasa Perangkat Lunak
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-neutral-400">
          Telusuri jejak karir dan pencapaian lulusan kami.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-neutral-700 rounded-lg leading-5 bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-100 placeholder-gray-500 dark:placeholder-neutral-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors"
            placeholder="Cari nama alumni atau perusahaan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section euy */}
      <div className="bg-white dark:bg-neutral-900 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
            <thead className="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider w-64 text-center"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider"
                >
                  Nama Alumni
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider"
                >
                  Perusahaan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-800">
              {currentItems.length > 0 ? (
                currentItems.map((alumni, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-400 text-center font-mono">
                      {indexOfFirstItem + idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border ${getAvatarColor(
                              indexOfFirstItem + idx,
                            )}`}
                          >
                            {getInitials(alumni.nama_alumni)}
                          </div>
                        </div>
                        <div className="ml-4 text-left">
                          <div className="text-sm font-medium text-gray-900 dark:text-neutral-100">
                            {alumni.nama_alumni}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-neutral-500">
                            Alumni Terdaftar
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-gray-400 dark:text-neutral-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-neutral-300">
                          {alumni.perusahaan}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-10 text-center text-gray-500 dark:text-neutral-400 italic"
                  >
                    Data tidak ditemukan untuk pencarian "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 dark:bg-neutral-800 px-4 py-3 border-t border-gray-200 dark:border-neutral-800 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700 dark:text-neutral-400">
            Menampilkan{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {filteredData.length > 0 ? indexOfFirstItem + 1 : 0}
            </span>{" "}
            sampai{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {Math.min(indexOfLastItem, filteredData.length)}
            </span>{" "}
            dari{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {filteredData.length}
            </span>{" "}
            data
          </p>

          {filteredData.length > itemsPerPage && (
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium border ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-600 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                } transition-colors`}
              >
                Prev
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium border ${
                      currentPage === i + 1
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    } transition-colors`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md text-sm font-medium border ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-600 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                } transition-colors`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
