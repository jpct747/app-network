// ============================================================
// Rede de Contactos — CRM pessoal para gestão de networking
// Dados guardados no localStorage do browser (sem servidor).
// ============================================================

const STORAGE_KEY = 'rede_contactos_v1';
const NOTIFIED_KEY = 'rede_contactos_notified_v1';
const INDUSTRY_DEMO_KEY = 'rede_contactos_industry_demo_v1';

const DEFAULT_CATEGORIES = [
  'Cliente', 'Fornecedor', 'Investidor', 'Parceiro', 'Equipa', 'Prospect',
  'Imobiliário', 'Tecnologia & Software', 'Serviços Financeiros & Jurídicos',
  'Marketing, Vendas & Comunicação', 'Turismo, Hotelaria & Restauração',
  'Saúde', 'Sustentabilidade', 'Maquinaria',
];
const CATEGORY_PALETTE = [
  '#4fae7a', '#d1a13e', '#9b7fd6', '#c97b9e', '#cf7d54', '#a68a5b',
  '#7a8f4f', '#b0555c', '#8f6fae', '#c9944f', '#5fae8f', '#ae5f7a',
  '#6f9e5f', '#9c9284',
];

// ---------- Line-icon set (no emoji — keeps the UI formal) ----------
const ICONS = {
  users: '<circle cx="8" cy="8" r="3"/><rect x="2.5" y="14" width="11" height="7" rx="3.5"/><circle cx="18" cy="9" r="2.3"/><rect x="13.5" y="15" width="9" height="5.5" rx="2.75" opacity="0.55"/>',
  tag: '<polygon points="12,3 21,9 21,15 12,21 3,15 3,9"/><circle cx="12" cy="12" r="2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="3" x2="7" y2="7"/><line x1="17" y1="3" x2="17" y2="7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="12" x2="12" y2="7"/><line x1="12" y1="12" x2="16" y2="14"/>',
  starOutline: '<polygon points="12,2.5 14.9,9 22,9.9 16.8,14.6 18.2,21.5 12,17.9 5.8,21.5 7.2,14.6 2,9.9 9.1,9"/>',
  starFilled: '<polygon points="12,2.5 14.9,9 22,9.9 16.8,14.6 18.2,21.5 12,17.9 5.8,21.5 7.2,14.6 2,9.9 9.1,9" fill="currentColor"/>',
  idCard: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="12" r="2.3"/><line x1="13.5" y1="9.5" x2="18.5" y2="9.5"/><line x1="13.5" y1="13" x2="18.5" y2="13"/><line x1="5" y1="16.5" x2="12" y2="16.5"/>',
  profile: '<circle cx="12" cy="8" r="3.2"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  fileText: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><line x1="7.5" y1="8" x2="16.5" y2="8"/><line x1="7.5" y1="12" x2="16.5" y2="12"/><line x1="7.5" y1="16" x2="13" y2="16"/>',
  activity: '<polyline points="3,17 9,10 13,14 21,5"/><circle cx="21" cy="5" r="1.6" fill="currentColor" stroke="none"/>',
  link: '<circle cx="7" cy="17" r="3.2"/><circle cx="17" cy="7" r="3.2"/><line x1="9.3" y1="14.7" x2="14.7" y2="9.3"/>',
  sparkle: '<polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><line x1="10" y1="18.5" x2="14" y2="18.5"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><polyline points="3,6 12,13 21,6"/>',
  download: '<line x1="12" y1="3" x2="12" y2="14"/><polyline points="7,10 12,15 17,10"/><line x1="4" y1="19" x2="20" y2="19"/>',
  edit: '<line x1="4" y1="20" x2="15" y2="9"/><polygon points="15,9 18,6 21,9 18,12"/><line x1="3" y1="21" x2="5" y2="19"/>',
  trash: '<line x1="4" y1="7" x2="20" y2="7"/><rect x="6" y="7" width="12" height="13" rx="1.5"/><line x1="9" y1="7" x2="9" y2="4"/><line x1="15" y1="7" x2="15" y2="4"/><line x1="9" y1="4" x2="15" y2="4"/><line x1="10" y1="11" x2="10" y2="16"/><line x1="14" y1="11" x2="14" y2="16"/>',
  check: '<polyline points="4,12 9,17 20,5"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><line x1="8" y1="7" x2="9.5" y2="4"/><line x1="9.5" y1="4" x2="14.5" y2="4"/><line x1="14.5" y1="4" x2="16" y2="7"/><circle cx="12" cy="13.5" r="3.3"/>',
  x: '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
};
function icon(name, extraClass) {
  return `<svg class="svg-icon${extraClass ? ' ' + extraClass : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

const TAB_DEFS = [
  { key: 'geral', icon: icon('idCard'), lbl: 'Ficha Pessoal' },
  { key: 'fotos', icon: icon('camera'), lbl: 'Fotos' },
  { key: 'perfil', icon: icon('profile'), lbl: 'Perfil' },
  { key: 'notas', icon: icon('fileText'), lbl: 'Notas' },
  { key: 'historico', icon: icon('activity'), lbl: 'Histórico' },
  { key: 'rede', icon: icon('link'), lbl: 'Rede' },
];

// ---------- Editable field definitions (kv-rows the user can type into directly) ----------
const GERAL_FIELDS = [
  { key: 'telefone', label: 'Telefone', type: 'tel' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'localidade', label: 'Localidade', type: 'text' },
  { key: 'link', label: 'LinkedIn / Website', type: 'text' },
  { key: 'aniversario', label: 'Aniversário', type: 'date' },
];
const NOTAS_FIELDS = [
  { key: 'comoConhecemos', label: 'Como nos conhecemos', type: 'text' },
  { key: 'notas', label: 'Notas pessoais', type: 'textarea' },
  { key: 'tags', label: 'Tags (separadas por vírgula)', type: 'text', isTags: true },
];
const PERFIL_FIELDS = [
  { key: 'familia', label: 'Família / Cônjuge e filhos', type: 'text' },
  { key: 'formacao', label: 'Formação / Educação', type: 'text' },
  { key: 'idiomas', label: 'Idiomas', type: 'text' },
  { key: 'redesSociais', label: 'Outras redes sociais', type: 'text' },
  { key: 'assistente', label: 'Assistente / Contacto direto', type: 'text' },
  { key: 'atividadesFavoritas', label: 'Atividades favoritas', type: 'text' },
  { key: 'pratosFavoritos', label: 'Pratos / comida favorita', type: 'text' },
  { key: 'bebidaFavorita', label: 'Bebida favorita', type: 'text' },
  { key: 'hobbies', label: 'Hobbies', type: 'text' },
  { key: 'corFavorita', label: 'Cor favorita', type: 'text' },
  { key: 'outrosGostos', label: 'Outros gostos', type: 'textarea' },
];

// ---------- Date helpers ----------
function todayISO() { return new Date().toISOString().slice(0, 10); }
function isoDaysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); }
function birthdayInDays(n, year = 1990) {
  const d = new Date(); d.setDate(d.getDate() + n);
  return `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function daysBetween(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date(); now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((now - d) / 86400000));
}
function daysToNextBirthday(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date(); now.setHours(0, 0, 0, 0);
  let next = new Date(now.getFullYear(), d.getMonth(), d.getDate());
  if (next < now) next.setFullYear(now.getFullYear() + 1);
  return Math.round((next - now) / 86400000);
}
function fmtDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
function fmtDateNoYear(iso) {
  if (!iso) return '—';
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}
function norm(s) {
  return (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ---------- Seed data (only used the very first time, before any localStorage data exists) ----------
function seedContacts() {
  return [
    c('Ana Rodrigues', 'Investidor', 'Vector Capital', 'Sócia Gerente', '+351 912 345 678', 'ana.rodrigues@vectorcap.pt', 'Lisboa', 'linkedin.com/in/anarodrigues', birthdayInDays(6), 'Conferência Web Summit 2025', 'Gosta de vela e vinhos alentejanos. Tem duas filhas pequenas.', ['investidor-anjo', 'fintech'], true, isoDaysAgo(5)),
    c('Bruno Ferreira', 'Cliente', 'Retail Plus', 'Diretor de Compras', '+351 934 221 009', 'bruno.ferreira@retailplus.pt', 'Porto', '', '', 'Indicação de um fornecedor comum', 'Prefere reuniões de manhã. Torcedor do FC Porto.', ['b2b', 'retalho'], false, isoDaysAgo(120)),
    c('Carla Mendes', 'Fornecedor', 'GraphDesign Studio', 'Fundadora', '+351 926 550 112', 'carla@graphdesign.studio', 'Braga', 'graphdesign.studio', '', 'Recomendada por um cliente', 'Muito rápida a responder. Trabalha também com ilustração.', ['design', 'freelancer'], false, isoDaysAgo(20)),
    c('Diogo Alves', 'Parceiro', 'TechHub Coworking', 'Diretor de Parcerias', '+351 917 883 440', 'diogo.alves@techhub.pt', 'Lisboa', 'linkedin.com/in/diogoalves', '', 'Evento de startups no TechHub', 'Organiza meetups mensais de empreendedorismo.', ['coworking', 'eventos'], true, isoDaysAgo(45)),
    c('Elisa Santos', 'Equipa', '', 'Head of Sales', '+351 963 774 221', 'elisa.santos@aminhaempresa.pt', 'Lisboa', '', '', 'Contratada em 2024', 'Maratonista nos tempos livres.', ['equipa-interna'], false, isoDaysAgo(2)),
    c('Filipe Costa', 'Parceiro', '', 'Consultor Independente', '+351 968 102 337', 'filipe.costa.consultor@gmail.com', 'Coimbra', 'linkedin.com/in/filipecosta', '', 'Curso de gestão em 2022', 'Especialista em internacionalização. Já não falamos há tempos.', ['consultoria'], false, isoDaysAgo(200)),
    c('Gabriela Nunes', 'Prospect', 'NovaMed', 'CFO', '+351 939 664 887', 'gabriela.nunes@novamed.pt', 'Faro', 'linkedin.com/in/gabrielanunes', '', 'Reunião comercial em Faro', 'Interessada numa proposta para o próximo trimestre.', ['saude', 'lead-quente'], false, isoDaysAgo(10)),
    c('Hugo Martins', 'Cliente', 'BuildCo', 'CEO', '+351 916 220 998', 'hugo.martins@buildco.pt', 'Setúbal', '', '', 'Cliente desde 2021', 'Gosta de futebol de 5. Tem contrato para renovar em breve.', ['construcao', 'conta-chave'], false, isoDaysAgo(95)),
    c('Inês Pereira', 'Investidor', 'Angel Fund PT', 'Investidora Anjo', '+351 961 445 776', 'ines.pereira@angelfund.pt', 'Lisboa', 'linkedin.com/in/inespereira', birthdayInDays(2), 'Apresentação por um sócio', 'Muito ativa na comunidade de startups portuguesa.', ['investidor-anjo', 'mentoria'], true, isoDaysAgo(60)),
    ...industryDemoContacts(),
  ];
}

function industryDemoContacts() {
  return [
    c('Marta Ribeiro', 'Imobiliário', 'Predimax Imobiliária', 'Diretora Comercial', '+351 913 220 145', 'marta.ribeiro@predimax.pt', 'Lisboa', 'linkedin.com/in/martaribeiro', '', 'Feira imobiliária em Lisboa', 'Especialista em imóveis de luxo na zona de Cascais.', ['imobiliario', 'luxo'], false, isoDaysAgo(15)),
    c('Tiago Andrade', 'Tecnologia & Software', 'NexCode Software', 'CTO', '+351 924 331 208', 'tiago.andrade@nexcode.pt', 'Porto', 'linkedin.com/in/tiagoandrade', '', 'Meetup de tecnologia no Porto', 'Trabalha com equipas remotas espalhadas pela Europa.', ['tech', 'saas'], false, isoDaysAgo(30)),
    c('Sofia Almeida', 'Serviços Financeiros & Jurídicos', 'Almeida & Associados', 'Advogada Sócia', '+351 935 774 902', 'sofia.almeida@almeidaassociados.pt', 'Lisboa', 'linkedin.com/in/sofiaalmeida', '', 'Indicação de um cliente comum', 'Especialista em direito comercial e contratos internacionais.', ['juridico', 'contratos'], false, isoDaysAgo(40)),
    c('Rui Fonseca', 'Marketing, Vendas & Comunicação', 'Vértice Comunicação', 'Diretor de Marketing', '+351 962 118 447', 'rui.fonseca@verticecom.pt', 'Braga', 'linkedin.com/in/ruifonseca', '', 'Conferência de marketing digital', 'Muito focado em performance e growth marketing.', ['marketing', 'growth'], false, isoDaysAgo(25)),
    c('Beatriz Nogueira', 'Turismo, Hotelaria & Restauração', 'Hotel Costa Azul', 'Gerente Geral', '+351 917 556 330', 'beatriz.nogueira@costaazul.pt', 'Faro', '', '', 'Evento do setor do turismo no Algarve', 'Sempre a par das tendências de turismo sustentável.', ['turismo', 'hotelaria'], false, isoDaysAgo(50)),
    c('André Correia', 'Saúde', 'Clínica Vitalis', 'Diretor Clínico', '+351 968 440 771', 'andre.correia@vitalis.pt', 'Coimbra', '', '', 'Parceria para seguro de saúde', 'Interessado em soluções de telemedicina.', ['saude', 'clinica'], false, isoDaysAgo(35)),
    c('Mariana Teixeira', 'Sustentabilidade', 'GreenPath Consulting', 'Consultora ESG', '+351 921 887 653', 'mariana.teixeira@greenpath.pt', 'Lisboa', 'linkedin.com/in/marianateixeira', '', 'Workshop de sustentabilidade empresarial', 'Ajuda empresas a preparar relatórios ESG.', ['sustentabilidade', 'esg'], false, isoDaysAgo(18)),
    c('Carlos Pinheiro', 'Maquinaria', 'MetalTech Máquinas', 'Diretor Industrial', '+351 966 203 519', 'carlos.pinheiro@metaltech.pt', 'Aveiro', '', '', 'Feira industrial em Aveiro', 'Fornece equipamento industrial para várias fábricas do norte.', ['industria', 'equipamento'], false, isoDaysAgo(60)),
  ];
}

function c(nome, categoria, empresa, cargo, telefone, email, localidade, link, aniversario, comoConhecemos, notas, tags, favorito, ultimoContato) {
  return {
    id: cryptoRandomId(),
    nome, categoria, empresa, cargo, telefone, email, localidade, link,
    aniversario: aniversario || '',
    comoConhecemos, notas, tags: tags || [], favorito: !!favorito,
    foto: null,
    relacionados: [],
    interacoes: ultimoContato ? [{ id: cryptoRandomId(), data: ultimoContato, tipo: 'Registo inicial', nota: '' }] : [],
    ultimoContato: ultimoContato || '',
    criadoEm: todayISO(),
  };
}

function cryptoRandomId() {
  return 'c_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
}

// ---------- Persistence ----------
function migrateContacts(list) {
  let changed = false;
  list.forEach(x => {
    if (!Array.isArray(x.interacoes)) {
      x.interacoes = x.ultimoContato ? [{ id: cryptoRandomId(), data: x.ultimoContato, tipo: 'Registo inicial', nota: '' }] : [];
      changed = true;
    }
    if (!Array.isArray(x.relacionados)) { x.relacionados = []; changed = true; }
  });
  return changed;
}

function loadContacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      let changed = migrateContacts(list);
      if (!localStorage.getItem(INDUSTRY_DEMO_KEY)) {
        list.push(...industryDemoContacts());
        changed = true;
      }
      localStorage.setItem(INDUSTRY_DEMO_KEY, '1');
      if (changed) saveContacts(list);
      return list;
    }
  } catch (e) { /* corrupt storage, fall through to reseed */ }
  const seeded = seedContacts();
  localStorage.setItem(INDUSTRY_DEMO_KEY, '1');
  saveContacts(seeded);
  return seeded;
}
function saveContacts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ---------- State ----------
let contacts = loadContacts();
let selectedId = contacts[0] ? contacts[0].id : null; // anchors the web/branches layout (the "hub" row)
let detailId = null; // overrides which contact's ficha shows, without moving the web anchor
let searchTerm = '';
let activeCategory = 'Todos';
let statView = 'todos'; // 'todos' | 'categorias' | 'aniversarios' | 'followup' | 'favoritos'
let lastAddedId = null; // id of the most recently created contact, briefly highlighted in the list
let activeTab = 'geral';
let editingId = null;
let currentPhotoData = null;
let formRelatedIds = [];

