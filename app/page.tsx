export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      <div className="max-w-xl w-full px-6 py-10 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <h1 className="text-2xl font-semibold">
          🏨 Otel Blacklist Kontrol Paneli
        </h1>
        <p className="text-sm text-slate-300">
          Bu panelde resepsiyon girişlerinde isim/soyisim ile hızlı blacklist
          kontrolü, müdür onaylı kara liste talepleri ve log takibini
          göstereceğiz. Şu an sadece iskelet hazır, bir sonraki adımda
          <strong> Supabase veritabanına</strong> bağlayacağız.
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>1. Adım</span>
            <span className="text-slate-300">Supabase projesi kur</span>
          </div>
          <div className="flex justify-between">
            <span>2. Adım</span>
            <span className="text-slate-300">Blacklist & Requests tabloları</span>
          </div>
          <div className="flex justify-between">
            <span>3. Adım</span>
            <span className="text-slate-300">/check sayfası + form</span>
          </div>
        </div>

        <a
          href="/check"
          className="inline-flex items-center justify-center w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium py-2.5 text-sm transition"
        >
          ➕ Check ekranını aç (sonraki adım)
        </a>
      </div>
    </main>
  );
}
