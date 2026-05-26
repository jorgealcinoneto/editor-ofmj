// templates.jsx — Sistema de templates Instagram @ofantasticomundodejorge
// Direção: pergaminho editorial · serifa clássica · acento borgonha · marcas
// tipográficas em mono. Densidade sem rebuscamento — cada palavra trabalha.

// ─────────────────────────────────────────────────────────────
// Paletas curadas. Cada modo já é uma paleta completa; "accent" troca a cor
// de acento dentro do modo. Os tokens vivem em CSS variables aplicadas no
// nível do artboard para que cada card possa ter o seu próprio modo no
// futuro (não exposto neste turno, mas a arquitectura suporta).
// ─────────────────────────────────────────────────────────────
const PALETTES = {
  pergaminho: {
    label: 'Pergaminho',
    paper: '#efe7d6',
    paperEdge: '#e5dcc6',
    ink: '#1a1612',
    inkSoft: 'rgba(26,22,18,0.62)',
    inkFaint: 'rgba(26,22,18,0.18)',
    rule: 'rgba(26,22,18,0.85)',
  },
  vigilia: {
    label: 'Vigília',
    paper: '#0e0c0a',
    paperEdge: '#171410',
    ink: '#e8e2d2',
    inkSoft: 'rgba(232,226,210,0.62)',
    inkFaint: 'rgba(232,226,210,0.16)',
    rule: 'rgba(232,226,210,0.85)',
  },
  quaresma: {
    label: 'Quaresma',
    paper: '#2d2335',
    paperEdge: '#251c2d',
    ink: '#efe7d6',
    inkSoft: 'rgba(239,231,214,0.62)',
    inkFaint: 'rgba(239,231,214,0.16)',
    rule: 'rgba(239,231,214,0.85)',
  },
  tintaNua: {
    label: 'Tinta nua',
    paper: '#fafaf7',
    paperEdge: '#f0efea',
    ink: '#0a0a0a',
    inkSoft: 'rgba(10,10,10,0.6)',
    inkFaint: 'rgba(10,10,10,0.15)',
    rule: 'rgba(10,10,10,0.9)',
  },
};

const ACCENTS = {
  borgonha:    { label: 'Borgonha',     color: '#722f37' },
  ouro:        { label: 'Ouro velho',   color: '#a87a35' },
  vermelhoSeco:{ label: 'Vermelho seco',color: '#8a2a1a' },
  indigo:      { label: 'Índigo',       color: '#2a3a6a' },
};

// Apply tokens as CSS variables. Lives on the artboard root so every child
// reads via var(--paper) etc. — no prop drilling.
function paletteVars(paletteKey, accentKey) {
  const p = PALETTES[paletteKey] || PALETTES.pergaminho;
  const a = ACCENTS[accentKey] || ACCENTS.borgonha;
  return {
    '--paper': p.paper,
    '--paper-edge': p.paperEdge,
    '--ink': p.ink,
    '--ink-soft': p.inkSoft,
    '--ink-faint': p.inkFaint,
    '--rule': p.rule,
    '--accent': a.color,
    color: p.ink,
    background: p.paper,
  };
}

