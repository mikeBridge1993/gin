import React from 'react';

export default (text, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"))
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { color: "purple", fontWeight: '800' }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    )
  }