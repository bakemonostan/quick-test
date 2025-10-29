import { SVGIconProps } from ".";

const DutchFlagIcon = ({
  className,
  width = 24,
  height = 24,
}: SVGIconProps) => {
  return (
    <svg 
      className={className} 
      width={width} 
      height={height} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="8" fill="#AE1C28" />
      <rect y="8" width="24" height="8" fill="white" />
      <rect y="16" width="24" height="8" fill="#21468B" />
    </svg>
  );
};

export default DutchFlagIcon; 