// ─────────────────────────────────────────────────────────────
// Stylesheet — registado uma vez. Tipografia + primitivas editoriais.
// EB Garamond (título · citação), Source Serif 4 (corpo), JetBrains Mono
// (marcas tipográficas, numeração, metadata).
// ─────────────────────────────────────────────────────────────
if (!document.getElementById('fmj-styles')) {
  if (!document.getElementById('fmj-font-preconnect')) {
    const pc = document.createElement('link');
    pc.id = 'fmj-font-preconnect';
    pc.rel = 'preconnect';
    pc.href = 'https://fonts.googleapis.com';
    document.head.appendChild(pc);
    const pc2 = document.createElement('link');
    pc2.rel = 'preconnect';
    pc2.href = 'https://fonts.gstatic.com';
    pc2.crossOrigin = 'anonymous';
    document.head.appendChild(pc2);
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500;600&display=swap';
  document.head.appendChild(link);

  const s = document.createElement('style');
  s.id = 'fmj-styles';
  s.textContent = `
    .fmj-frame{
      position:relative;width:100%;height:100%;
      font-family:'Source Serif 4', Georgia, serif;
      color:var(--ink);background:var(--paper);
      overflow:hidden;isolation:isolate;
    }
    /* Textura sutil de papel — ruído baixo, só para tirar o plástico do fundo */
    .fmj-frame::before{
      content:"";position:absolute;inset:0;pointer-events:none;
      background:
        radial-gradient(ellipse at top left, transparent 0%, var(--paper-edge) 100%),
        radial-gradient(ellipse at bottom right, transparent 0%, var(--paper-edge) 100%);
      mix-blend-mode:multiply;opacity:.45;z-index:0;
    }
    .fmj-frame > *{position:relative;z-index:1}

    /* Grid sutil — composição visível mas discreta. Liga via .show-grid. */
    .fmj-grid{
      position:absolute;inset:0;pointer-events:none;
      background-image:
        linear-gradient(to right, var(--ink-faint) 1px, transparent 1px),
        linear-gradient(to bottom, var(--ink-faint) 1px, transparent 1px);
      background-size:calc((100% - 120px) / 6) calc((100% - 120px) / 6);
      background-position:60px 60px;
      opacity:0;transition:opacity .2s;
    }
    .fmj-frame.show-grid .fmj-grid{opacity:.55}

    /* Marca tipográfica (top-left) — sempre presente. § 01 · TRADIÇÃO VIVA */
    .fmj-marker{
      font-family:'JetBrains Mono', ui-monospace, monospace;
      font-size:22px;font-weight:500;letter-spacing:0.1em;
      color:var(--ink-soft);text-transform:uppercase;
      display:flex;align-items:center;gap:14px;
    }
    .fmj-marker .pilcrow{color:var(--accent);font-weight:600;font-size:26px}

    /* Régua borgonha — divisor semântico */
    .fmj-rule{height:1px;background:var(--accent);border:0;margin:0}
    .fmj-rule.thick{height:2px}
    .fmj-rule.full{width:100%}

    /* Título grande — EB Garamond regular, tracking tight, alto contraste */
    .fmj-title{
      font-family:'EB Garamond', Georgia, serif;
      font-weight:500;line-height:1.02;letter-spacing:-0.015em;
      color:var(--ink);
    }
    .fmj-title em, .fmj-title i{font-style:italic;font-weight:400}
    .fmj-subtitle{
      font-family:'Source Serif 4', Georgia, serif;
      font-size:28px;font-style:italic;font-weight:400;
      color:var(--ink-soft);margin:20px 0 0;line-height:1.35;
    }
    .fmj-niceia{
      font-family:'Source Serif 4', Georgia, serif;
      font-size:22px;font-style:italic;line-height:1.45;
      color:var(--ink-soft);max-width:720px;
    }

    /* Corpo — Source Serif 4, leitura confortável a 1080 */
    .fmj-body{
      font-family:'Source Serif 4', Georgia, serif;
      font-size:30px;line-height:1.42;font-weight:400;
      color:var(--ink);
    }
    .fmj-body em{font-style:italic}
    .fmj-body strong{font-weight:600}

    /* Citação destacada — EB Garamond itálico, escala maior */
    .fmj-pull{
      font-family:'EB Garamond', Georgia, serif;
      font-style:italic;font-weight:400;
      line-height:1.12;letter-spacing:-0.01em;
      color:var(--ink);
    }

    /* Handle no rodapé — mono, baixo contraste */
    .fmj-handle{
      font-family:'JetBrains Mono', ui-monospace, monospace;
      font-size:13px;font-weight:400;letter-spacing:0.04em;
      color:var(--ink-soft);
    }

    /* Numeração de slide — algarismos romanos em mono pequenos */
    .fmj-folio{
      font-family:'JetBrains Mono', ui-monospace, monospace;
      font-size:13px;font-weight:500;letter-spacing:0.1em;
      color:var(--ink-soft);font-variant-numeric:tabular-nums;
    }

    /* Caixa de leitura para citação — só hairlines, sem fundo */
    .fmj-quote-box{
      border-top:1px solid var(--ink);
      border-bottom:1px solid var(--ink);
      padding:36px 0;
    }

    /* Placeholder de imagem — moldura editorial, não Instagram-cliché */
    .fmj-img-slot{
      position:relative;background:var(--paper-edge);
      border:1px solid var(--ink-faint);
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
    }
    .fmj-img-slot.empty::after{
      content:"";position:absolute;inset:0;
      background-image:
        linear-gradient(135deg, transparent 49.5%, var(--ink-faint) 49.5%, var(--ink-faint) 50.5%, transparent 50.5%);
      opacity:.4;
    }
    .fmj-img-slot img{width:100%;height:100%;object-fit:cover;display:block}
    .fmj-img-slot.contain img{object-fit:contain}
    .fmj-img-slot-label{
      position:relative;z-index:2;
      font-family:'JetBrains Mono', monospace;
      font-size:13px;letter-spacing:0.06em;
      color:var(--ink-soft);text-transform:uppercase;
      background:var(--paper);padding:6px 10px;
      border:1px solid var(--ink-faint);
    }
    /* Quaresma/Vigília invertem o tratamento da imagem para legibilidade */
    .fmj-frame[style*="--paper: #2d2335"] .fmj-photo,
    .fmj-frame[style*="--paper: #0e0c0a"] .fmj-photo{filter:brightness(0.92) contrast(1.05)}
    /* Hero sem moldura — ícone direto sobre papel (Perpétuo Socorro com fundo transparente) */
    .fmj-icon-hero{width:100%;height:100%;object-fit:contain;display:block;
      filter:drop-shadow(0 2px 8px rgba(0,0,0,.18))}

    /* Lista marcada — bullets pequenos, alinhamento hangante */
    .fmj-list{list-style:none;padding:0;margin:0}
    .fmj-list li{
      display:flex;gap:18px;padding:14px 0;
      border-bottom:1px solid var(--ink-faint);
    }
    .fmj-list li:last-child{border-bottom:0}
    .fmj-list .bullet{
      font-family:'JetBrains Mono', monospace;
      font-size:18px;color:var(--accent);
      flex-shrink:0;line-height:1.42;
    }

    /* Layout helpers */
    .fmj-pad{padding:80px}
    .fmj-pad-story{padding:120px 80px}
    .fmj-stack{display:flex;flex-direction:column;height:100%}
    .fmj-spacer{flex:1}
    .fmj-row{display:flex;align-items:center;justify-content:space-between;width:100%}

    /* Modo centrado — aplica eixo central a todos os slides sem precisar mexer cada um */
    .fmj-frame.l-centered .fmj-pad,
    .fmj-frame.l-centered .fmj-pad-story{align-items:center;text-align:center}
    .fmj-frame.l-centered .fmj-pad > *,
    .fmj-frame.l-centered .fmj-pad-story > *{margin-left:auto;margin-right:auto}
    .fmj-frame.l-centered .fmj-marker{justify-content:center}
    .fmj-frame.l-centered .fmj-row{justify-content:center;gap:32px}
    .fmj-frame.l-centered hr.fmj-rule:not(.full){margin-left:auto;margin-right:auto}
    .fmj-frame.l-centered .fmj-list{text-align:left;display:inline-block}
  `;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────
// Primitivas — partilhadas por todos os templates.
// ─────────────────────────────────────────────────────────────

// Frame base. Aplica paleta, acento, layout-class, grid-toggle. Recebe size.
function Frame({ tweak, style, children, showGrid, layoutClass }) {
  const vars = paletteVars(tweak.palette, tweak.accent);
  const cls = ['fmj-frame'];
  if (showGrid) cls.push('show-grid');
  if (layoutClass) cls.push(layoutClass);
  return (
    <div className={cls.join(' ')} style={{ ...vars, ...style }}>
      <div className="fmj-grid" />
      {children}
    </div>
  );
}

// Marca tipográfica topo-esquerda. § N · CATEGORIA — DATA
function Marker({ section, category, date }) {
  return (
    <div className="fmj-marker">
      <span className="pilcrow">§</span>
      <span>{section}</span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{category}</span>
      {date && (
        <>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{date}</span>
        </>
      )}
    </div>
  );
}

// Rodapé do post. Handle + folio (numeração). Marca d'água tipográfica
// (monograma JG) controlada via tweak.
function Footer({ tweak, folio, total }) {
  return (
    <div className="fmj-row">
      <span className="fmj-handle">@ofantasticomundodejorge</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {tweak.watermark && (
          <span
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: 'italic',
              fontSize: 22,
              color: 'var(--accent)',
              letterSpacing: '-0.02em',
            }}
          >
            JG
          </span>
        )}
        {folio && (
          <span className="fmj-folio">
            {String(folio).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}
      </div>
    </div>
  );
}

// Placeholder de imagem. Aceita src (imagem real) ou cai num slot honesto.
function ImgSlot({ label, style, src, alt, contain, children }) {
  if (src) {
    return (
      <div className={contain ? 'fmj-img-slot contain' : 'fmj-img-slot'} style={style}>
        <img src={src} alt={alt || label} className="fmj-photo" />
      </div>
    );
  }
  return (
    <div className="fmj-img-slot empty" style={style}>
      {children}
      {!children && <div className="fmj-img-slot-label">{label}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TEMPLATES — Carrossel "O que são ícones cristãos?"
// 1080 × 1350 (4:5 — formato editorial)
// Layout class controla composição:
//   .l-centered  → eixo central
//   .l-left      → alinhamento à esquerda (default)
//   .l-grid      → composição em grade (2 col)
// ─────────────────────────────────────────────────────────────

function S01_Capa({ tweak, content }) {
  const c = {
    section: '01',
    category: 'TRADIÇÃO VIVA',
    eyebrow: 'Pilar II — Tradição viva',
    title: 'O que são <em>ícones</em> cristãos?',
    subtitle: '— uma introdução anglicana',
    image: 'assets/perpetuo-socorro.webp',
    imageAlt: 'Nossa Senhora do Perpétuo Socorro',
    folio: 1,
    total: 6,
    ...(content || {}),
  };
  const cls = `l-${tweak.layout}`;
  const isCentered = tweak.layout === 'centered';
  const eyebrowStyle = { color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' };

  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      <div className="fmj-pad fmj-stack">
        <Marker section={c.section} category={c.category} />

        {tweak.layout === 'grid' ? (
          <>
            <div className="fmj-spacer" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <div style={{ ...eyebrowStyle, fontSize: 14, letterSpacing: '0.1em', marginBottom: 28 }}>
                  {c.eyebrow}
                </div>
                <h1 className="fmj-title" style={{ fontSize: 108 }} dangerouslySetInnerHTML={{ __html: c.title }} />
                <p className="fmj-subtitle">{c.subtitle}</p>
              </div>
              {c.image && <img src={c.image} alt={c.imageAlt} className="fmj-icon-hero" style={{ maxHeight: 700 }} />}
            </div>
            <div className="fmj-spacer" />
          </>
        ) : isCentered ? (
          <>
            <div className="fmj-spacer" />
            {c.image && <img src={c.image} alt={c.imageAlt} className="fmj-icon-hero" style={{ height: 640, margin: '0 auto 56px' }} />}
            <div style={{ textAlign: 'center' }}>
              <div style={{ ...eyebrowStyle, fontSize: 15, marginBottom: 24 }}>
                {c.eyebrow}
              </div>
              <h1 className="fmj-title" style={{ fontSize: 104 }} dangerouslySetInnerHTML={{ __html: c.title }} />
              <p className="fmj-subtitle">{c.subtitle}</p>
            </div>
            <div className="fmj-spacer" />
          </>
        ) : (
          /* alinhado à esquerda — ícone destacado à direita, título cresce no eixo esquerdo */
          <>
            <div className="fmj-spacer" />
            <div style={{ position: 'relative' }}>
              {c.image && (
                <img src={c.image} alt={c.imageAlt}
                  className="fmj-icon-hero"
                  style={{ position: 'absolute', right: -20, top: -120, height: 820, width: 'auto', zIndex: 0, opacity: 1 }} />
              )}
              <div style={{ position: 'relative', zIndex: 1, maxWidth: 620 }}>
                <div style={{ ...eyebrowStyle, fontSize: 15, marginBottom: 36 }}>
                  {c.eyebrow}
                </div>
                <h1 className="fmj-title" style={{ fontSize: 132, lineHeight: 0.98 }} dangerouslySetInnerHTML={{ __html: c.title }} />
                <p className="fmj-subtitle">{c.subtitle}</p>
              </div>
            </div>
            <div className="fmj-spacer" />
          </>
        )}

        <Footer tweak={tweak} folio={c.folio} total={c.total} />
      </div>
    </Frame>
  );
}

function S02_Definicao({ tweak, content }) {
  const c = {
    section: '02',
    category: 'DEFINIÇÃO',
    titleA: 'O que <em>são</em>.',
    bodyA: 'Ícones são imagens cristãs usadas pela tradição antiga da Igreja como auxílio para <strong>oração</strong>, <strong>contemplação</strong> e <strong>ensino</strong> da fé.',
    titleB: 'O que <em>não</em> são.',
    bodyB: 'Não são deuses. Não são objectos de adoração. São representações visuais que apontam para Cristo e para as verdades do evangelho.',
    folio: 2,
    total: 6,
    ...(content || {}),
  };
  const cls = `l-${tweak.layout}`;
  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      <div className="fmj-pad fmj-stack">
        <Marker section={c.section} category={c.category} />
        <div style={{ height: 60 }} />
        <h2 className="fmj-title" style={{ fontSize: 64, marginBottom: 48 }} dangerouslySetInnerHTML={{ __html: c.titleA }} />
        <p className="fmj-body" style={{ marginBottom: 36 }} dangerouslySetInnerHTML={{ __html: c.bodyA }} />
        <hr className="fmj-rule" style={{ margin: '12px 0 36px', width: 96 }} />
        <h2 className="fmj-title" style={{ fontSize: 64, marginBottom: 48 }} dangerouslySetInnerHTML={{ __html: c.titleB }} />
        <p className="fmj-body" dangerouslySetInnerHTML={{ __html: c.bodyB }} />
        <div className="fmj-spacer" />
        <Footer tweak={tweak} folio={c.folio} total={c.total} />
      </div>
    </Frame>
  );
}

function S03_Citacao({ tweak, content }) {
  const c = {
    section: '03',
    category: 'JANELAS PARA O REINO',
    bgImage: 'assets/foto-altar-domestico.png',
    quoteEyebrow: 'Tradição oriental',
    quote: '“Janelas<br/>para o <span style="color:var(--accent)">Reino</span>.”',
    body: 'Não porque o ícone seja Deus — mas porque celebra a encarnação: em Jesus, Deus se fez visível. <em>Pintar Cristo</em> é confessar que o Verbo se fez carne.',
    folio: 3,
    total: 6,
    ...(content || {}),
  };
  const cls = `l-${tweak.layout}`;
  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      {c.bgImage && (
        <img src={c.bgImage} alt="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.18, zIndex: 0, pointerEvents: 'none' }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--paper) 0%, rgba(0,0,0,0) 30%, var(--paper) 95%)', zIndex: 0, pointerEvents: 'none' }} />
      <div className="fmj-pad fmj-stack" style={{ position: 'relative', zIndex: 1 }}>
        <Marker section={c.section} category={c.category} />
        <div className="fmj-spacer" />
        <div className="fmj-quote-box">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.1em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: 36 }}>
            {c.quoteEyebrow}
          </div>
          <p className="fmj-pull" style={{ fontSize: 92, marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: c.quote }} />
        </div>
        <p className="fmj-body" style={{ marginTop: 48, fontSize: 26, maxWidth: 720 }} dangerouslySetInnerHTML={{ __html: c.body }} />
        <div className="fmj-spacer" />
        <Footer tweak={tweak} folio={c.folio} total={c.total} />
      </div>
    </Frame>
  );
}

function S04_TeologiaEmCores({ tweak, content }) {
  const c = {
    section: '04',
    category: 'TESE',
    intro: 'A Igreja chamou-lhes',
    title: '<em style="color:var(--accent)">teologia</em><br/>em cores.',
    body: 'Não decoração — <strong>argumento</strong>.',
    bodySoft: 'Imagem que ensina o que palavra sozinha não alcança.',
    historic: 'No 2.º Concílio de Niceia (787), a Igreja defendeu isto contra o império iconoclasta.',
    folio: 4,
    total: 6,
    ...(content || {}),
  };
  const cls = `l-${tweak.layout}`;
  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      <div className="fmj-pad fmj-stack">
        <Marker section={c.section} category={c.category} />
        <div className="fmj-spacer" />
        <p className="fmj-body" style={{ fontSize: 26, marginBottom: 32, maxWidth: 760, color: 'var(--ink-soft)' }}>
          {c.intro}
        </p>
        <h1 className="fmj-title" style={{ fontSize: 148, lineHeight: 0.96, letterSpacing: '-0.025em', marginBottom: 40 }} dangerouslySetInnerHTML={{ __html: c.title }} />
        <p className="fmj-body" style={{ fontSize: 28, maxWidth: 760, marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: c.body }} />
        <p className="fmj-body" style={{ fontSize: 26, color: 'var(--ink-soft)', maxWidth: 720, marginBottom: 40 }}>
          {c.bodySoft}
        </p>
        <p className="fmj-niceia">{c.historic}</p>
        <div className="fmj-spacer" />
        <Footer tweak={tweak} folio={c.folio} total={c.total} />
      </div>
    </Frame>
  );
}

function S05_Lista({ tweak, content }) {
  const c = {
    section: '05',
    category: 'POR ONDE COMEÇAR',
    title: 'Três ícones para<br/>começar a <em>olhar</em>.',
    card1Num: 'i.',   card1Img: 'assets/foto-pantocrator.png',      card1Pos: 'center 28%', card1Name: 'Cristo Pantocrátor', card1Meta: 'séc. VI · Sinai',    card1Line: 'O Senhor que olha de frente.',
    card2Num: 'ii.',  card2Img: 'assets/foto-perpetuo-socorro.png', card2Pos: 'center 38%', card2Name: 'Perpétuo Socorro',   card2Meta: 'tradição bizantina', card2Line: 'A mãe que aponta para o Filho.',
    card3Num: 'iii.', card3Img: 'assets/foto-ultima-ceia.png',      card3Pos: 'center 38%', card3Name: 'Última Ceia',        card3Meta: 'ceia mística',       card3Line: 'A comunhão que é centro da vida.',
    folio: 5,
    total: 6,
    ...(content || {}),
  };
  const cards = [
    { n: c.card1Num, img: c.card1Img, pos: c.card1Pos, name: c.card1Name, meta: c.card1Meta, line: c.card1Line },
    { n: c.card2Num, img: c.card2Img, pos: c.card2Pos, name: c.card2Name, meta: c.card2Meta, line: c.card2Line },
    { n: c.card3Num, img: c.card3Img, pos: c.card3Pos, name: c.card3Name, meta: c.card3Meta, line: c.card3Line },
  ];
  const cls = `l-${tweak.layout}`;
  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      <div className="fmj-pad fmj-stack">
        <Marker section={c.section} category={c.category} />
        <div style={{ height: 36 }} />
        <h2 className="fmj-title" style={{ fontSize: 64, marginBottom: 48 }} dangerouslySetInnerHTML={{ __html: c.title }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {cards.map((card) => (
            <figure key={card.n} style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                width: '100%', aspectRatio: '3 / 4', overflow: 'hidden',
                background: 'var(--paper-edge)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.10), 0 0 0 1px var(--ink-faint)',
              }}>
                {card.img && (
                  <img src={card.img} alt={card.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.pos, display: 'block' }} />
                )}
              </div>
              <figcaption style={{ marginTop: 18 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 6 }}>
                  {card.n}
                </div>
                <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 26, fontWeight: 600, lineHeight: 1.12, color: 'var(--ink)' }}>
                  {card.name}
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16, fontStyle: 'italic', color: 'var(--ink-soft)', marginTop: 2 }}>
                  {card.meta}
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 18, lineHeight: 1.35, color: 'var(--ink-soft)', marginTop: 10 }}>
                  {card.line}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="fmj-spacer" />
        <Footer tweak={tweak} folio={c.folio} total={c.total} />
      </div>
    </Frame>
  );
}

