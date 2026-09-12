import { IMAGES } from "./images";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "greenhouse",
    src: IMAGES.gallery.greenhouse,
    alt: "観葉植物に囲まれた明るい店内スペース",
  },
  {
    id: "window-seat",
    src: IMAGES.gallery.windowSeat,
    alt: "窓際に並んだ木製のカウンター席",
  },
  {
    id: "drink",
    src: IMAGES.gallery.drink,
    alt: "木のテーブルに置かれたアイスドリンク",
  },
  {
    id: "tables",
    src: IMAGES.gallery.tables,
    alt: "自然光が差し込むテーブル席",
  },
  {
    id: "window-detail",
    src: IMAGES.gallery.windowDetail,
    alt: "窓辺の光に照らされたカップ",
  },
  {
    id: "cake",
    src: IMAGES.gallery.cake,
    alt: "陽の光が差すケーキの一切れ",
  },
];
