const { src, dest } = require("gulp");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageResize = require("gulp-image-resize");
const rename = require("gulp-rename");

const images = () => {
  const sizes = [{ width: 640, quality: 30, suffix: "large" }];
  let stream;
  sizes.forEach((size) => {
    stream = src("./../exercise/images/*jpg")
      .pipe(imageResize({ width: size.width }))
      .pipe(rename((path) => (path.basename += `-${size.suffix}`)))
      .pipe(
        imagemin(
          [
            imageminMozjpeg({
              quality: size.quality,
            }),
          ],
          { verbose: true }
        )
      )
      .pipe(dest("dist"));
  });
  return stream;
};

exports.images = images;
exports.default = images;
