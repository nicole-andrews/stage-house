import pagePhotos from "@/content/page-photos.json";

export const MAIN_PAGE = pagePhotos.MAIN_PAGE;
export const ABOUT_US = pagePhotos.ABOUT_US;
export const SERVICES = pagePhotos.SERVICES;

export type PagePhotoSlot = {
  file: string;
  alt: string;
  width: number;
  height: number;
  location: string;
};

export function placedPhoto(slot: PagePhotoSlot) {
  return {
    src: `/photos/${slot.file}`,
    alt: slot.alt,
    width: slot.width,
    height: slot.height,
  };
}