function S06_Fecho({ tweak, content }) {
  const c = {
    section: '06',
    category: 'FECHO',
    title: '<span style="color:var(--accent)">Anglicanos</span> têm ícones?',
    answerShort: 'A resposta curta é <strong>sim</strong>.',
    answerLong: 'A longa é mais interessante.',
    teaser: '— próximo post da série.',
    cta1: '<strong>Salva</strong> para reler com calma.',
    cta2: '<strong>ofantasticomundodejorge</strong>',
    folio: 6,
    total: 6,
    ...(content || {}),
  };
  const cls = `l-${tweak.layout}`;
  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      <div className="fmj-pad fmj-stack" style={{ alignItems: tweak.layout === 'centered' ? 'center' : 'stretch', textAlign: tweak.layout === 'centered' ? 'center' : 'left' }}>
        <Marker section={c.section} category={c.category} />
        <div className="fmj-spacer" />
        <h1 className="fmj-title" style={{ fontSize: 96, lineHeight: 1.02, marginBottom: 40, maxWidth: 900 }} dangerouslySetInnerHTML={{ __html: c.title }} />
        <p className="fmj-body" style={{ fontSize: 30, maxWidth: 820, marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: c.answerShort }} />
        <p className="fmj-body" style={{ fontSize: 28, color: 'var(--ink-soft)', maxWidth: 820, marginBottom: 12 }}>
          {c.answerLong}
        </p>
        <p className="fmj-body" style={{ fontSize: 24, color: 'var(--ink-soft)', maxWidth: 720, marginBottom: 64, fontStyle: 'italic' }}>
          {c.teaser}
        </p>
        <hr className="fmj-rule thick full" style={{ marginBottom: 36 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontFamily: "'JetBrains Mono', monospace", fontSize: 18, letterSpacing: '0.04em' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }} aria-hidden="true">📌</span>
            <span dangerouslySetInnerHTML={{ __html: c.cta1 }} />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }} aria-hidden="true">@</span>
            <span dangerouslySetInnerHTML={{ __html: c.cta2 }} />
          </div>
        </div>
        <div className="fmj-spacer" />
        <Footer tweak={tweak} folio={c.folio} total={c.total} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────