// ---------- Undo (safety net for accidental changes) ----------
const UNDO_LIMIT = 20;
let undoStack = [];
function pushUndoSnapshot() {
  undoStack.push(JSON.stringify(contacts));
  if (undoStack.length > UNDO_LIMIT) undoStack.shift();
  updateUndoButton();
}
function updateUndoButton() {
  document.getElementById('undoBtn').disabled = undoStack.length === 0;
}
function undoLast() {
  if (!undoStack.length) return;
  contacts = JSON.parse(undoStack.pop());
  saveContacts(contacts);
  selectionSafety();
  updateUndoButton();
  renderAll();
}
document.getElementById('undoBtn').addEventListener('click', undoLast);

// ---------- Category helpers ----------
function getCategoryList() {
  const set = new Set(DEFAULT_CATEGORIES);
  contacts.forEach(x => { if (x.categoria) set.add(x.categoria); });
  return Array.from(set);
}
function categoryColor(cat) {
  const list = getCategoryList();
  const idx = Math.max(0, list.indexOf(cat));
  return CATEGORY_PALETTE[idx % CATEGORY_PALETTE.length];
}

// ---------- Formatting ----------
function initials(nome) {
  const parts = (nome || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function avatarHTML(contact, size) {
  const cls = size === 'lg' ? 'avatar avatar-lg' : 'avatar avatar-sm';
  if (contact.foto) {
    return `<div class="${cls}"><img src="${contact.foto}" alt=""></div>`;
  }
  return `<div class="${cls}" style="background:${categoryColor(contact.categoria)}">${initials(contact.nome)}</div>`;
}
function escapeHTML(s) {
  return (s || '').toString().replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function slug(s) {
  return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'contacto';
}

// ---------- Interaction history helpers ----------
function lastContactDate(x) {
  if (x.interacoes && x.interacoes.length) {
    return x.interacoes.reduce((max, i) => (i.data > max ? i.data : max), x.interacoes[0].data);
  }
  return x.ultimoContato || '';
}
function addInteraction(id, data, tipo, nota) {
  const x = contacts.find(v => v.id === id);
  if (!x) return;
  pushUndoSnapshot();
  if (!Array.isArray(x.interacoes)) x.interacoes = [];
  x.interacoes.push({ id: cryptoRandomId(), data: data || todayISO(), tipo: tipo || 'Contacto', nota: nota || '' });
  saveContacts(contacts);
  renderAll();
}
function logContactToday(id) {
  addInteraction(id, todayISO(), 'Contacto', '');
}

// ---------- Filtering ----------
function getBaseByView() {
  if (statView === 'followup') return contacts.filter(x => daysBetween(lastContactDate(x) || x.criadoEm) >= 90);
  if (statView === 'favoritos') return contacts.filter(x => x.favorito);
  return contacts;
}

function getFiltered() {
  return getBaseByView().filter(x => {
    if (activeCategory !== 'Todos' && x.categoria !== activeCategory) return false;
    if (!searchTerm) return true;
    const hay = norm([x.nome, x.empresa, x.cargo, x.localidade, (x.tags || []).join(' ')].join(' '));
    return hay.includes(norm(searchTerm));
  });
}

function setStatView(view) {
  statView = view;
  searchTerm = '';
  document.getElementById('searchInput').value = '';
  selectionSafety();
  renderAll();
}

// ---------- Aggregate stats ----------
function computeStats() {
  const scoped = activeCategory === 'Todos' ? contacts : contacts.filter(x => x.categoria === activeCategory);
  const aniversarios = scoped.filter(x => x.aniversario && daysToNextBirthday(x.aniversario) <= 30).length;
  const semContacto = scoped.filter(x => daysBetween(lastContactDate(x) || x.criadoEm) >= 90).length;
  const favoritos = scoped.filter(x => x.favorito).length;
  return { total: scoped.length, aniversarios, semContacto, favoritos };
}

function renderStatCards() {
  const s = computeStats();
  const cards = [
    { icon: icon('users'), num: s.total, lbl: 'Contactos', view: 'todos' },
    { icon: icon('calendar'), num: s.aniversarios, lbl: 'Aniversários (30d)', view: 'aniversarios' },
    { icon: icon('clock'), num: s.semContacto, lbl: 'Follow-up (90d+)', view: 'followup', warn: s.semContacto > 0 },
    { icon: icon('starFilled'), num: s.favoritos, lbl: 'Favoritos', view: 'favoritos' },
  ];
  document.getElementById('statCards').innerHTML = cards.map(cd => `
    <button type="button" class="stat-card ${cd.view === statView ? 'active' : ''} ${cd.warn ? 'warn' : ''}" data-view="${cd.view}">
      <div class="icon">${cd.icon}</div>
      <div>
        <div class="num">${cd.num}</div>
        <div class="lbl">${cd.lbl}</div>
      </div>
    </button>
  `).join('');
  document.querySelectorAll('.stat-card').forEach(btn => {
    btn.addEventListener('click', () => setStatView(btn.dataset.view));
  });
  document.getElementById('orbTag').textContent = `${s.total} contacto${s.total === 1 ? '' : 's'}`;
}

// ---------- Category filter chips ----------
// The category is chosen once, on the landing screen, so this row stays hidden inside the app.
function renderChips() {
  const chipsRow = document.getElementById('chipsRow');
  const searchInput = document.getElementById('searchInput');
  chipsRow.style.display = 'none';
  chipsRow.innerHTML = '';
  searchInput.style.display = statView === 'aniversarios' ? 'none' : '';
}

// ---------- List (branches) ----------
const branchesEl = document.getElementById('branches');

function selectionSafety() {
  detailId = null;
  const filtered = getFiltered();
  if (filtered.length && !filtered.some(x => x.id === selectedId)) {
    selectedId = filtered[0].id;
  }
  if (!contacts.length) selectedId = null;
}

function contactRowHTML(x, i = 0) {
  const followUp = daysBetween(lastContactDate(x) || x.criadoEm) >= 90;
  const delay = Math.min(i, 14) * 22;
  return `
    <div class="contact-row ${x.id === selectedId ? 'selected' : ''}" data-id="${x.id}" style="border-left-color:${categoryColor(x.categoria)};animation-delay:${delay}ms">
      ${avatarHTML(x, 'sm')}
      <span class="name">${escapeHTML(x.nome)}</span>
      <span class="addr">${escapeHTML(x.empresa || x.cargo || '')}</span>
      <span class="pillrow">
        ${x.favorito ? `<span class="star">${icon('starFilled')}</span>` : ''}
        ${followUp ? `<span class="pay-dot" style="background:#d03b3b" title="Sem contacto há 90+ dias"></span>` : ''}
      </span>
    </div>
  `;
}

function attachRowClickHandlers() {
  branchesEl.querySelectorAll('.contact-row[data-id]').forEach(row => {
    row.addEventListener('click', () => {
      selectedId = row.dataset.id;
      detailId = null;
      activeTab = 'geral';
      renderAll();
    });
  });
}

function renderBranches() {
  if (!contacts.length) {
    branchesEl.innerHTML = `<div class="empty-state">Ainda não tem contactos.<br>Adicione o primeiro com "+ Novo Contacto".</div>`;
    return;
  }

  if (statView === 'aniversarios') { renderBirthdaysView(); return; }
  if (statView === 'categorias' && activeCategory === 'Todos') { renderCategoryGroups(); return; }

  const filtered = getFiltered();
  if (!filtered.length) {
    branchesEl.innerHTML = `<div class="empty-state">Nenhum contacto encontrado para este filtro.</div>`;
    return;
  }
  branchesEl.innerHTML = filtered.map((x, i) => contactRowHTML(x, i)).join('');
  attachRowClickHandlers();
  insertConnectionsAfterSelected();
}

// ---------- View: contacts grouped by category ----------
function renderCategoryGroups() {
  const filtered = getFiltered();
  if (!filtered.length) {
    branchesEl.innerHTML = `<div class="empty-state">Nenhum contacto encontrado para este filtro.</div>`;
    return;
  }
  const cats = getCategoryList();
  branchesEl.innerHTML = cats.map(cat => {
    const items = filtered.filter(x => x.categoria === cat);
    const color = categoryColor(cat);
    return `
      <div class="category-group">
        <button type="button" class="category-group-head" data-cat="${cat}" style="--cat-color:${color}">
          <span class="cg-dot" style="background:${color}"></span>
          <span class="cg-name">${cat}</span>
          <span class="cg-count">${items.length}</span>
        </button>
        ${items.length ? items.map((x, i) => contactRowHTML(x, i)).join('') : '<div class="empty-state cg-empty">Sem contactos nesta categoria.</div>'}
      </div>
    `;
  }).join('');

  branchesEl.querySelectorAll('.category-group-head').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      selectionSafety();
      renderAll();
    });
  });
  attachRowClickHandlers();
  insertConnectionsAfterSelected();
}

