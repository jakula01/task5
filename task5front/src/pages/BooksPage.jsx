import React, { useEffect, useState, useCallback, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Filters from "../components/FIlters";
import BooksTable from "../components/BooksTable";
import { fetchBooks } from "../services/bookService";
import { CSVLink } from "react-csv";
import BookGallery from "../components/BookGallery";
export default function BooksPage() {
  const [language, setLanguage] = useState("English (en)");
  const [viewMode, setViewMode] = useState("list");
  const [seed, setSeed] = useState("0");
  const [likes, setLikes] = useState(0);
  const [review, setReview] = useState(0);
  const [books, setBooks] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const offsetRef = useRef(0);
  const loadMoreRef = useRef();
  const loadingRef = useRef(false);
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "gallery" : "list"));
  };
  const loadBooks = useCallback(
    (amount = 20) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      const langCode = language.match(/\((.*?)\)/)?.[1];
      const offset = offsetRef.current;
      fetchBooks(seed, langCode, likes, review, amount, offset)
        .then((data) => {
          setBooks((prev) => [...prev, ...data]);
          offsetRef.current += data.length;
          setHasLoadedInitial(true);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          loadingRef.current = false;
        });
    },
    [seed, language, likes, review]
  );

  useEffect(() => {
    setBooks([]);
    offsetRef.current = 0;
    setHasLoadedInitial(false);
    loadBooks();
  }, [seed, language, likes, review, loadBooks]);

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasLoadedInitial) {
          console.log("юз 2 обсервер");
          loadBooks(10);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [loadBooks, hasLoadedInitial]);

  return (
    <div className="container py-4 ">
      <div className="d-none d-md-block sticky-top bg-white border-bottom py-3 z-3">
        <Filters
          language={language}
          setLanguage={setLanguage}
          seed={seed}
          setSeed={setSeed}
          likes={likes}
          setLikes={setLikes}
          review={review}
          setReview={setReview}
        />
        <div>
          <CSVLink
            data={books}
            filename={"books-export.csv"}
            className="btn btn-primary"
            headers={[
              { label: "ISBN", key: "isbn" },
              { label: "Title", key: "title" },
              { label: "Author", key: "author" },
              { label: "Publisher", key: "publisher" },
            ]}
          >
            Export to CSV
          </CSVLink>
          <button
            type="button"
            className="btn btn-outline-primary ms-2"
            onClick={toggleViewMode}
          >
            {viewMode === "list" ? (
              <i className="bi bi-grid-fill" style={{ fontSize: "1rem" }}></i>
            ) : (
              <i className="bi bi-list-ul" style={{ fontSize: "1rem" }}></i>
            )}
          </button>
        </div>
      </div>
      <div className="d-block d-md-none bg-white border-bottom py-3">
        <Filters
          language={language}
          setLanguage={setLanguage}
          seed={seed}
          setSeed={setSeed}
          likes={likes}
          setLikes={setLikes}
          review={review}
          setReview={setReview}
        />
        <div>
          <CSVLink
            data={books}
            filename={"books-export.csv"}
            className="btn btn-primary"
            headers={[
              { label: "ISBN", key: "isbn" },
              { label: "Title", key: "title" },
              { label: "Author", key: "author" },
              { label: "Publisher", key: "publisher" },
            ]}
          >
            Export to CSV
          </CSVLink>
          <button
            type="button"
            className="btn btn-outline-primary ms-2"
            onClick={toggleViewMode}
          >
            {viewMode === "list" ? (
              <i className="bi bi-grid-fill" style={{ fontSize: "1rem" }}></i>
            ) : (
              <i className="bi bi-list-ul" style={{ fontSize: "1rem" }}></i>
            )}
          </button>
        </div>
      </div>
      {viewMode === "list" ? (
        <BooksTable
          books={books}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ) : (
        <BookGallery
          books={books}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      )}

      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
    </div>
  );
}
