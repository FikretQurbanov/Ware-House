# DepoTap — Onlayn Saxlanc və Anbar İcarəsi Platforması (Frontend Prototip)

DepoTap, saxlanc sahəsinə ehtiyacı olan fərd və şirkətləri istifadəsiz qaraj, anbar və fərdi otaq sahibləri ilə birləşdirən müasir onlayn icarə bazarıdır. Layihə **React**, **Vite**, **Tailwind CSS** və **JavaScript** texnologiyaları ilə hazırlanmış, müasir mavi-ağ dizayn üslubuna, qaranlıq/işıqlı rejimə (Dark/Light mode) və tam Azərbaycan dili interfeysinə malikdir.

---

## 🚀 Fedora Linux Üzərində Quraşdırma və Başlatma Təlimatı

Layihə Fedora Linux (və digər Linux paylamaları) üzərində heç bir əlavə mürəkkəb konfiqurasiya tələb etmədən rahatlıqla işə salınır.

### 1. Lazımi Paketlərin Quraşdırılması (Node.js və npm)

Terminalı açın və `dnf` paket meneceri vasitəsilə Node.js və npm quraşdırın (əgər mövcud deyilsə):

```bash
sudo dnf install -y nodejs npm
```

Node.js versiyasını yoxlayın:
```bash
node -v   # v18 və ya daha yüksək tövsiyə olunur
npm -v
```

### 2. Layihə Qovluğuna Keçid və Asılılıqların Quraşdırılması

Layihə arxivini (və ya qovluğunu) açın və terminalda daxil olun:

```bash
cd WareStrogage
npm install
```

### 3. Layihəni Yerli İnkişaf (Development) Rejimində Başlatmaq

Yerli inkişaf serverini başlatmaq üçün:

```bash
npm run dev
```

Server işə düşdükdən sonra brauzerinizdə aşağıdakı ünvanı açın:
```
http://localhost:5173
```

### 4. İstehsalat (Production Build) Versiyasının Yığılması

Optimizasiya olunmuş statik faylları yığmaq və test etmək üçün:

```bash
npm run build
npm run preview
```

---

## 📂 Layihənin Fayl və Qovluq Strukturu

Layihə asan başa düşülən, modulyar və yeni başlayan proqramçılar üçün rahat təşkil olunmuşdur:

