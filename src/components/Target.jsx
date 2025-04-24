import React from 'react';
import '../styles/Target.css';

export default function Target({ id, top, left, onDestroy }) {
  return (
    <div
      className="target"
      style={{ top: `${top}%`, left: `${left}%` }}
      onClick={(e) => {
        e.stopPropagation();
        onDestroy(id);
      }}
    >
      🧱
    </div>
  );
}