// TEMPLATE — Liturgia / Calendário
// Marca uma data do calendário cristão (Adventus, Quaresma, Pentecostes...).
// Usa metadata litúrgica como aparato editorial, não como decoração.
// ─────────────────────────────────────────────────────────────
function T_Liturgia({ tweak, content }) {
  const c = {
    section: 'LIT',
    category: 'ANO LITÚRGICO',
    date: '03 · DEZ · 2026',
    weekday: 'Domingo',
    weekNum: 'I',
    title: 'Adventus',
    subtitle: 'Vinda — o tempo da espera.',
    quote: '“Vigiai, pois, porque não sabeis em<br/>que dia vem o vosso Senhor.”',
    reference: 'Mt 24.42 · Colecta do Domingo I',
    colorLabel: 'Cor litúrgica',
    colorHex: '#4a3a6e',
    colorName: 'Violeta',
    psalmLabel: 'Salmo',
    psalm: '122',
    ...(content || {}),
  };
  const cls = `l-${tweak.layout}`;
  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      <div className="fmj-pad fmj-stack">
        <Marker section={c.section} category={c.category} date={c.date} />
        <div style={{ height: 64 }} />

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ flex: '0 0 auto', borderRight: '1px solid var(--ink-faint)', paddingRight: 32 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.12em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: 8 }}>
              {c.weekday}
            </div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 120, lineHeight: 0.9, color: 'var(--accent)' }}>
              {c.weekNum}
            </div>
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <h1 className="fmj-title" style={{ fontSize: 96, marginBottom: 12 }}>
              {c.title}
            </h1>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 28, color: 'var(--ink-soft)' }}>
              {c.subtitle}
            </div>
          </div>
        </div>

        <div style={{ height: 72 }} />
        <hr className="fmj-rule full" />
        <div style={{ height: 48 }} />

        <p className="fmj-pull" style={{ fontSize: 62, marginBottom: 32, maxWidth: 880 }} dangerouslySetInnerHTML={{ __html: c.quote }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, letterSpacing: '0.08em', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>
          {c.reference}
        </div>

        <div className="fmj-spacer" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingTop: 36, borderTop: '1px solid var(--ink-faint)' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.1em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: 10 }}>
              {c.colorLabel}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 28, height: 28, background: c.colorHex, borderRadius: 0 }} />
              <span className="fmj-body" style={{ fontSize: 24 }}>{c.colorName}</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.1em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: 10 }}>
              {c.psalmLabel}
            </div>
            <span className="fmj-body" style={{ fontSize: 24 }}>{c.psalm}</span>
          </div>
        </div>

        <div style={{ height: 56 }} />
        <Footer tweak={tweak} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────
