"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
  };
}

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete book");

      setBooks(books.filter((book) => book.id !== bookId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete book");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-xl font-medium mb-4">No books found.</p>
        {session && (
          <p className="text-gray-400 text-lg">
            <a
              href="/add"
              className="text-blue-600 hover:text-blue-800 underline font-semibold transition"
            >
              Add your first book
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 pb-12">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 truncate">
              {book.title}
            </h3>

            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Author:</span> {book.author}
            </p>

            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>

            <p className="text-sm text-gray-500 mb-1 truncate">
              Added by: {book.user.name || book.user.email}
            </p>

            <p className="text-sm text-gray-400">
              {new Date(book.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {session && (
            <button
              onClick={() => handleDelete(book.id)}
              className="mt-6 self-start bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors"
              aria-label={`Delete book titled ${book.title}`}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
