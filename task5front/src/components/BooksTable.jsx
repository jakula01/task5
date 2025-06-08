import React from "react";
import BookRow from "./BookRow";

export default function BooksTable({
  books,
  expanded,
  setExpanded,
  viewMode,
  lastBookRef,
}) {
  if (viewMode === "gallery") {
    return (
      <div className="row g-4">
        {books.map((book, i) => (
          <BookRow key={book.id} book={book} viewMode="gallery" />
        ))}
      </div>
    );
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Publisher</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => (
          <BookRow
            key={book.id}
            book={book}
            isExpanded={expanded === book.id}
            onToggle={() => setExpanded(expanded === book.id ? null : book.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
