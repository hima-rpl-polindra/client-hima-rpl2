import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const extractFirstParagraph = (markdown) => {
  // Split markdown by double newline to separate paragraphs
  const paragraphs = markdown.split("\n\n");

  // Return the first paragraph (assuming paragraphs[0] is the first paragraph)
  return paragraphs[0];
};

export default function Blogsearch(props) {
  const { alldata: allData = [], loading } = useFetchData("/api/blogs"); // Assuming useFetchData returns an object with allwork and loading

  const [searchResult, setSearchResult] = useState(null);
  const [blogTitle, setBlogtitle] = useState(""); // blogtitle should be initialized as a string

  // filter for published blogs required
  const publishedData = allData.filter((ab) => ab.status === "publish");

  // Function to handle search
  useEffect(() => {
    if (!blogTitle.trim()) {
      // Here, blogtitle should be checked if it's an empty string
      setSearchResult([]);
      return;
    }

    const filteredblogs = publishedData.filter((blog) =>
      blog.title.toLowerCase().includes(blogTitle.toLowerCase()),
    );

    setSearchResult(filteredblogs); // setSearchResult should be used to update searchResult state
  }, [blogTitle, allData]); // Include allwork in dependencies to ensure useEffect updates when data changes

  const handleBlogClick = () => {
    setBlogtitle(""); // This clears the input field when a blog is clicked
  };

  if (loading) return <p>Loading..</p>; // Optionaly handle the loading state

  return (
    <>
      <div className="search__blog">
        <div className="search__blog__section">
          <div className="search__input flex gap-1">
            <input
              type="text"
              placeholder="Cari Blog"
              value={blogTitle}
              onChange={(e) => setBlogtitle(e.target.value)}
            />
            <div className="search__input__close" onClick={props.cls}>
              <IoClose />
            </div>
          </div>
          <div className="search__list mt-2">
            {blogTitle && (
              <>
                {searchResult.length === 0 ? (
                  <h3>
                    Tidak ada blog <span>(periksa kembali)</span>
                  </h3>
                ) : (
                  <>
                    {searchResult.slice(0, 10).map((blog) => {
                      return (
                        <Link
                          href={`/blog/${blog.slug}`}
                          key={blog._id}
                          className="search__results"
                          onClick={props.cls}
                        >
                          <h2>{blog.title}</h2>
                          <p>{extractFirstParagraph(blog.description)}</p>
                        </Link>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
