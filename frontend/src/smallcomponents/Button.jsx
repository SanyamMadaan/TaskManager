import React from 'react';

export function Button(props) {
  return (
    <div className="bg-black text-white p-2 rounded text-center cursor-pointer mb-2 md:mb-0 md:ml-2">
      <button type="submit">{props.redirect}</button>
    </div>
  );
}
