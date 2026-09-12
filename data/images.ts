function unsplash(id: string, width: number) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;
}

export const IMAGES = {
  heroInterior: unsplash("1554118811-1e0d58224f24", 2400),
  aboutInterior: unsplash("1600093463592-8e36ae95ef56", 1600),

  menu: {
    espresso: unsplash("1749105504718-3faac64bc214", 1200),
    americano: unsplash("1522992319-0365e5f11656", 1200),
    cafeLatte: unsplash("1541167760496-1628856ab772", 1200),
    cappuccino: unsplash("1572442388796-11668a67e53d", 1200),
    cafeMocha: unsplash("1618576230663-9714aecfb99a", 1200),
    caramelLatte: unsplash("1662047102608-a6f2e492411f", 1200),
    vanillaLatte: unsplash("1741461500711-59b03bceb2ce", 1200),
    coldBrew: unsplash("1517959105821-eaf2591984ca", 1200),
    honeyCafeLatte: unsplash("1690642109411-89f854ad9aa7", 1200),
    matchaEspressoLatte: unsplash("1773753563088-e3ea21f9a992", 1200),
    basqueCheesecake: unsplash("1759303380841-55c09244fd2b", 1200),
    chocolateCake: unsplash("1576618148423-df549bcb6972", 1200),
    strawberryShortcake: unsplash("1641848421644-a1603f016f51", 1200),
  },

  gallery: {
    greenhouse: unsplash("1769501203675-919307554822", 1400),
    windowSeat: unsplash("1769473357479-d94ce818dba7", 1400),
    tables: unsplash("1554538693-d854cceb26a9", 1400),
    windowDetail: unsplash("1677729437372-2d35520a3d0e", 1400),
    drink: unsplash("1728978096068-0f15dc964c4c", 1400),
    cake: unsplash("1611440482670-ffde2ed2223d", 1400),
  },
} as const;
