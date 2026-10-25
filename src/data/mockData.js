// Mock data for DepoTap prototype in Azerbaijani
export const INITIAL_USERS = [
  {
    id: "user-1",
    name: "Leyla Məmmədova",
    email: "leyla@example.com",
    phone: "+994 50 234 56 78",
    city: "Bakı",
    role: "customer", // 'customer' | 'provider' | 'both' | 'admin'
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Ev təmiri zamanı mebel və bəzi şəxsi əşyaları saxlamaq üçün etibarlı yer axtaran müştəri.",
    createdAt: "2024-01-15"
  },
  {
    id: "user-2",
    name: "Elmir Qasımov",
    email: "elmir@depotap.az",
    phone: "+994 55 876 54 32",
    city: "Bakı",
    role: "provider",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Nərimanov və Xətai rayonlarında xüsusi havalandırmalı və qorunan qaraj və anbar sahələrinin sahibiyəm.",
    verified: true,
    rating: 4.9,
    reviewsCount: 38,
    createdAt: "2023-11-20"
  },
  {
    id: "user-3",
    name: "Rəşad Kərimov",
    email: "reshad@example.com",
    phone: "+994 70 333 22 11",
    city: "Bakı",
    role: "both",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Həm ehtiyat anbar yerlərimi icarəyə verirəm, həm də mövsümi idman ləvazimatlarım üçün saxlanc yeri icarələyirəm.",
    verified: true,
    rating: 4.8,
    reviewsCount: 19,
    createdAt: "2024-02-10"
  },
  {
    id: "user-admin",
    name: "Sistem Admini",
    email: "admin@depotap.az",
    phone: "+994 12 555 43 21",
    city: "Bakı",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    bio: "DepoTap platformasının baş administratoru.",
    createdAt: "2023-01-01"
  }
];

