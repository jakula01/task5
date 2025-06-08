import React from "react";

export default function BookRow({ book, isExpanded, onToggle }) {
  return (
    <>
      <tr
        className={isExpanded ? "table-primary" : ""}
        onClick={onToggle}
        style={{ cursor: "pointer" }}
      >
        <td className="custom-td-padding">{book.id}</td>
        <td className="custom-td-padding">{book.isbn}</td>
        <td className="custom-td-padding">{book.title}</td>
        <td className="custom-td-padding">{book.author}</td>
        <td className="custom-td-padding">{book.publisher}</td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={5}>
            <div className="d-flex gap-4 p-3 border rounded bg-light">
              <div style={{ minWidth: "150px" }}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="img-thumbnail"
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="text-muted small mt-2">
                  <i className="bi bi-hand-thumbs-up me-1"></i> {book.likes}
                  <span className="ms-3">
                    <i className="bi bi-chat-text me-1"></i>{" "}
                    {book.reviews.length}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="mb-1">
                  {book.title}{" "}
                  <small className="text-muted">{book.format}</small>
                </h5>
                <p className="mb-1">
                  <strong>by {book.author}</strong>
                </p>
                <p className="mb-2">{book.publisher}</p>
                <h6 className="text-muted">Reviews</h6>
                {book.reviews.length > 0 ? (
                  book.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="mb-3"
                      style={{
                        maxWidth: "600px",
                        fontSize: "0.875rem",
                        lineHeight: "1.4",
                        wordBreak: "break-word",
                      }}
                    >
                      <p className="mb-1">{r.text}</p>
                      <span className="blockquote-footer">{r.author}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted fst-italic">No reviews yet.</p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