// TEMPLATE — Recomendação de leitura
// Capa + ficha técnica + porquê. Sem afiliados; é nota do leitor MATS.
// ─────────────────────────────────────────────────────────────
function T_Leitura({ tweak, content }) {
  const c = {
    section: 'LEI',
    category: 'NOTA DE LEITURA',
    date: 'MAIO · 2026',
    cover: 'assets/livro-nouwen.jpeg',
    coverAlt: 'Contempla a Face do Senhor — Henri Nouwen',
    eyebrow: 'Espiritualidade · Ícones',
    title: 'Contempla a<br/><em>Face do Senhor</em>',
    author: 'Henri J. M. Nouwen',
    tagline: '— orar com ícones.',
    metaEdit: 'Edições Loyola',
    metaPags: '96',
    metaLido: '2 noites · lento',
    sectionWhy: 'Por que ler isto hoje',
    body: 'Nouwen escreve como pastor que aprendeu, já maduro, a <em>olhar</em>. Quatro ícones russos, quatro modos de presença. Um pequeno manual de atenção — a própria condição da oração.',
    ...(content || {}),
  };
  const cls = `l-${tweak.layout}`;
  return (
    <Frame tweak={tweak} layoutClass={cls} showGrid={tweak.showGrid}>
      <div className="fmj-pad fmj-stack">
        <Marker section={c.section} category={c.category} date={c.date} />
        <div style={{ height: 56 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 56, alignItems: 'start' }}>
          <ImgSlot src={c.cover} alt={c.coverAlt} style={{ aspectRatio: '2/3', width: '100%' }} />
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 18 }}>
              {c.eyebrow}
            </div>
            <h1 className="fmj-title" style={{ fontSize: 70, marginBottom: 20, lineHeight: 1 }} dangerouslySetInnerHTML={{ __html: c.title }} />
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 28, color: 'var(--ink-soft)', marginBottom: 12 }}>
              {c.author}
            </div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, color: 'var(--ink-soft)', marginBottom: 28 }}>
              {c.tagline}
            </div>
            <hr className="fmj-rule" style={{ width: 64, marginBottom: 28 }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, letterSpacing: '0.04em' }}>
              <div>EDIT &nbsp;·&nbsp; {c.metaEdit}</div>
              <div>PÁGS &nbsp;·&nbsp; {c.metaPags}</div>
              <div>LIDO &nbsp;·&nbsp; {c.metaLido}</div>
            </div>
          </div>
        </div>

        <div className="fmj-spacer" style={{ minHeight: 48 }} />

        <hr className="fmj-rule full" style={{ marginBottom: 36 }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.12em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: 24 }}>
          {c.sectionWhy}
        </div>
        <p className="fmj-body" style={{ fontSize: 28, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: c.body }} />

        <div className="fmj-spacer" />
        <Footer tweak={tweak} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────
