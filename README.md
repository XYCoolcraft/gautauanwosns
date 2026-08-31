# Website Kelas XII IPA 1 (HTML + LocalStorage)

Website kelas modern berbasis **HTML + CSS + Vanilla JS** dengan database **localStorage**.

## Fitur

- ✅ Login username & password
- ✅ Role: **Admin, Developer, Guru, Ketua Kelas, Sekretaris, Siswa**
- ✅ **Chat Live**:
  - Chat Publik (semua anggota)
  - Inbox Private (antar user)
  - Private Developer
- ✅ Admin Panel → custom nama, teks hero, footer, **"Powered by Arzz"** (bisa diganti)
- ✅ Pengumuman (pin, kategori)
- ✅ Anggota + struktur organisasi
- ✅ Jadwal pelajaran
- ✅ Galeri
- ✅ Dashboard per role
- ✅ Tampilan modern & responsif

## Cara Menjalankan

Cukup buka file `index.html` di browser (double-click atau Live Server).

Atau pakai server lokal:
```bash
# Python
python -m http.server 8080

# Node (jika ada)
npx serve .
```

Lalu buka http://localhost:8080

## Akun Demo

| Role          | Username    | Password  |
|---------------|-------------|-----------|
| Admin         | admin       | admin123  |
| Developer     | developer   | dev123    |
| Guru          | guru        | guru123   |
| Ketua Kelas   | ketua       | ketua123  |
| Sekretaris    | sekretaris  | sekre123  |
| Siswa         | siswa1      | siswa123  |

## Struktur

```
class-website-html/
├── index.html
├── login.html
├── dashboard.html
├── chat.html
├── admin.html
├── pengumuman.html
├── anggota.html
├── jadwal.html
├── galeri.html
├── css/style.css
└── js/
    ├── db.js      ← LocalStorage database
    ├── auth.js    ← Auth & role
    └── app.js     ← Shared UI helpers
```

## Catatan

- Semua data tersimpan di **localStorage** browser.
- Chat "live" disimulasikan dengan polling 2 detik (refresh otomatis).
- Admin/Developer bisa ganti teks "Powered by Arzz" di Admin Panel.
- Untuk reset data: Admin Panel → Danger Zone.
