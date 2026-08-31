/**
 * Shared UI helpers
 */

function renderNavbar() {
  var user = Auth.getUser();
  var el = document.getElementById('navAuth');
  if (!el) return;

  if (user) {
    var adminLink = Auth.canAccessAdmin()
      ? '<a href="admin.html" class="btn btn-sm btn-primary"><i class="fas fa-cog"></i> Admin</a>'
      : '';
    el.innerHTML =
      '<div class="user-info">' +
        '<div class="name">' + escapeHtml(user.name) + '</div>' +
        '<div class="role">' + Auth.roleLabel(user.role) + '</div>' +
      '</div>' +
      '<a href="dashboard.html" class="btn btn-sm btn-primary"><i class="fas fa-th-large"></i> Dashboard</a>' +
      adminLink +
      '<button class="btn btn-sm btn-danger" onclick="Auth.logout()"><i class="fas fa-sign-out-alt"></i></button>';
  } else {
    el.innerHTML = '<a href="login.html" class="btn btn-sm btn-dark"><i class="fas fa-sign-in-alt"></i> Login</a>';
  }

  // Mobile toggle
  var toggle = document.getElementById('mobileToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.onclick = function () {
      links.classList.toggle('open');
    };
  }
}

function loadSiteSettings() {
  var s = DB.getSettings();

  // Site name
  setText('siteName', s.siteName);
  setText('footerSiteName', s.siteName);
  setText('footerCopyName', s.siteName);

  // Hero
  var heroTitle = document.getElementById('heroTitle');
  if (heroTitle && s.heroTitle) {
    heroTitle.innerHTML = s.heroTitle.replace(/\n/g, '<br>');
  }
  setText('heroDesc', s.heroDesc);

  // Footer
  setText('footerDesc', s.footerDesc);
  setText('footerEmail', 'Email: ' + (s.footerEmail || ''));
  setText('footerWali', 'Wali Kelas: ' + (s.footerWali || ''));
  setText('footerKetua', 'Ketua Kelas: ' + (s.footerKetua || ''));
  setText('poweredBy', s.poweredBy || 'Powered by Arzz');
}

function setText(id, text) {
  var el = document.getElementById(id);
  if (el && text != null) el.textContent = text;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch (e) { return iso; }
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit'
    });
  } catch (e) { return ''; }
}

function renderHomeAnnouncements() {
  var container = document.getElementById('homeAnnouncements');
  if (!container) return;

  var list = DB.getAnnouncements().slice(0, 3);
  if (!list.length) {
    container.innerHTML = '<div class="empty-state">Belum ada pengumuman</div>';
    return;
  }

  container.innerHTML = list.map(function (a) {
    return (
      '<article class="ann-item">' +
        '<div class="ann-meta">' +
          (a.pinned ? '<span class="badge badge-pin">📌 Pin</span>' : '') +
          '<span class="badge ' + Auth.roleBadgeClass(a.role) + '">' + Auth.roleLabel(a.role) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(a.title) + '</h3>' +
        '<p>' + escapeHtml(a.content).substring(0, 120) + (a.content.length > 120 ? '...' : '') + '</p>' +
        '<div class="ann-footer">' +
          '<span>Oleh ' + escapeHtml(a.authorName) + '</span>' +
          '<span>' + formatDate(a.createdAt) + '</span>' +
        '</div>' +
      '</article>'
    );
  }).join('');
}