```
WareStrogage/
├── index.html                   # Əsas HTML şablonu, şriftlər və meta teqlər
├── package.json                 # Asılılıqlar və icra skriptləri (dev, build, preview)
├── vite.config.js               # Vite konfiqurasiyası
├── tailwind.config.js           # Brend rəngləri və qaranlıq rejim konfiqurasiyası
├── postcss.config.js            # PostCSS və Tailwind qoşması
├── README.md                    # Ətraflı sənədləşmə və bələdçi
├── public/                      # Statik ictimai fayllar
└── src/
    ├── main.jsx                 # React DOM mount nöqtəsi və AppProvider
    ├── App.jsx                  # Əsas səhifə yönləndirmə (routing) komponenti
    ├── index.css                # Tailwind direktivləri və çap (print) stilləri
    ├── context/
    │   └── AppContext.jsx       # Bütün tətbiqin vəziyyət idarəedicisi (localStorage ilə)
    ├── data/
    │   └── mockData.js          # Real Azərbaycan məkanları, istifadəçilər və rezervasiyalar
    ├── utils/
    │   ├── matchingEngine.js    # Əşya və anbar uyğunluğunu hesablayan ağıllı alqoritm
    │   └── qrCode.js            # Dinamik SVG QR Kod generasiya modulu
    └── components/
        ├── common/
        │   ├── Navbar.jsx              # Naviqasiya paneli, dark mode və rol seçimi
        │   ├── Footer.jsx              # Saytın altlığı, hüquqi məlumatlar və əlaqə
        │   ├── DemoNoticeBanner.jsx    # Prototip demo rejim xəbərdarlığı və sürətli rol dəyişməsi
        │   ├── Toast.jsx               # Əməliyyat bildirişləri (Toasts)
        │   ├── AuthModal.jsx           # Giriş və qeydiyyat pəncərəsi
        │   ├── SimulatedEmailModal.jsx # Simulyasiya edilmiş rəsmi e-poçt bildirişi
        │   └── StaticPages.jsx         # FAQ (Tez-tez verilən suallar) və Əlaqə səhifəsi
        ├── home/
        │   ├── Hero.jsx                # Əsas banner, sürətli axtarış və fəaliyyət düymələri
        │   ├── HowItWorks.jsx          # 4 addımlı proses izahı
        │   ├── FeatureHighlights.jsx   # Kuryer daşınması, plomblanma və rəqəmsal müqavilə
        │   └── RecommendedListings.jsx # Tövsiyə olunan seçilmiş məkan kartları
        ├── search/
        │   ├── ItemDescriptorWizard.jsx# Əşya qabaritləri, çəki və iqlim tələbləri forması
        │   ├── SearchFilters.jsx       # Şəhər, qiymət, müddət və kövrəklik filtrləri
        │   ├── ListingCard.jsx         # Saxlanc kartı (uyğunluq izahatları ilə)
        │   └── SearchResultsView.jsx   # Uyğun gələn və gəlməyən məkanların ayrılmış siyahısı
        ├── listing/
        │   └── ListingDetailsPage.jsx  # Məkanın tam profili, foto qalereya, texniki göstəricilər
        ├── booking/
        │   ├── BookingWizard.jsx       # 7-addımlı şəffaf rezervasiya və qiymət kalkulyatoru
        │   ├── ReceiptPage.jsx         # Unikal 6-rəqəmli kod, dinamik QR kod və çap formatı
        │   ├── DigitalContractPage.jsx # Rəsmi 5-maddəlik elektron saxlanc müqaviləsi
        │   └── BookingTrackingPage.jsx # 10-mərhələli status izləməsi və plomblanma aktı
        └── dashboards/
            ├── CustomerDashboard.jsx   # Müştəri paneli (aktiv rezervasiyalar, statuslar)
            ├── ProviderDashboard.jsx   # Sahibkar paneli (elan yaratma, redaktə, sorğu təsdiqi)
            ├── AdminDashboard.jsx      # Admin paneli (bütün elanlar, istifadəçilər və sıfırlama)
            └── ProfilePage.jsx         # Şəxsi profil və rol parametrləri
```

---

## ✨ Tamamlanmış Xüsusiyyətlər və Simulyasiyalar

### 1. İstifadəçi Hesabları və Rollar
- **Qeydiyyat, Giriş və Çıxış:** İstifadəçilər qeydiyyatdan keçə və daxil ola bilər.
- **Rollar:** Müştəri (`customer`), Anbar Sahibi (`provider`), Hər ikisi (`both`) və Sistem Admini (`admin`).
- **Bir Toxunuşla Keçid:** Demo lentində istənilən vaxt istifadəçi və rollar arasında ani keçid imkanı.
- **Davamlılıq:** Bütün məlumatlar brauzerinizin `localStorage` yaddaşında saxlanılır və səhifə yeniləndikdə itmir.

### 2. Ağıllı Əşya Axtarışı və Uyğunlaşdırma (Matching Engine)
- Müştəri əşyasının adını, kateqoriyasını, çəkisini (kq), ölçülərini (sm) daxil edir.
- Həcm ($m^3$) və döşəmə sahəsi ($m^2$) avtomatik hesablanır.
- **Qəti Uyğunluq Qaydası:** Əgər əşyanın çəkisi, həcmi və ya qapıdan keçmə qabaritləri anbarın imkanlarını aşırsa, yaxud tələb olunan istilik/soyutma məkanda yoxdursa, anbar uyğun olmayanlar siyahısına salınır və imtina səbəbi (məs: *Çəki 180 kq > 150 kq*, *Kövrək əşyaya icazə verilmir*) aydın şəkildə göstərilir.
- Tam uyğun gələn məkanlar üçün faiz göstəricisi və yaşıl arqumentlər nümayiş etdirilir.

### 3. Sahibkar (Storage Provider) Paneli
- Yeni anbar/qaraj elanı əlavə etmək (sahə, həcm, iqlim, təhlükəsizlik, qiymət, qadağan olunmuş əşyalar).
- Elanları redaktə etmək, dərcdən çıxarmaq (gizlətmək) və ya silmək.
- Daxil olan rezervasiya sorğularını nəzərdən keçirib **Təsdiq** və ya **İmtina** etmək.

