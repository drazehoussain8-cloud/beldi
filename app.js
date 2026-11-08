(function () {
"use strict";

/* ================= إعدادات المطعم (غيّر هنا فقط) ================= */
var CFG = {
  phone: "+212689308962",
  phoneShow: "+212 6 89 30 89 62",
  wa: "212689308962",                 // تأكد أن هذا الرقم يعمل على واتساب
  email: "restautantbeldithepeople@gmail.com", // كما هو معروض في Tripadvisor (تأكد من الكتابة الصحيحة)
  lat: 31.5143029,
  lng: -9.7694458,
  logo: "img/logo.svg",
  faviconPng: "img/favicon.png",
  demo: true,                         // اجعله false بعد موافقة صاحب المطعم
  // الصور للمعاينة فقط من Tripadvisor. استبدلها بصور المطعم الأصلية قبل النشر
  images: [
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/a4/96/73/caption.jpg?w=1100&h=1100&s=1",cap:"ci"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/ac/e3/d9/caption.jpg?w=1100&h=1100&s=1",cap:"cf"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/72/5d/7e/caption.jpg?w=1100&h=1100&s=1",cap:"ct"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/a9/5f/59/caption.jpg?w=1100&h=1100&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/ac/e3/db/caption.jpg?w=1100&h=1100&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/80/2f/53/caption.jpg?w=1100&h=1100&s=1",cap:"cd"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/ae/01/a7/caption.jpg?w=1100&h=1100&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/31/fe/e6/caption.jpg?w=1100&h=1100&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/d7/f0/41/caption.jpg?w=1100&h=1100&s=1"}
  ]
};
// ساعات العمل (بتوقيت المغرب) بالدقائق: 540 = 09:00، 1320 = 22:00. الأحد=0 ... السبت=6
var OPEN = 540, CLOSE = 1320, HOURS = {0:[OPEN,CLOSE],1:[OPEN,CLOSE],2:[OPEN,CLOSE],3:[OPEN,CLOSE],4:[OPEN,CLOSE],5:[OPEN,CLOSE],6:[OPEN,CLOSE]};

// قائمة الطعام. الأسعار فارغة: اكتب السعر في p مثل "70" وسيظهر "70 DH" تلقائياً. v:1 = نباتي
var MENU = [
 {id:"mc1",icon:"salad",items:[
  {ar:"حريرة",fr:"Harira",en:"Harira soup",p:""},
  {ar:"زعلوك",fr:"Zaalouk",en:"Zaalouk (smoked aubergine salad)",p:""},
  {ar:"سلطات مغربية",fr:"Salades marocaines",en:"Moroccan salads",p:"",v:1},
  {ar:"بريوات بالجبن",fr:"Briouates au fromage",en:"Cheese briouats",p:"",v:1},
  {ar:"بريوات باللحم",fr:"Briouates à la viande",en:"Meat briouats",p:""}]},
 {id:"mc2",icon:"utensils",items:[
  {ar:"طاجين الدجاج بالبصل والزبيب",fr:"Tajine de poulet, oignons et raisins secs",en:"Chicken tagine with onions and raisins",p:""},
  {ar:"طاجين اللحم",fr:"Tajine d'agneau",en:"Lamb tagine",p:""},
  {ar:"طاجين الدجاج بالحامض",fr:"Tajine de poulet au citron",en:"Lemon chicken tagine",p:""},
  {ar:"طاجين كفتة السردين",fr:"Tajine de boulettes de sardine",en:"Sardine ball tagine",p:""}]},
 {id:"mc3",icon:"star",items:[
  {ar:"بسطيلة بالخضر",fr:"Pastilla végétarienne",en:"Vegetarian pastilla",p:"",v:1},
  {ar:"بسطيلة بالدجاج",fr:"Pastilla au poulet",en:"Chicken pastilla",p:""}]},
 {id:"mc4",icon:"bowl",items:[
  {ar:"كسكس",fr:"Couscous",en:"Couscous",p:""},
  {ar:"رفيسة",fr:"Rfissa",en:"Rfissa",p:""},
  {ar:"كفتة",fr:"Kefta",en:"Kefta",p:""}]},
 {id:"mc5",icon:"cup",items:[
  {ar:"عصير الأفوكادو باللوز",fr:"Jus d'avocat aux amandes",en:"Avocado and almond juice",p:"",v:1},
  {ar:"عصير التفاح الطازج",fr:"Jus de pomme frais",en:"Fresh apple juice",p:"",v:1},
  {ar:"أتاي بالنعناع",fr:"Thé à la menthe",en:"Mint tea",p:"",v:1}]}
];
/* ================================================================= */

var ICONS = {
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
  utensils:'<path d="M4 3v7a3 3 0 0 0 3 3v8"/><path d="M7 3v7"/><path d="M10 3v7a3 3 0 0 1-3 3"/><path d="M18 21V3c-2.5 1.5-4 4.5-4 8v2h4"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.7"/><path d="m21 15-4.5-4.5L6 21"/>',
  heart:'<path d="M12 21s-7.5-4.6-9.3-9.2C1.4 8.3 3.5 5 6.8 5c2 0 3.5 1.1 5.2 3 1.7-1.9 3.2-3 5.2-3 3.3 0 5.4 3.3 4.1 6.8C19.5 16.4 12 21 12 21z"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  chat:'<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20l1.2-5.3A8.4 8.4 0 1 1 21 11.5z"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 22c0-4 3-7 9-9"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  wifi:'<path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".6"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  calendar:'<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  nav:'<path d="m3 11 18-8-8 18-2-8z"/>',
  cup:'<path d="M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2.5v2M12 2.5v2"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10.5 21a2 2 0 0 0 3 0"/>',
  salad:'<path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 12c0-3 1.5-5 4-6 0 3 1 5 4 6"/>',
  bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-2 1-3 2-4M13 7c0-2 1-3 2-4"/>',
  tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3 8 7.5 9.5 4.5-1.5 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  up:'<path d="M12 19V5M6 11l6-6 6 6"/>',
  check:'<path d="m5 12 5 5 9-10"/>'
};

var I18N = {
fr:{
 t_home:"The People Beldi · Cuisine marocaine à Essaouira",
 d_home:"Restaurant familial dans la médina d'Essaouira : tajines, pastillas, couscous. Options végétariennes, végan et halal. Réservation WhatsApp.",
 t_menu:"Menu · The People Beldi",d_menu:"Tajines, pastillas, couscous, briouates et jus frais au restaurant The People Beldi, Essaouira.",
 t_gallery:"Galerie · The People Beldi",d_gallery:"Photos des plats et de l'intérieur de The People Beldi.",
 t_about:"À propos · The People Beldi",d_about:"Cuisine beldi faite maison, en famille, dans la médina d'Essaouira.",
 t_contact:"Contact & réservation · The People Beldi",d_contact:"Horaires, adresse dans la médina, téléphone, WhatsApp et réservation.",
 brand_sub:"Cuisine beldi · Essaouira",
 nav_home:"Accueil",nav_menu:"Menu",nav_gallery:"Galerie",nav_about:"À propos",nav_contact:"Contact",
 hero_eyebrow:"Médina d'Essaouira",hero_title:"La cuisine beldi, comme à la maison",
 hero_sub:"Tajines, pastillas et couscous préparés en famille, au cœur de la médina d'Essaouira.",
 cta_reserve:"Réserver sur WhatsApp",cta_menu:"Voir le menu",
 rate:"4,9 / 5 sur Tripadvisor",tc:"Travelers' Choice 2026",open_now:"Ouvert maintenant",closed_now:"Fermé actuellement",
 p1:"note Tripadvisor",p2:"avis voyageurs",p3:"parmi les meilleurs d'Essaouira",
 hl1_t:"Fait maison",hl1_d:"Une cuisine familiale, généreuse et pleine de saveurs.",
 hl2_t:"Tajines & pastillas",hl2_d:"Poulet, agneau, sardines, pastilla végétarienne ou au poulet.",
 hl3_t:"Pour tous les régimes",hl3_d:"Options végétariennes, végan et halal.",
 hl4_t:"Ouvert toute la journée",hl4_d:"Petit-déjeuner, déjeuner, dîner et brunch.",
 love_t:"Ce que les clients aiment",l1:"Tajines et pastilla",l2:"Portions généreuses",l3:"Accueil chaleureux",l4:"Prix raisonnables",l5:"Ambiance familiale",
 sig_t:"Nos plats signature",
 s1_t:"Tajine de poulet",s1_d:"Mijoté lentement, avec oignons et raisins secs ou citron.",
 s2_t:"Pastilla",s2_d:"Feuilletée et parfumée, en version végétarienne ou au poulet.",
 s3_t:"Couscous & rfissa",s3_d:"Des classiques marocains servis avec pain, olives et harissa.",
 visit_t:"Venez nous voir",hours_short:"Tous les jours · 09h00 – 22h00",
 cta_t:"Une table vous attend",cta_d:"Réservez en quelques secondes sur WhatsApp.",
 menu_t:"Notre carte",menu_d:"Cuisine beldi traditionnelle, préparée chaque jour.",
 mc1:"Soupes & entrées",mc2:"Tajines",mc3:"Pastillas",mc4:"Couscous & spécialités",mc5:"Boissons",
 sauce:"Servi avec du pain, des olives et de la harissa ou une sauce piment-citron.",leg_v:"Végétarien",
 note_menu:"Les plats peuvent varier selon les produits disponibles.",
 gal_t:"Galerie",gal_d:"Les plats et l'ambiance de la maison.",
 ci:"Intérieur",cf:"Plats",ct:"Tajine de poulet",cd:"Boissons",
 ab_t:"Notre histoire",ab_d:"Une petite adresse de famille, cachée dans la médina.",
 ab_p1:"The People Beldi est un petit restaurant familial situé dans une rue calme près du marché de la médina d'Essaouira. Quelques tables à l'intérieur et d'autres dehors, dans une ambiance simple et chaleureuse.",
 ab_p2:"Ici, on cuisine comme à la maison : tajines tendres, pastillas parfumées, couscous généreux. Les plats arrivent avec du pain, des olives et une harissa maison. Une cuisine beldi authentique, servie avec le sourire.",
 v1_t:"Fait maison",v1_d:"Des recettes familiales, préparées avec soin.",
 v2_t:"Accueil chaleureux",v2_d:"Une équipe souriante et attentionnée.",
 v3_t:"Une adresse à découvrir",v3_d:"Dans une rue tranquille, à deux pas du marché.",
 feat_t:"Bon à savoir",
 f1:"Cuisine marocaine",f2:"Végétarien friendly",f3:"Options végan",f4:"Halal",f5:"Wi‑Fi gratuit",f6:"Réservation possible",f7:"Service à table",f8:"Télévision",
 ct_t:"Contact & accès",ct_d:"Dans la médina d'Essaouira, rue Youssef Ibn Tachfine.",
 call:"Appeler",wa_l:"WhatsApp",mail_l:"Email",addr_l:"Adresse",addr_v:"Rue Youssef Ibn Tachfine, Médina (Mellah Kdim), Essaouira",addr_h:"Dans une rue calme près du marché : repérez le panneau du menu.",
 hrs_l:"Horaires d'ouverture",closed:"Fermé",dir:"Itinéraire",
 res_t:"Réserver une table",fn:"Nom",fd:"Date",ft:"Heure",fg:"Personnes",send:"Envoyer sur WhatsApp",
 res_n:"Votre demande s'ouvre dans WhatsApp ; le restaurant confirme par message.",
 wa_hello:"Bonjour, je souhaite réserver une table chez The People Beldi.",
 wa_form:"Bonjour, je souhaite réserver une table.\nNom : {n}\nDate : {d}\nHeure : {t}\nPersonnes : {g}",
 foot_about:"Cuisine beldi faite maison, en famille, dans la médina d'Essaouira.",foot_nav:"Navigation",foot_contact:"Contact",foot_hours:"Horaires",foot_top:"Haut de page",
 foot_demo:"Aperçu de design",rights:"© 2026 The People Beldi",
 d0:"Dimanche",d1:"Lundi",d2:"Mardi",d3:"Mercredi",d4:"Jeudi",d5:"Vendredi",d6:"Samedi"
},
en:{
 t_home:"The People Beldi · Moroccan home cooking in Essaouira",
 d_home:"Family-run restaurant in Essaouira's medina: tagines, pastillas, couscous. Vegetarian, vegan and halal options. WhatsApp booking.",
 t_menu:"Menu · The People Beldi",d_menu:"Tagines, pastillas, couscous, briouats and fresh juices at The People Beldi, Essaouira.",
 t_gallery:"Gallery · The People Beldi",d_gallery:"Photos of the food and interior at The People Beldi.",
 t_about:"About · The People Beldi",d_about:"Homemade beldi cooking by a family in Essaouira's medina.",
 t_contact:"Contact & booking · The People Beldi",d_contact:"Opening hours, address in the medina, phone, WhatsApp and table booking.",
 brand_sub:"Beldi cuisine · Essaouira",
 nav_home:"Home",nav_menu:"Menu",nav_gallery:"Gallery",nav_about:"About",nav_contact:"Contact",
 hero_eyebrow:"Essaouira medina",hero_title:"Beldi cooking, just like home",
 hero_sub:"Tagines, pastillas and couscous cooked by a family, in the heart of Essaouira's medina.",
 cta_reserve:"Book on WhatsApp",cta_menu:"See the menu",
 rate:"4.9 / 5 on Tripadvisor",tc:"Travelers' Choice 2026",open_now:"Open now",closed_now:"Closed now",
 p1:"Tripadvisor rating",p2:"traveller reviews",p3:"among Essaouira's best",
 hl1_t:"Homemade",hl1_d:"Generous family cooking, full of flavour.",
 hl2_t:"Tagines & pastillas",hl2_d:"Chicken, lamb, sardines, vegetarian or chicken pastilla.",
 hl3_t:"For every diet",hl3_d:"Vegetarian, vegan and halal options.",
 hl4_t:"Open all day",hl4_d:"Breakfast, lunch, dinner and brunch.",
 love_t:"What guests love",l1:"Tagines and pastilla",l2:"Generous portions",l3:"Warm welcome",l4:"Fair prices",l5:"Family atmosphere",
 sig_t:"Signature dishes",
 s1_t:"Chicken tagine",s1_d:"Slow-cooked, with onions and raisins or lemon.",
 s2_t:"Pastilla",s2_d:"Flaky and fragrant, vegetarian or with chicken.",
 s3_t:"Couscous & rfissa",s3_d:"Moroccan classics served with bread, olives and harissa.",
 visit_t:"Come and visit",hours_short:"Every day · 09:00 – 22:00",
 cta_t:"A table is waiting for you",cta_d:"Book in seconds on WhatsApp.",
 menu_t:"Our menu",menu_d:"Traditional beldi cooking, made fresh every day.",
 mc1:"Soups & starters",mc2:"Tagines",mc3:"Pastillas",mc4:"Couscous & specialties",mc5:"Drinks",
 sauce:"Served with bread, olives and harissa or a chilli-lime sauce.",leg_v:"Vegetarian",
 note_menu:"Dishes may vary depending on available produce.",
 gal_t:"Gallery",gal_d:"The food and the atmosphere of the house.",
 ci:"Interior",cf:"Food",ct:"Chicken tagine",cd:"Drinks",
 ab_t:"Our story",ab_d:"A small family place, tucked away in the medina.",
 ab_p1:"The People Beldi is a small family-run restaurant on a quiet street near the market in Essaouira's medina. A few tables inside and some outside, in a simple, welcoming atmosphere.",
 ab_p2:"Here we cook like at home: tender tagines, fragrant pastillas, generous couscous. Dishes come with bread, olives and homemade harissa. Authentic beldi cooking, served with a smile.",
 v1_t:"Homemade",v1_d:"Family recipes, prepared with care.",
 v2_t:"Warm welcome",v2_d:"A friendly and attentive team.",
 v3_t:"A place to discover",v3_d:"On a quiet street, steps from the market.",
 feat_t:"Good to know",
 f1:"Moroccan cuisine",f2:"Vegetarian friendly",f3:"Vegan options",f4:"Halal",f5:"Free Wi‑Fi",f6:"Reservations accepted",f7:"Table service",f8:"Television",
 ct_t:"Contact & directions",ct_d:"In Essaouira's medina, on Rue Youssef Ibn Tachfine.",
 call:"Call",wa_l:"WhatsApp",mail_l:"Email",addr_l:"Address",addr_v:"Rue Youssef Ibn Tachfine, Medina (Mellah Kdim), Essaouira",addr_h:"On a quiet street near the market: look for the menu board.",
 hrs_l:"Opening hours",closed:"Closed",dir:"Get directions",
 res_t:"Book a table",fn:"Name",fd:"Date",ft:"Time",fg:"Guests",send:"Send on WhatsApp",
 res_n:"Your request opens in WhatsApp; the restaurant confirms by message.",
 wa_hello:"Hello, I'd like to book a table at The People Beldi.",
 wa_form:"Hello, I'd like to book a table.\nName: {n}\nDate: {d}\nTime: {t}\nGuests: {g}",
 foot_about:"Homemade beldi cooking by a family in Essaouira's medina.",foot_nav:"Navigation",foot_contact:"Contact",foot_hours:"Opening hours",foot_top:"Back to top",
 foot_demo:"Design preview",rights:"© 2026 The People Beldi",
 d0:"Sunday",d1:"Monday",d2:"Tuesday",d3:"Wednesday",d4:"Thursday",d5:"Friday",d6:"Saturday"
},
ar:{
 t_home:"ذا بيبل بلدي · طبخ مغربي بيتي في الصويرة",
 d_home:"مطعم عائلي في المدينة العتيقة بالصويرة: طواجن وبسطيلة وكسكس. خيارات نباتية وحلال. حجز عبر واتساب.",
 t_menu:"القائمة · ذا بيبل بلدي",d_menu:"طواجن وبسطيلة وكسكس وبريوات وعصائر طازجة في مطعم ذا بيبل بلدي بالصويرة.",
 t_gallery:"المعرض · ذا بيبل بلدي",d_gallery:"صور الأطباق وداخل مطعم ذا بيبل بلدي.",
 t_about:"عنّا · ذا بيبل بلدي",d_about:"طبخ بلدي منزلي تعدّه عائلة في المدينة العتيقة بالصويرة.",
 t_contact:"التواصل والحجز · ذا بيبل بلدي",d_contact:"ساعات العمل والعنوان في المدينة العتيقة والهاتف وواتساب وحجز الطاولات.",
 brand_sub:"مطبخ بلدي · الصويرة",
 nav_home:"الرئيسية",nav_menu:"القائمة",nav_gallery:"المعرض",nav_about:"عنّا",nav_contact:"تواصل",
 hero_eyebrow:"المدينة العتيقة · الصويرة",hero_title:"طبخ بلدي كأنك في البيت",
 hero_sub:"طواجن وبسطيلة وكسكس تُحضَّر بأيدٍ عائلية في قلب المدينة العتيقة بالصويرة.",
 cta_reserve:"احجز عبر واتساب",cta_menu:"شاهد القائمة",
 rate:"4.9 من 5 على Tripadvisor",tc:"Travelers' Choice 2026",open_now:"مفتوح الآن",closed_now:"مغلق حالياً",
 p1:"تقييم Tripadvisor",p2:"تقييم من الزوار",p3:"من أفضل مطاعم الصويرة",
 hl1_t:"منزلي",hl1_d:"طبخ عائلي سخي ومليء بالنكهة.",
 hl2_t:"طواجن وبسطيلة",hl2_d:"دجاج ولحم وسردين، وبسطيلة نباتية أو بالدجاج.",
 hl3_t:"لكل الأنظمة الغذائية",hl3_d:"خيارات نباتية ونباتية صرفة وحلال.",
 hl4_t:"مفتوح طوال اليوم",hl4_d:"فطور وغداء وعشاء وبرانش.",
 love_t:"ما يحبه الزبائن",l1:"الطواجن والبسطيلة",l2:"حصص سخية",l3:"استقبال دافئ",l4:"أسعار معقولة",l5:"أجواء عائلية",
 sig_t:"أطباقنا المميزة",
 s1_t:"طاجين الدجاج",s1_d:"مطبوخ على نار هادئة بالبصل والزبيب أو بالحامض.",
 s2_t:"البسطيلة",s2_d:"هشة وعطرة، بالخضر أو بالدجاج.",
 s3_t:"الكسكس والرفيسة",s3_d:"أطباق مغربية كلاسيكية تُقدَّم مع الخبز والزيتون والهريسة.",
 visit_t:"زورونا",hours_short:"كل يوم · 09:00 – 22:00",
 cta_t:"طاولتك في انتظارك",cta_d:"احجز في ثوانٍ عبر واتساب.",
 menu_t:"قائمتنا",menu_d:"طبخ بلدي تقليدي يُحضَّر طازجاً كل يوم.",
 mc1:"شوربات ومقبلات",mc2:"الطواجن",mc3:"البسطيلة",mc4:"كسكس وأطباق خاصة",mc5:"المشروبات",
 sauce:"تُقدَّم مع الخبز والزيتون والهريسة أو صلصة الحامض والفلفل.",leg_v:"نباتي",
 note_menu:"قد تختلف الأطباق حسب المنتجات المتوفرة.",
 gal_t:"المعرض",gal_d:"أطباق البيت وأجواؤه.",
 ci:"الداخل",cf:"الأطباق",ct:"طاجين الدجاج",cd:"المشروبات",
 ab_t:"قصتنا",ab_d:"مكان عائلي صغير، مختبئ في المدينة العتيقة.",
 ab_p1:"ذا بيبل بلدي مطعم عائلي صغير في زقاق هادئ قرب السوق في المدينة العتيقة بالصويرة. بعض الطاولات في الداخل وأخرى في الخارج، بأجواء بسيطة ودافئة.",
 ab_p2:"نطبخ هنا كما في البيت: طواجن طرية وبسطيلة عطرة وكسكس سخي. وتصل الأطباق مع الخبز والزيتون وهريسة منزلية. مطبخ بلدي أصيل يُقدَّم بابتسامة.",
 v1_t:"منزلي",v1_d:"وصفات عائلية تُحضَّر بعناية.",
 v2_t:"استقبال دافئ",v2_d:"فريق مبتسم ومهتم بالزبائن.",
 v3_t:"مكان يستحق الاكتشاف",v3_d:"في زقاق هادئ، على بُعد خطوات من السوق.",
 feat_t:"معلومات مفيدة",
 f1:"مطبخ مغربي",f2:"مناسب للنباتيين",f3:"خيارات نباتية صرفة",f4:"حلال",f5:"واي فاي مجاني",f6:"إمكانية الحجز",f7:"خدمة على الطاولة",f8:"تلفاز",
 ct_t:"التواصل والموقع",ct_d:"في المدينة العتيقة بالصويرة، شارع يوسف بن تاشفين.",
 call:"اتصل",wa_l:"واتساب",mail_l:"البريد",addr_l:"العنوان",addr_v:"شارع يوسف بن تاشفين، المدينة العتيقة (الملاح القديم)، الصويرة",addr_h:"في زقاق هادئ قرب السوق: ابحث عن لوحة القائمة.",
 hrs_l:"ساعات العمل",closed:"مغلق",dir:"الاتجاهات",
 res_t:"احجز طاولة",fn:"الاسم",fd:"التاريخ",ft:"الوقت",fg:"عدد الأشخاص",send:"أرسل عبر واتساب",
 res_n:"يُفتح طلبك في واتساب ويؤكد المطعم الحجز برسالة.",
 wa_hello:"السلام عليكم، أريد حجز طاولة في ذا بيبل بلدي.",
 wa_form:"السلام عليكم، أريد حجز طاولة.\nالاسم: {n}\nالتاريخ: {d}\nالوقت: {t}\nعدد الأشخاص: {g}",
 foot_about:"طبخ بلدي منزلي تعدّه عائلة في المدينة العتيقة بالصويرة.",foot_nav:"التنقل",foot_contact:"التواصل",foot_hours:"ساعات العمل",foot_top:"إلى الأعلى",
 foot_demo:"معاينة تصميم",rights:"© 2026 ذا بيبل بلدي",
 d0:"الأحد",d1:"الاثنين",d2:"الثلاثاء",d3:"الأربعاء",d4:"الخميس",d5:"الجمعة",d6:"السبت"
}};

var LANGS = ["ar","fr","en"];
var PAGE = document.body.getAttribute("data-page") || "home";
var NAV = [["home","index.html","home"],["menu","menu.html","utensils"],["gallery","gallery.html","image"],["about","about.html","heart"],["contact","contact.html","chat"]];
var lang = "fr", T = I18N.fr, io = null;

function svg(n, cls){return '<svg class="ic '+(cls||"")+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[n]||"")+'</svg>';}
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}

