/* ═══════════════════════════════════
   ACEH PANGAN — Shared JS Utilities
   ═══════════════════════════════════ */

// ── Nav active link ──
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

// ── Chart.js global defaults ──
if (typeof Chart !== 'undefined') {
  Chart.defaults.color = '#4a607f';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';
  Chart.defaults.font.family = "'Instrument Sans', sans-serif";
  Chart.defaults.font.size = 12;
}

// ── Formatters ──
const fmt = {
  rp:   v => 'Rp ' + Math.round(v).toLocaleString('id-ID'),
  rpK:  v => 'Rp' + (v/1000).toFixed(1) + 'K',
  pct:  v => v.toFixed(2) + '%',
  num:  v => Math.round(v).toLocaleString('id-ID'),
  date: d => {
    const [y,m,da] = d.split('-');
    const mn = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
    return da + ' ' + mn[+m-1] + ' ' + y;
  }
};

// ── Chart options factory ──
function makeChartOpts(yLabel = 'Harga (Rp)', extras = {}) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 500 },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0d1524',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#f0f4ff',
        bodyColor: '#8fa0bf',
        padding: 12,
        titleFont: { family: "'Syne', sans-serif", size: 12 },
        callbacks: {
          label: ctx => `  ${ctx.dataset.label}: ${fmt.rp(ctx.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        ticks: { maxRotation: 0, maxTicksLimit: 10, font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.025)' }
      },
      y: {
        ticks: { callback: v => fmt.rpK(v), font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
        title: { display: !!yLabel, text: yLabel, color: '#4a607f', font: { size: 11 } }
      }
    },
    ...extras
  };
}

// ── Commodity metadata ──
const COMMODITIES = {
  'Beras Medium': {
    icon: '🌾',
    color: '#3db8f5',
    unit: 'Rp/Kg',
    desc: 'Beras medium giling lokal, harga konsumen tingkat grosir di Aceh.'
  },
  'Bawang Merah': {
    icon: '🧅',
    color: '#e8a820',
    unit: 'Rp/Kg',
    desc: 'Bawang merah lokal/impor, sangat volatil mengikuti musim tanam.'
  },
  'Cabai Merah Keriting': {
    icon: '🌶️',
    color: '#f0614a',
    unit: 'Rp/Kg',
    desc: 'Cabai merah keriting segar, komoditas paling fluktuatif.'
  }
};

// ── Tab switching ──
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector || 'body');
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tab-group]') || btn.parentElement.parentElement;
      const target = btn.dataset.tab;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = group.querySelector(`.tab-pane[data-tab="${target}"]`);
      if (pane) pane.classList.add('active');
    });
  });
}

// ── Animate counters ──
function animateValue(el, start, end, duration = 800) {
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(start + (end - start) * ease);
    el.textContent = val.toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Load data.json (works locally too) ──
async function loadData() {
  // Try fetch from data folder, fallback to window.DASHBOARD_DATA
  try {
    const base = window.location.pathname.includes('/pages/')
      ? '../data/data.json'
      : './data/data.json';
    const res = await fetch(base);
    if (!res.ok) throw new Error('fetch failed');
    return await res.json();
  } catch {
    return window.DASHBOARD_DATA || null;
  }
}

// ── Simple line chart builder ──
function buildLineChart(canvasId, labels, datasets, opts = {}) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: { labels, datasets },
    options: makeChartOpts(opts.yLabel, opts.extras || {})
  });
}

// ── Dataset helpers ──
const DS = {
  actual: (data, color = '#3db8f5') => ({
    label: 'Aktual',
    data,
    borderColor: color,
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.15,
    backgroundColor: color + '10',
    fill: false
  }),
  lstm: (data) => ({
    label: 'LSTM',
    data,
    borderColor: '#e8a820',
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.25,
    borderDash: []
  }),
  gru: (data) => ({
    label: 'GRU',
    data,
    borderColor: '#9b72f0',
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.25,
    borderDash: [6, 3]
  }),
  futureLstm: (data) => ({
    label: 'LSTM Prediksi',
    data,
    borderColor: '#f0614a',
    borderWidth: 2.5,
    pointRadius: 3,
    pointBackgroundColor: '#f0614a',
    tension: 0.3
  }),
  futureGru: (data) => ({
    label: 'GRU Prediksi',
    data,
    borderColor: '#2ec995',
    borderWidth: 2.5,
    pointRadius: 3,
    pointBackgroundColor: '#2ec995',
    tension: 0.3,
    borderDash: [6, 3]
  }),
  custom: (label, data, color, dashed = false) => ({
    label,
    data,
    borderColor: color,
    borderWidth: 2,
    pointRadius: 3,
    pointBackgroundColor: color,
    tension: 0.25,
    borderDash: dashed ? [6, 3] : []
  })
};

// ── Tooltip for prediction result ──
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:28px; right:28px; z-index:9999;
    background:${type === 'success' ? '#1c2a42' : '#2a1c1c'};
    border:1px solid ${type === 'success' ? 'rgba(46,201,149,0.3)' : 'rgba(240,97,74,0.3)'};
    color:${type === 'success' ? '#2ec995' : '#f0614a'};
    padding:12px 20px; border-radius:10px;
    font-size:13px; font-weight:500;
    box-shadow:0 8px 24px rgba(0,0,0,0.5);
    animation:fadeUp 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}