// ---------- View: birthdays, calendar-style ----------
function bdayRowHTML(x, days) {
  const label = days === 0 ? 'Hoje' : days === 1 ? 'Amanhã' : `Daqui a ${days} dias`;
  return `
    <div class="contact-row bday-row ${x.id === selectedId ? 'selected' : ''}" data-id="${x.id}" style="border-left-color:${categoryColor(x.categoria)}">
      ${avatarHTML(x, 'sm')}
      <span class="name">${escapeHTML(x.nome)}</span>
      <span class="addr">${fmtDateNoYear(x.aniversario)}</span>
      <span class="pillrow"><span class="bday-tag ${days === 0 ? 'today' : ''}">${label}</span></span>
    </div>
  `;
}

function renderBirthdaysView() {
  const withBday = contacts.filter(x => x.aniversario);
  const withDays = withBday.map(x => ({ x, days: daysToNextBirthday(x.aniversario) }));
  const today = withDays.filter(o => o.days === 0);
  const upcoming = withDays.filter(o => o.days > 0).sort((a, b) => a.days - b.days);

  branchesEl.innerHTML = `
    <div class="bday-section">
      <div class="bday-section-title">${icon('calendar')} Fazem anos hoje</div>
      ${today.length ? today.map(o => bdayRowHTML(o.x, o.days)).join('') : '<div class="empty-state">Ninguém faz anos hoje.</div>'}
    </div>
    <div class="bday-section">
      <div class="bday-section-title">${icon('calendar')} Próximos aniversários</div>
      ${upcoming.length ? upcoming.map(o => bdayRowHTML(o.x, o.days)).join('') : '<div class="empty-state">Sem aniversários registados.</div>'}
    </div>
  `;
  attachRowClickHandlers();
}

