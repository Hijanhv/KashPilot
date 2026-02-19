from PIL import Image, ImageDraw, ImageFont
import os, math

# ── Canvas ─────────────────────────────────────────────────────────────────
W, H = 1240, 700
img = Image.new("RGB", (W, H), "#FFFFFF")
d   = ImageDraw.Draw(img)

# ── Palette ─────────────────────────────────────────────────────────────────
BG_SUB   = "#FEFCE8"
BD_SUB   = "#D97706"
C_PURPLE = "#7C3AED"
C_GREEN  = "#16A34A"
C_GOLD   = "#D97706"
C_GRAY_BG= "#F1F5F9"
C_GRAY_BD= "#CBD5E1"
C_TEXT_W = "#FFFFFF"
C_TEXT_D = "#1E293B"
C_LABEL  = "#92400E"
C_ARROW  = "#64748B"

# ── Fonts ────────────────────────────────────────────────────────────────────
def get_font(size):
    for p in ["/System/Library/Fonts/Supplemental/Arial.ttf",
              "/System/Library/Fonts/Helvetica.ttc"]:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except: pass
    return ImageFont.load_default()

FT = get_font(26)   # title
FS = get_font(13)   # subgraph label
FN = get_font(13)   # node label
FK = get_font(12)   # small node / legend

# ── Drawing helpers ──────────────────────────────────────────────────────────
def rr(box, fill, outline=None, r=12, lw=2):
    d.rounded_rectangle(box, radius=r, fill=fill,
                         outline=outline or fill, width=lw)

def ctext(text, cx, cy, font=FN, color=C_TEXT_D):
    for i, line in enumerate(text.split("\n")):
        lh = font.size + 3
        oy = cy - (len(text.split("\n"))-1)*lh//2 + i*lh
        d.text((cx, oy), line, font=font, fill=color, anchor="mm")

def arrow_line(x1,y1,x2,y2, col=C_ARROW, w=2, head=10):
    d.line([(x1,y1),(x2,y2)], fill=col, width=w)
    ang = math.atan2(y2-y1, x2-x1)
    for da in (0.45,-0.45):
        ax = x2 - head*math.cos(ang-da)
        ay = y2 - head*math.sin(ang-da)
        d.line([(x2,y2),(ax,ay)], fill=col, width=w)

def bidir(x1,y1,x2,y2,col=C_ARROW,w=2,head=10):
    arrow_line(x1,y1,x2,y2,col,w,head)
    arrow_line(x2,y2,x1,y1,col,w,head)

# ═══════════════════════════════════════════════════════════════════════════
#  Title
# ═══════════════════════════════════════════════════════════════════════════
d.text((50, 22), "KashPilot — System Architecture", font=FT, fill=C_TEXT_D)

