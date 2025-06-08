import React from "react";
import BookGalleryElement from "./BookGalleryEllement";

export default function BookGallery({ books, expanded, setExpanded }) {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {books.map((book, i) => (
        <div key={book.id}>
          <BookGalleryElement
            book={book}
            isExpanded={expanded === book.id}
            onToggle={() => setExpanded(expanded === book.id ? null : book.id)}
          />
        </div>
      ))}
    </div>
  );
}
