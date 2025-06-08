import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
export default function BookGalleryElement({ book, onToggle, isExpanded }) {
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
    onToggle();
  };
  return (
    <div
      className={`card shadow-sm ${isExpanded ? "border-primary" : ""}`}
      style={{ cursor: "pointer", width: "220px" }}
      onClick={handleToggleModal}
    >
      <img
        src={book.image}
        className="card-img-top"
        alt={book.title}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body p-2">
        <h6 className="card-title text-truncate mb-1">Title: {book.title}</h6>
        <p className="card-text text-muted small mb-1">Author: {book.author}</p>
        <p className="card-text text-muted small mb-1">
          Publisher: {book.publisher}
        </p>
        <div className="text-muted small d-flex justify-content-between">
          <span>
            <i className="bi bi-hand-thumbs-up me-1" />
            {book.likes}
          </span>
          <span>
            <span>{book.format} </span>
            <i className="bi bi-chat-text me-1" />
            {book.reviews.length}
          </span>
        </div>
      </div>
      <Modal show={showModal} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Reviews for "{book.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {book.reviews.length > 0 ? (
            book.reviews.map((r, i) => (
              <div key={i} className="mb-3">
                <p>{r.text}</p>
                <footer className="blockquote-footer">{r.author}</footer>
                <hr />
              </div>
            ))
          ) : (
            <p className="text-muted fst-italic">No reviews yet.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
