import { SVGIconProps } from ".";

const WhyRentCardIcon = ({
  className,
  width = 39,
  height = 38,
}: SVGIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 39 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="39" height="38" rx="8" fill="#F8F9FA" />
      <circle cx="19.5" cy="19" r="13" fill="#DFE2E6" />
      <circle cx="19.5" cy="19" r="9" fill="#C1C7CD" />
      <circle cx="19.5" cy="19" r="2" fill="#697077" />
      <path
        d="M29.5 19C29.5 24.5229 24.8637 29 19.1176 29C13.3716 29 8.73529 24.5229 8.73529 19"
        stroke="#9AA1A9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.22775 16.75C10.3277 13 14.4124 9 19.5 9"
        stroke="#9AA1A9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M27 13C27.8333 13.8333 29.3 16.2 29.5 18"
        stroke="#9AA1A9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WhyRentCardIcon; 