// ---------- SVG curves from orb to each contact row ----------
const svg = document.getElementById('curves');
const wrapEl = document.querySelector('.branches-wrap');
const orbEl = document.querySelector('.orb');

function drawCurves() {
  const wrapRect = wrapEl.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${wrapRect.width} ${wrapRect.height}`);
  svg.setAttribute('width', wrapRect.width);
  svg.setAttribute('height', wrapRect.height);

  const orbRect = orbEl.getBoundingClientRect();
  const originX = orbRect.right - wrapRect.left;
  const originY = orbRect.top + orbRect.height / 2 - wrapRect.top;

  let paths = '';

  // Hub -> every real contact row (side tiles connect locally to the selected row instead).
  const rows = branchesEl.querySelectorAll('.contact-row:not(.side-tile)');
  rows.forEach(row => {
    const r = row.getBoundingClientRect();
    const x2 = r.left - wrapRect.left;
    const y2 = r.top + r.height / 2 - wrapRect.top;
    const midX = originX + (x2 - originX) * 0.55;
    const isActive = row.dataset.id === selectedId;
    paths += `<path class="${isActive ? 'active' : ''}" d="M ${originX} ${originY} C ${midX} ${originY}, ${midX} ${y2}, ${x2} ${y2}"></path>`;
  });

  // Generic local wiring: any tile carrying data-parent-tile gets a short wire from its parent tile
  // (the selected row for its direct connections, or a direct connection for its own connections).
  branchesEl.querySelectorAll('.selected-with-add [data-parent-tile]').forEach(tile => {
    const parentEl = branchesEl.querySelector(`.contact-row[data-id="${tile.dataset.parentTile}"]`);
    if (!parentEl) return;
    const pr = parentEl.getBoundingClientRect();
    const r = tile.getBoundingClientRect();
    const startX = pr.right - wrapRect.left;
    const startY = pr.top + pr.height / 2 - wrapRect.top;
    const x2 = r.left - wrapRect.left;
    const y2 = r.top + r.height / 2 - wrapRect.top;
    const midX = startX + (x2 - startX) * 0.5;
    const isFirstDegree = tile.dataset.parentTile === selectedId;
    paths += `<path class="${isFirstDegree ? 'active' : ''}" d="M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${y2}, ${x2} ${y2}"></path>`;
  });

  svg.innerHTML = paths;
}

function buildRelatedTile(r, parentId) {
  const tile = document.createElement('div');
  tile.className = 'contact-row side-tile related-side-tile';
  tile.dataset.id = r.id;
  tile.dataset.parentTile = parentId;
  tile.style.borderLeftColor = categoryColor(r.categoria);
  tile.innerHTML = `${avatarHTML(r, 'sm')}<span class="name">${escapeHTML(r.nome)}</span><button type="button" class="side-tile-add" title="Adicionar contacto ligado a ${escapeHTML(r.nome)}">+</button>`;
  tile.addEventListener('click', () => { detailId = r.id; activeTab = 'geral'; renderDetail(); });
  tile.querySelector('.side-tile-add').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(null, [r.id]);
  });
  return tile;
}

function insertConnectionsAfterSelected() {
  if (!selectedId) return;
  const selRow = branchesEl.querySelector(`.contact-row[data-id="${selectedId}"]:not(.side-tile)`);
  if (!selRow) return;
  const x = contacts.find(v => v.id === selectedId);
  if (!x) return;

  const wrap = document.createElement('div');
  wrap.className = 'selected-with-add';
  selRow.parentNode.insertBefore(wrap, selRow);

  const main = document.createElement('div');
  main.className = 'swa-main';
  main.appendChild(selRow);
  wrap.appendChild(main);

  const stack = document.createElement('div');
  stack.className = 'swa-connections';
  wrap.appendChild(stack);

  const related = (x.relacionados || []).map(id => contacts.find(v => v.id === id)).filter(Boolean);
  related.forEach(r => {
    const node = document.createElement('div');
    node.className = 'branch-node';
    node.appendChild(buildRelatedTile(r, selectedId));

    // Web view: also show who each connection knows (their own connections, one level further out).
    const secondDegree = (r.relacionados || [])
      .filter(id => id !== selectedId)
      .map(id => contacts.find(v => v.id === id))
      .filter(Boolean);
    if (secondDegree.length) {
      const subStack = document.createElement('div');
      subStack.className = 'swa-connections swa-connections-nested';
      secondDegree.forEach(r2 => {
        const tile2 = buildRelatedTile(r2, r.id);
        tile2.classList.add('second-degree-tile');
        subStack.appendChild(tile2);
      });
      node.appendChild(subStack);
    }

    stack.appendChild(node);
  });

  const addTile = document.createElement('div');
  addTile.className = 'contact-row side-tile add-node-row';
  addTile.dataset.parentTile = selectedId;
  addTile.innerHTML = `<span class="add-node-icon">+</span><span class="name">Adicionar</span>`;
  addTile.addEventListener('click', () => openModal(null, [selectedId]));
  stack.appendChild(addTile);
}

// ---------- Detail panel (ficha) ----------
const detailEl = document.getElementById('detail');

function tabValuePreview(x, key) {
  switch (key) {
    case 'geral': return '';
    case 'fotos': return (x.fotos || []).length || '—';
    case 'perfil': return PERFIL_FIELDS.some(f => x[f.key]) ? 'Preenchido' : '—';
    case 'notas': return (x.tags || []).length ? `${x.tags.length} tag(s)` : (x.notas ? 'Notas' : '—');
    case 'historico': {
      const last = lastContactDate(x);
      return last ? `${daysBetween(last)}d atrás` : 'Novo';
    }
    case 'rede': return (x.relacionados || []).length || '—';
  }
}

function renderEditableFields(x, fields) {
  return fields.map(f => {
    const value = f.isTags ? (x.tags || []).join(', ') : (x[f.key] || '');
    const attrs = `class="kv-input" data-field="${f.key}"${f.isTags ? ' data-tags="1"' : ''}`;
    if (f.type === 'textarea') {
      return `
        <div class="kv-row kv-editable kv-stack">
          <span class="k">${f.label}</span>
          <textarea ${attrs} rows="2" placeholder="Escreva aqui…">${escapeHTML(value)}</textarea>
        </div>
      `;
    }
    return `
      <div class="kv-row kv-editable">
        <span class="k">${f.label}</span>
        <input ${attrs} type="${f.type}" value="${escapeHTML(value)}" placeholder="—">
      </div>
    `;
  }).join('');
}

function renderHistoricoTab(x) {
  const last = lastContactDate(x);
  const dias = daysBetween(last || x.criadoEm);
  const interacoes = (x.interacoes || []).slice().sort((a, b) => b.data.localeCompare(a.data));
  return `
    <div class="kv-row"><span class="k">Último contacto</span><span class="v">${last ? `${fmtDate(last)} (${dias}d)` : 'Sem registo'}</span></div>
    <div class="kv-row"><span class="k">Contacto adicionado em</span><span class="v">${fmtDate(x.criadoEm)}</span></div>
    <button type="button" class="btn-ghost" id="logContactBtn" style="margin:10px 0;">${icon('check')} Registar contacto hoje</button>
    <div class="timeline">
      ${interacoes.length ? interacoes.map(i => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-body">
            <div class="timeline-head"><b>${escapeHTML(i.tipo)}</b><span>${fmtDate(i.data)}</span></div>
            ${i.nota ? `<div class="timeline-note">${escapeHTML(i.nota)}</div>` : ''}
          </div>
        </div>
      `).join('') : '<div class="empty-state" style="padding:10px 0;">Sem interações registadas.</div>'}
    </div>
    <form id="interactionForm" class="interaction-form">
      <input type="date" id="i_data" value="${todayISO()}" required>
      <select id="i_tipo">
        <option>Chamada</option><option>Email</option><option>Reunião</option><option>Café</option><option>Evento</option><option>Mensagem</option><option>Outro</option>
      </select>
      <input type="text" id="i_nota" placeholder="Nota (opcional)">
      <button type="submit" class="btn-ghost">+ Adicionar</button>
    </form>
  `;
}

function renderRedeTab(x) {
  const related = (x.relacionados || []).map(id => contacts.find(v => v.id === id)).filter(Boolean);
  const firstName = (x.nome || '').split(' ')[0] || 'este contacto';
  const rows = related.map(r => `
    <div class="related-row" data-id="${r.id}">
      ${avatarHTML(r, 'sm')}
      <div>
        <div class="related-name">${escapeHTML(r.nome)}</div>
        <div class="related-sub">${escapeHTML(r.empresa || r.cargo || '')}</div>
      </div>
    </div>
  `).join('');
  const addTile = `
    <button type="button" class="related-add-tile" id="addRelatedContactBtn">
      <span class="related-add-icon">+</span>
      <span>Adicionar contacto ligado a ${escapeHTML(firstName)}</span>
    </button>
  `;
  if (!related.length) {
    return `<div class="empty-state" style="padding:6px 0 12px;">Sem contactos associados ainda.</div>${addTile}`;
  }
  return rows + addTile;
}

function suggestion(x) {
  const firstName = (x.nome || '').split(' ')[0] || 'este contacto';
  const daysSince = daysBetween(lastContactDate(x) || x.criadoEm);
  const bday = daysToNextBirthday(x.aniversario);

  if (x.aniversario && bday <= 14) {
    return { title: 'Aniversário a chegar', text: `O aniversário de ${firstName} é daqui a ${bday} dia(s). Uma mensagem a felicitar é uma ótima forma de manter a relação viva.` };
  }
  if (daysSince >= 180) {
    return { title: 'Contacto a esfriar', text: `Já não fala com ${firstName} há mais de 6 meses (${daysSince} dias). Talvez valha a pena reatar antes que se perca de vez.` };
  }
  if (daysSince >= 90) {
    return { title: 'Está na hora de retomar contacto', text: `Sem interações há ${daysSince} dias. Marque uma chamada ou envie um email curto para manter a relação ativa.` };
  }
  if (x.favorito && daysSince >= 30) {
    return { title: 'Favorito a precisar de atenção', text: `${firstName} é um contacto favorito, mas já não falam há ${daysSince} dias. Vale a pena um follow-up.` };
  }
  return { title: 'Relação em dia', text: `Interação recente (${lastContactDate(x) ? daysSince + ' dias' : 'contacto novo'}). Continue a nutrir esta relação.` };
}

function renderDetail() {
  if (!contacts.length) {
    detailEl.innerHTML = `
      <div class="d-head">${icon('users')} &nbsp;Rede de Contactos</div>
      <div class="empty-state">Sem contactos ainda.<br>Comece por adicionar o primeiro.</div>
      <button type="button" class="btn-primary" id="emptyAddBtn">+ Novo Contacto</button>
    `;
    document.getElementById('emptyAddBtn').addEventListener('click', () => openModal(null));
    return;
  }

  const x = contacts.find(v => v.id === (detailId || selectedId)) || contacts[0];
  const ai = suggestion(x);
  const catColor = categoryColor(x.categoria);

  let subpointHTML;
  if (activeTab === 'historico') subpointHTML = renderHistoricoTab(x);
  else if (activeTab === 'rede') subpointHTML = renderRedeTab(x);
  else if (activeTab === 'fotos') subpointHTML = renderFotosTab(x);
  else if (activeTab === 'perfil') subpointHTML = renderEditableFields(x, PERFIL_FIELDS);
  else if (activeTab === 'notas') subpointHTML = renderEditableFields(x, NOTAS_FIELDS);
  else {
    subpointHTML = renderEditableFields(x, GERAL_FIELDS);
    if (x.aniversario) {
      subpointHTML += `<button type="button" class="btn-ghost" id="addBdayIcsBtn" style="margin-top:8px;">${icon('calendar')} Adicionar aniversário ao calendário</button>`;
    }
  }

  detailEl.innerHTML = `
    <div class="d-head">
      ${icon('idCard')} &nbsp;Ficha de Contacto
      <span class="d-icon-actions">
        <button type="button" class="icon-btn" id="saveVcfBtn" title="Guardar (.vcf)">${icon('download')}</button>
        <button type="button" class="icon-btn" id="editBtn" title="Editar categoria, foto e ligações">${icon('edit')}</button>
        <button type="button" class="icon-btn icon-btn-danger" id="deleteBtn" title="Eliminar contacto">${icon('trash')}</button>
      </span>
    </div>

    <div class="d-profile-row">
      ${avatarHTML(x, 'lg')}
      <div class="d-profile-text">
        <div class="d-title" contenteditable="true" spellcheck="false" id="nomeEditable">${escapeHTML(x.nome)}</div>
        <div class="d-addr">${escapeHTML(x.cargo || '')}${x.cargo && x.empresa ? ' @ ' : ''}${escapeHTML(x.empresa || '')}</div>
      </div>
    </div>

    <div class="d-pill-row">
      <span class="status-pill" style="color:${catColor}; background:${catColor}22; border:1px solid ${catColor}55;">
        <span class="dot" style="width:6px;height:6px;border-radius:50%;background:${catColor};"></span>
        ${escapeHTML(x.categoria || 'Sem categoria')}
      </span>
      <button type="button" class="star-toggle ${x.favorito ? 'on' : ''}" id="favToggleBtn" title="Marcar/desmarcar favorito">${x.favorito ? icon('starFilled') : icon('starOutline')}</button>
    </div>

    <div class="d-meta-row">
      <div class="d-meta-text">${x.telefone ? `<a href="tel:${encodeURIComponent(x.telefone)}">${icon('phone')} <b>${escapeHTML(x.telefone)}</b></a>` : 'Sem telefone registado'}</div>
      <div class="d-meta-text">${x.email ? `<a href="mailto:${encodeURIComponent(x.email)}">${icon('mail')} <b>${escapeHTML(x.email)}</b></a>` : ''}</div>
    </div>

    <div class="subpoint-tabs" id="subpointTabs">
      ${TAB_DEFS.map(t => `
        <div class="subpoint-tab ${t.key === activeTab ? 'active' : ''}" data-key="${t.key}">
          <span class="t-icon">${t.icon}</span>
          <span class="t-lbl">${t.lbl}</span>
          <span class="t-val">${escapeHTML(String(tabValuePreview(x, t.key)))}</span>
        </div>
      `).join('')}
    </div>

    <div class="card subpoint-detail" id="subpointDetail">
      ${subpointHTML}
    </div>

    <div class="card ai-box">
      <div class="ai-head">${icon('sparkle')} Sugestão</div>
      <div class="ai-title">${ai.title}</div>
      <div class="ai-text">${ai.text}</div>
    </div>
  `;

  document.getElementById('subpointTabs').querySelectorAll('.subpoint-tab').forEach(tab => {
    tab.addEventListener('click', () => { activeTab = tab.dataset.key; renderDetail(); });
  });
  document.getElementById('favToggleBtn').addEventListener('click', () => toggleFavorite(x.id));
  document.getElementById('editBtn').addEventListener('click', () => openModal(x));
  document.getElementById('deleteBtn').addEventListener('click', () => deleteContact(x.id));
  document.getElementById('saveVcfBtn').addEventListener('click', () => downloadFile(`${slug(x.nome)}.vcf`, contactToVCard(x), 'text/vcard'));

  if (activeTab === 'geral') {
    const bdayBtn = document.getElementById('addBdayIcsBtn');
    if (bdayBtn) bdayBtn.addEventListener('click', () => downloadBirthdayIcs(x));
  }
  if (activeTab === 'historico') {
    document.getElementById('logContactBtn').addEventListener('click', () => logContactToday(x.id));
    document.getElementById('interactionForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = document.getElementById('i_data').value || todayISO();
      const tipo = document.getElementById('i_tipo').value;
      const nota = document.getElementById('i_nota').value.trim();
      addInteraction(x.id, data, tipo, nota);
    });
  }
  if (activeTab === 'rede') {
    detailEl.querySelectorAll('.related-row').forEach(row => {
      row.addEventListener('click', () => { selectedId = row.dataset.id; activeTab = 'geral'; renderAll(); });
    });
    document.getElementById('addRelatedContactBtn').addEventListener('click', () => openModal(null, [x.id]));
  }
  if (activeTab === 'fotos') {
    const addBtn = document.getElementById('addPhotoBtn');
    const input = document.getElementById('photoGalleryInput');
    addBtn.addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      resizeImageFileMax(file, 900, (dataUrl) => {
        pushUndoSnapshot();
        if (!Array.isArray(x.fotos)) x.fotos = [];
        x.fotos.push(dataUrl);
        saveContacts(contacts);
        renderAll();
      });
      input.value = '';
    });
    detailEl.querySelectorAll('.photo-tile img').forEach(img => {
      img.addEventListener('click', () => openPhotoLightbox(img.src));
    });
    detailEl.querySelectorAll('.photo-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const photoIdx = Number(btn.dataset.idx);
        pushUndoSnapshot();
        x.fotos.splice(photoIdx, 1);
        saveContacts(contacts);
        renderAll();
      });
    });
  }
}

