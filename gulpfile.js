const { src, dest } = require("gulp");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageResize = require("gulp-image-resize");
const rename = require("gulp-rename");

const images = () => {
  const sizes = [
    { width: 1600, quality: 30, suffix: "large" },
    { width: 1200, quality: 30, suffix: "medium" },
    { width: 800, quality: 30, suffix: "small" },
    { width: 600, quality: 30, suffix: "extra_small" },
  ];
  let stream;
  sizes.forEach((size) => {
    stream = src("images_src/*.jpg")
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