function pickLang(){
  var q = null;
  try{q = new URLSearchParams(location.search).get("lang");}catch(e){}
  if(LANGS.indexOf(q)>-1) return q;
  try{var s = localStorage.getItem("beldi_lang"); if(LANGS.indexOf(s)>-1) return s;}catch(e){}
  var n = (navigator.language||"fr").slice(0,2).toLowerCase();
  return LANGS.indexOf(n)>-1 ? n : "fr";
}

/* ---------- shell ---------- */
function buildShell(){
  var links = NAV.map(function(n){return '<a href="'+n[1]+'" class="'+(n[0]===PAGE?"on":"")+'" data-t="nav_'+n[0]+'"></a>';}).join("");
  var tabs = NAV.map(function(n){return '<a href="'+n[1]+'" class="'+(n[0]===PAGE?"on":"")+'">'+svg(n[2])+'<span data-t="nav_'+n[0]+'"></span></a>';}).join("");
  var langs = LANGS.map(function(l){return '<button type="button" data-l="'+l+'" aria-label="'+l+'">'+l.toUpperCase()+'</button>';}).join("");
  var head = document.createElement("header");
  head.className = "top";
  head.innerHTML = '<div class="wrap bar"><a class="brand" href="index.html"><span class="logo">B</span><span class="bn"><b>The People Beldi</b><small data-t="brand_sub"></small></span></a>'+
    '<nav class="dnav" aria-label="Main">'+links+'</nav><div class="langs" role="group" aria-label="Language">'+langs+'</div></div>';
  document.body.insertBefore(head, document.body.firstChild);

  var tab = document.createElement("nav");
  tab.className = "tabbar"; tab.setAttribute("aria-label","Main");
  tab.innerHTML = tabs;
  document.body.appendChild(tab);

  if(PAGE !== "contact"){
    var fab = document.createElement("a");
    fab.className = "fab"; fab.setAttribute("data-wa",""); fab.setAttribute("target","_blank"); fab.setAttribute("rel","noopener"); fab.setAttribute("aria-label","WhatsApp");
    fab.innerHTML = svg("chat");
    document.body.appendChild(fab);
  }

  var foot = document.createElement("footer");
  foot.className = "foot";
  var flinks = NAV.map(function(n){return '<li><a href="'+n[1]+'" data-t="nav_'+n[0]+'"></a></li>';}).join("");
  foot.innerHTML =
    '<div class="wrap">'+
      '<div class="foot-top"><a class="brand" href="index.html"><span class="logo">B</span><span class="bn"><b>The People Beldi</b><small data-t="brand_sub"></small></span></a>'+
        '<p data-t="foot_about"></p>'+
        '<a class="btn wa" data-wa target="_blank" rel="noopener">'+svg("chat")+'<span data-t="cta_reserve"></span></a></div>'+
      '<div class="foot-grid">'+
        '<div><h4 data-t="foot_nav"></h4><ul>'+flinks+'</ul></div>'+
        '<div><h4 data-t="foot_contact"></h4><ul>'+
          '<li>'+svg("pin")+'<span data-t="addr_v"></span></li>'+
          '<li>'+svg("phone")+'<a data-tel data-phone-show></a></li>'+
          '<li>'+svg("mail")+'<a data-mail data-email-show style="word-break:break-all"></a></li></ul></div>'+
        '<div><h4 data-t="foot_hours"></h4><ul>'+
          '<li>'+svg("clock")+'<span data-t="hours_short"></span></li>'+
          '<li><span class="status js-status"></span></li></ul></div>'+
      '</div>'+
      '<div class="foot-bottom"><span data-t="rights"></span>'+(CFG.demo?'<span class="demo" data-t="foot_demo"></span>':'')+
        '<button type="button" class="totop"><span data-t="foot_top"></span>'+svg("up")+'</button></div>'+
    '</div>';
  var main = $("main"); main.parentNode.insertBefore(foot, main.nextSibling);
  $(".totop",foot).addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});

  $$("i[data-i]").forEach(function(el){el.innerHTML = svg(el.getAttribute("data-i"));});
  $$(".langs button").forEach(function(b){b.addEventListener("click",function(){setLang(b.getAttribute("data-l"));});});
}

