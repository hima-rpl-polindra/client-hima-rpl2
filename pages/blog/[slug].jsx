import { RiFacebookFill, RiWhatsappFill } from "react-icons/ri";
import { BsCopy } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import useFetchData from "@/hooks/useFetchData";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import Blogsearch from "@/components/BlogSearch";
import { MdDateRange } from "react-icons/md";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

const BlogPage = () => {
  const router = useRouter("");
  const { slug } = router.query;

  // hook for all data fetching
  const { alldata: allData } = useFetchData("/api/blogs");

  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  };
  const handleSearchClose = () => {
    setSearchInput(false);
  };

  const [blogData, setBlogData] = useState({ blog: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch blog data. please try again later.");
          setLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [slug]); // fetch data whenever slug changes

  const createdAtDate =
    blogData && blogData.blog.createdAt
      ? new Date(blogData.blog.createdAt)
      : null;

  const formatDate = (date) => {
    if (!date || isNaN(date)) {
      return "";
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  const blogUrl = `https://himarpl-polindra.com/blog/${slug}`;

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const messageWhatsapp = `Hi! Marpels 🌟
Kini hadir konten menarik seputar ${
    allData && allData.length > 0 ? allData[0].title : "Tren Teknologi"
  }.
Yuk, baca selengkapnya!

${blogUrl}`;

  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [isCodeCopied, setCodeCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCodeCopied(true);
      setTimeout(() => {
        setCodeCopied(false);
      }, 3000);
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              backgroundColor: "#545454",
              color: "#ffffff",
              padding: "10px",
            }}
          >
            {isCodeCopied ? <LuCopyCheck /> : <LuCopy />}
          </button>
        </div>
      );
    } else {
      return (
        // Menggunakan Tailwind ⬇
        <code
          className="p-1 bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-gray-100 border dark:border-zinc-900 rounded-md"
          {...props}
        >
          {children}
        </code>
      );
    }
  };

  return (
    <>
      <Head>
        <title>{blogData?.blog?.title ?? "Blog Page"}</title>
        <meta property="og:title" content={blogData?.title ?? "Blog Page"} />
        <meta name="description" content={blogData.blog.description} />
        <meta property="og:title" content={blogData.blog.title} />
        <meta
          property="og:url"
          content={`https://himarpl-polindra.com/blog/${slug}`}
        />
        <meta
          property="og:image"
          content={
            blogData?.blog?.images?.length > 0
              ? blogData.blog.images[0]
              : "https://himarpl-polindra.com/img/og-image.png"
          }
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="blog__slug__page">
        {loading ? (
          <Spinner />
        ) : blogData && blogData.blog ? (
          <div className="container">
            <div className="blog__slug__page__content">
              <div className="left__site__details">
                <div className="left__blog__infoimg">
                  <img
                    src={
                      (blogData.blog.images && blogData.blog.images[0]) ||
                      "/img/noimage.png"
                    }
                    alt={(blogData.blog && blogData.blog.title) || "Blog Post"}
                  />
                </div>
                <div className="slug__blog__info">
                  <div className="flex gap-2">
                    <div className="slug__information">
                      <img src="/img/logo-himarpl.png" alt="" />
                      <span>HIMA-RPL</span>
                    </div>
                    <div className="slug__information">
                      <MdDateRange />
                      <span>{formatDate(createdAtDate)}</span>
                    </div>
                  </div>
                  <div className="share__blog__slug">
                    <div
                      title="Copy URL"
                      onClick={() => handleCopyUrl(blogUrl)}
                      style={{ cursor: "pointer" }}
                    >
                      <BsCopy /> <span>{copied ? "Disalin" : ""}</span>
                    </div>
                    <a
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        blogUrl
                      )}`}
                      rel="noopener noreferrer"
                    >
                      <RiFacebookFill />
                    </a>
                    <a
                      target="_blank"
                      href={`https://wa.me/?text=${encodeURIComponent(
                        messageWhatsapp
                      )}`}
                      rel="noopener noreferrer"
                    >
                      <RiWhatsappFill />
                    </a>
                  </div>
                </div>
                <div className="blog__content">
                  <h2>{blogData.blog.title}</h2>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: Code,
                      img: ({ src, alt }) => (
                        <img
                          src={src}
                          alt={alt}
                          className="my-4 w-full max-w-sm mx-auto"
                        />
                      ),
                    }}
                  >
                    {blogData.blog.description}
                  </ReactMarkdown>
                </div>
                <div className="blog__slug__tags">
                  <div className="blog__tags">
                    <div className="flex flex-wrap gap-1">
                      {blogData.blog.tags &&
                        blogData.blog.tags.map((tags) => {
                          return <span key={tags}>{tags}</span>;
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="right__site__details">
                <div className="right__slug__searchbar">
                  <input
                    onClick={handleSearchOpen}
                    type="text"
                    readOnly
                    placeholder="Cari"
                  />
                  <button>
                    <FiSearch />
                  </button>
                </div>
                <div className="right__slug__category">
                  <h2>KATEGORI</h2>
                  <ul className="category__list">
                    <li className="category__item">
                      <Link
                        href="/blog/category/tutorial"
                        className="category__link"
                      >
                        <div className="category__content">
                          <span className="category__name">Tutorial</span>
                          <span className="category__count">
                            (
                            {allData &&
                              allData.filter(
                                (ab) =>
                                  ab.blogCategory &&
                                  ab.blogCategory[0] === "tutorial" &&
                                  ab.status === "publish"
                              ).length}
                            )
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="category__item">
                      <Link
                        href="/blog/category/pengetahuan umum"
                        className="category__link"
                      >
                        <div className="category__content">
                          <span className="category__name">
                            Pengetahuan Umum
                          </span>
                          <span className="category__count">
                            (
                            {allData &&
                              allData.filter(
                                (ab) =>
                                  ab.blogCategory &&
                                  ab.blogCategory[0] === "pengetahuan umum" &&
                                  ab.status === "publish"
                              ).length}
                            )
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="category__item">
                      <Link
                        href="/blog/category/karya pengurus"
                        className="category__link"
                      >
                        <div className="category__content">
                          <span className="category__name">Karya Pengurus</span>
                          <span className="category__count">
                            (
                            {allData &&
                              allData.filter(
                                (ab) =>
                                  ab.blogCategory &&
                                  ab.blogCategory[0] === "karya pengurus" &&
                                  ab.status === "publish"
                              ).length}
                            )
                          </span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="right__recent__blog">
                  <h2>POSTINGAN TERBARU</h2>
                  {allData &&
                    allData.slice(0, 3).map((blog) => (
                      <Link
                        key={blog._id}
                        href={`/blog/${blog.slug}`}
                        className="right__recent__blog__content"
                      >
                        <div className="right__blog__image__container">
                          <img
                            src={
                              (blog.images && blog.images[0]) ||
                              "/img/noimage.png"
                            }
                            alt={blog.title}
                          />
                        </div>
                        <div className="right__blog__content__info">
                          <h3>{blog.title}</h3>
                          <h4 className="right__blog__slug__tags">
                            {blog.tags &&
                              blog.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                          </h4>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
      </div>
    </>
  );
};

export default BlogPage;