// ---------- Fotos tab: a small photo gallery per contact ----------
function renderFotosTab(x) {
  const fotos = x.fotos || [];
  const tiles = fotos.map((src, i) => `
    <div class="photo-tile">
      <img src="${src}" alt="">
      <button type="button" class="photo-remove-btn" data-idx="${i}" title="Remover foto">${icon('x')}</button>
    </div>
  `).join('');
  return `
    <div class="photo-grid">
      ${tiles}
      <button type="button" class="photo-add-tile" id="addPhotoBtn">${icon('plus')}<span>Adicionar foto</span></button>
    </div>
    <input type="file" id="photoGalleryInput" accept="image/*" hidden>
  `;
}

function resizeImageFileMax(file, maxDim, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function openPhotoLightbox(src) {
  const overlay = document.createElement('div');
  overlay.className = 'photo-lightbox-overlay';
  overlay.innerHTML = `<button type="button" class="photo-lightbox-close">${icon('x')}</button><img src="${src}" alt="">`;
  overlay.addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
}

// ---------- Mutations ----------
function toggleFavorite(id) {
  const x = contacts.find(v => v.id === id);
  if (!x) return;
  pushUndoSnapshot();
  x.favorito = !x.favorito;
  saveContacts(contacts);
  renderAll();
}

function syncBidirectionalRelations(contactId, newRelatedIds, oldRelatedIds) {
  const added = newRelatedIds.filter(id => !oldRelatedIds.includes(id));
  const removed = oldRelatedIds.filter(id => !newRelatedIds.includes(id));
  added.forEach(id => {
    const other = contacts.find(v => v.id === id);
    if (!other) return;
    if (!Array.isArray(other.relacionados)) other.relacionados = [];
    if (!other.relacionados.includes(contactId)) other.relacionados.push(contactId);
  });
  removed.forEach(id => {
    const other = contacts.find(v => v.id === id);
    if (other && Array.isArray(other.relacionados)) {
      other.relacionados = other.relacionados.filter(rid => rid !== contactId);
    }
  });
}

function deleteContact(id) {
  const x = contacts.find(v => v.id === id);
  if (!x) return;
  const ok = confirm(`Eliminar o contacto "${x.nome}"? Pode usar o botão "Desfazer" no canto superior esquerdo se mudar de ideias.`);
  if (!ok) return;
  pushUndoSnapshot();
  const commit = () => {
    contacts = contacts.filter(v => v.id !== id);
    contacts.forEach(v => { v.relacionados = (v.relacionados || []).filter(rid => rid !== id); });
    saveContacts(contacts);
    selectionSafety();
    renderAll();
  };
  const row = branchesEl.querySelector(`.contact-row[data-id="${id}"]`);
  if (row) {
    let done = false;
    const finish = () => { if (done) return; done = true; commit(); };
    row.classList.add('row-removing');
    row.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 260);
  } else {
    commit();
  }
}

