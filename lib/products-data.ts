// Electronics products data - used across the site
export interface Product {
  id: string
  slug: string
  name_en: string
  name_sq: string
  short_description_en: string
  short_description_sq: string
  description_en: string
  description_sq: string
  price_all: number
  price_eur: number
  original_price_all?: number
  original_price_eur?: number
  product_images: { image_url: string; is_primary: boolean }[]
  is_on_sale: boolean
  is_in_stock: boolean
  rating_average: number
  rating_count: number
  category: string
  brand: string
  specs?: { label: string; value: string }[]
}

export const products: Product[] = [
  // COMPUTERS & LAPTOPS
  {
    id: "1",
    slug: "macbook-pro-16-m3",
    name_en: "MacBook Pro 16\" M3 Pro",
    name_sq: "MacBook Pro 16\" M3 Pro",
    short_description_en: "Apple M3 Pro chip, 18GB RAM, 512GB SSD",
    short_description_sq: "Apple M3 Pro çip, 18GB RAM, 512GB SSD",
    description_en: "The most advanced MacBook Pro ever. With the M3 Pro chip, you get groundbreaking performance for demanding workflows like video editing and software development.",
    description_sq: "MacBook Pro më i avancuar ndonjëherë. Me çipin M3 Pro, merrni performancë revolucionare për punë të kërkueshme si editim video dhe zhvillim softuerësh.",
    price_all: 349900,
    price_eur: 2999,
    original_price_all: 399900,
    original_price_eur: 3499,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800", is_primary: true },
      { image_url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800", is_primary: false },
    ],
    is_on_sale: true,
    is_in_stock: true,
    rating_average: 4.8,
    rating_count: 124,
    category: "computers",
    brand: "Apple",
    specs: [
      { label: "Processor", value: "Apple M3 Pro" },
      { label: "RAM", value: "18GB Unified Memory" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "16.2\" Liquid Retina XDR" },
      { label: "Battery", value: "Up to 22 hours" },
    ],
  },
  {
    id: "2",
    slug: "dell-xps-15-2024",
    name_en: "Dell XPS 15 (2024)",
    name_sq: "Dell XPS 15 (2024)",
    short_description_en: "Intel Core Ultra 7, 32GB RAM, OLED Display",
    short_description_sq: "Intel Core Ultra 7, 32GB RAM, Ekran OLED",
    description_en: "Experience stunning visuals on the 15.6\" 3.5K OLED display. Powered by Intel Core Ultra 7 for exceptional performance.",
    description_sq: "Përjetoni pamje mahnitëse në ekranin 15.6\" 3.5K OLED. Fuqizuar nga Intel Core Ultra 7 për performancë të jashtëzakonshme.",
    price_all: 219900,
    price_eur: 1899,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.5,
    rating_count: 67,
    category: "computers",
    brand: "Dell",
    specs: [
      { label: "Processor", value: "Intel Core Ultra 7 155H" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "Storage", value: "1TB NVMe SSD" },
      { label: "Display", value: "15.6\" 3.5K OLED" },
    ],
  },
  {
    id: "3",
    slug: "asus-rog-strix-g16",
    name_en: "ASUS ROG Strix G16 Gaming Laptop",
    name_sq: "ASUS ROG Strix G16 Laptop Gaming",
    short_description_en: "Intel i9-14900HX, RTX 4070, 240Hz Display",
    short_description_sq: "Intel i9-14900HX, RTX 4070, Ekran 240Hz",
    description_en: "Dominate the competition with cutting-edge Intel Core i9 and NVIDIA RTX 4070 graphics.",
    description_sq: "Dominoni konkurrencën me Intel Core i9 dhe grafikë NVIDIA RTX 4070 të fundit.",
    price_all: 229900,
    price_eur: 1999,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.7,
    rating_count: 89,
    category: "computers",
    brand: "ASUS",
  },
  // PHONES & TABLETS
  {
    id: "4",
    slug: "iphone-15-pro-max",
    name_en: "iPhone 15 Pro Max 256GB",
    name_sq: "iPhone 15 Pro Max 256GB",
    short_description_en: "6.7\" Super Retina XDR, A17 Pro chip, Titanium",
    short_description_sq: "6.7\" Super Retina XDR, A17 Pro çip, Titanium",
    description_en: "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a 48MP camera system.",
    description_sq: "iPhone 15 Pro Max. I ndërtuar në titanium dhe me çipin revolucionar A17 Pro, buton Action të personalizueshëm, dhe sistem kamere 48MP.",
    price_all: 159900,
    price_eur: 1399,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800", is_primary: true },
      { image_url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800", is_primary: false },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.9,
    rating_count: 256,
    category: "phones",
    brand: "Apple",
    specs: [
      { label: "Display", value: "6.7\" Super Retina XDR" },
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "48MP Main + 12MP Ultra Wide" },
      { label: "Storage", value: "256GB" },
    ],
  },
  {
    id: "5",
    slug: "samsung-galaxy-s24-ultra",
    name_en: "Samsung Galaxy S24 Ultra",
    name_sq: "Samsung Galaxy S24 Ultra",
    short_description_en: "6.8\" Dynamic AMOLED, 200MP Camera, S Pen",
    short_description_sq: "6.8\" Dynamic AMOLED, 200MP Kamera, S Pen",
    description_en: "Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with Galaxy AI. It's an Icons design with a new titanium frame.",
    description_sq: "Takoni Galaxy S24 Ultra, forma supreme e Galaxy Ultra me Galaxy AI. Është dizajn ikonik me kornizë të re titanium.",
    price_all: 149900,
    price_eur: 1299,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.6,
    rating_count: 178,
    category: "phones",
    brand: "Samsung",
  },
  {
    id: "6",
    slug: "ipad-pro-12-9-m2",
    name_en: "iPad Pro 12.9\" M2 WiFi 256GB",
    name_sq: "iPad Pro 12.9\" M2 WiFi 256GB",
    short_description_en: "M2 chip, Liquid Retina XDR display, Apple Pencil",
    short_description_sq: "M2 çip, Ekran Liquid Retina XDR, Apple Pencil",
    description_en: "Supercharged by the M2 chip. iPad Pro has an immersive Liquid Retina XDR display.",
    description_sq: "I mbingarkuar nga çipi M2. iPad Pro ka ekran përfshirës Liquid Retina XDR.",
    price_all: 139900,
    price_eur: 1199,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.8,
    rating_count: 156,
    category: "phones",
    brand: "Apple",
  },
  // TV & AUDIO
  {
    id: "7",
    slug: "sony-bravia-65-oled",
    name_en: "Sony Bravia XR 65\" 4K OLED",
    name_sq: "Sony Bravia XR 65\" 4K OLED",
    short_description_en: "4K HDR, 120Hz, Google TV, Dolby Atmos",
    short_description_sq: "4K HDR, 120Hz, Google TV, Dolby Atmos",
    description_en: "Experience lifelike picture with cognitive processor XR. Perfect for movies, sports and gaming.",
    description_sq: "Përjetoni pamje realiste me procesorin kognitiv XR. Perfekt për filma, sport dhe lojëra.",
    price_all: 229900,
    price_eur: 1999,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.7,
    rating_count: 89,
    category: "tv",
    brand: "Sony",
  },
  {
    id: "8",
    slug: "lg-oled-c3-55",
    name_en: "LG OLED C3 55\" 4K Smart TV",
    name_sq: "LG OLED C3 55\" 4K Smart TV",
    short_description_en: "OLED evo, α9 AI Processor, 120Hz Gaming",
    short_description_sq: "OLED evo, α9 AI Procesor, 120Hz Gaming",
    description_en: "Self-lit pixels and deep black enhance picture quality. Perfect OLED with brilliant colors.",
    description_sq: "Pikselët vetë-ndriçues dhe e zeza e thellë përmirësojnë cilësinë e pamjes. OLED perfekt me ngjyra të shkëlqyera.",
    price_all: 149900,
    price_eur: 1299,
    original_price_all: 179900,
    original_price_eur: 1549,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800", is_primary: true },
    ],
    is_on_sale: true,
    is_in_stock: true,
    rating_average: 4.8,
    rating_count: 234,
    category: "tv",
    brand: "LG",
  },
  {
    id: "9",
    slug: "sony-wh-1000xm5",
    name_en: "Sony WH-1000XM5 Headphones",
    name_sq: "Sony WH-1000XM5 Kufje",
    short_description_en: "Industry-leading noise cancellation, 30hr battery",
    short_description_sq: "Anulim zhurme lider në industri, 30 orë bateri",
    description_en: "Industry-leading noise cancellation and exceptional sound quality in an iconic, comfortable design.",
    description_sq: "Anulim zhurme lider në industri dhe cilësi e jashtëzakonshme zëri në dizajn ikonik dhe të rehatshëm.",
    price_all: 39900,
    price_eur: 349,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.9,
    rating_count: 567,
    category: "tv",
    brand: "Sony",
  },
  {
    id: "10",
    slug: "apple-airpods-pro-2",
    name_en: "Apple AirPods Pro (2nd Gen)",
    name_sq: "Apple AirPods Pro (Gjenerata 2)",
    short_description_en: "Active Noise Cancellation, H2 chip, MagSafe",
    short_description_sq: "Anulim Aktiv i Zhurmës, çip H2, MagSafe",
    description_en: "Rebuilt from the sound up. AirPods Pro now feature a next-level noise cancellation and immersive Spatial Audio.",
    description_sq: "I rindërtuar nga zëri lart. AirPods Pro tani kanë anulim zhurme të nivelit tjetër dhe Audio Hapësinore përfshirëse.",
    price_all: 29900,
    price_eur: 259,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.7,
    rating_count: 892,
    category: "tv",
    brand: "Apple",
  },
  // GAMING
  {
    id: "11",
    slug: "ps5-console-bundle",
    name_en: "PlayStation 5 Console Bundle",
    name_sq: "PlayStation 5 Paketë Konsole",
    short_description_en: "825GB SSD, 4K Gaming, DualSense, Extra Controller",
    short_description_sq: "825GB SSD, 4K Gaming, DualSense, Kontrollues Ekstra",
    description_en: "Experience lightning-fast loading with an ultra-high speed SSD, haptic feedback, and adaptive triggers.",
    description_sq: "Përjetoni ngarkim si rrufeja me SSD ultra të shpejtë, reagim haptik dhe këmbëza adaptive.",
    price_all: 69900,
    price_eur: 599,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.9,
    rating_count: 412,
    category: "gaming",
    brand: "Sony",
  },
  {
    id: "12",
    slug: "xbox-series-x",
    name_en: "Xbox Series X 1TB",
    name_sq: "Xbox Series X 1TB",
    short_description_en: "1TB SSD, 4K at 120fps, Xbox Game Pass",
    short_description_sq: "1TB SSD, 4K në 120fps, Xbox Game Pass",
    description_en: "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles.",
    description_sq: "Xbox më i shpejtë dhe më i fuqishëm ndonjëherë. Luani mijëra tituj nga katër gjenerata konsolash.",
    price_all: 59900,
    price_eur: 499,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.8,
    rating_count: 287,
    category: "gaming",
    brand: "Microsoft",
  },
  {
    id: "13",
    slug: "nintendo-switch-oled",
    name_en: "Nintendo Switch OLED Model",
    name_sq: "Nintendo Switch Modeli OLED",
    short_description_en: "7\" OLED Screen, 64GB Storage, Dock included",
    short_description_sq: "7\" Ekran OLED, 64GB Hapësirë, Dok i përfshirë",
    description_en: "Featuring a vibrant 7-inch OLED screen and a wide adjustable stand for tabletop mode.",
    description_sq: "Me ekran OLED 7 inç të gjallë dhe mbështetëse të rregullueshme të gjerë për modalitetin e tavolinës.",
    price_all: 39900,
    price_eur: 349,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.7,
    rating_count: 356,
    category: "gaming",
    brand: "Nintendo",
  },
  // SMART HOME & ACCESSORIES
  {
    id: "14",
    slug: "apple-watch-series-9",
    name_en: "Apple Watch Series 9 GPS 45mm",
    name_sq: "Apple Watch Series 9 GPS 45mm",
    short_description_en: "S9 chip, Always-On Retina, Double Tap gesture",
    short_description_sq: "S9 çip, Always-On Retina, gjestet Double Tap",
    description_en: "A magical new way to use your Apple Watch without touching the display. Double Tap lets you easily control your watch.",
    description_sq: "Një mënyrë e re magjike për të përdorur Apple Watch pa prekur ekranin. Double Tap ju lejon të kontrolloni lehtësisht orën tuaj.",
    price_all: 49900,
    price_eur: 429,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.8,
    rating_count: 234,
    category: "accessories",
    brand: "Apple",
  },
  {
    id: "15",
    slug: "samsung-galaxy-watch-6",
    name_en: "Samsung Galaxy Watch 6 Classic",
    name_sq: "Samsung Galaxy Watch 6 Classic",
    short_description_en: "Rotating bezel, Sleep tracking, Body Composition",
    short_description_sq: "Bezel rrotullues, Gjurmim gjumi, Përbërje trupi",
    description_en: "Classic rotating bezel is back. Premium design meets advanced health monitoring.",
    description_sq: "Bezeli klasik rrotullues është kthyer. Dizajni premium takon monitorimin e avancuar shëndetësor.",
    price_all: 39900,
    price_eur: 349,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800", is_primary: true },
    ],
    is_on_sale: false,
    is_in_stock: true,
    rating_average: 4.5,
    rating_count: 189,
    category: "accessories",
    brand: "Samsung",
  },
  {
    id: "16",
    slug: "dyson-v15-detect",
    name_en: "Dyson V15 Detect Absolute",
    name_sq: "Dyson V15 Detect Absolute",
    short_description_en: "Laser dust detection, LCD screen, 60min runtime",
    short_description_sq: "Detekim pluhuri me lazer, ekran LCD, 60min kohë pune",
    description_en: "Reveals hidden dust with a precisely-angled laser. Shows what's been sucked up on the LCD screen.",
    description_sq: "Zbulon pluhurin e fshehur me lazer të përpiktë të këndit. Tregon çfarë është thithur në ekranin LCD.",
    price_all: 79900,
    price_eur: 699,
    original_price_all: 89900,
    original_price_eur: 779,
    product_images: [
      { image_url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800", is_primary: true },
    ],
    is_on_sale: true,
    is_in_stock: true,
    rating_average: 4.6,
    rating_count: 145,
    category: "accessories",
    brand: "Dyson",
  },
]

export const categories = [
  { id: "computers", name_en: "Computers & Laptops", name_sq: "Kompjuterë & Laptopë" },
  { id: "phones", name_en: "Phones & Tablets", name_sq: "Telefona & Tableta" },
  { id: "tv", name_en: "TV & Audio", name_sq: "TV & Audio" },
  { id: "gaming", name_en: "Gaming", name_sq: "Gaming" },
  { id: "accessories", name_en: "Accessories", name_sq: "Aksesorë" },
]

export const brands = ["Apple", "Samsung", "Sony", "Dell", "LG", "ASUS", "Microsoft", "Nintendo", "Dyson"]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId)
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}
