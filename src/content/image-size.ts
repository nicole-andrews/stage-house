import fs from "node:fs";

export type ImageSize = {
  width: number;
  height: number;
};

export function imageSize(filePath: string): ImageSize {
  const buf = fs.readFileSync(filePath);
  const kind = filePath.toLowerCase();
  if (kind.endsWith(".png")) {
    return pngSize(buf, filePath);
  }
  if (kind.endsWith(".jpg") || kind.endsWith(".jpeg")) {
    return jpegSize(buf, filePath);
  }
  if (kind.endsWith(".webp")) {
    return webpSize(buf, filePath);
  }
  throw new Error(`Cannot read the size of ${filePath}`);
}

function pngSize(buf: Buffer, filePath: string): ImageSize {
  if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") {
    throw new Error(`Cannot read the size of ${filePath}`);
  }
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

function jpegSize(buf: Buffer, filePath: string): ImageSize {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) {
    throw new Error(`Cannot read the size of ${filePath}`);
  }

  let offset = 2;
  let width = 0;
  let height = 0;
  let orientation = 1;

  while (offset + 3 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (buf[offset] === 0xff) {
      offset += 1;
    }
    const marker = buf[offset];
    offset += 1;
    if (marker === 0xd9 || marker === 0xda) {
      break;
    }
    if (offset + 2 > buf.length) {
      break;
    }
    const length = buf.readUInt16BE(offset);
    if (marker === 0xe1) {
      orientation = exifOrientation(buf, offset + 2, length - 2) || orientation;
    }
    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isStartOfFrame && offset + 7 < buf.length) {
      height = buf.readUInt16BE(offset + 3);
      width = buf.readUInt16BE(offset + 5);
    }
    offset += length;
  }

  if (!width || !height) {
    throw new Error(`Cannot read the size of ${filePath}`);
  }
  if (orientation >= 5 && orientation <= 8) {
    return { width: height, height: width };
  }
  return { width, height };
}

function exifOrientation(buf: Buffer, start: number, length: number): number {
  if (buf.toString("ascii", start, start + 4) !== "Exif") {
    return 0;
  }
  const tiff = start + 6;
  if (tiff + 8 > start + length) {
    return 0;
  }
  const little = buf.toString("ascii", tiff, tiff + 2) === "II";
  const read16 = (offset: number) =>
    little ? buf.readUInt16LE(offset) : buf.readUInt16BE(offset);
  const read32 = (offset: number) =>
    little ? buf.readUInt32LE(offset) : buf.readUInt32BE(offset);
  if (read16(tiff + 2) !== 0x2a) {
    return 0;
  }
  const ifd = tiff + read32(tiff + 4);
  if (ifd + 2 > buf.length) {
    return 0;
  }
  const count = read16(ifd);
  for (let i = 0; i < count; i += 1) {
    const entry = ifd + 2 + i * 12;
    if (entry + 10 > buf.length) {
      return 0;
    }
    if (read16(entry) === 0x0112) {
      return read16(entry + 8);
    }
  }
  return 0;
}

function webpSize(buf: Buffer, filePath: string): ImageSize {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error(`Cannot read the size of ${filePath}`);
  }
  const format = buf.toString("ascii", 12, 16);
  if (format === "VP8X" && buf.length >= 30) {
    return {
      width: 1 + buf.readUIntLE(24, 3),
      height: 1 + buf.readUIntLE(27, 3),
    };
  }
  if (format === "VP8 " && buf.length >= 30) {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (format === "VP8L" && buf.length >= 25) {
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  throw new Error(`Cannot read the size of ${filePath}`);
}