// ---------- File export helpers ----------
function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
function csvField(v) {
  v = v == null ? '' : String(v);
  if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
  return v;
}
function icsEscape(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,');
}
function icsTimestamp() {
  return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
function contactToVCard(x) {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${x.nome}`, `N:${x.nome};;;;`];
  if (x.empresa) lines.push(`ORG:${x.empresa}`);
  if (x.cargo) lines.push(`TITLE:${x.cargo}`);
  if (x.telefone) lines.push(`TEL;TYPE=CELL:${x.telefone}`);
  if (x.email) lines.push(`EMAIL:${x.email}`);
  if (x.link) lines.push(`URL:${x.link}`);
  if (x.aniversario) lines.push(`BDAY:${x.aniversario.replace(/-/g, '')}`);
  if (x.notas) lines.push(`NOTE:${x.notas.replace(/\n/g, '\\n')}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}
function birthdayToICSEvent(x) {
  const [, m, d] = x.aniversario.split('-');
  const now = new Date();
  const dtstart = `${now.getFullYear()}${m}${d}`;
  return [
    'BEGIN:VEVENT',
    `UID:bday-${x.id}@rededecontactos`,
    `DTSTAMP:${icsTimestamp()}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    'RRULE:FREQ=YEARLY',
    `SUMMARY:🎂 Aniversário de ${icsEscape(x.nome)}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Aniversário amanhã', 'END:VALARM',
    'END:VEVENT',
  ].join('\r\n');
}
function downloadBirthdayIcs(x) {
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Rede de Contactos//PT\r\n${birthdayToICSEvent(x)}\r\nEND:VCALENDAR`;
  downloadFile(`aniversario-${slug(x.nome)}.ics`, ics, 'text/calendar');
}

// ---------- CSV / vCard parsing (import) ----------
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  const pushField = () => { row.push(field); field = ''; };
  const pushRow = () => { pushField(); rows.push(row); row = []; };
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') pushField();
    else if (ch === '\r') { /* ignore */ }
    else if (ch === '\n') pushRow();
    else field += ch;
  }
  if (field.length || row.length) pushRow();
  return rows.filter(r => !(r.length === 1 && r[0].trim() === ''));
}
function mapHeader(headers) {
  const normHeaders = headers.map(norm);
  const find = (...names) => normHeaders.findIndex(h => names.includes(h));
  return {
    nome: find('nome', 'name', 'full name', 'fullname'),
    first: find('first name', 'given name', 'primeiro nome'),
    last: find('last name', 'family name', 'apelido'),
    empresa: find('empresa', 'company', 'organization', 'organization name', 'company name'),
    cargo: find('cargo', 'position', 'title', 'organization title', 'job title'),
    telefone: find('telefone', 'phone', 'phone 1 - value', 'mobile phone', 'phone number'),
    email: find('email', 'e-mail', 'email address', 'e-mail 1 - value'),
    localidade: find('localidade', 'city', 'cidade'),
    link: find('url', 'linkedin', 'website', 'profile url'),
  };
}
function handleCSVImport(text) {
  const rows = parseCSV(text);
  if (!rows.length) return [];
  const idx = mapHeader(rows[0]);
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const get = (n) => (n >= 0 && r[n] != null) ? r[n].trim() : '';
    let nome = idx.nome >= 0 ? get(idx.nome) : `${get(idx.first)} ${get(idx.last)}`.trim();
    const email = get(idx.email);
    const telefone = get(idx.telefone);
    if (!nome && !email && !telefone) continue;
    if (!nome) nome = email || telefone || 'Sem nome';
    result.push(c(nome, 'Prospect', get(idx.empresa), get(idx.cargo), telefone, email, get(idx.localidade), get(idx.link), '', 'Importado', '', [], false, ''));
  }
  return result;
}
function normalizeVCardDate(v) {
  const m = v.match(/(\d{4})-?(\d{2})-?(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : '';
}
function parseVCards(text) {
  const cards = text.split(/BEGIN:VCARD/i).slice(1).map(chunk => chunk.split(/END:VCARD/i)[0]);
  const result = [];
  cards.forEach(card => {
    const lines = card.split(/\r\n|\r|\n/).map(l => l.trim()).filter(Boolean);
    let nome = '', telefone = '', email = '', empresa = '', cargo = '', link = '', aniversario = '';
    lines.forEach(line => {
      const m = line.match(/^([^:;]+)(;[^:]*)?:(.*)$/);
      if (!m) return;
      const key = m[1].toUpperCase();
      const value = m[3];
      if (key === 'FN') nome = value;
      else if (key === 'TEL') telefone = telefone || value;
      else if (key === 'EMAIL') email = email || value;
      else if (key === 'ORG') empresa = value.split(';')[0];
      else if (key === 'TITLE') cargo = value;
      else if (key === 'URL') link = link || value;
      else if (key === 'BDAY') aniversario = normalizeVCardDate(value);
    });
    if (!nome && !email && !telefone) return;
    if (!nome) nome = email || telefone || 'Sem nome';
    result.push(c(nome, 'Prospect', empresa, cargo, telefone, email, '', link, aniversario, 'Importado (vCard)', '', [], false, ''));
  });
  return result;
}

// ---------- Modal (add / edit) ----------
const modalOverlay = document.getElementById('modalOverlay');
const contactForm = document.getElementById('contactForm');
const avatarPreview = document.getElementById('avatarPreview');
const photoInput = document.getElementById('photoInput');
const categorySelect = document.getElementById('f_categoria');
const novaCategoriaWrap = document.getElementById('novaCategoriaWrap');

function populateCategorySelect(selected) {
  const list = getCategoryList();
  categorySelect.innerHTML = list.map(cat => `<option value="${cat}">${cat}</option>`).join('') +
    `<option value="__new__">+ Nova categoria…</option>`;
  categorySelect.value = list.includes(selected) ? selected : list[0];
  novaCategoriaWrap.hidden = true;
}

categorySelect.addEventListener('change', () => {
  novaCategoriaWrap.hidden = categorySelect.value !== '__new__';
});

function populateRelatedDatalist() {
  document.getElementById('relatedDatalist').innerHTML = contacts
    .filter(v => v.id !== editingId)
    .map(v => `<option value="${escapeHTML(v.nome)}">`).join('');
}
function renderRelatedChips() {
  const wrap = document.getElementById('relatedChips');
  wrap.innerHTML = formRelatedIds.map(id => {
    const rc = contacts.find(v => v.id === id);
    if (!rc) return '';
    return `<span class="tag-chip">${escapeHTML(rc.nome)} <button type="button" class="tag-chip-x" data-id="${id}">✕</button></span>`;
  }).join('');
  wrap.querySelectorAll('.tag-chip-x').forEach(btn => {
    btn.addEventListener('click', () => {
      formRelatedIds = formRelatedIds.filter(id => id !== btn.dataset.id);
      renderRelatedChips();
    });
  });
}
document.getElementById('addRelatedBtn').addEventListener('click', () => {
  const input = document.getElementById('f_relatedSearch');
  const name = input.value.trim();
  if (!name) return;
  const match = contacts.find(v => v.id !== editingId && norm(v.nome) === norm(name));
  if (!match) { alert('Contacto não encontrado. Escolha um nome existente na lista sugerida.'); return; }
  if (!formRelatedIds.includes(match.id)) formRelatedIds.push(match.id);
  input.value = '';
  renderRelatedChips();
});

function openModal(contact, presetRelatedIds) {
  editingId = contact ? contact.id : null;
  currentPhotoData = contact ? contact.foto : null;
  formRelatedIds = contact ? [...(contact.relacionados || [])] : [...(presetRelatedIds || [])];
  document.getElementById('modalTitle').textContent = contact ? 'Editar Contacto' : 'Novo Contacto';

  document.getElementById('f_nome').value = contact ? contact.nome : '';
  populateCategorySelect(contact ? contact.categoria : DEFAULT_CATEGORIES[0]);
  document.getElementById('f_novaCategoria').value = '';
  document.getElementById('f_empresa').value = contact ? contact.empresa : '';
  document.getElementById('f_cargo').value = contact ? contact.cargo : '';
  document.getElementById('f_telefone').value = contact ? contact.telefone : '';
  document.getElementById('f_email').value = contact ? contact.email : '';
  document.getElementById('f_localidade').value = contact ? contact.localidade : '';
  document.getElementById('f_link').value = contact ? contact.link : '';
  document.getElementById('f_aniversario').value = contact ? (contact.aniversario || '') : '';
  document.getElementById('f_favorito').checked = contact ? !!contact.favorito : false;
  document.getElementById('f_comoConhecemos').value = contact ? contact.comoConhecemos : '';
  document.getElementById('f_notas').value = contact ? contact.notas : '';
  document.getElementById('f_tags').value = contact ? (contact.tags || []).join(', ') : '';
  document.getElementById('f_relatedSearch').value = '';

  populateRelatedDatalist();
  renderRelatedChips();
  updateAvatarPreview();
  modalOverlay.hidden = false;
  document.getElementById('f_nome').focus();
}

function closeModal() {
  modalOverlay.hidden = true;
  contactForm.reset();
  editingId = null;
  currentPhotoData = null;
  formRelatedIds = [];
}

function updateAvatarPreview() {
  const removeBtn = document.getElementById('removePhotoBtn');
  if (currentPhotoData) {
    avatarPreview.innerHTML = `<img src="${currentPhotoData}" alt="">`;
    removeBtn.hidden = false;
  } else {
    avatarPreview.innerHTML = '＋';
    removeBtn.hidden = true;
  }
}

document.getElementById('addContactBtn').addEventListener('click', () => openModal(null));
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

document.getElementById('choosePhotoBtn').addEventListener('click', () => photoInput.click());
document.getElementById('removePhotoBtn').addEventListener('click', () => { currentPhotoData = null; updateAvatarPreview(); });

photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  if (!file) return;
  resizeImageFile(file, 200, (dataUrl) => {
    currentPhotoData = dataUrl;
    updateAvatarPreview();
  });
});

