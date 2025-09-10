import Link from "next/link";
import React from "react";
import { FaArrowTurnDown, FaInstagram } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-50 dark:bg-[#0c0c0c] py-4 text-gray-400 border-t-[1px] border-t-[#dbdbdb] dark:border-t-[#232222]">
        <div className="container px-4 pt-10 pb-10 mx-auto">
          <div className="-mx-4 flex items-center flex-wrap justify-between">
            <div className="px-4 my-4 w-full xl:w-1/4">
              <Link href="/" className="flex items-center w-auto mb-6">
                <img
                  src="/img/logo-himarpl.png"
                  alt="HIMA-RPL Logo"
                  className="w-20 h-20"
                />
                <h3 className="text-3xl font-bold font-fugazone text-black dark:text-white">
                  HIMA-RPL
                </h3>
              </Link>
              <div className="mt-2">
                <div className="mt-2">
                  <Link href="https://polindra.ac.id/" target="_blank">
                    <div className="mb-4">
                      <div className="flex items-center pl-2">
                        <div className="mr-4">
                          <img
                            src="/img/logo-polindra.png"
                            alt="Politeknik Negeri Indramayu Logo"
                            className="w-16 h-16"
                          />
                        </div>
                        <div className="py-1 text-white">
                          <div className="bg-[#004aad] py-1 px-2 rounded-l-[0.200rem] rounded-r-xl text-sm">
                            Politeknik Negeri
                          </div>
                          <div className="text-[#004aad] py-1 px-2">
                            Indramayu
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://permikomnas.or.id/" target="_blank">
                    <div>
                      <div className="flex items-center pl-0">
                        <div className="mr-0">
                          <img
                            src="/img/logo-permikomnas.png"
                            alt="PERMIKOMNAS Logo"
                            className="w-[5rem] h-[5rem]"
                          />
                        </div>
                        <div className="py-1">
                          <div className="px-2 text-xl italic underline font-bold text-[#004aad]">
                            PERMIKOMNAS
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 text-[#545454] dark:text-[#838282] border-[#004aad]">
                  Konten
                </h2>
              </div>
              <ul className="leading-8">
                <li>
                  <Link
                    href="#"
                    className="text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    Mengenal HIMA-RPL
                  </Link>
                </li>
                <li>
                  <Link
                    href="/information"
                    className="text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    Informasi Terbaru
                  </Link>
                </li>
                <li>
                  <Link
                    href="/posting"
                    className="text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    Acara dan Kegiatan
                  </Link>
                </li>
              </ul>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 text-[#545454] dark:text-[#838282] border-[#004aad]">
                  Blog
                </h2>
              </div>
              <ul className="leading-8">
                <li>
                  <Link
                    href="/blog/category/tutorial"
                    target="_blank"
                    className="text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    Tutorial
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/pengetahuan umum"
                    target="_blank"
                    className="text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    Pengetahuan Umum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/karya pengurus"
                    target="_blank"
                    className="text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    Karya Pengurus
                  </Link>
                </li>
              </ul>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 text-[#545454] dark:text-[#838282] border-[#004aad]">
                  Hubungi Kami
                </h2>
              </div>
              <ul className="leading-8">
                <li>
                  <Link
                    href="https://www.instagram.com/official_himarpl"
                    target="_blank"
                    className="flex gap-1 text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    <FaInstagram className="w-6 h-6" />
                    <span>@official_himarpl</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:himarpl@polindra.ac.id"
                    className="flex gap-1 text-[#545454] dark:text-[#838282] hover:text-[#004aad] dark:hover:text-[#004aad]"
                  >
                    <HiOutlineMail className="w-6 h-6" />
                    <span>himarpl@polindra.ac.id</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#004aad] py-4 text-white">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Copyright © 2025 HIMA-RPL POLINDRA. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