/* ---------- open status (Morocco time) ---------- */
function nowMA(){
  var p = new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Casablanca",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()), o = {};
  p.forEach(function(x){o[x.type]=x.value;});
  var map = {Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  return {day:map[o.weekday], min:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)};
}
function isOpen(){var n=nowMA(), h=HOURS[n.day]; return !!h && n.min>=h[0] && n.min<h[1];}
function renderStatus(){
  $$(".js-status").forEach(function(el){var o=isOpen(); el.innerHTML='<span class="dot '+(o?"on":"")+'"></span>'+(o?T.open_now:T.closed_now);});
}
function buildHours(){
  var ul = $("#hours"); if(!ul) return;
  var today = nowMA().day;
  ul.innerHTML = [1,2,3,4,5,6,0].map(function(d){
    var h = HOURS[d];
    return '<li class="'+(d===today?"today":"")+'"><span data-t="d'+d+'"></span><span>'+(h?"09:00 – 22:00":'<em data-t="closed" style="font-style:normal"></em>')+'</span></li>';
  }).join("");
}

/* ---------- menu ---------- */
function buildMenu(){
  var box = $("#menuBox"); if(!box) return;
  var nav = $("#menuNav");
  if(nav) nav.innerHTML = '<div class="wrap">'+MENU.map(function(c){return '<a href="#'+c.id+'" data-t="'+c.id+'"></a>';}).join("")+'</div>';
  box.innerHTML = MENU.map(function(c,ci){
    return '<section class="mcat rv" id="'+c.id+'"><h2><span class="ico-c">'+svg(c.icon)+'</span><span data-t="'+c.id+'"></span></h2>'+
      '<ul class="card mlist">'+c.items.map(function(it,ii){
        return '<li><span class="nm"><span data-mi="'+ci+'.'+ii+'"></span>'+(it.v?'<span class="tag-v" title="V">'+svg("leaf")+'</span>':'')+'</span><span class="dots"></span><span class="pr">'+(it.p?it.p+' DH':'')+'</span></li>';
      }).join("")+'</ul></section>';
  }).join("");
}
function fillMenu(){
  $$("[data-mi]").forEach(function(el){
    var k = el.getAttribute("data-mi").split(".");
    el.textContent = MENU[k[0]].items[k[1]][lang];
  });
}

