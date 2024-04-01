import React from 'react';

export function Button(props) {
  return (
    <div className="bg-black text-white p-1.5 rounded text-center cursor-pointer mb-2 ">
      <button type="submit">{props.redirect}</button>
    </div>
  );
}