function resizeImageFile(file, size, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      const scale = Math.max(size / img.width, size / img.height);
      const w = img.width * scale, h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('f_nome').value.trim();
  if (!nome) return;

  let categoria = categorySelect.value;
  if (categoria === '__new__') {
    categoria = document.getElementById('f_novaCategoria').value.trim() || 'Outro';
  }

  const tags = document.getElementById('f_tags').value.split(',').map(t => t.trim()).filter(Boolean);

  const data = {
    nome,
    categoria,
    empresa: document.getElementById('f_empresa').value.trim(),
    cargo: document.getElementById('f_cargo').value.trim(),
    telefone: document.getElementById('f_telefone').value.trim(),
    email: document.getElementById('f_email').value.trim(),
    localidade: document.getElementById('f_localidade').value.trim(),
    link: document.getElementById('f_link').value.trim(),
    aniversario: document.getElementById('f_aniversario').value,
    favorito: document.getElementById('f_favorito').checked,
    comoConhecemos: document.getElementById('f_comoConhecemos').value.trim(),
    notas: document.getElementById('f_notas').value.trim(),
    tags,
    foto: currentPhotoData,
    relacionados: [...formRelatedIds],
  };

  pushUndoSnapshot();
  detailId = null;
  const oldRelatedIds = editingId ? [...((contacts.find(v => v.id === editingId) || {}).relacionados || [])] : [];
  let finalId;
  if (editingId) {
    const idx = contacts.findIndex(v => v.id === editingId);
    if (idx !== -1) contacts[idx] = { ...contacts[idx], ...data };
    selectedId = editingId;
    finalId = editingId;
  } else {
    const newContact = { ...data, id: cryptoRandomId(), interacoes: [], ultimoContato: '', criadoEm: todayISO() };
    contacts.push(newContact);
    selectedId = newContact.id;
    finalId = newContact.id;
    lastAddedId = newContact.id;
  }
  syncBidirectionalRelations(finalId, data.relacionados, oldRelatedIds);

  saveContacts(contacts);
  closeModal();
  activeTab = 'geral';
  renderAll();
});

// ---------- Search ----------
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchTerm = e.target.value;
  selectionSafety();
  renderAll();
});

// ---------- Inline editing in the detail panel (ficha) ----------
detailEl.addEventListener('change', (e) => {
  const el = e.target;
  if (!el.classList.contains('kv-input')) return;
  const idx = contacts.findIndex(v => v.id === (detailId || selectedId));
  if (idx === -1) return;
  pushUndoSnapshot();
  if (el.dataset.tags) {
    contacts[idx].tags = el.value.split(',').map(t => t.trim()).filter(Boolean);
  } else {
    contacts[idx][el.dataset.field] = el.value.trim();
  }
  saveContacts(contacts);
  renderAll();
});

detailEl.addEventListener('focusout', (e) => {
  if (e.target.id !== 'nomeEditable') return;
  const idx = contacts.findIndex(v => v.id === (detailId || selectedId));
  if (idx === -1) return;
  const newName = e.target.textContent.trim();
  if (!newName || newName === contacts[idx].nome) { e.target.textContent = contacts[idx].nome; return; }
  pushUndoSnapshot();
  contacts[idx].nome = newName;
  saveContacts(contacts);
  renderAll();
});

// ---------- Tools modal (export / import / reminders) ----------
const toolsModalOverlay = document.getElementById('toolsModalOverlay');
document.getElementById('toolsBtn').addEventListener('click', () => {
  refreshNotifStatus();
  toolsModalOverlay.hidden = false;
});
document.getElementById('toolsModalClose').addEventListener('click', () => { toolsModalOverlay.hidden = true; });
toolsModalOverlay.addEventListener('click', (e) => { if (e.target === toolsModalOverlay) toolsModalOverlay.hidden = true; });

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!modalOverlay.hidden) closeModal();
  if (!toolsModalOverlay.hidden) toolsModalOverlay.hidden = true;
});

document.getElementById('exportCsvBtn').addEventListener('click', () => {
  const headers = ['Nome', 'Categoria', 'Empresa', 'Cargo', 'Telefone', 'Email', 'Localidade', 'LinkedIn/Website', 'Aniversario', 'ComoConhecemos', 'Notas', 'Tags', 'Favorito', 'UltimoContacto'];
  const rows = contacts.map(x => [x.nome, x.categoria, x.empresa, x.cargo, x.telefone, x.email, x.localidade, x.link, x.aniversario, x.comoConhecemos, x.notas, (x.tags || []).join(';'), x.favorito ? 'Sim' : 'Não', lastContactDate(x)]);
  const csv = [headers, ...rows].map(r => r.map(csvField).join(',')).join('\r\n');
  downloadFile(`contactos-${todayISO()}.csv`, csv, 'text/csv');
});

document.getElementById('exportVcfBtn').addEventListener('click', () => {
  if (!contacts.length) { alert('Sem contactos para exportar.'); return; }
  downloadFile(`contactos-${todayISO()}.vcf`, contacts.map(contactToVCard).join('\r\n'), 'text/vcard');
});

