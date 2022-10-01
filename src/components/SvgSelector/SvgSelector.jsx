import React from "react";

const SvgSelector = ({ id, className, style }) => {
  const svgMap = {
    arrow: (
      <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 233 250"
      >
        <rect x="99.5" width="35" height="250" rx="17.5" />
        <rect
          x="-2.32"
          y="34.54"
          width="154.65"
          height="34.92"
          rx="17.46"
          transform="translate(-24.76 52.42) rotate(-35)"
        />
        <rect
          x="157.54"
          y="-25.32"
          width="34.92"
          height="154.65"
          rx="17.46"
          transform="translate(23.53 165.53) rotate(-55)"
        />
      </svg>
    ),
    placeholder: (
      <svg className={className} style={style} viewBox="0 0 249.99 199.99">
        <g stroke="#000">
          <rect
            x="9"
            y="9"
            width="232"
            height="182"
            rx="17.99"
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="17.99"
          />
          <polygon points="35 165 35 140.64 75.47 100.17 95.64 120.35 161 55 214.5 108.5 214.5 165 35 165" />
          <path
            d="M83,84c-.54,31.55-47.47,31.54-48,0C35.54,52.45,82.47,52.46,83,84Z"
            transform="translate(0 -25)"
          />
        </g>
      </svg>
    ),
    menu: (
      <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 250"
      >
        <circle cx="30" cy="125" r="30" />
        <circle cx="30" cy="30" r="30" />
        <circle cx="30" cy="220" r="30" />
      </svg>
    ),
    filter: (
      <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 250 210"
      >
        <rect width="250" height="40" />
        <rect x="44" y="85" width="162" height="40" />
        <rect x="97.5" y="170" width="55" height="40" />
      </svg>
    ),
    reset: (
      <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 250 250"
      >
        <rect
          x="-31.72"
          y="104.95"
          width="313.45"
          height="40.1"
          transform="translate(-51.78 125) rotate(-45)"
        />
        <rect
          x="104.95"
          y="-31.72"
          width="40.1"
          height="313.45"
          transform="translate(-51.78 125) rotate(-45)"
        />
      </svg>
    ),
    checkmark: (
      <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 356 250"
      >
        <rect
          x="118.28"
          y="105.07"
          width="313.45"
          height="40.1"
          transform="translate(-51.23 230.98) rotate(-45)"
        />
        <rect
          x="104.95"
          y="73.02"
          width="40.1"
          height="190.96"
          transform="translate(-125.84 137.62) rotate(-45)"
        />
      </svg>
    ),
    preloader: (
      <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="auto"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    ),
  };

  if (!svgMap.hasOwnProperty(id)) {
    console.warn(`Svg with id "${id}" doesn't exist`);
    return svgMap.placeholder;
  }

  return svgMap[id];
};

export default React.memo(SvgSelector);