// TEMPLATE — Caderno · bastidores de estudo
// Foto do espaço real (ícones + estante MATS) como fundo full-bleed,
// metadata + nota curta sobreposta. Modo "anotação visual".
// ─────────────────────────────────────────────────────────────
function T_Caderno({ tweak, content }) {
  const c = {
    bgImage: 'assets/estudo-icones.jpeg',
    markerA: 'CADERNO',
    markerB: 'BASTIDORES',
    date: 'MAIO · 2026',
    title: 'Onde a tradição<br/><em>se lê</em>.',
    body: 'Pantocrátor à esquerda. Agostinho a escrever logo abaixo. E entre eles, a estante: Bultmann, Spring, teologia do NT, um par de manuais de firewalls. <em>É daqui que se fala.</em>',
    handle: '@ofantasticomundodejorge',
    ...(content || {}),
  };
  return (
    <Frame tweak={tweak} layoutClass={`l-${tweak.layout}`} showGrid={tweak.showGrid}>
      {c.bgImage && (
        <img src={c.bgImage} alt="" aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            filter: 'grayscale(0.25) contrast(0.95) brightness(0.94)',
            zIndex: 0,
          }} />
      )}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="fmj-pad fmj-stack" style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
        <div className="fmj-marker" style={{ color: 'rgba(255,255,255,0.85)' }}>
          <span className="pilcrow" style={{ color: 'var(--accent)' }}>§</span>
          <span>{c.markerA}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{c.markerB}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{c.date}</span>
        </div>

        <div className="fmj-spacer" />

        <div style={{ maxWidth: 760 }}>
          <hr style={{ height: 2, background: 'var(--accent)', border: 0, width: 64, marginBottom: 32 }} />
          <h1 className="fmj-title" style={{ fontSize: 86, color: '#fff', marginBottom: 28, textShadow: '0 2px 16px rgba(0,0,0,0.4)' }} dangerouslySetInnerHTML={{ __html: c.title }} />
          <p style={{
            fontFamily: "'Source Serif 4', serif", fontSize: 26, lineHeight: 1.4,
            color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 8px rgba(0,0,0,0.45)',
            maxWidth: 680,
          }} dangerouslySetInnerHTML={{ __html: c.body }} />
        </div>

        <div style={{ height: 64 }} />
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.25)',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.75)' }}>
            {c.handle}
          </span>
          {tweak.watermark && (
            <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 22, color: 'var(--accent)' }}>JG</span>
          )}
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────
// TEMPLATE — Story citação rápida (1080 × 1920 · 9:16)
// Curta, citável, sem CTA. Densidade num só folego.
// ─────────────────────────────────────────────────────────────
function T_Story({ tweak, content }) {
  const c = {
    section: 'ST',
    category: 'NOTA RÁPIDA',
    quote: 'A tradição<br/>não é um <em style="color:var(--accent)">museu</em>.<br/>É uma <em>conversa</em><br/>que continua.',
    attribution: '— J.G., caderno MATS · §17',
    ...(content || {}),
  };
  return (
    <Frame tweak={tweak} layoutClass={`l-${tweak.layout}`} showGrid={tweak.showGrid}>
      <div className="fmj-pad-story fmj-stack">
        <Marker section={c.section} category={c.category} />
        <div className="fmj-spacer" />

        <hr className="fmj-rule" style={{ width: 72, marginBottom: 56 }} />

        <p className="fmj-pull" style={{ fontSize: 96, marginBottom: 64, lineHeight: 1.05 }} dangerouslySetInnerHTML={{ __html: c.quote }} />

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, letterSpacing: '0.06em', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>
          {c.attribution}
        </div>

        <div className="fmj-spacer" />

        <hr className="fmj-rule full" style={{ marginBottom: 32 }} />
        <Footer tweak={tweak} />
      </div>
    </Frame>
  );
}

