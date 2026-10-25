import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HelpCircle, ChevronDown, ChevronUp, Mail, Phone, 
  MapPin, Send, CheckCircle2, MessageSquare 
} from 'lucide-react';

export function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "DepoTap platformasından necə istifadə edə bilərəm?",
      a: "Saytda 'Saxlanc Axtar' bölməsinə daxil olaraq saxlatmaq istədiyiniz əşyaların parametrlərini (çəki, ölçü, tələb olunan temperatur) daxil edirsiniz. Ağıllı alqoritmimiz bu parametrlərə 100% uyğun gələn qaraj, anbar və otaqları dərhal qarşınıza çıxarır. Tarixi və çatdırılma növünü seçərək saniyələr içində rezervasiyanızı rəsmiləşdirə bilərsiniz."
    },
    {
      q: "Kuryer xidməti necə işləyir və əşyalarım necə qorunur?",
      a: "Kuryer xidmətini seçdiyiniz təqdirdə komandamız təyin etdiyiniz saatda birbaşa qapınıza gəlir. Əşyaların ilkin vəziyyəti foto ilə qeydə alınır, xüsusi nömrəli təhlükəsizlik plombu vurulur və plomb nömrəsi elektron müqavilənizə daxil edilir. Bu plomb yalnız əşyalar sizə geri qaytarılarkən sizin hüzurunuzda açılır."
    },
    {
      q: "Hansı növ əşyaların saxlanması qadağandır?",
      a: "Təhlükəsizlik qaydalarına əsasən, tezalışan maddələr, benzin/yanacaq, zəhərli və radioaktiv maddələr, tez xarab olan qida məhsulları və canlı heyvanların saxlanması qəti qadağandır."
    },
    {
      q: "Öz boş qarajımı və ya anbarımı necə icarəyə verə bilərəm?",
      a: "'Öz Yerini İcarəyə Ver' düyməsinə klikləyərək məkanınızın ölçülərini, şəkillərini, təhlükəsizlik və iqlim imkanlarını daxil edin. Elanınız təsdiqləndikdən sonra dərhal axtarış sistemində görünəcək və müştəri sorğularını qəbul edə biləcəksiniz."
    },
    {
      q: "Rəqəmsal saxlanc müqaviləsi nə dərəcədə etibarlıdır?",
      a: "Hər bir rezervasiya üçün tərəflərin hüquq və vəzifələrini, qiymət cədvəlini və zərər kompensasiyası qaydalarını əks etdirən rəqəmsal müqavilə formalaşdırılır. Bu prototipdə müqavilə nümayiş xarakteri daşıyır; real mühitdə isə dövlət tərəfindən tanınan ASAN İmza və ya SİMA ilə təsdiqlənir."
    },
    {
      q: "Rezervasiyanı ləğv etsəm ödəniş geri qaytarılırmı?",
      a: "Bəli, icarə başlama tarixinə ən azı 24 saat qalmış edilmiş ləğvlərdə bütün məbləğ heç bir cərimə tutulmadan tam şəkildə geri qaytarılır."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
          Dəstək və Kömək Mərkəzi
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Tez-tez Verilən Suallar (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Saxlanc xidmətləri, kuryer daşınması, plomblanma və ödənişlərlə bağlı ən vacib sualların cavabları
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100"
            >
              <span>{faq.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactPage() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    showToast("Müraciətiniz qeydə alındı! Dəstək komandamız tezliklə sizinlə əlaqə saxlayacaq.", "success");
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
          Bizimlə Əlaqə
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Sualınız və ya Təklifiniz Var?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Bizə yazın və ya Bakıdakı ofisimizə yaxınlaşın. Komandamız sizə kömək etməkdən məmnun olar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Col */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <MapPin className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mərkəzi Ofis</h4>
            <p className="text-xs text-slate-500">
              Bakı şəhəri, Nəsimi rayonu, Nizami küçəsi 142 (AF Business House, 4-cü mərtəbə)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Phone className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Qaynar Xətt</h4>
            <p className="text-xs text-slate-500 font-mono">
              +994 (12) 555-4321<br />+994 (50) 234-5678 (WhatsApp)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Mail className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">E-poçt Ünvanı</h4>
            <p className="text-xs text-slate-500 font-mono">
              destek@depotap.az<br />info@depotap.az
            </p>
          </div>
        </div>

        {/* Form Col */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Müraciətiniz Göndərildi!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Təşəkkür edirik. Mütəxəssisimiz 24 saat ərzində sizinlə əlaqə saxlayacaq.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Adınız və Soyadınız
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Məs: Əli Hüseynov"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    E-poçt Ünvanınız
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="misal@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mövzu
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Məs: Korporativ anbar icarəsi haqqında sorğu"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mesajınız
                </label>
                <textarea
                  rows="4"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Sualınızı ətraflı qeyd edin..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Mesajı Göndər
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
