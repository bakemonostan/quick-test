import { SVGIconProps } from ".";

const TickCircleIcon = ({
  className,
  width = 32,
  height = 32,
}: SVGIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9992 2.00049C6.48921 2.00049 1.99921 6.49049 1.99921 12.0005C1.99921 17.5105 6.48921 22.0005 11.9992 22.0005C17.5092 22.0005 21.9992 17.5105 21.9992 12.0005C21.9992 6.49049 17.5092 2.00049 11.9992 2.00049ZM16.7792 9.70049L11.1092 15.3705C10.9692 15.5105 10.7792 15.5905 10.5792 15.5905C10.3792 15.5905 10.1892 15.5105 10.0492 15.3705L7.21921 12.5405C6.92921 12.2505 6.92921 11.7705 7.21921 11.4805C7.50921 11.1905 7.98921 11.1905 8.27921 11.4805L10.5792 13.7805L15.7192 8.64049C16.0092 8.35049 16.4892 8.35049 16.7792 8.64049C17.0692 8.93049 17.0692 9.40049 16.7792 9.70049Z"
        fill="url(#paint0_linear_3925_48565)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3925_48565"
          x1="21.9992"
          y1="21.3338"
          x2="1.99921"
          y2="21.3338"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCB4E" />
          <stop offset="1" stopColor="#AD75E2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TickCircleIcon;