/* ---------- gallery & photo strip ---------- */
function buildGallery(){
  var g = $("#galleryGrid"); if(!g) return;
  var icons = ["home","utensils","bowl","cup","salad","leaf","star","heart","users"];
  g.innerHTML = CFG.images.map(function(im,i){
    return '<div class="tile rv has" data-src="'+im.src+'"><span class="big">'+svg(icons[i%icons.length])+'</span><img loading="lazy" referrerpolicy="no-referrer" src="'+im.src+'" alt="">'+(im.cap?'<span class="cap" data-t="'+im.cap+'"></span>':'')+'</div>';
  }).join("");
  var lb = document.createElement("div"); lb.className="lb"; lb.innerHTML='<img alt="">'; document.body.appendChild(lb);
  lb.addEventListener("click",function(){lb.classList.remove("on");});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on");});
  $$(".tile",g).forEach(function(t){
    var img = $("img",t);
    img.addEventListener("error",function(){t.classList.remove("has");t.removeAttribute("data-src");img.remove();});
    t.addEventListener("click",function(){if(!t.classList.contains("has"))return;$("img",lb).src=t.getAttribute("data-src");lb.classList.add("on");});
  });
}
function buildStrip(){
  var s = $("#strip"); if(!s || CFG.images.length<3) return;
  s.innerHTML = [1,2,0].map(function(i){return '<a class="rv" href="gallery.html"><img loading="lazy" referrerpolicy="no-referrer" src="'+CFG.images[i].src+'" alt=""></a>';}).join("");
  $$("img",s).forEach(function(img){img.addEventListener("error",function(){img.parentNode.style.display="none";});});
}

