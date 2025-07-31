// @ts-ignore
import imageZoomScript from "./scripts/imagezoom.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ImageZoom: QuartzComponent = ({ }: QuartzComponentProps) => {
  return null
}

ImageZoom.afterDOMLoaded = imageZoomScript

export default (() => ImageZoom) satisfies QuartzComponentConstructor