# ═══════════════════════════════════════════════════════════════════════════
#  1. USER INTERFACE  (top-centre)
# ═══════════════════════════════════════════════════════════════════════════
ui = (390, 68, 840, 200)
rr(ui, BG_SUB, BD_SUB, r=14)
d.text(((ui[0]+ui[2])//2, ui[1]+14), "🖥️  User Interface",
       font=FS, fill=C_LABEL, anchor="mm")

fe = (410, 90,  660, 128);  rr(fe, C_GRAY_BG, C_GRAY_BD);  ctext("Next.js 14 Frontend", (fe[0]+fe[2])//2,(fe[1]+fe[3])//2, FN)
wc = (670, 90,  820, 128);  rr(wc, C_GRAY_BG, C_GRAY_BD);  ctext("Wallet Connect",      (wc[0]+wc[2])//2,(wc[1]+wc[3])//2, FN)

# API label below row (centred in UI box)
api= (410,144,  820, 182);  rr(api,C_GRAY_BG, C_GRAY_BD);  ctext("Next.js API Routes  /  Node.js Backend", (api[0]+api[2])//2,(api[1]+api[3])//2, FN)

# ═══════════════════════════════════════════════════════════════════════════
#  2. AI AGENT CORE  (centre)
# ═══════════════════════════════════════════════════════════════════════════
ai = (80, 250, 560, 560)
rr(ai, BG_SUB, BD_SUB, r=14)
d.text(((ai[0]+ai[2])//2, ai[1]+14), "🤖  AI Agent Core",
       font=FS, fill=C_LABEL, anchor="mm")

gpt  = (110,280, 530,335);  rr(gpt,  C_PURPLE, C_PURPLE); ctext("OpenAI GPT-4\n(Reasoning Engine)",       (gpt[0]+gpt[2])//2,(gpt[1]+gpt[3])//2, FN, C_TEXT_W)
ea   = (110,355, 530,410);  rr(ea,   C_GREEN,  C_GREEN);  ctext("Economic Agent\n(Decision Engine)",       (ea[0]+ea[2])//2,  (ea[1]+ea[3])//2,   FN, C_TEXT_W)
cron = (110,430, 530,480);  rr(cron, C_GRAY_BG,C_GRAY_BD);ctext("node-cron Scheduler  (every 3 minutes)", (cron[0]+cron[2])//2,(cron[1]+cron[3])//2, FK)
log  = (110,497, 530,542);  rr(log,  C_GRAY_BG,C_GRAY_BD);ctext("Activity Logs  /  Decision History",      (log[0]+log[2])//2,(log[1]+log[3])//2,   FK)

# ═══════════════════════════════════════════════════════════════════════════
#  3. CELO BLOCKCHAIN  (right)
# ═══════════════════════════════════════════════════════════════════════════
cb = (640, 250, 1190, 620)
rr(cb, BG_SUB, BD_SUB, r=14)
d.text(((cb[0]+cb[2])//2, cb[1]+14), "⛓️  Celo Blockchain  (Alfajores Testnet)",
       font=FS, fill=C_LABEL, anchor="mm")

erc = (670,285, 1160,335);  rr(erc, C_GOLD,   C_GOLD);   ctext("ERC-8004  Agent Identity & Registration",  (erc[0]+erc[2])//2,(erc[1]+erc[3])//2, FN, C_TEXT_W)
x4  = (670,355, 1160,405);  rr(x4,  C_GOLD,   C_GOLD);   ctext("x402  Agent-to-Agent Payment Protocol",    (x4[0]+x4[2])//2,  (x4[1]+x4[3])//2,  FN, C_TEXT_W)
rep = (670,425, 1160,475);  rr(rep, C_GREEN,  C_GREEN);  ctext("On-Chain Reputation Score",                 (rep[0]+rep[2])//2,(rep[1]+rep[3])//2, FN, C_TEXT_W)
txh = (670,495, 910, 540);  rr(txh, C_GRAY_BG,C_GRAY_BD);ctext("CeloScan\nTransaction History",            (txh[0]+txh[2])//2,(txh[1]+txh[3])//2, FK)
wal = (930,495, 1160,540);  rr(wal, C_GRAY_BG,C_GRAY_BD);ctext("Agent Wallet\n(ethers.js)",                (wal[0]+wal[2])//2,(wal[1]+wal[3])//2,  FK)
sc  = (670,558, 1160,603);  rr(sc,  C_GRAY_BG,C_GRAY_BD);ctext("Smart Contracts  —  AgentIdentity.sol  /  X402Payment.sol", (sc[0]+sc[2])//2,(sc[1]+sc[3])//2,FK)

# ═══════════════════════════════════════════════════════════════════════════
#  Arrows
# ═══════════════════════════════════════════════════════════════════════════

# UI API Row → AI Core (straight down from API mid to GPT top)
api_cx = (api[0]+api[2])//2
arrow_line(api_cx, api[3], (gpt[0]+gpt[2])//2, gpt[1])

# Wallet Connect → Celo (right from WC to erc)
arrow_line(wc[2], (wc[1]+wc[3])//2, erc[0], (erc[1]+erc[3])//2)

# AI internal: GPT → EA → cron
arrow_line((gpt[0]+gpt[2])//2, gpt[3], (ea[0]+ea[2])//2, ea[1])
arrow_line((ea[0]+ea[2])//2, ea[3], (cron[0]+cron[2])//2, cron[1])
arrow_line((ea[0]+ea[2])//2, cron[3]+2, (log[0]+log[2])//2, log[1])

# EA → ERC (Economic Agent right edge → ERC left edge)
arrow_line(ea[2], (ea[1]+ea[3])//2, erc[0], (erc[1]+erc[3])//2)

# EA → x402
arrow_line(ea[2], (ea[1]+ea[3])//2+18, x4[0], (x4[1]+x4[3])//2)

# ERC → Reputation
arrow_line((erc[0]+erc[2])//2, erc[3], (rep[0]+rep[2])//2, rep[1])

# x402 → txh
arrow_line((x4[0]+x4[2])//2, x4[3], (txh[0]+txh[2])//2, txh[1])

# rep → wal
arrow_line((rep[0]+rep[2])//2+80, rep[3], (wal[0]+wal[2])//2, wal[1])

# contracts at bottom - vertical from erc
arrow_line((erc[0]+erc[2])//2, erc[3]+70, (sc[0]+sc[2])//2, sc[1])

# ═══════════════════════════════════════════════════════════════════════════
#  Legend
# ═══════════════════════════════════════════════════════════════════════════
lx, ly = 50, 638
d.text((lx, ly), "Legend:", font=FS, fill=C_TEXT_D)
items = [
    (C_PURPLE, "AI / Intelligence"),
    (C_GREEN,  "Celo / Reputation"),
    (C_GOLD,   "Blockchain Protocols"),
    (C_GRAY_BG,"Infrastructure"),
]
for i,(clr,lbl) in enumerate(items):
    bx = lx + i*270
    rr((bx, ly+26, bx+18, ly+42), clr, clr, r=4)
    d.text((bx+26, ly+26), lbl, font=FK, fill=C_TEXT_D)

# ═══════════════════════════════════════════════════════════════════════════
#  Save
# ═══════════════════════════════════════════════════════════════════════════
out = "/Users/janhavi/Desktop/KashPilot/public/architecture.png"
img.save(out, "PNG")
print(f"✅ Saved → {out}")