// Story · caixa de perguntas: foto em marca d'água + prompt + reserva visual
// pra colar o sticker "Faça uma pergunta" do Instagram em cima do quadrado
// pontilhado. Cor/posição calibradas pra a sticker ficar legível sem disputar
// com a foto de fundo.
function T_StoryAsk({ tweak, content }) {
  const c = {
    section: '§ 02',
    category: 'CAIXA DE PERGUNTAS',
    photo: '',
    photoOpacity: 0.28,
    headline: 'Uma dúvida real<br/>sobre <em>ícones</em>.',
    sub: 'Que você nunca teve coragem de perguntar em voz alta.',
    askLabel: 'COLE AQUI A CAIXA DE PERGUNTAS',
    askHint: 'Sticker do Instagram · centralizada',
    footnote: 'Respondo nas DMs · entra no §03 se couber.',
    headlineFont: 'eb-garamond',
    ...(content || {}),
  };
  const headlineFonts = {
    'eb-garamond':         { family: "'EB Garamond', Georgia, serif",         weight: 600, tracking: '0' },
    'instrument-serif':    { family: "'Instrument Serif', Georgia, serif",    weight: 400, tracking: '-0.01em' },
    'fraunces':            { family: "'Fraunces', Georgia, serif",            weight: 600, tracking: '-0.02em' },
    'syne':                { family: "'Syne', sans-serif",                    weight: 700, tracking: '-0.02em' },
    'space-grotesk':       { family: "'Space Grotesk', sans-serif",           weight: 700, tracking: '-0.02em' },
    'bricolage-grotesque': { family: "'Bricolage Grotesque', sans-serif",     weight: 700, tracking: '-0.02em' },
    'unbounded':           { family: "'Unbounded', sans-serif",               weight: 700, tracking: '-0.03em' },
    'anton':               { family: "'Anton', sans-serif",                   weight: 400, tracking: '0' },
  };
  const headlineCfg = headlineFonts[c.headlineFont] || headlineFonts['eb-garamond'];
  const headlineStyle = {
    fontSize: 84,
    lineHeight: 1.08,
    marginBottom: 24,
    fontFamily: headlineCfg.family,
    fontWeight: headlineCfg.weight,
    letterSpacing: headlineCfg.tracking,
  };
  const overlayStyle = c.photo
    ? {
        backgroundImage: `url("${c.photo}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: c.photoOpacity,
      }
    : null;
  return (
    <Frame tweak={tweak} layoutClass="l-centered" showGrid={tweak.showGrid}>
      {overlayStyle && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            ...overlayStyle,
            mixBlendMode: 'multiply',
            filter: 'grayscale(0.15) contrast(1.05)',
            zIndex: 0,
          }}
        />
      )}
      {c.photo && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(244,237,224,0.55) 0%, rgba(244,237,224,0.15) 35%, rgba(244,237,224,0.15) 65%, rgba(244,237,224,0.75) 100%)',
            zIndex: 1,
          }}
        />
      )}
      <div className="fmj-pad-story fmj-stack" style={{ position: 'relative', zIndex: 2, justifyContent: 'space-between' }}>
        <div>
          <Marker section={c.section} category={c.category} />
          <hr className="fmj-rule" style={{ width: 72, marginTop: 32, marginBottom: 48 }} />
          <p
            className="fmj-pull"
            style={headlineStyle}
            dangerouslySetInnerHTML={{ __html: c.headline }}
          />
          {c.sub && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, lineHeight: 1.4, color: 'var(--ink-soft)', maxWidth: '32ch' }}>
              {c.sub}
            </p>
          )}
        </div>

        <div
          aria-hidden="true"
          style={{
            width: '78%',
            aspectRatio: '1 / 1',
            border: '3px dashed var(--accent)',
            borderRadius: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 32,
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(2px)',
            margin: '0 auto',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase' }}>
            {c.askLabel}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, color: 'var(--ink-soft)', textAlign: 'center' }}>
            {c.askHint}
          </span>
        </div>

        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, lineHeight: 1.4, color: 'var(--ink-soft)', textAlign: 'center', marginBottom: 24 }}>
            {c.footnote}
          </p>
          <hr className="fmj-rule full" style={{ marginBottom: 32 }} />
          <Footer tweak={tweak} />
        </div>
      </div>
    </Frame>
  );
}

// Exporta tudo para o escopo global (cada <script type=text/babel> é isolado).
Object.assign(window, {
  PALETTES, ACCENTS,
  S01_Capa, S02_Definicao, S03_Citacao, S04_TeologiaEmCores, S05_Lista, S06_Fecho,
  T_Liturgia, T_Leitura, T_Caderno, T_Story, T_StoryAsk,
});
