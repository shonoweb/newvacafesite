import { IMAGES } from "./images";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "interior",
    src: IMAGES.gallery.interior,
    alt: "自然光が入るNEWVA CAFEの店内",
  },
  {
    id: "cheers",
    src: IMAGES.gallery.cheers,
    alt: "ラテアートのカップを合わせる二人",
  },
  {
    id: "beans",
    src: IMAGES.gallery.beans,
    alt: "焙煎したコーヒー豆",
  },
  {
    id: "cake",
    src: IMAGES.gallery.cake,
    alt: "スタンドに並んだチョコレートケーキ",
  },
  {
    id: "pour",
    src: IMAGES.gallery.pour,
    alt: "ハンドドリップでコーヒーを淹れる様子",
  },
  {
    id: "counter",
    src: IMAGES.gallery.counter,
    alt: "カウンターでスタッフが接客する様子",
  },
];
