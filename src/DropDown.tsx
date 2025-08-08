import React, { useState, useEffect, useRef } from 'react';
import { Person } from './types/Person';

interface Props {
  people: Person[];
  setParam: (value: string) => void;
  setSelectedUser: (value: Person | null) => void;
  setContorovanyi: (value: string) => void;
  contorovanyi: string;
}

export const DropDown: React.FC<Props> = React.memo(function Dropdown({
  people,
  setParam,
  setSelectedUser,
  setContorovanyi,
  contorovanyi,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function reset() {
    setSelectedUser(null);
    setContorovanyi('');
  }

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown ${isOpen ? 'is-active' : ''}`} ref={dropdownRef}>
      <div className="dropdown-trigger">
        <input
          type="text"
          placeholder="Enter a part of the name"
          value={contorovanyi}
          className="input"
          data-cy="search-input"
          onFocus={() => {
            reset();
            setIsOpen(x => !x);
          }}
          onChange={e => {
            setParam(e.target.value);
            setContorovanyi(e.target.value);
          }}
        />
      </div>

      <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
        <div className="dropdown-content">
          {people.map(person => (
            <div
              className="dropdown-item"
              data-cy="suggestion-item"
              key={person.name}
              onClick={() => {
                setSelectedUser(person);
                setIsOpen(x => !x);
                setContorovanyi(person.name);
              }}
            >
              <p className="has-text-link">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
