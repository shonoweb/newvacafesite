import { IMAGES } from "./images";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "wide-interior",
    src: IMAGES.gallery.wideInterior,
    alt: "カウンターと客席が見えるNEWVA CAFEの店内全景",
  },
  {
    id: "seating",
    src: IMAGES.gallery.seating,
    alt: "木製テーブルと暖色照明のある客席",
  },
  {
    id: "drink",
    src: IMAGES.gallery.drink,
    alt: "観葉植物のそばの木製テーブルに置かれたカフェラテ",
  },
  {
    id: "counter",
    src: IMAGES.gallery.counter,
    alt: "観葉植物と照明のあるカウンター周辺",
  },
  {
    id: "detail",
    src: IMAGES.gallery.detail,
    alt: "植物と照明が並ぶ店内のディテール",
  },
  {
    id: "cake",
    src: IMAGES.gallery.cake,
    alt: "店内の木製テーブルに置かれたケーキ",
  },
];