/* ---------- translate ---------- */
function setLinks(){
  var msg = encodeURIComponent(T.wa_hello);
  $$("[data-wa]").forEach(function(a){a.href="https://wa.me/"+CFG.wa+"?text="+msg;});
  $$("[data-tel]").forEach(function(a){a.href="tel:"+CFG.phone;});
  $$("[data-mail]").forEach(function(a){a.href="mailto:"+CFG.email;});
  $$("[data-dir]").forEach(function(a){a.href="https://www.google.com/maps/dir/?api=1&destination="+CFG.lat+","+CFG.lng;});
  $$("[data-phone-show]").forEach(function(el){el.textContent=CFG.phoneShow;});
  $$("[data-email-show]").forEach(function(el){el.textContent=CFG.email;});
}
function apply(){
  T = I18N[lang];
  var h = document.documentElement;
  h.lang = lang; h.dir = lang==="ar" ? "rtl" : "ltr";
  $$("[data-t]").forEach(function(el){var v=T[el.getAttribute("data-t")]; if(v!=null) el.textContent=v;});
  document.title = T["t_"+PAGE] || document.title;
  var md = $('meta[name="description"]'); if(md) md.setAttribute("content", T["d_"+PAGE]||"");
  $$(".langs button").forEach(function(b){b.classList.toggle("on", b.getAttribute("data-l")===lang);});
  fillMenu(); setLinks(); renderStatus();
}
function setLang(l){
  lang = l;
  try{localStorage.setItem("beldi_lang",l);}catch(e){}
  apply();
}

