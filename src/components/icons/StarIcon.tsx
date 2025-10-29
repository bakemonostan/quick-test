import { SVGIconProps } from ".";

export default function StarIcon({ className, width = 24, height = 24 }: SVGIconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.68243 0.627686C6.30183 0.627552 5.91317 0.864355 5.68297 1.33569L4.26703 4.25082L1.03957 4.70889C0.00163579 4.85329 -0.334631 5.87156 0.414902 6.60356L2.74697 8.87356L2.20563 12.0596C2.02737 13.0909 2.88277 13.7142 3.80897 13.2256C4.16684 13.0362 6.0069 12.0829 6.68243 11.7262L9.5559 13.2256C10.4832 13.7142 11.3412 13.0916 11.1592 12.0596L10.597 8.87356L12.9292 6.60356C13.6822 5.87422 13.3633 4.85622 12.3253 4.70889L9.07703 4.25082L7.6819 1.33569C7.45203 0.864155 7.06303 0.627886 6.68243 0.627686Z"
        fill="url(#paint0_linear_4304_1882)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4304_1882"
          x1="13.3427"
          y1="12.9695"
          x2="0.00939901"
          y2="12.9695"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCB4E" />
          <stop offset="1" stopColor="#AD75E2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