### 4. Çoxmərhələli Rezervasiya və Şəffaf Qiymət Kalkulyasiyası
- 7 addımlı bələdçi (Əşya -> Məkan -> Tarix -> Çatdırılma -> Xərclər -> Müqavilə -> Təsdiq).
- Günlük saxlanc haqqı, kuryer daşınması (25 ₼), platforma xidmət haqqı (5%) və əlavə sığorta seçiminin real vaxtda hesablanması.

### 5. Rəqəmsal Müqavilə və Təhvil Aktı (Handover Workflow)
- Tərəflərin adları, ünvan, əşya təsviri, qiymət və hüquqi şərtləri əks etdirən rəsmi müqavilə forması.
- **Təhvil-təslim aktı:** Yoxlanış siyahısı (checklist), foto arxiv və unikal nömrəli **Təhlükəsizlik Plombu** (məs: `AZ-PL-8841`).

### 6. Unikal Rezervasiya Kodu və Çap Edilə Bilən Qəbz
- A-Z və 0-9 simvollarından ibarət unikal 6-rəqəmli kod generasiyası (məs: `DP8X92`).
- Dinamik SVG QR Kod (skan edildikdə təhlükəsiz doğrulama ünvanını açır).
- `window.print()` və xüsusi `@media print` stilləri ilə çap edilə bilən A4 qəbz və müqavilə.
- E-poçt bildirişinin açılan interaktiv modal simulyasiyası.

### 7. 10 Mərhələli Status İzləməsi (Timeline Tracking)
1. Rezervasiya yaradıldı
2. Müqavilə razılaşdırıldı
3. Rezervasiya təsdiqləndi
4. Kuryer / Şəxsi təhvil vaxtı planlandı
5. Əşya yoxlanıldı və plomblanma aparıldı
6. Əşya anbara çatdırıldı
7. Əşya aktiv saxlanılır
8. Qaytarılma tələb edildi
9. Əşya müştəriyə təhvil verildi
10. Rezervasiya tamamlandı

---

## 🔌 Gələcəkdə Real Backend və Xarici Xidmətlərə Qoşulma Bələdçisi

Hazırkı prototip frontend səviyyəsində tam funksionaldır və gələcəkdə real backend xidmətlərinə qoşulmaq üçün modulyar arxitekturada qurulmuşdur. İstehsalat (production) mühitində aşağıdakı xarici xidmətlər inteqrasiya edilə bilər:

| Funksionallıq | Prototipdəki Həll | İstehsalatda Tələb Olunan Real Xidmət |
|---|---|---|
| **Verilənlər Bazası və Auth** | Brauzer `localStorage` və mock istifadəçilər | PostgreSQL / MongoDB, Node.js/Go backend, JWT / OAuth2, SİMA və ya ASAN İmza |
| **Ödəniş Qapısı (Payments)** | Simulyasiya edilmiş hesablama | Kapital Bank (BirBank API), Pasha Bank və ya Stripe/Payriff inteqrasiyası |
| **Kuryer və Logistika** | Simulyasiya edilmiş kuryer slotu və sabit 25 ₼ tarif | Real kuryer şirkətlərinin (188, Kuryer.az və s.) API-ləri və GPS canlı xəritə izləməsi |
| **E-poçt və SMS Bildirişlər** | Brauzerdaxili modal poçt simulyasiyası | SendGrid, Resend, Amazon SES və ya yerli SMS qapıları (Azercell/Bakcell/Nar) |
| **Fayl və Şəkil Saxlanması** | Unsplash şəkil bağlantıları və yerli simulyasiya | AWS S3, Cloudinary və ya Google Cloud Storage |
| **Hüquqi Sənədlər** | Rəqəmsal müqavilə şablonu | Notariat inteqrasiyası və rəsmi elektron imza sertifikatları |

---

## 📥 Layihəni ZIP kimi Yükləmək və Yerli İcra

Layihənin tam arxivləşdirilmiş ZIP faylı (`WareStorage_Prototype.zip`) qovluqda yaradılmışdır (ağır `node_modules` və `.git` qovluqları istisna edilməklə). İstənilən digər kompüterdə arxivi çıxarıb `npm install` və `npm run dev` əmrləri ilə işə sala bilərsiniz.

---
© 2026 DepoTap — Müasir Onlayn Saxlanc Bazarı.
