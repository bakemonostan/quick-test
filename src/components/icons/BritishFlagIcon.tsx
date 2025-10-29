import { SVGIconProps } from ".";

const BritishFlagIcon = ({
  className,
  width = 24,
  height = 24,
}: SVGIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H24V24H0V0Z" fill="#012169" />
      <path d="M24 0V3L15 12L24 21V24H21L12 15L3 24H0V21L9 12L0 3V0H3L12 9L21 0H24Z" fill="white" />
      <path d="M8 15L3 19V24H6L16 14H24V10L14 0H10V10L0 0V4L8 12V15Z" fill="#C8102E" />
    </svg>
  );
};

export default BritishFlagIcon; 
