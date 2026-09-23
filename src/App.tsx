import { useState, useRef, useEffect } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────

const ALL_LISTINGS = [
  { id: 1, title: 'Kulkas Sharp 2 Pintu 300L', price: 'Rp 2.800.000', priceNum: 2800000, location: 'Ilir Timur I', category: 'Barang', badge: 'Rekber', img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop&auto=format', seller: 'Pak Rudi', stars: 4.9, verified: true, desc: 'Kulkas Sharp 2 pintu kondisi baik, masih berfungsi normal. Kapasitas 300L, hemat listrik. Dijual karena pindah rumah. Bisa negosiasi.' },
  { id: 2, title: 'Sewa Tenda Pernikahan & Kursi', price: 'Rp 850.000/hari', priceNum: 850000, location: 'Seberang Ulu I', category: 'Sewa', badge: 'Rekber', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop&auto=format', seller: 'Bu Ningsih', stars: 5.0, verified: true, desc: 'Sewa paket tenda pernikahan lengkap dengan 100 kursi dan meja. Termasuk pengiriman dan pemasangan dalam kota Palembang.' },
  { id: 3, title: 'Jasa Perbaikan AC & Elektronik', price: 'Rp 75.000/kunjungan', priceNum: 75000, location: 'Bukit Kecil', category: 'Jasa', badge: null, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format', seller: 'Mas Eko', stars: 4.8, verified: false, desc: 'Teknisi berpengalaman 10 tahun. Melayani servis AC, kulkas, mesin cuci, dan elektronik rumah tangga lainnya.' },
  { id: 4, title: 'Bantu Antar Barang Pindahan', price: 'Rp 120.000', priceNum: 120000, location: 'Sako', category: 'Bantuan', badge: null, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format', seller: 'Budi S.', stars: 4.7, verified: false, desc: 'Siap bantu antar barang pindahan dalam kota Palembang. Punya kendaraan pick-up. Hubungi untuk detail dan negosiasi harga.' },
  { id: 5, title: 'Sepeda MTB Polygon 27.5"', price: 'Rp 3.200.000', priceNum: 3200000, location: 'Alang-Alang Lebar', category: 'Barang', badge: 'Rekber', img: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400&h=300&fit=crop&auto=format', seller: 'Aldi P.', stars: 4.6, verified: true, desc: 'MTB Polygon Xtrada 5 ukuran 27.5 inch, warna hitam biru. Kondisi 85%, sudah ganti grip dan sadel baru.' },
  { id: 6, title: 'Kursus Privat Bahasa Inggris', price: 'Rp 200.000/jam', priceNum: 200000, location: 'Ilir Barat I', category: 'Jasa', badge: 'Rekber', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&auto=format', seller: 'Mbak Rina', stars: 5.0, verified: true, desc: 'Guru bahasa Inggris lulusan UNSR, pengalaman 5 tahun. Melayani semua usia, bisa online atau offline.' },
  { id: 7, title: 'Sewa Kamera DSLR Canon 80D', price: 'Rp 300.000/hari', priceNum: 300000, location: 'Gandus', category: 'Sewa', badge: null, img: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&h=300&fit=crop&auto=format', seller: 'Fajar W.', stars: 4.5, verified: false, desc: 'Canon 80D body + kit lens 18-55mm. Tersedia tripod dan memory card. Deposit Rp 500rb, bisa Rekber.' },
  { id: 8, title: 'Bantu Belanja di Pasar 16 Ilir', price: 'Rp 50.000/trip', priceNum: 50000, location: '16 Ilir', category: 'Bantuan', badge: null, img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format', seller: 'Yanti H.', stars: 4.9, verified: true, desc: 'Jasa belanja titip di Pasar 16 Ilir. Bisa kirim foto barang, harga transparan, ongkir terpisah.' },
]

const CATEGORIES = [
  { id: 'semua', label: 'Semua', icon: '🏪' },
  { id: 'Barang', label: 'Barang', icon: '🛒', color: '#2E7D5B', bg: '#E8F5EF' },
  { id: 'Sewa', label: 'Sewa', icon: '🔑', color: '#7C3AED', bg: '#F3EEFF' },
  { id: 'Jasa', label: 'Jasa', icon: '🤝', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'Bantuan', label: 'Bantuan', icon: '🙋', color: '#B45309', bg: '#FEF3C7' },
]

const CATEGORY_CARDS = [
  { id: 'Barang', icon: '🛒', label: 'Barang', desc: 'Jual beli barang bekas & baru', color: '#2E7D5B', bg: '#E8F5EF', count: '2.4rb listing' },
  { id: 'Sewa', icon: '🔑', label: 'Sewa', desc: 'Sewa peralatan & properti', color: '#7C3AED', bg: '#F3EEFF', count: '480 listing' },
  { id: 'Jasa', icon: '🤝', label: 'Jasa', desc: 'Layanan profesional lokal', color: '#0369A1', bg: '#E0F2FE', count: '1.1rb penyedia' },
  { id: 'Bantuan', icon: '🙋', label: 'Bantuan', desc: 'Task & bantuan harian', color: '#B45309', bg: '#FEF3C7', count: '320 task aktif' },
]

const ESCROW_STEPS = [
  { num: '01', label: 'Pesan', desc: 'Pembeli setuju dengan harga & syarat', icon: '📋' },
  { num: '02', label: 'Bayar', desc: 'Transfer ke rekening escrow PUNYA', icon: '💳' },
  { num: '03', label: 'Ditahan', desc: 'Dana aman, penjual kirim barang/jasa', icon: '🔒' },
  { num: '04', label: 'Diterima', desc: 'Pembeli konfirmasi penerimaan', icon: '✅' },
  { num: '05', label: 'Cair', desc: 'Dana langsung ke penjual', icon: '💰' },
]

const FAMILY_MEMBERS = [
  { name: 'Ibu Sari', vouches: 12, role: 'Penjual Kuliner', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format', joined: 'Mei 2024' },
  { name: 'Pak Doni', vouches: 8, role: 'Teknisi Elektronik', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format', joined: 'Juni 2024' },
  { name: 'Mbak Reni', vouches: 15, role: 'Pengajar Privat', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format', joined: 'Apr 2024' },
  { name: 'Bang Tono', vouches: 6, role: 'Jasa Antar Barang', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format', joined: 'Jul 2024' },
]

const MESSAGES = [
  { id: 1, from: 'Bu Ningsih', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format', lastMsg: 'Baik Pak, saya siapkan dulu ya', time: '10:42', unread: 2, item: 'Sewa Tenda Pernikahan' },
  { id: 2, from: 'Mas Eko', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format', lastMsg: 'Bisa besok pagi sekitar jam 9?', time: '09:15', unread: 0, item: 'Jasa Perbaikan AC' },
  { id: 3, from: 'Aldi P.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format', lastMsg: 'Harga sudah termasuk helm?', time: 'Kemarin', unread: 1, item: 'Sepeda MTB Polygon' },
]

// ─── Helper components ───────────────────────────────────────────────────────

function CategoryBadge({ cat }: { cat: string }) {
  const map: Record<string, string> = {
    Barang: 'bg-[#E8F5EF] text-[#2E7D5B]',
    Sewa: 'bg-[#F3EEFF] text-[#7C3AED]',
    Jasa: 'bg-[#E0F2FE] text-[#0369A1]',
    Bantuan: 'bg-[#FEF3C7] text-[#B45309]',
  }
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${map[cat] ?? 'bg-gray-100 text-gray-600'}`}>
      {cat}
    </span>
  )
}

function Modal({ open, onClose, children, wide }: { open: boolean; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={`relative bg-white w-full ${wide ? 'lg:max-w-3xl' : 'lg:max-w-md'} rounded-t-3xl lg:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-[#1F5940] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce-in">
      <span>✓</span> {msg}
    </div>
  )
}

// ─── Modal: Login ────────────────────────────────────────────────────────────

function LoginModal({ open, onClose, onSwitch, onSuccess }: { open: boolean; onClose: () => void; onSwitch: () => void; onSuccess: (name: string) => void }) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)

  function handlePhone() {
    if (!phone) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('otp') }, 1000)
  }
  function handleOtp() {
    if (otp.length < 4) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onSuccess('Pengguna PUNYA'); onClose() }, 1000)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#2E7D5B] flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-[#1A1A1A]">Masuk ke PUNYA</h2>
            <p className="text-xs text-gray-400">Pakai nomor HP Anda</p>
          </div>
        </div>

        {step === 'phone' ? (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor HP</label>
            <div className="flex gap-2 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 flex items-center text-sm text-gray-500 font-medium">+62</div>
              <input
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition"
                placeholder="812-3456-7890"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="tel"
              />
            </div>
            <button
              onClick={handlePhone}
              disabled={!phone || loading}
              className="w-full bg-[#2E7D5B] hover:bg-[#1F5940] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-all"
            >
              {loading ? 'Mengirim OTP...' : 'Kirim Kode OTP'}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">Masukkan kode 4 digit yang dikirim ke <span className="font-semibold text-[#1A1A1A]">+62{phone}</span></p>
            <input
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition mb-4"
              placeholder="••••"
              maxLength={4}
              value={otp}
              onChange={e => setOtp(e.target.value)}
              type="number"
            />
            <button
              onClick={handleOtp}
              disabled={otp.length < 4 || loading}
              className="w-full bg-[#2E7D5B] hover:bg-[#1F5940] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-all"
            >
              {loading ? 'Memverifikasi...' : 'Verifikasi & Masuk'}
            </button>
            <button onClick={() => setStep('phone')} className="w-full text-center text-xs text-gray-400 mt-3 hover:text-gray-600">
              Ganti nomor HP
            </button>
          </>
        )}

        <div className="mt-5 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">Belum punya akun? <button onClick={onSwitch} className="text-[#2E7D5B] font-semibold hover:underline">Daftar Gratis</button></p>
        </div>
      </div>
    </Modal>
  )
}

// ─── Modal: Register ─────────────────────────────────────────────────────────

function RegisterModal({ open, onClose, onSwitch, onSuccess }: { open: boolean; onClose: () => void; onSwitch: () => void; onSuccess: (name: string) => void }) {
  const [form, setForm] = useState({ name: '', phone: '', area: '' })
  const [loading, setLoading] = useState(false)
  const areas = ['Ilir Timur I', 'Ilir Timur II', 'Ilir Barat I', 'Ilir Barat II', 'Seberang Ulu I', 'Seberang Ulu II', 'Bukit Kecil', 'Gandus', 'Alang-Alang Lebar', 'Sako', 'Sukarami', 'Kemuning', 'Kalidoni', 'Sematang Borang', 'Plaju', 'Kertapati']

  function handle() {
    if (!form.name || !form.phone || !form.area) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onSuccess(form.name); onClose() }, 1200)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#2E7D5B] flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-[#1A1A1A]">Daftar PUNYA</h2>
            <p className="text-xs text-gray-400">Gratis, untuk warga Palembang</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition" placeholder="Contoh: Budi Santoso" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor HP</label>
            <div className="flex gap-2">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 flex items-center text-sm text-gray-500 font-medium">+62</div>
              <input className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition" placeholder="812-3456-7890" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kecamatan</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition bg-white" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}>
              <option value="">Pilih kecamatan...</option>
              {areas.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handle} disabled={!form.name || !form.phone || !form.area || loading} className="w-full mt-5 bg-[#2E7D5B] hover:bg-[#1F5940] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-all">
          {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
        </button>

        <p className="text-[11px] text-gray-400 text-center mt-3">Dengan mendaftar Anda menyetujui Syarat & Ketentuan PUNYA</p>

        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">Sudah punya akun? <button onClick={onSwitch} className="text-[#2E7D5B] font-semibold hover:underline">Masuk</button></p>
        </div>
      </div>
    </Modal>
  )
}

// ─── Modal: Listing Detail ────────────────────────────────────────────────────

function ListingModal({ listing, open, onClose, onChat, onRekber, loggedIn, onNeedLogin }: {
  listing: typeof ALL_LISTINGS[0] | null; open: boolean; onClose: () => void
  onChat: () => void; onRekber: () => void; loggedIn: boolean; onNeedLogin: () => void
}) {
  const [liked, setLiked] = useState(false)
  if (!listing) return null

  function handleAction(fn: () => void) {
    if (!loggedIn) { onNeedLogin(); return }
    fn()
  }

  return (
    <Modal open={open} onClose={onClose} wide>
      <div>
        <div className="relative">
          <img src={listing.img} alt={listing.title} className="w-full h-56 lg:h-72 object-cover rounded-t-3xl" />
          <button onClick={onClose} className="absolute top-4 left-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition shadow-sm">✕</button>
          <button onClick={() => setLiked(l => !l)} className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center transition shadow-sm">
            <span className={liked ? 'text-red-500' : 'text-gray-400'}>{liked ? '❤️' : '🤍'}</span>
          </button>
          {listing.badge && (
            <span className="absolute bottom-4 left-4 text-xs font-bold bg-[#2E7D5B] text-white px-3 py-1 rounded-full">🔒 {listing.badge}</span>
          )}
        </div>

        <div className="p-5 lg:p-7">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <CategoryBadge cat={listing.category} />
              <h2 className="text-xl font-extrabold text-[#1A1A1A] mt-2 leading-snug">{listing.title}</h2>
            </div>
            <p className="text-xl font-extrabold text-[#2E7D5B] flex-shrink-0">{listing.price}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <span>📍 {listing.location}</span>
            <span>★ {listing.stars} rating</span>
            {listing.verified && <span className="text-[#2E7D5B]">✓ Terverifikasi</span>}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{listing.desc}</p>

          {/* Seller */}
          <div className="bg-[#FAFAF8] rounded-2xl p-4 mb-5 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#E8F5EF] flex items-center justify-center text-lg font-bold text-[#2E7D5B]">
              {listing.seller[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1A1A1A]">{listing.seller}</p>
              <p className="text-xs text-gray-400">Penjual aktif · Respon cepat</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-amber-500">★ {listing.stars}</p>
              <p className="text-[10px] text-gray-400">rating</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => handleAction(onChat)} className="flex-1 border border-gray-200 hover:border-[#2E7D5B] text-gray-700 hover:text-[#2E7D5B] font-semibold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5">
              💬 Chat Penjual
            </button>
            <button onClick={() => handleAction(onRekber)} className="flex-1 bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5">
              🔒 Pesan via Rekber
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

// ─── Modal: Rekber Info / Flow ────────────────────────────────────────────────

function RekberModal({ open, onClose, listingTitle }: { open: boolean; onClose: () => void; listingTitle?: string }) {
  const [step, setStep] = useState(0)
  const steps = ['Pesan', 'Bayar', 'Ditahan', 'Diterima', 'Cair']

  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="p-5 lg:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-extrabold text-[#1A1A1A]">🔒 Rekber PUNYA</h2>
            {listingTitle && <p className="text-xs text-gray-400 mt-0.5">untuk: {listingTitle}</p>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-6">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => setStep(i)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= step ? 'bg-[#2E7D5B] text-white' : 'bg-gray-100 text-gray-400'}`}
              >
                {i < step ? '✓' : i + 1}
              </button>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-[#2E7D5B]' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-[#FAFAF8] rounded-2xl p-5 mb-5">
          <div className="text-3xl mb-3">{ESCROW_STEPS[step].icon}</div>
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Langkah {ESCROW_STEPS[step].num}: {ESCROW_STEPS[step].label}</h3>
          <p className="text-sm text-gray-600">{ESCROW_STEPS[step].desc}</p>
        </div>

        <div className="bg-[#E8F5EF] rounded-2xl p-4 mb-5">
          <p className="text-sm font-semibold text-[#2E7D5B] mb-1">💡 Keuntungan Rekber</p>
          <ul className="text-xs text-[#1F5940] space-y-1">
            <li>• Dana pembeli aman tersimpan di rekening escrow</li>
            <li>• Penjual baru terima uang setelah konfirmasi</li>
            <li>• Sengketa ditangani tim PUNYA dalam 2x24 jam</li>
          </ul>
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 transition">
              ← Kembali
            </button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} className="flex-1 bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold py-3 rounded-xl text-sm transition-all">
              Lanjut: {steps[step + 1]} →
            </button>
          ) : (
            <button onClick={onClose} className="flex-1 bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold py-3 rounded-xl text-sm transition-all">
              Selesai ✓
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

// ─── Modal: AI Listing ────────────────────────────────────────────────────────

function AIModal({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [phase, setPhase] = useState<'upload' | 'processing' | 'result'>('upload')
  const [dragging, setDragging] = useState(false)
  const [result, setResult] = useState({ title: '', desc: '', price: '' })
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile() {
    setPhase('processing')
    setTimeout(() => {
      setResult({
        title: 'Kipas Angin Panasonic 16" Standing Fan',
        desc: 'Kipas angin berdiri Panasonic kondisi baik, masih berfungsi normal. Cocok untuk ruangan berukuran sedang. Blade 16 inci dengan 3 kecepatan. Dijual karena sudah punya AC.',
        price: 'Rp 350.000',
      })
      setPhase('result')
    }, 2500)
  }

  function reset() { setPhase('upload'); setResult({ title: '', desc: '', price: '' }) }

  return (
    <Modal open={open} onClose={() => { onClose(); reset() }} wide>
      <div className="p-5 lg:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-extrabold text-[#1A1A1A]">✨ Jual dengan AI</h2>
            <p className="text-xs text-gray-400 mt-0.5">Upload foto, AI buatkan listing otomatis</p>
          </div>
          <button onClick={() => { onClose(); reset() }} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>

        {phase === 'upload' && (
          <>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFile() }}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragging ? 'border-[#2E7D5B] bg-[#E8F5EF]' : 'border-gray-200 hover:border-[#2E7D5B] hover:bg-[#FAFAF8]'}`}
            >
              <div className="text-5xl mb-3">📷</div>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Drag & drop foto produk</p>
              <p className="text-xs text-gray-400">atau klik untuk pilih file (JPG, PNG, max 10MB)</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
            <button onClick={handleFile} className="w-full mt-4 bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold py-3 rounded-xl text-sm transition-all">
              Atau coba dengan foto contoh →
            </button>
          </>
        )}

        {phase === 'processing' && (
          <div className="py-12 text-center">
            <div className="text-5xl mb-4 animate-pulse">✨</div>
            <p className="text-sm font-semibold text-[#1A1A1A] mb-1">AI sedang menganalisis foto...</p>
            <p className="text-xs text-gray-400">Membuat judul, deskripsi, dan estimasi harga</p>
            <div className="mt-6 flex gap-1.5 justify-center">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {phase === 'result' && (
          <>
            <div className="bg-[#E8F5EF] rounded-2xl p-4 mb-4 text-xs font-semibold text-[#2E7D5B] flex items-center gap-2">
              <span>✨</span> AI berhasil membuat listing untuk Anda!
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul</label>
                <input
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition font-semibold"
                  value={result.title}
                  onChange={e => setResult(r => ({ ...r, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Deskripsi</label>
                <textarea
                  rows={3}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition resize-none"
                  value={result.desc}
                  onChange={e => setResult(r => ({ ...r, desc: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estimasi Harga</label>
                <input
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition font-bold text-[#2E7D5B]"
                  value={result.price}
                  onChange={e => setResult(r => ({ ...r, price: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={reset} className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 transition">
                Ulangi
              </button>
              <button onClick={() => { onSuccess(); onClose(); reset() }} className="flex-1 bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold py-3 rounded-xl text-sm transition-all">
                Publikasikan Listing ✓
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

// ─── Modal: Dispute ───────────────────────────────────────────────────────────

function DisputeModal({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ orderId: '', reason: '', detail: '' })
  const [submitted, setSubmitted] = useState(false)
  const reasons = ['Barang tidak sesuai deskripsi', 'Barang tidak diterima', 'Penjual tidak responsif', 'Kualitas tidak sesuai', 'Lainnya']

  function handle() {
    if (!form.orderId || !form.reason) return
    setSubmitted(true)
    setTimeout(() => { onSuccess(); onClose(); setSubmitted(false); setForm({ orderId: '', reason: '', detail: '' }) }, 1500)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-5 lg:p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-extrabold text-[#1A1A1A]">⚖️ Ajukan Dispute</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">ID Pesanan</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition" placeholder="PNY-2024-XXXX" value={form.orderId} onChange={e => setForm(f => ({ ...f, orderId: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Alasan Dispute</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition bg-white" value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}>
              <option value="">Pilih alasan...</option>
              {reasons.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Keterangan Tambahan</label>
            <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20 transition resize-none" placeholder="Jelaskan masalah yang Anda hadapi..." value={form.detail} onChange={e => setForm(f => ({ ...f, detail: e.target.value }))} />
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mt-4 text-xs text-amber-800">
          ⏱ Tim PUNYA akan meninjau dispute Anda dalam 2×24 jam kerja.
        </div>
        <button onClick={handle} disabled={!form.orderId || !form.reason || submitted} className="w-full mt-4 bg-[#2E7D5B] hover:bg-[#1F5940] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-all">
          {submitted ? 'Mengirim...' : 'Kirim Dispute'}
        </button>
      </div>
    </Modal>
  )
}

// ─── Modal: Family Circle ─────────────────────────────────────────────────────

function FamilyCircleModal({ open, onClose, loggedIn, onNeedLogin, onSuccess }: { open: boolean; onClose: () => void; loggedIn: boolean; onNeedLogin: () => void; onSuccess: () => void }) {
  const [joined, setJoined] = useState(false)
  const [vouching, setVouching] = useState<string | null>(null)

  function handleJoin() {
    if (!loggedIn) { onNeedLogin(); return }
    setJoined(true)
    onSuccess()
  }
  function handleVouch(name: string) {
    if (!loggedIn) { onNeedLogin(); return }
    setVouching(name)
    setTimeout(() => setVouching(null), 1500)
  }

  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="p-5 lg:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-extrabold text-[#1A1A1A]">👨‍👩‍👧‍👦 Family Circle</h2>
            <p className="text-xs text-gray-400 mt-0.5">Komunitas saling percaya Palembang</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>

        {!joined ? (
          <div className="bg-[#E8F5EF] rounded-2xl p-5 mb-5 text-center">
            <div className="text-4xl mb-2">🌿</div>
            <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Bergabung ke Family Circle</p>
            <p className="text-xs text-gray-500 mb-4">Dapatkan vouch dari tetangga dan tingkatkan kredibilitas Anda sebagai penjual</p>
            <button onClick={handleJoin} className="bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
              Bergabung Sekarang
            </button>
          </div>
        ) : (
          <div className="bg-[#E8F5EF] rounded-2xl p-4 mb-5 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-sm font-bold text-[#2E7D5B]">Anda sudah bergabung!</p>
              <p className="text-xs text-gray-500">Minta vouch dari anggota di bawah ini</p>
            </div>
          </div>
        )}

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Anggota Aktif ({FAMILY_MEMBERS.length})</p>
        <div className="space-y-3">
          {FAMILY_MEMBERS.map(m => (
            <div key={m.name} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-gray-200 transition">
              <img src={m.avatar} alt={m.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E8F5EF]" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A1A1A]">{m.name}</p>
                <p className="text-xs text-gray-400">{m.role} · Bergabung {m.joined}</p>
                <p className="text-xs text-[#2E7D5B] font-medium">{m.vouches} vouch diterima</p>
              </div>
              <button
                onClick={() => handleVouch(m.name)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${vouching === m.name ? 'bg-[#2E7D5B] text-white' : 'bg-[#E8F5EF] text-[#2E7D5B] hover:bg-[#d4eddf]'}`}
              >
                {vouching === m.name ? '✓ Vouched!' : '+ Vouch'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function SearchPage({ onListing }: { onListing: (l: typeof ALL_LISTINGS[0]) => void }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('semua')
  const filtered = ALL_LISTINGS.filter(l =>
    (cat === 'semua' || l.category === cat) &&
    (q === '' || l.title.toLowerCase().includes(q.toLowerCase()) || l.location.toLowerCase().includes(q.toLowerCase()))
  )
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Cari di PUNYA</h2>
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 mb-4 focus-within:border-[#2E7D5B] transition">
        <span className="text-gray-400">🔍</span>
        <input className="flex-1 text-sm outline-none placeholder-gray-400" placeholder="Cari barang, jasa, atau bantuan..." value={q} onChange={e => setQ(e.target.value)} autoFocus />
        {q && <button onClick={() => setQ('')} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} className={`flex-shrink-0 text-sm font-medium px-4 py-1.5 rounded-full transition-all ${cat === c.id ? 'bg-[#2E7D5B] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-3">{filtered.length} hasil{q && ` untuk "${q}"`}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map(item => (
          <ListingCard key={item.id} item={item} onClick={() => onListing(item)} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm font-medium">Tidak ada hasil untuk "{q}"</p>
          <p className="text-xs mt-1">Coba kata kunci lain atau ubah kategori</p>
        </div>
      )}
    </div>
  )
}

function MessagesPage() {
  const [active, setActive] = useState<typeof MESSAGES[0] | null>(null)
  const [msg, setMsg] = useState('')
  const [chats, setChats] = useState<Record<number, string[]>>({
    1: ['Halo, apakah tenda masih tersedia untuk tanggal 20 November?'],
    2: ['Pak Eko, AC saya mati total nih, bisa kunjungan hari ini?'],
    3: ['Bang, sepedanya masih ada? Bisa test ride?'],
  })

  function send() {
    if (!msg.trim() || !active) return
    setChats(c => ({ ...c, [active.id]: [...(c[active.id] ?? []), msg] }))
    setMsg('')
  }

  if (active) {
    const msgs = chats[active.id] ?? []
    return (
      <div className="flex flex-col h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white">
          <button onClick={() => setActive(null)} className="text-gray-400 hover:text-gray-700">←</button>
          <img src={active.avatar} alt={active.from} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A]">{active.from}</p>
            <p className="text-[10px] text-gray-400">{active.item}</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAF8]">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${i % 2 === 0 ? 'bg-[#2E7D5B] text-white rounded-br-md' : 'bg-white text-[#1A1A1A] border border-gray-100 rounded-bl-md'}`}>
                {m}
              </div>
            </div>
          ))}
          <div className={`flex justify-start`}>
            <div className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm bg-white text-[#1A1A1A] border border-gray-100 rounded-bl-md">
              {active.lastMsg}
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
          <input
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2E7D5B] transition"
            placeholder="Ketik pesan..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button onClick={send} disabled={!msg.trim()} className="w-10 h-10 rounded-xl bg-[#2E7D5B] disabled:opacity-50 flex items-center justify-center text-white transition">
            ➤
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Pesan</h2>
      <div className="space-y-2">
        {MESSAGES.map(m => (
          <button key={m.id} onClick={() => setActive(m)} className="w-full flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 text-left transition">
            <img src={m.avatar} alt={m.from} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1A1A1A]">{m.from}</p>
                <p className="text-[10px] text-gray-400">{m.time}</p>
              </div>
              <p className="text-xs text-gray-400 truncate">{m.lastMsg}</p>
              <p className="text-[10px] text-[#2E7D5B] mt-0.5">{m.item}</p>
            </div>
            {m.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#2E7D5B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{m.unread}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function ProfilePage({ user, onLogout, onLogin }: { user: string | null; onLogout: () => void; onLogin: () => void }) {
  const menu = [
    { icon: '📦', label: 'Listing Saya', count: '3' },
    { icon: '🛍️', label: 'Pembelian', count: '7' },
    { icon: '🔒', label: 'Rekber Aktif', count: '1' },
    { icon: '👨‍👩‍👧‍👦', label: 'Family Circle', count: null },
    { icon: '⭐', label: 'Ulasan', count: '12' },
    { icon: '🔔', label: 'Notifikasi', count: '3' },
    { icon: '⚙️', label: 'Pengaturan', count: null },
    { icon: '❓', label: 'Bantuan & FAQ', count: null },
  ]

  if (!user) return (
    <div className="p-4 max-w-md mx-auto text-center pt-12">
      <div className="w-20 h-20 rounded-full bg-[#E8F5EF] flex items-center justify-center text-4xl mx-auto mb-4">👤</div>
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Belum masuk</h2>
      <p className="text-sm text-gray-400 mb-6">Masuk untuk melihat profil dan transaksi Anda</p>
      <button onClick={onLogin} className="w-full bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold py-3 rounded-xl text-sm transition-all">
        Masuk ke PUNYA
      </button>
    </div>
  )

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#2E7D5B] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
          {user[0]}
        </div>
        <div className="flex-1">
          <p className="font-bold text-[#1A1A1A]">{user}</p>
          <p className="text-xs text-gray-400">Anggota sejak September 2024</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] bg-[#E8F5EF] text-[#2E7D5B] font-semibold px-2 py-0.5 rounded-full">✓ Terverifikasi</span>
            <span className="text-[11px] text-amber-500">★ 4.9</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
        {menu.map((item, i) => (
          <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#FAFAF8] transition ${i < menu.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <span className="text-lg">{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-[#1A1A1A]">{item.label}</span>
            {item.count && <span className="text-xs bg-[#E8F5EF] text-[#2E7D5B] font-semibold px-2 py-0.5 rounded-full">{item.count}</span>}
            <span className="text-gray-300">›</span>
          </button>
        ))}
      </div>

      <button onClick={onLogout} className="w-full py-3 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition">
        Keluar dari PUNYA
      </button>
    </div>
  )
}

// ─── Listing Card (shared) ────────────────────────────────────────────────────

function ListingCard({ item, onClick }: { item: typeof ALL_LISTINGS[0]; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {item.badge && (
          <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#2E7D5B] text-white px-2 py-0.5 rounded-full">🔒 {item.badge}</span>
        )}
      </div>
      <div className="p-3">
        <div className="mb-1.5"><CategoryBadge cat={item.category} /></div>
        <p className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2">{item.title}</p>
        <p className="text-base font-extrabold text-[#2E7D5B] mt-1.5">{item.price}</p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <span className="text-[10px] text-gray-400">📍 {item.location}</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-amber-500">★</span>
            <span className="text-[10px] font-medium text-gray-600">{item.stars}</span>
            {item.verified && <span className="text-[10px] text-[#2E7D5B]">✓</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState(0)
  const [activeCat, setActiveCat] = useState('semua')
  const [searchFocus, setSearchFocus] = useState(false)
  const [searchQ, setSearchQ] = useState('')

  // Auth
  const [user, setUser] = useState<string | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  // Modals
  const [selectedListing, setSelectedListing] = useState<typeof ALL_LISTINGS[0] | null>(null)
  const [showRekber, setShowRekber] = useState(false)
  const [rekberListing, setRekberListing] = useState<string | undefined>()
  const [showAI, setShowAI] = useState(false)
  const [showDispute, setShowDispute] = useState(false)
  const [showFamily, setShowFamily] = useState(false)

  // Toast
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg) }

  const filteredListings = ALL_LISTINGS.filter(l =>
    activeCat === 'semua' || l.category === activeCat
  )

  const navItems = [
    { icon: '🏠', label: 'Beranda' },
    { icon: '🔍', label: 'Cari' },
    { icon: '➕', label: 'Jual' },
    { icon: '💬', label: 'Pesan' },
    { icon: '👤', label: 'Profil' },
  ]

  function handleNavJual() {
    if (!user) { setShowLogin(true); return }
    setShowAI(true)
  }

  function handleChatFromListing() {
    setSelectedListing(null)
    setActiveNav(3)
  }

  function handleRekberFromListing() {
    setRekberListing(selectedListing?.title)
    setSelectedListing(null)
    setShowRekber(true)
  }

  function scrollToListings() {
    document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  // ─── Page router ─────────────────────────────────────────────────────────────
  if (activeNav === 1) return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20 lg:pb-0">
      <BottomNav active={activeNav} onChange={i => { if (i === 2) handleNavJual(); else setActiveNav(i) }} unreadMsg={2} />
      <SearchPage onListing={l => setSelectedListing(l)} />
      <ListingModal listing={selectedListing} open={!!selectedListing} onClose={() => setSelectedListing(null)} onChat={handleChatFromListing} onRekber={handleRekberFromListing} loggedIn={!!user} onNeedLogin={() => setShowLogin(true)} />
      <RekberModal open={showRekber} onClose={() => setShowRekber(false)} listingTitle={rekberListing} />
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  )

  if (activeNav === 3) return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20 lg:pb-0">
      <BottomNav active={activeNav} onChange={i => { if (i === 2) handleNavJual(); else setActiveNav(i) }} unreadMsg={2} />
      {!user ? (
        <div className="p-4 max-w-md mx-auto text-center pt-12">
          <div className="text-4xl mb-3">💬</div>
          <h2 className="text-xl font-bold mb-2">Masuk untuk chat</h2>
          <p className="text-sm text-gray-400 mb-5">Anda perlu masuk untuk melihat pesan</p>
          <button onClick={() => setShowLogin(true)} className="bg-[#2E7D5B] text-white font-semibold px-6 py-3 rounded-xl text-sm">Masuk</button>
        </div>
      ) : <MessagesPage />}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onSwitch={() => { setShowLogin(false); setShowRegister(true) }} onSuccess={n => { setUser(n); showToast(`Selamat datang, ${n}!`) }} />
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  )

  if (activeNav === 4) return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20 lg:pb-0">
      <BottomNav active={activeNav} onChange={i => { if (i === 2) handleNavJual(); else setActiveNav(i) }} unreadMsg={2} />
      <div className="lg:hidden flex items-center gap-3 p-4 border-b border-gray-100 bg-white">
        <div className="w-7 h-7 rounded-lg bg-[#2E7D5B] flex items-center justify-center"><span className="text-white font-bold text-xs">P</span></div>
        <span className="font-bold text-base">PUNYA</span>
      </div>
      <ProfilePage user={user} onLogout={() => { setUser(null); showToast('Anda sudah keluar') }} onLogin={() => setShowLogin(true)} />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onSwitch={() => { setShowLogin(false); setShowRegister(true) }} onSuccess={n => { setUser(n); showToast(`Selamat datang, ${n}!`) }} />
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  )

  // ─── Beranda ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans pb-20 lg:pb-0">

      {/* Modals */}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onSwitch={() => { setShowLogin(false); setShowRegister(true) }} onSuccess={n => { setUser(n); showToast(`Selamat datang, ${n}!`) }} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} onSwitch={() => { setShowRegister(false); setShowLogin(true) }} onSuccess={n => { setUser(n); showToast(`Akun berhasil dibuat, ${n}!`) }} />
      <ListingModal listing={selectedListing} open={!!selectedListing} onClose={() => setSelectedListing(null)} onChat={handleChatFromListing} onRekber={handleRekberFromListing} loggedIn={!!user} onNeedLogin={() => { setSelectedListing(null); setShowLogin(true) }} />
      <RekberModal open={showRekber} onClose={() => setShowRekber(false)} listingTitle={rekberListing} />
      <AIModal open={showAI} onClose={() => setShowAI(false)} onSuccess={() => showToast('Listing berhasil dipublikasikan!')} />
      <DisputeModal open={showDispute} onClose={() => setShowDispute(false)} onSuccess={() => showToast('Dispute berhasil dikirim, tim kami akan menghubungi Anda')} />
      <FamilyCircleModal open={showFamily} onClose={() => setShowFamily(false)} loggedIn={!!user} onNeedLogin={() => { setShowFamily(false); setShowLogin(true) }} onSuccess={() => showToast('Selamat bergabung di Family Circle!')} />
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Desktop Header */}
      <header className="hidden lg:flex sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2E7D5B] flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-lg tracking-tight">PUNYA</span>
          <span className="text-[10px] font-medium text-[#2E7D5B] bg-[#E8F5EF] px-2 py-0.5 rounded-full ml-1">Palembang</span>
        </div>
        <nav className="flex items-center gap-1">
          {CATEGORY_CARDS.map(c => (
            <button key={c.id} onClick={() => { setActiveCat(c.id); scrollToListings() }} className="text-sm font-medium text-gray-500 hover:text-[#2E7D5B] hover:bg-[#E8F5EF] px-3 py-2 rounded-lg transition-all">
              {c.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button onClick={() => setActiveNav(3)} className="text-sm font-medium text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 relative">
                💬 <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2E7D5B] rounded-full text-white text-[9px] flex items-center justify-center font-bold">2</span>
              </button>
              <button onClick={() => setActiveNav(4)} className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] px-3 py-2 rounded-xl hover:bg-gray-50 border border-gray-200 transition">
                <div className="w-6 h-6 rounded-full bg-[#2E7D5B] flex items-center justify-center text-white text-xs font-bold">{user[0]}</div>
                {user}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} className="text-sm font-medium text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">Masuk</button>
              <button onClick={() => setShowRegister(true)} className="text-sm font-semibold text-white bg-[#2E7D5B] hover:bg-[#1F5940] px-4 py-2 rounded-xl transition-colors">Daftar Gratis</button>
            </>
          )}
          <button onClick={() => { if (!user) { setShowLogin(true); return } setShowAI(true) }} className="text-sm font-semibold text-[#2E7D5B] bg-[#E8F5EF] hover:bg-[#d4eddf] px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
            ✨ Jual dengan AI
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2E7D5B] flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-bold text-base tracking-tight">PUNYA</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { if (!user) { setShowLogin(true); return } setShowAI(true) }} className="text-xs font-semibold text-[#2E7D5B] bg-[#E8F5EF] px-3 py-1.5 rounded-lg flex items-center gap-1">
              ✨ AI
            </button>
            {user ? (
              <button onClick={() => setActiveNav(4)} className="w-8 h-8 rounded-full bg-[#2E7D5B] flex items-center justify-center text-white text-xs font-bold">{user[0]}</button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">👤</button>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-2 bg-gray-50 border rounded-xl px-3 py-2 transition-all ${searchFocus ? 'border-[#2E7D5B] bg-white shadow-sm' : 'border-gray-200'}`}>
          <span className="text-gray-400 text-sm">🔍</span>
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
            placeholder="Cari barang, jasa, atau bantuan..."
            value={searchQ}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            onChange={e => { setSearchQ(e.target.value); setActiveNav(1) }}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Hero */}
        <section className="pt-10 lg:pt-16 pb-8 lg:pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8F5EF] text-[#2E7D5B] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                🌿 Komunitas Palembang
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-4">
                Dari Keluarga.<br />
                <span className="text-[#2E7D5B]">Untuk Banyak</span><br />
                Keluarga.
              </h1>
              <p className="text-gray-500 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
                Marketplace berbasis komunitas yang aman, mudah, dan terpercaya — khusus untuk warga Palembang.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={scrollToListings} className="bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-sm hover:shadow-md">
                  Mulai Jelajahi
                </button>
                <button onClick={() => setShowRekber(true)} className="border border-gray-200 hover:border-[#2E7D5B] text-gray-700 font-medium px-6 py-3 rounded-xl text-sm transition-all hover:text-[#2E7D5B]">
                  Pelajari Rekber →
                </button>
              </div>
              <div className="flex gap-6 mt-10 pt-8 border-t border-gray-100">
                {[['4.200+', 'Pengguna aktif'], ['12.000+', 'Transaksi aman'], ['4.9★', 'Rating komunitas']].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="text-xl font-bold text-[#1A1A1A]">{val}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden bg-[#E8F5EF] aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&h=525&fit=crop&auto=format" alt="Warga Palembang berbelanja di pasar lokal" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-xl max-w-[220px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#E8F5EF] flex items-center justify-center text-sm">🔒</div>
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Rekber PUNYA</p>
                      <p className="text-[10px] text-gray-400">Dana aman, terjamin</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-[#2E7D5B] h-1.5 rounded-full w-4/5" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">80% transaksi pakai Rekber</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-5">Kategori</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {CATEGORY_CARDS.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCat(cat.id); scrollToListings() }}
                className={`text-left p-4 lg:p-5 rounded-2xl border transition-all ${activeCat === cat.id ? 'border-[#2E7D5B] shadow-md' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'}`}
                style={activeCat === cat.id ? { backgroundColor: cat.bg } : {}}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ backgroundColor: cat.bg }}>{cat.icon}</div>
                <p className="font-bold text-[#1A1A1A] text-sm lg:text-base">{cat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-snug">{cat.desc}</p>
                <p className="text-xs font-semibold mt-2" style={{ color: cat.color }}>{cat.count}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Listings */}
        <section id="listings-section" className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              {activeCat === 'semua' ? 'Listing Terbaru' : activeCat}
            </h2>
            <div className="flex items-center gap-2">
              {activeCat !== 'semua' && (
                <button onClick={() => setActiveCat('semua')} className="text-xs text-gray-400 hover:text-gray-600">✕ Reset filter</button>
              )}
              <button onClick={() => setActiveNav(1)} className="text-sm font-medium text-[#2E7D5B] hover:underline">Lihat semua →</button>
            </div>
          </div>
          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)} className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${activeCat === c.id ? 'bg-[#2E7D5B] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {filteredListings.map(item => (
              <ListingCard key={item.id} item={item} onClick={() => setSelectedListing(item)} />
            ))}
          </div>
        </section>

        {/* Rekber Section */}
        <section className="py-8 lg:py-12">
          <div className="bg-[#1F5940] rounded-3xl p-6 lg:p-10 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E7D5B] rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                🔒 Sistem Keamanan
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold mb-2">Rekber PUNYA</h2>
              <p className="text-white/70 text-sm lg:text-base mb-8 max-w-lg">
                Layanan escrow resmi PUNYA memastikan transaksi Anda selalu aman — dana tidak cair sebelum barang/jasa diterima.
              </p>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-start mb-8">
                {ESCROW_STEPS.map((step, i) => (
                  <div key={step.num} className="flex lg:flex-col items-center lg:items-start flex-1 gap-3 lg:gap-0">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0">{step.icon}</div>
                    <div className="lg:mt-3">
                      <p className="text-[10px] text-white/40 font-mono">{step.num}</p>
                      <p className="text-sm font-bold">{step.label}</p>
                      <p className="text-[11px] text-white/60 mt-0.5 leading-snug lg:max-w-[100px]">{step.desc}</p>
                    </div>
                    {i < ESCROW_STEPS.length - 1 && <div className="hidden lg:block flex-1 h-0.5 bg-white/10 mt-5 mx-3" />}
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3">
                <button onClick={() => setShowRekber(true)} className="bg-white text-[#2E7D5B] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  Pelajari Rekber
                </button>
                <button onClick={() => { if (!user) { setShowLogin(true); return } setShowDispute(true) }} className="border border-white/20 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
                  Ajukan Dispute
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Family Circle */}
        <section className="py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FEF3C7] text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                👨‍👩‍👧‍👦 Komunitas
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1A1A1A] mb-4">
                Family Circle —<br />Vouch Saling Percaya
              </h2>
              <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6">
                Bergabung ke lingkaran keluarga digital. Tetangga dan kerabat Anda bisa memberikan <em>vouch</em> untuk meningkatkan kredibilitas penjual.
              </p>
              <ul className="space-y-3 mb-6">
                {['Vouch dari kenalan nyata menambah trust score', 'Penjual tervouch ditampilkan lebih tinggi', 'Riwayat transaksi transparan dan terlacak'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-[#2E7D5B] mt-0.5 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowFamily(true)} className="text-sm font-semibold text-[#2E7D5B] border border-[#2E7D5B] px-5 py-2.5 rounded-xl hover:bg-[#E8F5EF] transition-colors">
                Gabung Family Circle
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Anggota Terpercaya</p>
              <div className="space-y-3">
                {FAMILY_MEMBERS.map(member => (
                  <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAFAF8] transition-colors">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E8F5EF]" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.vouches} vouch diterima</p>
                    </div>
                    <button onClick={() => setShowFamily(true)} className="text-[10px] font-semibold text-[#2E7D5B] bg-[#E8F5EF] hover:bg-[#d4eddf] px-2.5 py-1 rounded-lg transition">
                      + Vouch
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                <button onClick={() => setShowFamily(true)} className="text-xs text-[#2E7D5B] font-medium hover:underline">
                  +284 anggota terverifikasi di Palembang →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Banner */}
        <section className="py-8 pb-12">
          <div className="bg-gradient-to-br from-[#E8F5EF] to-[#d4eddf] rounded-3xl p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-6">
            <div className="text-5xl lg:text-6xl">✨</div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-xl lg:text-2xl font-extrabold text-[#1A1A1A] mb-2">Buat Listing dengan AI</h2>
              <p className="text-sm text-gray-600 max-w-lg">Foto produk Anda, dan biarkan AI PUNYA membuat judul, deskripsi, dan harga estimasi secara otomatis — dalam hitungan detik.</p>
            </div>
            <button onClick={() => { if (!user) { setShowLogin(true); return } setShowAI(true) }} className="flex-shrink-0 bg-[#2E7D5B] hover:bg-[#1F5940] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-sm hover:shadow-md whitespace-nowrap">
              Coba Gratis Sekarang
            </button>
          </div>
        </section>
      </main>

      <BottomNav active={activeNav} onChange={i => { if (i === 2) handleNavJual(); else setActiveNav(i) }} unreadMsg={2} />
    </div>
  )
}

function BottomNav({ active, onChange, unreadMsg }: { active: number; onChange: (i: number) => void; unreadMsg?: number }) {
  const items = [
    { icon: '🏠', label: 'Beranda' },
    { icon: '🔍', label: 'Cari' },
    { icon: '➕', label: 'Jual' },
    { icon: '💬', label: 'Pesan' },
    { icon: '👤', label: 'Profil' },
  ]
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-50">
      {items.map((item, i) => (
        <button key={item.label} onClick={() => onChange(i)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${active === i ? 'text-[#2E7D5B]' : 'text-gray-400'}`}>
          {i === 2 ? (
            <div className="w-10 h-10 rounded-xl bg-[#2E7D5B] flex items-center justify-center text-white text-lg -mt-5 shadow-lg shadow-[#2E7D5B]/30">
              {item.icon}
            </div>
          ) : (
            <div className="relative">
              <span className="text-xl">{item.icon}</span>
              {i === 3 && unreadMsg ? (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">{unreadMsg}</span>
              ) : null}
            </div>
          )}
          <span className={`text-[10px] font-medium ${i === 2 ? 'mt-1' : ''}`}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
