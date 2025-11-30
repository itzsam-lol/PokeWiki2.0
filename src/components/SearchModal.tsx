import React, { useState } from 'react';
import './SearchModal.css';

interface SearchModalProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.toLowerCase().trim());
    }
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Search Pokemon</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Pokemon ID or name..."
            autoFocus
          />
          <div className="modal-buttons">
            <button type="submit" className="search-btn">Search</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
