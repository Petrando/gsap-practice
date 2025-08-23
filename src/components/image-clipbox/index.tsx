import { FC, RefObject } from "react";
import ImageClipHorizontal from "./ImageClipHorizontal";
import ImageClipVertical from "./ImageClipVertical";
import ImageClipDiagonalLTopToRBottom from "./ImageClipDiagonalLTopToRBottom";
import ImageClipDiagonalLBottomToRTop from "./ImageClipDiagonalLBottomToRTop";

interface IImageClipBox {
  parentRef: RefObject<HTMLDivElement | HTMLSpanElement>;
  src: string;
  clipClass?: string;
  slices?: number;
  direction?: "horizontal" | "vertical" | "diagonal-ltr" | "diagonal-rtl";
}

const ImageClipBox: FC<IImageClipBox> = ({
  parentRef,
  src,
  clipClass = "",
  slices = 8,
  direction = "horizontal",
}) => {
  switch (direction) {
    case "vertical":
      return <ImageClipVertical {...{ parentRef, src, clipClass, slices }} />;
    case "diagonal-ltr":
      return <ImageClipDiagonalLTopToRBottom {...{ parentRef, src, clipClass, slices }} />;
    case "diagonal-rtl":
      return <ImageClipDiagonalLBottomToRTop {...{ parentRef, src, clipClass, slices }} />;
    case "horizontal":
    default:
      return <ImageClipHorizontal {...{ parentRef, src, clipClass, slices }} />;
  }
};

export default ImageClipBox;
