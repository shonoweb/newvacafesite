import { IMAGES } from "./images";

export type MenuCategory = "DRINK" | "CAKE";

export interface MenuItem {
  id: string;
  no: string;
  category: MenuCategory;
  name: string;
  nameJa: string;
  price: number;
  description: string;
  image: string;
  alt: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "espresso",
    no: "01",
    category: "DRINK",
    name: "Espresso",
    nameJa: "エスプレッソ",
    price: 420,
    description: "深煎り豆を使ったストレートの一杯。",
    image: IMAGES.menu.espresso,
    alt: "エスプレッソマシンから抽出される2杯分のショット",
  },
  {
    id: "americano",
    no: "02",
    category: "DRINK",
    name: "Americano",
    nameJa: "アメリカーノ",
    price: 480,
    description: "エスプレッソをお湯で割った軽やかな味わい。",
    image: IMAGES.menu.americano,
    alt: "湯気の立つアメリカーノを注いでいる様子",
  },
  {
    id: "cafe-latte",
    no: "03",
    category: "DRINK",
    name: "Cafe Latte",
    nameJa: "カフェラテ",
    price: 550,
    description: "エスプレッソにミルクをたっぷりと。",
    image: IMAGES.menu.cafeLatte,
    alt: "ラテアートを施したカフェラテ",
  },
  {
    id: "cappuccino",
    no: "04",
    category: "DRINK",
    name: "Cappuccino",
    nameJa: "カプチーノ",
    price: 550,
    description: "きめ細かなミルクフォームが特徴。",
    image: IMAGES.menu.cappuccino,
    alt: "白いカップに注がれたカプチーノ",
  },
  {
    id: "cafe-mocha",
    no: "05",
    category: "DRINK",
    name: "Cafe Mocha",
    nameJa: "カフェモカ",
    price: 590,
    description: "チョコレートとエスプレッソの組み合わせ。",
    image: IMAGES.menu.cafeMocha,
    alt: "チョコレート色のカフェモカ",
  },
  {
    id: "caramel-latte",
    no: "06",
    category: "DRINK",
    name: "Caramel Latte",
    nameJa: "キャラメルラテ",
    price: 590,
    description: "キャラメルシロップを合わせた甘めの一杯。",
    image: IMAGES.menu.caramelLatte,
    alt: "陽の当たる木製テーブルに置かれたキャラメルラテ",
  },
  {
    id: "vanilla-latte",
    no: "07",
    category: "DRINK",
    name: "Vanilla Latte",
    nameJa: "バニララテ",
    price: 590,
    description: "バニラの香りをきかせたやさしい味わい。",
    image: IMAGES.menu.vanillaLatte,
    alt: "グラスに注がれたバニララテ",
  },
  {
    id: "cold-brew",
    no: "08",
    category: "DRINK",
    name: "Cold Brew",
    nameJa: "コールドブリュー",
    price: 520,
    description: "低温で一晩じっくり抽出。",
    image: IMAGES.menu.coldBrew,
    alt: "氷を入れたコールドブリューコーヒー",
  },
  {
    id: "honey-cafe-latte",
    no: "09",
    category: "DRINK",
    name: "Honey Cafe Latte",
    nameJa: "ハニーカフェラテ",
    price: 620,
    description: "はちみつのコクをプラスしたラテ。",
    image: IMAGES.menu.honeyCafeLatte,
    alt: "木製テーブルに置かれたハニーカフェラテ",
  },
  {
    id: "matcha-espresso-latte",
    no: "10",
    category: "DRINK",
    name: "Matcha Espresso Latte",
    nameJa: "抹茶エスプレッソラテ",
    price: 620,
    description: "抹茶とエスプレッソを合わせた一杯。",
    image: IMAGES.menu.matchaEspressoLatte,
    alt: "抹茶ラテのカップ",
  },
  {
    id: "basque-cheesecake",
    no: "11",
    category: "CAKE",
    name: "Basque Cheesecake",
    nameJa: "バスクチーズケーキ",
    price: 580,
    description: "表面を香ばしく焼き上げた濃厚な一切れ。",
    image: IMAGES.menu.basqueCheesecake,
    alt: "表面を焼き上げたバスクチーズケーキ",
  },
  {
    id: "chocolate-cake",
    no: "12",
    category: "CAKE",
    name: "Chocolate Cake",
    nameJa: "チョコレートケーキ",
    price: 560,
    description: "しっとりとした生地にチョコクリーム。",
    image: IMAGES.menu.chocolateCake,
    alt: "白い皿に盛られたチョコレートケーキ",
  },
  {
    id: "strawberry-shortcake",
    no: "13",
    category: "CAKE",
    name: "Strawberry Shortcake",
    nameJa: "ストロベリーショートケーキ",
    price: 620,
    description: "生クリームとベリーを重ねた定番のケーキ。",
    image: IMAGES.menu.strawberryShortcake,
    alt: "いちごをのせたショートケーキ",
  },
];

export const DRINK_ITEMS = MENU_ITEMS.filter((item) => item.category === "DRINK");
export const CAKE_ITEMS = MENU_ITEMS.filter((item) => item.category === "CAKE");
