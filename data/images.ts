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
    wideInterior: unsplash("1542181961-9590d0c79dab", 1400),
    seating: unsplash("1703042200709-23afbb342e52", 1400),
    drink: unsplash("1566656117208-c23e67f4ce8c", 1400),
    counter: unsplash("1551887196-72e32bfc7bf3", 1400),
    detail: unsplash("1785302710677-69cc4ea97bee", 1400),
    cake: unsplash("1636365241819-54947e20d49a", 1400),
  },
} as const;
