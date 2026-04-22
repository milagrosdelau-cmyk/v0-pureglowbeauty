"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Product } from './data/products'

export type CartItem = {
  product: Product
  quantity: number
}

export type Currency = 'EUR' | 'USD' | 'GBP' | 'CNY'
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'sv' | 'da' | 'no' | 'fi' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar' | 'tr' | 'he' | 'th'

type Translations = {
  [key in Language]: {
    shopNow: string
    addToCart: string
    viewCart: string
    checkout: string
    freeShipping: string
    seasonDiscount: string
    crueltyFree: string
    searchProducts: string
    categories: string
    bestsellers: string
    newArrivals: string
    aboutUs: string
    shipping: string
    contact: string
    newsletter: string
    subscribe: string
    welcomeChat: string
    findTone: string
    skinConsult: string
    orderStatus: string
    skinRecommend: string
  }
}

export const translations: Translations = {
  en: {
    shopNow: 'Shop Now',
    addToCart: 'Add to Cart',
    viewCart: 'View Cart',
    checkout: 'Checkout',
    freeShipping: 'Free International Shipping on orders over €75',
    seasonDiscount: 'Season Sale: -15% with code PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Vegan Friendly',
    searchProducts: 'Search products...',
    categories: 'Categories',
    bestsellers: 'Bestsellers',
    newArrivals: 'New Arrivals',
    aboutUs: 'About Us',
    shipping: 'Shipping',
    contact: 'Contact',
    newsletter: 'Newsletter',
    subscribe: 'Subscribe',
    welcomeChat: 'Hello! ✨ Welcome to PureGlowBeauty. I\'m your personal beauty assistant. I\'m here to help you find the perfect shade, recommend products based on your skin type, or answer questions about our international shipping to 50+ countries. How can I glow with you today?',
    findTone: '🔍 Find my ideal tone',
    skinConsult: '🌿 Cruelty-Free Consultation',
    orderStatus: '📦 Order Status',
    skinRecommend: '💄 Recommendation for my skin'
  },
  es: {
    shopNow: 'Comprar Ahora',
    addToCart: 'Añadir al Carrito',
    viewCart: 'Ver Carrito',
    checkout: 'Finalizar Compra',
    freeShipping: 'Envío Internacional Gratis en pedidos superiores a 75€',
    seasonDiscount: 'Descuento de Temporada: -15% con el código PUREGLOW15',
    crueltyFree: '100% Cruelty-Free y Vegano',
    searchProducts: 'Buscar productos...',
    categories: 'Categorías',
    bestsellers: 'Más Vendidos',
    newArrivals: 'Novedades',
    aboutUs: 'Sobre Nosotros',
    shipping: 'Envíos',
    contact: 'Contacto',
    newsletter: 'Newsletter',
    subscribe: 'Suscribirse',
    welcomeChat: '¡Hola! ✨ Bienvenida a PureGlowBeauty. Soy tu asistente personal de belleza. Estoy aquí para ayudarte a encontrar el tono perfecto, recomendarte productos según tu tipo de piel o resolver tus dudas sobre nuestros envíos internacionales a más de 50 países. ¿En qué puedo brillar contigo hoy?',
    findTone: '🔍 Encontrar mi tono ideal',
    skinConsult: '🌿 Consulta Cruelty-Free',
    orderStatus: '📦 Estado de mi envío',
    skinRecommend: '💄 Recomendación según mi piel'
  },
  fr: {
    shopNow: 'Acheter',
    addToCart: 'Ajouter au Panier',
    viewCart: 'Voir le Panier',
    checkout: 'Commander',
    freeShipping: 'Livraison Internationale Gratuite pour les commandes de plus de 75€',
    seasonDiscount: 'Soldes de Saison: -15% avec le code PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Végan',
    searchProducts: 'Rechercher des produits...',
    categories: 'Catégories',
    bestsellers: 'Meilleures Ventes',
    newArrivals: 'Nouveautés',
    aboutUs: 'À Propos',
    shipping: 'Livraison',
    contact: 'Contact',
    newsletter: 'Newsletter',
    subscribe: 'S\'abonner',
    welcomeChat: 'Bonjour! ✨ Bienvenue chez PureGlowBeauty. Je suis votre assistante beauté personnelle.',
    findTone: '🔍 Trouver ma teinte idéale',
    skinConsult: '🌿 Consultation Cruelty-Free',
    orderStatus: '📦 Suivi de commande',
    skinRecommend: '💄 Recommandation pour ma peau'
  },
  de: {
    shopNow: 'Jetzt Kaufen',
    addToCart: 'In den Warenkorb',
    viewCart: 'Warenkorb Ansehen',
    checkout: 'Zur Kasse',
    freeShipping: 'Kostenloser internationaler Versand ab 75€',
    seasonDiscount: 'Saisonrabatt: -15% mit Code PUREGLOW15',
    crueltyFree: '100% Tierversuchsfrei & Vegan',
    searchProducts: 'Produkte suchen...',
    categories: 'Kategorien',
    bestsellers: 'Bestseller',
    newArrivals: 'Neuheiten',
    aboutUs: 'Über Uns',
    shipping: 'Versand',
    contact: 'Kontakt',
    newsletter: 'Newsletter',
    subscribe: 'Abonnieren',
    welcomeChat: 'Hallo! ✨ Willkommen bei PureGlowBeauty. Ich bin Ihre persönliche Beauty-Beraterin.',
    findTone: '🔍 Meinen idealen Ton finden',
    skinConsult: '🌿 Cruelty-Free Beratung',
    orderStatus: '📦 Bestellstatus',
    skinRecommend: '💄 Empfehlung für meine Haut'
  },
  it: {
    shopNow: 'Acquista Ora',
    addToCart: 'Aggiungi al Carrello',
    viewCart: 'Vedi Carrello',
    checkout: 'Checkout',
    freeShipping: 'Spedizione Internazionale Gratuita per ordini superiori a 75€',
    seasonDiscount: 'Sconto Stagionale: -15% con il codice PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Vegano',
    searchProducts: 'Cerca prodotti...',
    categories: 'Categorie',
    bestsellers: 'Più Venduti',
    newArrivals: 'Novità',
    aboutUs: 'Chi Siamo',
    shipping: 'Spedizioni',
    contact: 'Contatti',
    newsletter: 'Newsletter',
    subscribe: 'Iscriviti',
    welcomeChat: 'Ciao! ✨ Benvenuta in PureGlowBeauty. Sono la tua assistente di bellezza personale.',
    findTone: '🔍 Trova il mio tono ideale',
    skinConsult: '🌿 Consulenza Cruelty-Free',
    orderStatus: '📦 Stato dell\'ordine',
    skinRecommend: '💄 Raccomandazione per la mia pelle'
  },
  pt: {
    shopNow: 'Comprar Agora',
    addToCart: 'Adicionar ao Carrinho',
    viewCart: 'Ver Carrinho',
    checkout: 'Finalizar',
    freeShipping: 'Frete Internacional Grátis em pedidos acima de 75€',
    seasonDiscount: 'Desconto de Temporada: -15% com o código PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Vegano',
    searchProducts: 'Buscar produtos...',
    categories: 'Categorias',
    bestsellers: 'Mais Vendidos',
    newArrivals: 'Novidades',
    aboutUs: 'Sobre Nós',
    shipping: 'Envios',
    contact: 'Contato',
    newsletter: 'Newsletter',
    subscribe: 'Inscrever-se',
    welcomeChat: 'Olá! ✨ Bem-vinda à PureGlowBeauty. Sou sua assistente de beleza pessoal.',
    findTone: '🔍 Encontrar meu tom ideal',
    skinConsult: '🌿 Consulta Cruelty-Free',
    orderStatus: '📦 Status do pedido',
    skinRecommend: '💄 Recomendação para minha pele'
  },
  nl: {
    shopNow: 'Nu Winkelen',
    addToCart: 'Toevoegen aan Winkelwagen',
    viewCart: 'Bekijk Winkelwagen',
    checkout: 'Afrekenen',
    freeShipping: 'Gratis Internationale Verzending bij bestellingen boven €75',
    seasonDiscount: 'Seizoenskorting: -15% met code PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Vegan',
    searchProducts: 'Producten zoeken...',
    categories: 'Categorieën',
    bestsellers: 'Bestsellers',
    newArrivals: 'Nieuw',
    aboutUs: 'Over Ons',
    shipping: 'Verzending',
    contact: 'Contact',
    newsletter: 'Nieuwsbrief',
    subscribe: 'Abonneren',
    welcomeChat: 'Hallo! ✨ Welkom bij PureGlowBeauty. Ik ben je persoonlijke beauty-assistent.',
    findTone: '🔍 Vind mijn ideale tint',
    skinConsult: '🌿 Cruelty-Free Consult',
    orderStatus: '📦 Bestelstatus',
    skinRecommend: '💄 Aanbeveling voor mijn huid'
  },
  pl: {
    shopNow: 'Kup Teraz',
    addToCart: 'Dodaj do Koszyka',
    viewCart: 'Zobacz Koszyk',
    checkout: 'Zamów',
    freeShipping: 'Darmowa Wysyłka Międzynarodowa przy zamówieniach powyżej 75€',
    seasonDiscount: 'Wyprzedaż Sezonowa: -15% z kodem PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Wegański',
    searchProducts: 'Szukaj produktów...',
    categories: 'Kategorie',
    bestsellers: 'Bestsellery',
    newArrivals: 'Nowości',
    aboutUs: 'O Nas',
    shipping: 'Wysyłka',
    contact: 'Kontakt',
    newsletter: 'Newsletter',
    subscribe: 'Subskrybuj',
    welcomeChat: 'Cześć! ✨ Witamy w PureGlowBeauty. Jestem Twoją osobistą asystentką urody.',
    findTone: '🔍 Znajdź mój idealny odcień',
    skinConsult: '🌿 Konsultacja Cruelty-Free',
    orderStatus: '📦 Status zamówienia',
    skinRecommend: '💄 Rekomendacja dla mojej skóry'
  },
  sv: {
    shopNow: 'Handla Nu',
    addToCart: 'Lägg i Kundvagn',
    viewCart: 'Visa Kundvagn',
    checkout: 'Till Kassan',
    freeShipping: 'Fri Internationell Frakt på beställningar över 75€',
    seasonDiscount: 'Säsongsrea: -15% med kod PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Veganskt',
    searchProducts: 'Sök produkter...',
    categories: 'Kategorier',
    bestsellers: 'Bästsäljare',
    newArrivals: 'Nyheter',
    aboutUs: 'Om Oss',
    shipping: 'Frakt',
    contact: 'Kontakt',
    newsletter: 'Nyhetsbrev',
    subscribe: 'Prenumerera',
    welcomeChat: 'Hej! ✨ Välkommen till PureGlowBeauty. Jag är din personliga skönhetsassistent.',
    findTone: '🔍 Hitta min ideala ton',
    skinConsult: '🌿 Cruelty-Free Konsultation',
    orderStatus: '📦 Orderstatus',
    skinRecommend: '💄 Rekommendation för min hud'
  },
  da: {
    shopNow: 'Køb Nu',
    addToCart: 'Tilføj til Kurv',
    viewCart: 'Se Kurv',
    checkout: 'Til Kassen',
    freeShipping: 'Gratis International Fragt på ordrer over 75€',
    seasonDiscount: 'Sæsonudsalg: -15% med kode PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Vegansk',
    searchProducts: 'Søg produkter...',
    categories: 'Kategorier',
    bestsellers: 'Bestsellere',
    newArrivals: 'Nyheder',
    aboutUs: 'Om Os',
    shipping: 'Fragt',
    contact: 'Kontakt',
    newsletter: 'Nyhedsbrev',
    subscribe: 'Tilmeld',
    welcomeChat: 'Hej! ✨ Velkommen til PureGlowBeauty. Jeg er din personlige skønhedsassistent.',
    findTone: '🔍 Find min ideelle tone',
    skinConsult: '🌿 Cruelty-Free Konsultation',
    orderStatus: '📦 Ordrestatus',
    skinRecommend: '💄 Anbefaling til min hud'
  },
  no: {
    shopNow: 'Kjøp Nå',
    addToCart: 'Legg i Handlekurv',
    viewCart: 'Se Handlekurv',
    checkout: 'Til Kassen',
    freeShipping: 'Gratis Internasjonal Frakt på bestillinger over 75€',
    seasonDiscount: 'Sesongsalg: -15% med kode PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Vegansk',
    searchProducts: 'Søk produkter...',
    categories: 'Kategorier',
    bestsellers: 'Bestselgere',
    newArrivals: 'Nyheter',
    aboutUs: 'Om Oss',
    shipping: 'Frakt',
    contact: 'Kontakt',
    newsletter: 'Nyhetsbrev',
    subscribe: 'Abonner',
    welcomeChat: 'Hei! ✨ Velkommen til PureGlowBeauty. Jeg er din personlige skjønnhetsassistent.',
    findTone: '🔍 Finn min ideelle tone',
    skinConsult: '🌿 Cruelty-Free Konsultasjon',
    orderStatus: '📦 Ordrestatus',
    skinRecommend: '💄 Anbefaling for min hud'
  },
  fi: {
    shopNow: 'Osta Nyt',
    addToCart: 'Lisää Ostoskoriin',
    viewCart: 'Näytä Ostoskori',
    checkout: 'Kassalle',
    freeShipping: 'Ilmainen Kansainvälinen Toimitus yli 75€ tilauksiin',
    seasonDiscount: 'Kausi-ale: -15% koodilla PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Vegaaninen',
    searchProducts: 'Hae tuotteita...',
    categories: 'Kategoriat',
    bestsellers: 'Myydyimmät',
    newArrivals: 'Uutuudet',
    aboutUs: 'Tietoa Meistä',
    shipping: 'Toimitus',
    contact: 'Yhteystiedot',
    newsletter: 'Uutiskirje',
    subscribe: 'Tilaa',
    welcomeChat: 'Hei! ✨ Tervetuloa PureGlowBeautyyn. Olen henkilökohtainen kauneus assistenttisi.',
    findTone: '🔍 Löydä ihanteellinen sävyni',
    skinConsult: '🌿 Cruelty-Free Konsultaatio',
    orderStatus: '📦 Tilauksen tila',
    skinRecommend: '💄 Suositus iholleni'
  },
  ru: {
    shopNow: 'Купить',
    addToCart: 'В Корзину',
    viewCart: 'Корзина',
    checkout: 'Оформить Заказ',
    freeShipping: 'Бесплатная Международная Доставка при заказе от 75€',
    seasonDiscount: 'Сезонная Скидка: -15% по коду PUREGLOW15',
    crueltyFree: '100% Cruelty-Free & Веганский',
    searchProducts: 'Поиск товаров...',
    categories: 'Категории',
    bestsellers: 'Бестселлеры',
    newArrivals: 'Новинки',
    aboutUs: 'О Нас',
    shipping: 'Доставка',
    contact: 'Контакты',
    newsletter: 'Рассылка',
    subscribe: 'Подписаться',
    welcomeChat: '��ривет! ✨ Добро пожаловать в PureGlowBeauty. Я ваш персональный бьюти-ассистент.',
    findTone: '🔍 Найти мой идеальный тон',
    skinConsult: '🌿 Консультация Cruelty-Free',
    orderStatus: '📦 Статус заказа',
    skinRecommend: '💄 Рекомендация для моей кожи'
  },
  ja: {
    shopNow: '今すぐ購入',
    addToCart: 'カートに追加',
    viewCart: 'カートを見る',
    checkout: 'チェックアウト',
    freeShipping: '75€以上のご注文で送料無料',
    seasonDiscount: 'シーズンセール: コード PUREGLOW15 で15%オフ',
    crueltyFree: '100% クルエルティフリー & ヴィーガン',
    searchProducts: '商品を検索...',
    categories: 'カテゴリー',
    bestsellers: 'ベストセラー',
    newArrivals: '新着商品',
    aboutUs: '私たちについて',
    shipping: '配送',
    contact: 'お問い合わせ',
    newsletter: 'ニュースレター',
    subscribe: '購読',
    welcomeChat: 'こんにちは！✨ PureGlowBeautyへようこそ。私はあなたのパーソナルビューティーアシスタントです。',
    findTone: '🔍 理想の色を見つける',
    skinConsult: '🌿 クルエルティフリー相談',
    orderStatus: '📦 注文状況',
    skinRecommend: '💄 肌タイプ別おすすめ'
  },
  ko: {
    shopNow: '지금 구매',
    addToCart: '장바구니에 추가',
    viewCart: '장바구니 보기',
    checkout: '결제하기',
    freeShipping: '75€ 이상 주문 시 무료 국제 배송',
    seasonDiscount: '시즌 세일: 코드 PUREGLOW15로 15% 할인',
    crueltyFree: '100% 크루얼티프리 & 비건',
    searchProducts: '제품 검색...',
    categories: '카테고리',
    bestsellers: '베스트셀러',
    newArrivals: '신상품',
    aboutUs: '회사 소개',
    shipping: '배송',
    contact: '문의',
    newsletter: '뉴스레터',
    subscribe: '구독',
    welcomeChat: '안녕하세요! ✨ PureGlowBeauty에 오신 것을 환영합니다. 저는 당신의 개인 뷰티 어시스턴트입니다.',
    findTone: '🔍 내 이상적인 톤 찾기',
    skinConsult: '🌿 크루얼티프리 상담',
    orderStatus: '📦 주문 상태',
    skinRecommend: '💄 내 피부 추천'
  },
  zh: {
    shopNow: '立即购买',
    addToCart: '加入购物车',
    viewCart: '查看购物车',
    checkout: '结账',
    freeShipping: '75€以上订单免国际运费',
    seasonDiscount: '季节特惠: 使用代码 PUREGLOW15 享85折',
    crueltyFree: '100% 零残忍 & 纯素',
    searchProducts: '搜索产品...',
    categories: '分类',
    bestsellers: '畅销品',
    newArrivals: '新品',
    aboutUs: '关于我们',
    shipping: '配送',
    contact: '联系',
    newsletter: '订阅',
    subscribe: '订阅',
    welcomeChat: '你好！✨ 欢迎来到PureGlowBeauty。我是您的个人美容助手。',
    findTone: '🔍 找到我的理想色调',
    skinConsult: '🌿 零残忍咨询',
    orderStatus: '📦 订单���态',
    skinRecommend: '💄 肤质推荐'
  },
  ar: {
    shopNow: 'تسوق الآن',
    addToCart: 'أضف إلى السلة',
    viewCart: 'عرض السلة',
    checkout: 'الدفع',
    freeShipping: 'شحن دولي مجاني للطلبات التي تزيد عن 75€',
    seasonDiscount: 'تخفيضات موسمية: -15% بالرمز PUREGLOW15',
    crueltyFree: '100% خالي من القسوة ونباتي',
    searchProducts: 'البحث عن المنتجات...',
    categories: 'الفئات',
    bestsellers: 'الأكثر مبيعاً',
    newArrivals: 'وصل حديثاً',
    aboutUs: 'من نحن',
    shipping: 'الشحن',
    contact: 'اتصل بنا',
    newsletter: 'النشرة الإخبارية',
    subscribe: 'اشترك',
    welcomeChat: 'مرحباً! ✨ أهلاً بك في PureGlowBeauty. أنا مساعدة التجميل الشخصية الخاصة بك.',
    findTone: '🔍 اعثر على درجتي المثالية',
    skinConsult: '🌿 استشارة خالية من القسوة',
    orderStatus: '📦 حالة الطلب',
    skinRecommend: '💄 توصية لبشرتي'
  },
  tr: {
    shopNow: 'Şimdi Al',
    addToCart: 'Sepete Ekle',
    viewCart: 'Sepeti Gör',
    checkout: 'Ödeme',
    freeShipping: '75€ üzeri siparişlerde Ücretsiz Uluslararası Kargo',
    seasonDiscount: 'Sezon İndirimi: PUREGLOW15 koduyla %15 indirim',
    crueltyFree: '100% Hayvan Deneysiz & Vegan',
    searchProducts: 'Ürün ara...',
    categories: 'Kategoriler',
    bestsellers: 'Çok Satanlar',
    newArrivals: 'Yeni Gelenler',
    aboutUs: 'Hakkımızda',
    shipping: 'Kargo',
    contact: 'İletişim',
    newsletter: 'Bülten',
    subscribe: 'Abone Ol',
    welcomeChat: 'Merhaba! ✨ PureGlowBeauty\'ye hoş geldiniz. Ben kişisel güzellik asistanınızım.',
    findTone: '🔍 İdeal tonumu bul',
    skinConsult: '🌿 Cruelty-Free Danışma',
    orderStatus: '📦 Sipariş Durumu',
    skinRecommend: '💄 Cildim için öneri'
  },
  he: {
    shopNow: 'קנה עכשיו',
    addToCart: 'הוסף לסל',
    viewCart: 'צפה בסל',
    checkout: 'לתשלום',
    freeShipping: 'משלוח בינלאומי חינם בהזמנות מעל 75€',
    seasonDiscount: 'מבצע עונתי: -15% עם הקוד PUREGLOW15',
    crueltyFree: '100% ללא ניסויים בבעלי חיים וטבעוני',
    searchProducts: 'חפש מוצרים...',
    categories: 'קטגוריות',
    bestsellers: 'רבי מכר',
    newArrivals: 'חדשים',
    aboutUs: 'אודותינו',
    shipping: 'משלוחים',
    contact: 'צור קשר',
    newsletter: 'ניוזלטר',
    subscribe: 'הירשם',
    welcomeChat: 'שלום! ✨ ברוכים הבאים ל-PureGlowBeauty. אני עוזרת היופי האישית שלך.',
    findTone: '🔍 מצא את הגוון האידיאלי שלי',
    skinConsult: '🌿 ייעוץ Cruelty-Free',
    orderStatus: '📦 סטטוס הזמנה',
    skinRecommend: '💄 המלצה לעור שלי'
  },
  th: {
    shopNow: 'ช้อปเลย',
    addToCart: 'เพิ่มลงตะกร้า',
    viewCart: 'ดูตะกร้า',
    checkout: 'ชำระเงิน',
    freeShipping: 'จัดส่งฟรีทั่วโลกสำหรับคำสั่งซื้อมากกว่า 75€',
    seasonDiscount: 'ลดราคาประจำฤดูกาล: ลด 15% ด้วยรหัส PUREGLOW15',
    crueltyFree: '100% ไม่ทดลองในสัตว์ & วีแกน',
    searchProducts: 'ค้นหาสินค้า...',
    categories: 'หมวดหมู่',
    bestsellers: 'ขายดี',
    newArrivals: 'สินค้าใหม่',
    aboutUs: 'เกี่ยวกับเรา',
    shipping: 'การจัดส่ง',
    contact: 'ติดต่อ',
    newsletter: 'จดหมายข่าว',
    subscribe: 'สมัคร',
    welcomeChat: 'สวัสดี! ✨ ยินดีต้อนรับสู่ PureGlowBeauty ฉันเป็นผู้ช่วยด้านความงามส่วนตัวของคุณ',
    findTone: '🔍 ค้นหาโทนสีที่ใช่',
    skinConsult: '🌿 ปรึกษา Cruelty-Free',
    orderStatus: '📦 สถานะคำสั่งซื้อ',
    skinRecommend: '💄 แนะนำสำหรับผิวของฉัน'
  }
}

export const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  CNY: '¥'
}

export const currencyRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  CNY: 7.85
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  sv: 'Svenska',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية',
  tr: 'Türkçe',
  he: 'עברית',
  th: 'ไทย'
}

type StoreContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  currency: Currency
  setCurrency: (currency: Currency) => void
  language: Language
  setLanguage: (language: Language) => void
  t: (key: keyof Translations['en']) => string
  formatPrice: (price: number) => string
  isChatOpen: boolean
  setIsChatOpen: (open: boolean) => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  showWelcomePopup: boolean
  setShowWelcomePopup: (show: boolean) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [currency, setCurrency] = useState<Currency>('EUR')
  const [language, setLanguage] = useState<Language>('en')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePopup(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const t = (key: keyof Translations['en']) => translations[language][key]

  const formatPrice = (price: number) => {
    const converted = price * currencyRates[currency]
    return `${currencySymbols[currency]}${converted.toFixed(2)}`
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        currency,
        setCurrency,
        language,
        setLanguage,
        t,
        formatPrice,
        isChatOpen,
        setIsChatOpen,
        isCartOpen,
        setIsCartOpen,
        showWelcomePopup,
        setShowWelcomePopup
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