/* ---------- reservation form -> WhatsApp ---------- */
function initForm(){
  var f = $("#resForm"); if(!f) return;
  var d = f.elements.date;
  if(d){var n=new Date(); d.min = n.getFullYear()+"-"+("0"+(n.getMonth()+1)).slice(-2)+"-"+("0"+n.getDate()).slice(-2);}
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var v = f.elements;
    var m = T.wa_form.replace("{n}",v.name.value.trim()).replace("{d}",v.date.value).replace("{t}",v.time.value).replace("{g}",v.guests.value);
    window.open("https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(m),"_blank","noopener");
  });
}

/* ---------- logo / favicon ---------- */
function applyLogo(){
  var head = document.head;
  if(CFG.faviconPng){
    var og = document.createElement("meta"); og.setAttribute("property","og:image"); og.content = CFG.faviconPng; head.appendChild(og);
  }
  if(!CFG.logo) return;
  var im = new Image();
  im.onload = function(){
    $$(".logo").forEach(function(el){el.classList.add("has"); el.innerHTML='<img src="'+CFG.logo+'" alt="The People Beldi">';});
  };
  im.src = CFG.logo;
}

/* ---------- light scroll reveal ---------- */
function reveal(){
  var els = $$(".rv");
  if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in");});return;}
  io = new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);}});},{threshold:.1,rootMargin:"0px 0px -4% 0px"});
  els.forEach(function(e){io.observe(e);});
}

/* ---------- init ---------- */
document.documentElement.classList.add("js");
lang = pickLang();
buildShell(); buildHours(); buildMenu(); buildGallery(); buildStrip(); initForm();
apply(); reveal(); applyLogo();
setInterval(renderStatus, 60000);
})();
