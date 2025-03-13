import { useRef, useState, useEffect, type ReactNode, type FC } from "react";

interface PathData {
  d: string;
  type: "main" | "branch";
  index?: number;
}

interface JoinedBulletListProps {
  children: ReactNode[];
}

export const JoinedBulletList: FC<JoinedBulletListProps> = ({ children }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const bulletRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<{
    main: PathData[];
    branches: PathData[];
  }>({ main: [], branches: [] });
  const [svgHeight, setSvgHeight] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!svgRef.current || !bulletRefs.current.length) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const radius = 5.5; // Half of SVG width for proper curvature
    const newPaths: { main: PathData[]; branches: PathData[] } = {
      main: [],
      branches: [],
    };

    const positions = bulletRefs.current.map((bulletEl) => {
      if (!bulletEl) return 0;
      const rect = bulletEl.getBoundingClientRect();
      return rect.top - svgRect.top + rect.height / 2;
    });

    const lastY = positions[positions.length - 1];
    setSvgHeight(lastY + radius);

    // Main vertical line segments
    for (let i = 0; i < children.length; i++) {
      const startY = i === 0 ? 0 : positions[i - 1] - radius;
      const endY = positions[i] - radius;
      newPaths.main.push({
        d: `M 0 ${startY} L 0 ${endY}`,
        type: "main",
        index: i,
      });
    }

    // Branch paths
    positions.forEach((y, index) => {
      newPaths.branches.push({
        d: `M 0 ${y - radius} Q 0 ${y} ${radius} ${y} H 11`,
        type: "branch",
        index: index,
      });
    });

    setPaths(newPaths);
  }, [children.length]);

  return (
    <div className="relative w-full">
      <div className="relative flex w-full gap-2">
        <svg
          ref={svgRef}
          className="absolute overflow-visible left-0 top-0"
          width="12"
          height={svgHeight}
        >
          {/* Non-hovered branches */}
          {paths.branches.map(
            (path, index) =>
              hoveredIndex !== path.index && (
                <path
                  key={`branch-${index}`}
                  d={path.d}
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-branch"
                />
              )
          )}

          {/* Main line */}
          {paths.main.map((path, index) => (
            <path
              key={`main-${index}`}
              d={path.d}
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-75 ${
                hoveredIndex !== null && index <= hoveredIndex
                  ? "stroke-branch-active"
                  : "stroke-branch transition-all"
              }`}
            />
          ))}

          {/* Hovered branch */}
          {hoveredIndex !== null && (
            <path
              key={`hovered-branch`}
              d={paths.branches[hoveredIndex]?.d}
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-branch-active transition-all duration-75"
            />
          )}
        </svg>

        <div className="relative ml-1 w-full flex flex-col pl-[11px]">
          {children.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                bulletRefs.current[index] = el;
              }}
              className="relative text-nowrap w-full flex items-center space-x-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
