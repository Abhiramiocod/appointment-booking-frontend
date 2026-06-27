import React from "react";

interface IconProps {
  name: string;
  fill?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Icon = ({
  name,
  fill = 0,
  className = "",
  style = {},
}: IconProps) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        ...style,
      }}
    >
      {name}
    </span>
  );
};

export default Icon;