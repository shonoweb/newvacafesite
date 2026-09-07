function unsplash(id: string, width: number) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;
}

export const IMAGES = {
  heroInterior: unsplash("1554118811-1e0d58224f24", 2400),
  aboutInterior: unsplash("1600093463592-8e36ae95ef56", 1600),

  menu: {
    espresso: unsplash("1495856458515-0637185db551", 1200),
    americano: unsplash("1522992319-0365e5f11656", 1200),
    cafeLatte: unsplash("1541167760496-1628856ab772", 1200),
    cappuccino: unsplash("1509042239860-f550ce710b93", 1200),
    cafeMocha: unsplash("1461988091159-192b6df7054f", 1200),
    caramelLatte: unsplash("1497935586351-b67a49e012bf", 1200),
    vanillaLatte: unsplash("1442512595331-e89e73853f31", 1200),
    coldBrew: unsplash("1517701604599-bb29b565090c", 1200),
    honeyCafeLatte: unsplash("1442550528053-c431ecb55509", 1200),
    matchaEspressoLatte: unsplash("1447933601403-0c6688de566e", 1200),
    basqueCheesecake: unsplash("1533134242443-d4fd215305ad", 1200),
    chocolateCake: unsplash("1523294587484-bae6cc870010", 1200),
    strawberryShortcake: unsplash("1565958011703-44f9829ba187", 1200),
  },

  gallery: {
    interior: unsplash("1521017432531-fbd92d768814", 1400),
    cheers: unsplash("1495474472287-4d71bcdd2085", 1400),
    beans: unsplash("1445116572660-236099ec97a0", 1400),
    cake: unsplash("1586985289906-406988974504", 1400),
    pour: unsplash("1442550528053-c431ecb55509", 1400),
    counter: unsplash("1571115177098-24ec42ed204d", 1400),
  },
} as const;
