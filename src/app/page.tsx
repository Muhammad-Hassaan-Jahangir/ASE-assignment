import { Navigation } from "@/components/Navigation";
import { BookList } from "@/components/BookList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Welcome to Book Catalog
            </h1>
            <BookList />
          </div>
        </div>
      </main>
    </div>
  );
}