document.getElementById('exportIcsBtn').addEventListener('click', () => {
  const withBday = contacts.filter(x => x.aniversario);
  if (!withBday.length) { alert('Nenhum contacto tem aniversário registado.'); return; }
  const events = withBday.map(birthdayToICSEvent).join('\r\n');
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Rede de Contactos//PT\r\n${events}\r\nEND:VCALENDAR`;
  downloadFile(`aniversarios-${todayISO()}.ics`, ics, 'text/calendar');
});

document.getElementById('backupExportBtn').addEventListener('click', () => {
  downloadFile(`contactos-backup-${todayISO()}.json`, JSON.stringify(contacts, null, 2), 'application/json');
});

const importFileInput = document.getElementById('importFileInput');
document.getElementById('importFileBtn').addEventListener('click', () => importFileInput.click());
importFileInput.addEventListener('change', () => {
  const file = importFileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const text = ev.target.result;
    const imported = /\.vcf$/i.test(file.name) || /BEGIN:VCARD/i.test(text) ? parseVCards(text) : handleCSVImport(text);
    if (!imported.length) { alert('Não foi possível importar nenhum contacto deste ficheiro.'); return; }
    pushUndoSnapshot();
    contacts.push(...imported);
    saveContacts(contacts);
    selectedId = imported[imported.length - 1].id;
    toolsModalOverlay.hidden = true;
    renderAll();
    alert(`${imported.length} contacto(s) importado(s) com sucesso.`);
  };
  reader.readAsText(file);
  importFileInput.value = '';
});

const backupImportInput = document.getElementById('backupImportInput');
document.getElementById('backupImportBtn').addEventListener('click', () => backupImportInput.click());
backupImportInput.addEventListener('change', () => {
  const file = backupImportInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!Array.isArray(data)) throw new Error('formato inválido');
      const ok = confirm(`Isto vai substituir todos os ${contacts.length} contactos atuais por ${data.length} contactos do ficheiro. Pode usar "Desfazer" depois se mudar de ideias. Continuar?`);
      if (!ok) return;
      pushUndoSnapshot();
      migrateContacts(data);
      contacts = data;
      saveContacts(contacts);
      selectionSafety();
      toolsModalOverlay.hidden = true;
      renderAll();
    } catch (err) {
      alert('Ficheiro de cópia de segurança inválido.');
    }
  };
  reader.readAsText(file);
  backupImportInput.value = '';
});

// ---------- Browser notifications (reminders) ----------
function refreshNotifStatus() {
  const el = document.getElementById('notifStatus');
  if (!('Notification' in window)) { el.textContent = 'Não suportado neste browser'; return; }
  const map = { granted: 'Ativas', denied: 'Bloqueadas pelo browser', default: 'Ainda não ativadas' };
  el.textContent = map[Notification.permission];
}
document.getElementById('enableNotifBtn').addEventListener('click', async () => {
  if (!('Notification' in window)) { alert('O seu browser não suporta notificações.'); return; }
  await Notification.requestPermission();
  refreshNotifStatus();
});

function checkReminders() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const today = todayISO();
  let notified = {};
  try { notified = JSON.parse(localStorage.getItem(NOTIFIED_KEY) || '{}'); } catch (e) { /* ignore */ }
  if (notified.date !== today) notified = { date: today, ids: [] };

  contacts.forEach(x => {
    if (notified.ids.includes(x.id)) return;
    const bday = daysToNextBirthday(x.aniversario);
    const dias = daysBetween(lastContactDate(x) || x.criadoEm);
    let body = null;
    if (x.aniversario && bday === 0) body = `🎂 Hoje é o aniversário de ${x.nome}!`;
    else if (dias >= 90) body = `⏰ Já não fala com ${x.nome} há ${dias} dias.`;
    if (body) {
      new Notification('Rede de Contactos', { body });
      notified.ids.push(x.id);
    }
  });
  localStorage.setItem(NOTIFIED_KEY, JSON.stringify(notified));
}

// ---------- Render pipeline ----------
function highlightNewRow() {
  if (!lastAddedId) return;
  const row = branchesEl.querySelector(`.contact-row[data-id="${lastAddedId}"]`);
  lastAddedId = null;
  if (!row) return;
  row.classList.add('row-added');
  row.addEventListener('animationend', () => row.classList.remove('row-added'), { once: true });
}

function renderAll() {
  renderStatCards();
  renderChips();
  renderBranches();
  renderDetail();
  highlightNewRow();
  requestAnimationFrame(drawCurves);
}

// ---------- List density toggle (normal / compact) ----------
const DENSITY_KEY = 'rede_contactos_density_v1';
let compactMode = localStorage.getItem(DENSITY_KEY) === '1';
const densityBtn = document.getElementById('densityBtn');
function applyDensity() {
  wrapEl.classList.toggle('compact', compactMode);
  densityBtn.classList.toggle('active', compactMode);
  densityBtn.setAttribute('aria-pressed', String(compactMode));
  densityBtn.title = compactMode ? 'Vista compacta ativa (clique para vista normal)' : 'Alternar para vista compacta';
}
densityBtn.addEventListener('click', () => {
  compactMode = !compactMode;
  localStorage.setItem(DENSITY_KEY, compactMode ? '1' : '0');
  applyDensity();
});

// ---------- Landing screen: a category index before entering the network ----------
function renderLanding() {
  const statsEl = document.getElementById('landingStats');
  const indexEl = document.getElementById('landingIndex');
  const cats = getCategoryList();
  const followUp = contacts.filter(x => daysBetween(lastContactDate(x) || x.criadoEm) >= 90).length;

  statsEl.innerHTML = `
    <div><b>${contacts.length}</b><span>Contacto${contacts.length === 1 ? '' : 's'}</span></div>
    <div><b>${cats.length}</b><span>Categorias</span></div>
    <div><b>${String(followUp).padStart(2, '0')}</b><span>Follow-up</span></div>
  `;

  indexEl.innerHTML = cats.map((cat, i) => {
    const count = contacts.filter(c => c.categoria === cat).length;
    return `
      <div class="landing-row${count === 0 ? ' empty' : ''}" data-cat="${escapeHTML(cat)}" tabindex="0" role="button">
        <span class="lr-idx">${String(i + 1).padStart(2, '0')}</span>
        <span class="lr-nm">${escapeHTML(cat)}</span>
        <span class="lr-dots"></span>
        <span class="lr-ct">${count}</span>
      </div>
    `;
  }).join('');

  indexEl.querySelectorAll('.landing-row').forEach(el => {
    el.addEventListener('click', () => enterAppForCategory(el.dataset.cat));
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterAppForCategory(el.dataset.cat); } });
  });
}

function enterAppForCategory(cat) {
  activeCategory = cat;
  statView = 'todos';
  searchTerm = '';
  document.getElementById('searchInput').value = '';
  selectionSafety();
  document.body.classList.remove('landing-active');
  renderAll();
}

function showLanding() {
  document.body.classList.add('landing-active');
  renderLanding();
}

document.getElementById('landingBackBtn').addEventListener('click', showLanding);

// ---------- Landing background: a live, cursor-reactive particle field ----------
// A real-time simulation rather than a looping animation, so it never repeats.
(function initLandingField() {
  const canvas = document.getElementById('landingCanvas');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, particles = [];
  const mouse = { x: -9999, y: -9999 };
  const pulses = [];

  function isActive() { return document.body.classList.contains('landing-active'); }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  function seed() {
    const count = Math.round((W * H) / 5500);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.5 + 0.7,
    }));
  }
  resize();
  seed();
  window.addEventListener('resize', () => { resize(); seed(); });
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('mousedown', (e) => {
    if (!isActive() || e.target.closest('.undo-fab, .landing-back-fab')) return;
    pulses.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
  });

  function step() {
    if (isActive() && !reduceMotion) {
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / 130) * 0.6;
          p.vx += (dx / d) * force * 0.06;
          p.vy += (dy / d) * force * 0.06;
        }
        p.vx *= 0.985; p.vy *= 0.985;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
      }
      for (const pu of pulses) { pu.r += 9; pu.life -= 0.012; }
      for (let i = pulses.length - 1; i >= 0; i--) if (pulses[i].life <= 0) pulses.splice(i, 1);
    }

    if (isActive()) {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(201,169,98,${0.13 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = dm < 150;
        ctx.beginPath();
        ctx.fillStyle = near ? 'rgba(227,197,131,0.85)' : 'rgba(201,169,98,0.5)';
        ctx.arc(p.x, p.y, near ? p.r * 1.7 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const pu of pulses) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(227,197,131,${pu.life * 0.5})`;
        ctx.lineWidth = 1;
        ctx.arc(pu.x, pu.y, pu.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    requestAnimationFrame(step);
  }
  step();
})();

// ---------- Init ----------
selectionSafety();
applyDensity();
renderLanding();
renderAll();
window.addEventListener('resize', drawCurves);
new ResizeObserver(drawCurves).observe(wrapEl);
setTimeout(checkReminders, 4000);
setInterval(checkReminders, 30 * 60 * 1000);
