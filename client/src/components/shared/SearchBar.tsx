import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
      />
      <button
        type="submit"
        className="absolute right-3 top-2.5 text-gray-500"
        aria-label="Pesquisar"
      >
        <FaSearch />
      </button>
    </form>
  );
}
