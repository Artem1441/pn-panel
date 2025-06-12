import NextImage from "next/image";
import { FC, JSX, memo } from "react";

// import Image as NextImage from "next/image";

interface IProps {
  src: string | null;
  alt?: string | null;
  width?: number;
  height?: number;
  expandable?: boolean;
}

const Image: FC<IProps> = memo(
  ({ src, alt, width, height, expandable }): JSX.Element => {
    if (src) {
      if (width && height) {
        return (
          <NextImage src={src} alt={alt || ""} width={width} height={height} />
        );
      }
      return (
        <img
          src={src}
          alt={alt || ""}
          width={width ? width : undefined}
          height={height ? height : undefined}
        />
      );
    }
    return <></>;
  }
);

export default Image;