export const INITIAL_LISTINGS = [
  {
    id: "listing-101",
    providerId: "user-2",
    providerName: "Elmir Qasımov",
    providerPhone: "+994 55 876 54 32",
    providerRating: 4.9,
    title: "Nərimanovda İqlim Nəzarətli Şəxsi Saxlanc Otağı",
    storageType: "saxlanc_otagi", // saxlanc_otagi, qaraj, anbar, konteyner
    city: "Bakı",
    district: "Nərimanov",
    address: "Təbriz küçəsi 44, Metro Nərimanov yaxınlığı",
    description: "Müasir biznes mərkəzinin daxilində yerləşən, ilboyu sabit 20-22°C temperatur və rütubət nəzarəti təmin olunan təmiz və təhlükəsiz fərdi otaq. Elektronika, sənədlər, incəsənət əşyaları və mebellər üçün idealdır.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    totalArea: 18, // m²
    availableArea: 14, // m²
    availableVolume: 35, // m³
    maxWeight: 2500, // kg
    doorDimensions: { width: 140, height: 220 }, // cm
    climate: {
      type: "heated_and_cooled", // ordinary, heated, cooled, heated_and_cooled
      label: "Sabit İstilik və Soyutma (20°C - 22°C)",
      humidityControl: true,
      ventilation: true
    },
    security: [
      "24/7 Video Nəzarət",
      "Elektron RFID Giriş",
      "Yanğın Əleyhinə Sprinkler",
      "Mühafizə Xidməti",
      "Siqnalizasiya"
    ],
    pricePerDay: 8.50,
    pricePerMonth: 220.00,
    minDurationDays: 3,
    maxDurationDays: 365,
    allowFragile: true,
    fragileHandlingEquipment: "Qoruyucu altlıqlar, rəflər, yumşaq döşəmə mövcuddur.",
    restrictedItems: ["Tezalışan mayelər", "Kimyəvi maddələr", "Canlı heyvanlar"],
    accessHours: "Hər gün 08:00 - 22:00",
    published: true,
    featured: true,
    rating: 4.95,
    reviewCount: 24,
    createdAt: "2024-03-01"
  },
  {
    id: "listing-102",
    providerId: "user-2",
    providerName: "Elmir Qasımov",
    providerPhone: "+994 55 876 54 32",
    providerRating: 4.9,
    title: "Xətaidə Geniş Quru Qaraj və Saxlanc Sahəsi",
    storageType: "qaraj",
    city: "Bakı",
    district: "Xətai",
    address: "Babək prospekti 12B, Həzi Aslanov metrosu yaxınlığı",
    description: "Avtomobil, motosiklet, tikinti materialları və böyük həcmli mebellər üçün tam quru, beton döşəməli və möhkəm dəmir darvazalı qaraj sahəsi. Yük avtomobillərinin birbaşa giriş imkanı var.",
    images: [
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580983561371-7f4b242d8ec0?w=800&auto=format&fit=crop&q=80"
    ],
    totalArea: 28,
    availableArea: 24,
    availableVolume: 65,
    maxWeight: 6000,
    doorDimensions: { width: 280, height: 240 },
    climate: {
      type: "ordinary",
      label: "Təbii Havalandırma (Otaq Temperaturu)",
      humidityControl: false,
      ventilation: true
    },
    security: [
      "Fərdi Açar və Qıfıl",
      "Həyət Kamera Nəzarəti",
      "Gecə İşıqlandırılması",
      "Şlaqbaumlu Giriş"
    ],
    pricePerDay: 6.00,
    pricePerMonth: 160.00,
    minDurationDays: 7,
    maxDurationDays: 365,
    allowFragile: false,
    fragileHandlingEquipment: "Böyük həcmli və dözümlü qutular üçün uyğundur.",
    restrictedItems: ["Partlayıcı maddələr", "Açıq yanacaq"],
    accessHours: "24 saat sərbəst giriş",
    published: true,
    featured: true,
    rating: 4.82,
    reviewCount: 16,
    createdAt: "2024-02-15"
  },
  {
    id: "listing-103",
    providerId: "user-3",
    providerName: "Rəşad Kərimov",
    providerPhone: "+994 70 333 22 11",
    providerRating: 4.8,
    title: "Yasamalda Modern Rəfli Kiçik Saxlanc Boksu",
    storageType: "saxlanc_otagi",
    city: "Bakı",
    district: "Yasamal",
    address: "Zahid Xəlilov küçəsi 68, Elmlər Akademiyası metrosu",
    description: "Tələbələr, ev təmiri edənlər və mövsümi əşyalarını (velosiped, qış təkərləri, qış geyimləri) saxlamaq istəyənlər üçün ideal kompakt boks. Qızdırılan və quru mühit.",
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    ],
    totalArea: 8,
    availableArea: 6,
    availableVolume: 16,
    maxWeight: 1200,
    doorDimensions: { width: 100, height: 210 },
    climate: {
      type: "heated",
      label: "Qızdırılan və Quru Sahə (18°C+)",
      humidityControl: true,
      ventilation: true
    },
    security: [
      "Kodlu Elektron Qıfıl",
      "Daxili Kamera",
      "Giriş Nəzarəti",
      "Həyət Mühafizəsi"
    ],
    pricePerDay: 4.50,
    pricePerMonth: 110.00,
    minDurationDays: 2,
    maxDurationDays: 180,
    allowFragile: true,
    fragileHandlingEquipment: "Metaldan hazırlanmış xüsusi rəflər və qoruyucu bucaqlıqlar.",
    restrictedItems: ["Qida məhsulları", "Tez xarab olan mallar"],
    accessHours: "07:00 - 23:00",
    published: true,
    featured: false,
    rating: 4.88,
    reviewCount: 31,
    createdAt: "2024-03-10"
  },
  {
    id: "listing-104",
    providerId: "user-2",
    providerName: "Elmir Qasımov",
    providerPhone: "+994 55 876 54 32",
    providerRating: 4.9,
    title: "Dərnəgüldə İri Həcmli Logistika və Kommersiya Anbarı",
    storageType: "anbar",
    city: "Bakı",
    district: "Binəqədi",
    address: "Dərnəgül şosesi, Taxta bazarı yaxınlığı",
    description: "Kiçik və orta sahibkarlıq subyektləri üçün hündür tavanlı (4.5m), rampa çıxışı olan, forklift və yükləyici xidməti təklif edən rəsmi mühafizəli anbar sahəsi.",
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=800&auto=format&fit=crop&q=80"
    ],
    totalArea: 120,
    availableArea: 85,
    availableVolume: 350,
    maxWeight: 30000,
    doorDimensions: { width: 400, height: 420 },
    climate: {
      type: "ordinary",
      label: "Standart Anbar Mühiti və Ventilyasiya",
      humidityControl: false,
      ventilation: true
    },
    security: [
      "24/7 Mühafizə Postu",
      "360 dərəcə HD Kameralar",
      "Yanğınsöndürmə Sistemi",
      "TIR və Yük maşını rampası"
    ],
    pricePerDay: 28.00,
    pricePerMonth: 750.00,
    minDurationDays: 14,
    maxDurationDays: 730,
    allowFragile: true,
    fragileHandlingEquipment: "Palet altlıqları və forkliftlə ehtiyatlı boşaltma.",
    restrictedItems: ["Zəhərli və radioaktiv maddələr"],
    accessHours: "24/7 rejim",
    published: true,
    featured: true,
    rating: 4.91,
    reviewCount: 42,
    createdAt: "2024-01-20"
  },
  {
    id: "listing-105",
    providerId: "user-3",
    providerName: "Rəşad Kərimov",
    providerPhone: "+994 70 333 22 11",
    providerRating: 4.8,
    title: "Səbaildə Dənizkənarı Yaxınlığında Mini Saxlanc",
    storageType: "saxlanc_otagi",
    city: "Bakı",
    district: "Səbail",
    address: "Bayıl qəsəbəsi, Qurban Abbasov küçəsi",
    description: "Mənzilinizdə yer tutan arxiv qovluqları, çamadanlar, bayram bəzəkləri və kitablar üçün quru, kondisionerli və qorunan mini saxlanc kabineti.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80"
    ],
    totalArea: 10,
    availableArea: 8,
    availableVolume: 20,
    maxWeight: 1500,
    doorDimensions: { width: 110, height: 210 },
    climate: {
      type: "cooled",
      label: "Kondisionerli və Rütubətsiz (Yayda Sərin)",
      humidityControl: true,
      ventilation: true
    },
    security: [
      "Kamera Sistemi",
      "Ağıllı Qapı Qıfılı (PIN)",
      "Siqnalizasiya"
    ],
    pricePerDay: 5.50,
    pricePerMonth: 140.00,
    minDurationDays: 5,
    maxDurationDays: 180,
    allowFragile: true,
    fragileHandlingEquipment: "Yumşaq örtüklü rəflər.",
    restrictedItems: ["Mayelər", "Qoxulu maddələr"],
    accessHours: "08:00 - 21:00",
    published: true,
    featured: false,
    rating: 4.75,
    reviewCount: 12,
    createdAt: "2024-03-12"
  },
  {
    id: "listing-106",
    providerId: "user-2",
    providerName: "Elmir Qasımov",
    providerPhone: "+994 55 876 54 32",
    providerRating: 4.9,
    title: "Sumqayıt Sülh Küçəsində İzolasiyalı Dəniz Konteyneri",
    storageType: "konteyner",
    city: "Sumqayıt",
    district: "Sülh küçəsi",
    address: "Sülh küçəsi döngə 4, Mərkəzi giriş",
    description: "40 futluq tam hermetik, xüsusi istilik izolyasiyası edilmiş dəniz konteyneri. Şəxsi həyətdə yerləşir, qıfılı yalnız icarəçidə qalır. Təmir ləvazimatları üçün əla seçimdir.",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
    ],
    totalArea: 30,
    availableArea: 25,
    availableVolume: 70,
    maxWeight: 10000,
    doorDimensions: { width: 230, height: 230 },
    climate: {
      type: "ordinary",
      label: "Təbii İzolasiyalı Mühit",
      humidityControl: false,
      ventilation: true
    },
    security: [
      "Ağır Dəmir Bolt Qıfıl",
      "Perimetr İşıqlandırması",
      "Həyət İti və Nəzarətçi"
    ],
    pricePerDay: 5.00,
    pricePerMonth: 130.00,
    minDurationDays: 10,
    maxDurationDays: 365,
    allowFragile: false,
    fragileHandlingEquipment: "Ağır yüklər üçün paletlər.",
    restrictedItems: ["Partlayıcı maddələr"],
    accessHours: "08:00 - 20:00",
    published: true,
    featured: false,
    rating: 4.67,
    reviewCount: 9,
    createdAt: "2024-02-28"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "booking-01",
    bookingCode: "DP8X92",
    listingId: "listing-101",
    customerId: "user-1",
    customerName: "Leyla Məmmədova",
    customerPhone: "+994 50 234 56 78",
    customerEmail: "leyla@example.com",
    providerId: "user-2",
    providerName: "Elmir Qasımov",
    providerPhone: "+994 55 876 54 32",
    listingTitle: "Nərimanovda İqlim Nəzarətli Şəxsi Saxlanc Otağı",
    storageAddress: "Təbriz küçəsi 44, Nərimanov, Bakı",
    storageType: "saxlanc_otagi",
    
    // Item Details
    item: {
      name: "Qonaq otağı mebeli və 4 qutu antik çini qablar",
      category: "mebel_ve_ev",
      weightKg: 180,
      dimensionsCm: { length: 200, width: 90, height: 85 },
      volumeM3: 1.53,
      isFragile: true,
      requiredClimate: "heated_and_cooled",
      notes: "Çini qablar xüsusi köpüklə bükülüb, ehtiyatla daşınmalıdır.",
      photos: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80"
      ]
    },

    // Dates and Delivery
    startDate: "2026-10-20",
    endDate: "2026-11-20",
    durationDays: 31,
    deliveryMethod: "courier", // 'courier' | 'personal'
    courierAddress: "Səməd Vurğun küç. 112, mənz. 45, Nəsimi, Bakı",
    courierSlot: "14:00 - 17:00",
    
    // Pricing Breakdown
    pricing: {
      dailyRate: 8.50,
      storageFee: 263.50,
      courierFee: 25.00,
      serviceFee: 13.18, // ~5% platform fee
      insuranceFee: 10.00,
      totalAmount: 311.68,
      currency: "AZN"
    },

    // Tracking & Handover
    currentStatus: "item_stored",
    // Possible statuses:
    // 1. 'created' (Rezervasiya yaradıldı)
    // 2. 'contract_pending' (Müqavilə təsdiqlənməsi)
    // 3. 'confirmed' (Rezervasiya təsdiqləndi)
    // 4. 'scheduled' (Təhvil/Kuryer planlandı)
    // 5. 'inspected' (Yoxlanıldı və sənədləşdirildi)
    // 6. 'received_at_storage' (Anbara daxil oldu)
    // 7. 'item_stored' (Aktiv saxlancda)
    // 8. 'return_requested' (Qaytarılma tələbi)
    // 9. 'returned' (Müştəriyə təhvil verildi)
    // 10. 'completed' (Tamamlandı)

    timeline: [
      { status: "created", date: "2026-10-18 10:15", title: "Rezervasiya yaradıldı", desc: "Müştəri onlayn müraciət tərtib etdi." },
      { status: "contract_pending", date: "2026-10-18 10:20", title: "Rəqəmsal müqavilə imzalandı", desc: "Tərəflər demo saxlanc şərtlərini təsdiqlədi." },
      { status: "confirmed", date: "2026-10-18 11:00", title: "Rezervasiya təsdiqləndi", desc: "Anbar sahibi Elmir Qasımov yeri rezerv etdi." },
      { status: "scheduled", date: "2026-10-19 09:30", title: "Kuryer daşınması planlandı", desc: "20 Oktyabr saat 14:00-17:00 aralığı təyin edildi." },
      { status: "inspected", date: "2026-10-20 15:10", title: "Əşya yoxlanıldı və plomblanma aparıldı", desc: "Plomb № AZ-PL-8841 tətbiq edildi. Şəkillər çəkildi." },
      { status: "received_at_storage", date: "2026-10-20 16:45", title: "Əşyalar anbara çatdırıldı", desc: "Nərimanov anbarında rəfə yerləşdirildi." },
      { status: "item_stored", date: "2026-10-20 17:00", title: "Əşyalar təhlükəsiz saxlanılır", desc: "24/7 video nəzarət və iqlim monitorinqi aktivdir." }
    ],

    // Handover & Inspection Documentation
    handoverDetails: {
      sealNumber: "AZ-PL-8841",
      inspectedBy: "DepoTap Kuryer Nəzarətçisi (K-14)",
      inspectionDate: "2026-10-20 15:10",
      checklist: [
        { label: "Qablaşdırma bütövdür və zədələnməyib", checked: true },
        { label: "Kövrək əşya xəbərdarlıq nişanı yapışdırılıb", checked: true },
        { label: "Çəki və həcm bəyan edilən parametrlərə uyğundur", checked: true },
        { label: "Təhlükəsizlik plombları hər iki qutunun açılış hissəsinə vurulub", checked: true }
      ],
      inspectionNotes: "Mebel kənarlarında əvvəldən olan xırda sürtünmə qeydə alındı və foto ilə arxivləndi. Antik çini qablar toxunulmaz vəziyyətdə möhürləndi.",
      photos: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80"
      ]
    },

    // Digital Contract reference
    contractId: "DTC-2026-8891",
    contractSignedAt: "2026-10-18 10:20",
    contractStatus: "signed_electronically",
    createdAt: "2026-10-18"
  },
  {
    id: "booking-02",
    bookingCode: "KZ4M19",
    listingId: "listing-103",
    customerId: "user-1",
    customerName: "Leyla Məmmədova",
    customerPhone: "+994 50 234 56 78",
    customerEmail: "leyla@example.com",
    providerId: "user-3",
    providerName: "Rəşad Kərimov",
    providerPhone: "+994 70 333 22 11",
    listingTitle: "Yasamalda Modern Rəfli Kiçik Saxlanc Boksu",
    storageAddress: "Zahid Xəlilov küçəsi 68, Yasamal, Bakı",
    storageType: "saxlanc_otagi",
    
    item: {
      name: "2 ədəd dağ velosipedi və qış təkərləri",
      category: "idman_ve_avto",
      weightKg: 65,
      dimensionsCm: { length: 180, width: 70, height: 110 },
      volumeM3: 1.38,
      isFragile: false,
      requiredClimate: "ordinary",
      notes: "Təkərlər xüsusi örtüklərdədir.",
      photos: []
    },

    startDate: "2026-10-24",
    endDate: "2026-12-24",
    durationDays: 61,
    deliveryMethod: "personal",
    courierAddress: "",
    courierSlot: "",

    pricing: {
      dailyRate: 4.50,
      storageFee: 274.50,
      courierFee: 0.00,
      serviceFee: 13.73,
      insuranceFee: 5.00,
      totalAmount: 293.23,
      currency: "AZN"
    },

    currentStatus: "scheduled",
    timeline: [
      { status: "created", date: "2026-10-23 14:10", title: "Rezervasiya yaradıldı", desc: "Müştəri müraciət göndərdi." },
      { status: "contract_pending", date: "2026-10-23 14:15", title: "Müqavilə razılaşdırıldı", desc: "Şərtlər elektron qəbul edildi." },
      { status: "confirmed", date: "2026-10-23 15:00", title: "Anbar sahibi təsdiqlədi", desc: "Rəşad Kərimov rezervasiyanı təsdiq etdi." },
      { status: "scheduled", date: "2026-10-24 11:00", title: "Şəxsi təhvil gözlənilir", desc: "Müştəri əşyaları birbaşa ünvana gətirəcək." }
    ],

    handoverDetails: {
      sealNumber: "AZ-PL-9102",
      inspectedBy: "Şəxsi təhvil (Müştəri və Anbar sahibi)",
      inspectionDate: "Gözlənilir",
      checklist: [
        { label: "Əşyaların vizual bütövlüyü", checked: false },
        { label: "Boks açarının təhvil verilməsi", checked: false }
      ],
      inspectionNotes: "Təhvil görüşü zamanı yoxlanılacaq.",
      photos: []
    },

    contractId: "DTC-2026-9214",
    contractSignedAt: "2026-10-23 14:15",
    contractStatus: "signed_electronically",
    createdAt: "2026-10-23"
  }
];

export const CATEGORIES = [
  { id: "mebel_ve_ev", name: "Mebel və Ev Əşyaları", icon: "Sofa" },
  { id: "elektronika", name: "Elektronika və Məişət Texnikası", icon: "Tv" },
  { id: "sened_ve_arxiv", name: "Sənədlər və Biznes Arxivi", icon: "FileText" },
  { id: "movsumi_geyim", name: "Mövsümi Geyim və Əşyalar", icon: "Shirt" },
  { id: "idman_ve_avto", name: "İdman Ləvazimatları və Təkərlər", icon: "Bike" },
  { id: "ticaret_mali", name: "Ticarət və Ehtiyat Malları", icon: "Package" },
  { id: "diger", name: "Digər Fərdi Əşyalar", icon: "Boxes" }
];

export const STORAGE_TYPES = [
  { id: "saxlanc_otagi", name: "Fərdi Saxlanc Otağı", desc: "İqlim nəzarətli, təmiz və müasir boks" },
  { id: "qaraj", name: "Qaraj Sahəsi", desc: "Böyük həcmli yüklər və maşınlar üçün quru yer" },
  { id: "anbar", name: "Logistika Anbarı", desc: "Kommersiya və paletli mallar üçün rampa girişli" },
  { id: "konteyner", name: "Dəniz Konteyneri", desc: "Müstəqil, hermetik və ağır yüklərə dözümlü" }
];
