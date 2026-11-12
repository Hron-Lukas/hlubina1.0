"use strict";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const TAU = Math.PI * 2;
const WORLD = { w: 2800, h: 2100 };
const TILE = 64;
const SLOT_KEYS = ["+", "ě", "š", "č", "ř"];

const STRINGS = {
  en: {
    docTitle: "HLUBINA1.0 // Sector 7",
    canvasAria: "Game area",
    brandSub: "SECTOR 7 // ENDLESS SHIFT",
    statIntegrity: "INTEGRITY",
    statScrap: "SCRAP",
    statWave: "WAVE",
    statKills: "KILLS",
    shopBtn: "WORKSHOP",
    shopBtnTitle: "Open workshop (B)",
    soundTitleOn: "Sound on (M)",
    soundTitleOff: "Sound off (M)",
    soundAria: "Toggle sound",
    helpBtnTitle: "Controls (H)",
    helpBtnAria: "Help",
    pauseBtnTitle: "Pause (Esc)",
    pauseBtnAria: "Pause",
    unknownTarget: "UNKNOWN TARGET",
    activeWeapon: "ACTIVE WEAPON",
    controlMove: "move",
    controlAttack: "attack",
    controlPickup: "pick up",
    controlDrop: "drop",
    inventoryAria: "Inventory",
    startEyebrow: "AUTOMATION FAILED // 03:47",
    startSubtitle: "The factory went silent. Something woke up in the warehouses.<br>Take a pickaxe and earn your way out.",
    startMove: "Move through the sector",
    startAim: "Weapon aiming",
    startAttack: "Attack",
    startSlot: "Select slot",
    startPickup: "Pick up / swap",
    startDrop: "Drop weapon",
    startShop: "Workshop & upgrades",
    startPause: "Pause",
    startButton: "START SHIFT",
    shopEyebrow: "WORKSHOP // TERMINAL 04",
    shopTitle: "EQUIPMENT UPGRADES",
    shopCurrency: "SCRAP",
    shopCloseAria: "Close workshop",
    shopHint: "<kbd>B</kbd> or <kbd>ESC</kbd> closes the workshop. The game is paused.",
    repairButton: "REPAIR INTEGRITY",
    repairFull: "INTEGRITY FULL",
    repairCost: "{cost} SCRAP",
    shopLevel: "LEVEL",
    shopMaxed: "MAXED",
    shopUpgrade: "UPGRADE // {cost} SCRAP",
    pauseEyebrow: "SHIFT PAUSED",
    pauseTitle: "PAUSED",
    pauseCopy: "The factory waits. So does your scrap.",
    resume: "RESUME",
    pauseShop: "WORKSHOP",
    pauseHelp: "CONTROLS",
    pauseRestart: "NEW SHIFT",
    languageLabel: "LANGUAGE",
    languageEn: "EN",
    languageCs: "CZ",
    helpEyebrow: "OPERATOR MANUAL",
    helpTitle: "CONTROLS",
    helpCloseAria: "Close help",
    helpMove: "Move the character through the sector.",
    helpAim: "Aiming. The character turns toward the cursor.",
    helpAttack: "Attack with the active weapon. Hold to keep firing.",
    helpSlots: "Select an inventory slot.",
    helpPickup: "Pick up a weapon or swap it with the active slot.",
    helpDrop: "Drop the weapon from the active slot.",
    helpRightClick: "Right-click a slot to drop its weapon.",
    helpShop: "Workshop: upgrade damage, resistance and other stats.",
    helpSound: "Toggle sound on / off.",
    helpPause: "Pause, close windows.",
    helpTip: "<strong>TIP:</strong> Gold and purple weapons deal significantly more damage. When your inventory is full, stand next to a weapon and press <kbd>E</kbd> — it swaps with the one in the active slot.<br><strong>BOSS:</strong> Every fifth wave ends with a boss. Red circles and lines on the ground show where it will strike.",
    gameoverEyebrow: "OPERATOR SIGNAL LOST",
    gameoverTitle: "SHIFT TERMINATED",
    gameoverCopy: "Sector 7 remembers you. Try again.",
    againButton: "NEW SHIFT",
    statReachedWave: "Wave reached",
    statKills: "Kills",
    statEarned: "Earned",
    statTime: "Shift time",
    waveBanner: "WAVE {n}",
    waveStartSub: "CLEANSE SECTOR 7",
    newSignature: "NEW SIGNATURE IN THE SECTOR",
    waveCleared: "WAVE {n} CLEARED",
    bossIncoming: "BOSS INCOMING // GET READY",
    sectorClearedBoss: "Sector cleared. +{bonus} scrap. Something big is waking up.",
    supplyCrate: "+{bonus} SCRAP // SUPPLY CRATE",
    sectorCleared: "Sector cleared. Bonus +{bonus} scrap.",
    enemiesStatus: "ENEMIES {count} // WAVE {wave}",
    bossInStatus: "BOSS IN {sec}s // GET READY",
    breakStatus: "BREAK {sec}s // WORKSHOP [B]",
    phase: "PHASE {roman}",
    bossWaveSub: "WAVE {wave} // SURVIVE",
    bossEntered: "Boss {name} entered the sector.",
    bossPhase: "Boss entered phase {roman}.",
    bossDefeatedBanner: "BOSS DEFEATED",
    bossDefeatedSub: "{name} // +{bonus} SCRAP",
    bossDefeatedToast: "Boss {name} destroyed. +{bonus} scrap, healing and a weapon.",
    emptySlot: "EMPTY SLOT",
    pressEForWeapon: "PRESS E NEAR A WEAPON",
    melee: "MELEE",
    ranged: "RANGED",
    weaponTitleDamage: "Damage: {value}",
    weaponTitleCooldown: "Cooldown: {value} s",
    weaponTitleArea: "Area {value} rad",
    weaponTitleSpeed: "Speed {value} m/s",
    weaponTypeMeleeLower: "melee",
    weaponTypeRangedLower: "ranged",
    emptySlotTitle: "Empty slot {n}",
    emptyLabel: "EMPTY",
    slotEmpty: "Slot is empty.",
    dropped: "{name} dropped.",
    insufficientScrap: "Not enough scrap.",
    insufficientRepair: "Not enough scrap to repair.",
    integrityRestored: "Integrity restored.",
    upgraded: "{name} upgraded to level {level}.",
    swapped: "Swapped: {old} → {name}",
    emptySlotLower: "empty slot",
    pickUpPrompt: "PICK UP",
    swapPrompt: "SWAP",
    slotLower: "slot",
    iteration: "ITERATION",
  },
  cs: {
    docTitle: "HLUBINA1.0 // Sektor 7",
    canvasAria: "Herní plocha",
    brandSub: "SEKTOR 7 // SMĚNA BEZ KONCE",
    statIntegrity: "INTEGRITA",
    statScrap: "ŠROT",
    statWave: "VLNA",
    statKills: "ELIMINACE",
    shopBtn: "DÍLNA",
    shopBtnTitle: "Otevřít dílnu (B)",
    soundTitleOn: "Zvuk zapnut (M)",
    soundTitleOff: "Zvuk vypnut (M)",
    soundAria: "Přepnout zvuk",
    helpBtnTitle: "Ovládání (H)",
    helpBtnAria: "Nápověda",
    pauseBtnTitle: "Pauza (Esc)",
    pauseBtnAria: "Pauza",
    unknownTarget: "NEZNÁMÝ CÍL",
    activeWeapon: "AKTIVNÍ ZBRAŇ",
    controlMove: "pohyb",
    controlAttack: "útok",
    controlPickup: "sebrat",
    controlDrop: "odhodit",
    inventoryAria: "Inventář",
    startEyebrow: "AUTOMATIZACE SELHALA // 03:47",
    startSubtitle: "Továrna zmlkla. Ve skladech se něco probudilo.<br>Vezmi krumpáč a vydělej si na cestu ven.",
    startMove: "Pohyb po sektoru",
    startAim: "Míření zbraně",
    startAttack: "Útok",
    startSlot: "Volba slotu",
    startPickup: "Sebrat / vyměnit",
    startDrop: "Odhodit zbraň",
    startShop: "Dílna a vylepšení",
    startPause: "Pauza",
    startButton: "ZAHÁJIT SMĚNU",
    shopEyebrow: "DÍLNA // TERMINÁL 04",
    shopTitle: "VYLEPŠENÍ VÝBAVY",
    shopCurrency: "ŠROTU",
    shopCloseAria: "Zavřít dílnu",
    shopHint: "<kbd>B</kbd> nebo <kbd>ESC</kbd> zavře dílnu. Hra je pozastavená.",
    repairButton: "OPRAVIT INTEGRITU",
    repairFull: "INTEGRITA PLNÁ",
    repairCost: "{cost} ŠROTU",
    shopLevel: "ÚROVEŇ",
    shopMaxed: "MAXIMUM",
    shopUpgrade: "VYLEPŠIT // {cost} ŠROTU",
    pauseEyebrow: "SMĚNA POZASTAVENA",
    pauseTitle: "PAUZA",
    pauseCopy: "Továrna počká. Tvůj šrot taky.",
    resume: "POKRAČOVAT",
    pauseShop: "DÍLNA",
    pauseHelp: "OVLÁDÁNÍ",
    pauseRestart: "NOVÁ SMĚNA",
    languageLabel: "JAZYK",
    languageEn: "EN",
    languageCs: "CZ",
    helpEyebrow: "PŘÍRUČKA OPERÁTORA",
    helpTitle: "OVLÁDÁNÍ",
    helpCloseAria: "Zavřít nápovědu",
    helpMove: "Pohyb postavy po sektoru.",
    helpAim: "Míření. Postava se otáčí za kurzorem.",
    helpAttack: "Útok aktivní zbraní. Podrž pro palbu.",
    helpSlots: "Výběr slotu v inventáři.",
    helpPickup: "Sebrání zbraně, případně výměna s aktivním slotem.",
    helpDrop: "Odhození zbraně z aktivního slotu.",
    helpRightClick: "Kliknutí na slot odhodí zbraň.",
    helpShop: "Dílna: vylepšení poškození, odolnosti a dalších statů.",
    helpSound: "Zapnutí / vypnutí zvuku.",
    helpPause: "Pauza, zavření oken.",
    helpTip: "<strong>TIP:</strong> Zlaté a fialové zbraně mají výrazně vyšší poškození. Když je inventář plný, stůj u zbraně a stiskni <kbd>E</kbd> — vymění se za tu v aktivním slotu.<br><strong>BOSS:</strong> Každá pátá vlna končí bossem. Červené kruhy a čáry na zemi ukazují, kam udeří.",
    gameoverEyebrow: "SIGNÁL OPERÁTORA ZTRACEN",
    gameoverTitle: "SMĚNA UKONČENA",
    gameoverCopy: "Sektor 7 si tě pamatuje. Zkus to znovu.",
    againButton: "NOVÁ SMĚNA",
    statReachedWave: "Dosažená vlna",
    statKills: "Eliminace",
    statEarned: "Vyděláno",
    statTime: "Čas směny",
    waveBanner: "VLNA {n}",
    waveStartSub: "OČISTĚTE SEKTOR 7",
    newSignature: "NOVÁ SIGNATURA V SEKTORU",
    waveCleared: "VLNA {n} OČIŠTĚNA",
    bossIncoming: "BOSS SE BLÍŽÍ // PŘIPRAV SE",
    sectorClearedBoss: "Sektor pročištěn. +{bonus} šrotu. Něco velkého se probouzí.",
    supplyCrate: "+{bonus} ŠROTU // ZÁSOBOVACÍ BEDNA",
    sectorCleared: "Sektor pročištěn. Bonus +{bonus} šrotu.",
    enemiesStatus: "NEPŘÁTELÉ {count} // VLNA {wave}",
    bossInStatus: "BOSS ZA {sec}s // PŘIPRAV SE",
    breakStatus: "PŘESTÁVKA {sec}s // DÍLNA [B]",
    phase: "FÁZE {roman}",
    bossWaveSub: "VLNA {wave} // PŘEŽIJTE",
    bossEntered: "Boss {name} vstoupil do sektoru.",
    bossPhase: "Boss přešel do fáze {roman}.",
    bossDefeatedBanner: "BOSS PORAZEN",
    bossDefeatedSub: "{name} // +{bonus} ŠROTU",
    bossDefeatedToast: "Boss {name} zničen. +{bonus} šrotu, léčba a zbraň.",
    emptySlot: "PRÁZDNÝ SLOT",
    pressEForWeapon: "STISKNI E U ZBRANĚ",
    melee: "NA BLÍZKO",
    ranged: "STŘELNÁ",
    weaponTitleDamage: "Poškození: {value}",
    weaponTitleCooldown: "Prodleva: {value} s",
    weaponTitleArea: "Oblast {value} rad",
    weaponTitleSpeed: "Rychlost {value} m/s",
    weaponTypeMeleeLower: "na blízko",
    weaponTypeRangedLower: "střelná",
    emptySlotTitle: "Prázdný slot {n}",
    emptyLabel: "PRÁZDNÝ",
    slotEmpty: "Slot je prázdný.",
    dropped: "{name} odhozen.",
    insufficientScrap: "Nedostatek šrotu.",
    insufficientRepair: "Nedostatek šrotu na opravu.",
    integrityRestored: "Integrita obnovena.",
    upgraded: "{name} vylepšen na úroveň {level}.",
    swapped: "Vyměněno: {old} → {name}",
    emptySlotLower: "prázdný slot",
    pickUpPrompt: "SEBRAT",
    swapPrompt: "VYMĚNIT",
    slotLower: "slot",
    iteration: "ITERACE",
  },
};

var lang = "en";

function t(key, params) {
  const table = STRINGS[lang] || STRINGS.en;
  let value = table[key] != null ? table[key] : STRINGS.en[key] != null ? STRINGS.en[key] : key;
  if (params) {
    for (const [name, replacement] of Object.entries(params)) {
      value = value.split(`{${name}}`).join(replacement);
    }
  }
  return value;
}

function L(obj, field) {
  if (!obj) return "";
  const suffix = lang === "en" ? "En" : "Cs";
  const value = obj[field + suffix] != null ? obj[field + suffix] : obj[field + "Cs"];
  return value != null ? value : obj[field] || "";
}

function bossDisplayName(tier) {
  const data = BOSS_TIERS[(tier - 1) % BOSS_TIERS.length];
  const cycle = Math.floor((tier - 1) / BOSS_TIERS.length);
  const name = L(data, "name");
  return cycle > 0 ? `${name} // ${tier}. ${t("iteration")}` : name;
}

const ui = {
  hpFill: document.getElementById("hp-fill"),
  hpText: document.getElementById("hp-text"),
  money: document.getElementById("money-text"),
  wave: document.getElementById("wave-text"),
  kills: document.getElementById("kills-text"),
  waveStatus: document.getElementById("wave-status"),
  waveBanner: document.getElementById("wave-banner"),
  bossBar: document.getElementById("boss-bar"),
  bossName: document.getElementById("boss-name"),
  bossPhase: document.getElementById("boss-phase"),
  bossHpFill: document.getElementById("boss-hp-fill"),
  bossHpText: document.getElementById("boss-hp-text"),
  toastStack: document.getElementById("toast-stack"),
  hotbar: document.getElementById("hotbar"),
  activeName: document.getElementById("active-name"),
  activeStats: document.getElementById("active-stats"),
  interactPrompt: document.getElementById("interact-prompt"),
  startScreen: document.getElementById("start-screen"),
  shopScreen: document.getElementById("shop-screen"),
  pauseScreen: document.getElementById("pause-screen"),
  helpScreen: document.getElementById("help-screen"),
  gameoverScreen: document.getElementById("gameover-screen"),
  shopMoney: document.getElementById("shop-money"),
  upgradeGrid: document.getElementById("upgrade-grid"),
  repairBtn: document.getElementById("repair-btn"),
  repairCost: document.getElementById("repair-cost"),
  gameoverStats: document.getElementById("gameover-stats"),
  damageFlash: document.getElementById("damage-flash"),
  soundBtn: document.getElementById("sound-btn"),
};

const RARITIES = {
  common: { nameCs: "Obyčejná", nameEn: "Common", color: "#9aa092", mult: 1, weight: 52, suffixCs: "", suffixEn: "" },
  uncommon: { nameCs: "Neobvyklá", nameEn: "Uncommon", color: "#84c16c", mult: 1.2, weight: 26, suffixCs: " Mk. II", suffixEn: " Mk. II" },
  rare: { nameCs: "Vzácná", nameEn: "Rare", color: "#68a8d8", mult: 1.48, weight: 13, suffixCs: " Mk. III", suffixEn: " Mk. III" },
  epic: { nameCs: "Epická", nameEn: "Epic", color: "#b184d0", mult: 1.85, weight: 6, suffixCs: " // Prototyp", suffixEn: " // Prototype" },
  legendary: { nameCs: "Legendární", nameEn: "Legendary", color: "#e6b657", mult: 2.35, weight: 3, suffixCs: " // Relikvie", suffixEn: " // Relic" },
};

const WEAPONS = {
  pickaxe: { nameCs: "Krumpáč", nameEn: "Pickaxe", type: "melee", dmg: 18, cd: 0.42, range: 64, arc: 1.45, knock: 145, color: "#d8a35e", minWave: 0, weight: 0, icon: "pickaxe" },
  pipe: { nameCs: "Trubkový klíč", nameEn: "Pipe Wrench", type: "melee", dmg: 27, cd: 0.58, range: 72, arc: 1.3, knock: 190, color: "#9da89b", minWave: 1, weight: 9, icon: "pipe" },
  knife: { nameCs: "Řezný nůž", nameEn: "Cutting Knife", type: "melee", dmg: 20, cd: 0.24, range: 58, arc: 1.02, knock: 70, color: "#c8d2cc", minWave: 1, weight: 9, icon: "knife" },
  sledge: { nameCs: "Bourací kladivo", nameEn: "Demolition Hammer", type: "melee", dmg: 58, cd: 0.88, range: 84, arc: 1.9, knock: 285, color: "#c3a06b", minWave: 3, weight: 5, icon: "sledge" },
  chainsaw: { nameCs: "Řetězová pila", nameEn: "Chainsaw", type: "melee", dmg: 13, cd: 0.13, range: 66, arc: 1.02, knock: 42, color: "#c79c5e", minWave: 3, weight: 5, icon: "chainsaw" },
  plasma: { nameCs: "Plazmový řezák", nameEn: "Plasma Cutter", type: "melee", dmg: 70, cd: 0.44, range: 90, arc: 1.65, knock: 225, color: "#69c7b7", minWave: 5, weight: 3, icon: "plasma" },
  pistol: { nameCs: "Šrotová pistole", nameEn: "Scrap Pistol", type: "ranged", dmg: 17, cd: 0.31, speed: 980, range: 720, spread: 0.025, pellets: 1, color: "#c3a775", minWave: 1, weight: 10, icon: "pistol" },
  nailgun: { nameCs: "Hřebíkovačka", nameEn: "Nailgun", type: "ranged", dmg: 9, cd: 0.1, speed: 1050, range: 650, spread: 0.075, pellets: 1, color: "#9fb5b0", minWave: 2, weight: 7, icon: "nailgun" },
  smg: { nameCs: "Kompresní SMG", nameEn: "Compressed SMG", type: "ranged", dmg: 12, cd: 0.085, speed: 1100, range: 700, spread: 0.11, pellets: 1, color: "#b8b0a0", minWave: 3, weight: 6, icon: "smg" },
  shotgun: { nameCs: "Šrotovnice", nameEn: "Scrap Shotgun", type: "ranged", dmg: 11, cd: 0.78, speed: 850, range: 430, spread: 0.3, pellets: 5, color: "#c88e5e", minWave: 2, weight: 7, icon: "shotgun" },
  rifle: { nameCs: "Průbojná puška", nameEn: "Piercing Rifle", type: "ranged", dmg: 58, cd: 0.92, speed: 1600, range: 1000, spread: 0.008, pellets: 1, pierce: 2, color: "#8fb4c9", minWave: 4, weight: 4, icon: "rifle" },
  arc: { nameCs: "Obloukový vybíječ", nameEn: "Arc Discharger", type: "ranged", dmg: 31, cd: 0.24, speed: 760, range: 620, spread: 0.04, pellets: 1, pierce: 1, color: "#b184d0", minWave: 5, weight: 3, icon: "arc" },
};

const ENEMY_TYPES = {
  scav: { nameCs: "Šrotovník", nameEn: "Scrapper", hp: 42, speed: 74, dmg: 9, radius: 15, coins: [3, 7], color: "#9a6844", eye: "#ff5c38" },
  drone: { nameCs: "Dron", nameEn: "Drone", hp: 30, speed: 104, dmg: 7, radius: 12, coins: [4, 8], color: "#788782", eye: "#ff4c32", ranged: true, preferred: 285, fireCd: 2.15, projSpeed: 340, projDmg: 8 },
  stalker: { nameCs: "Stínošlap", nameEn: "Shadewalker", hp: 32, speed: 150, dmg: 11, radius: 13, coins: [5, 9], color: "#6d5c68", eye: "#ff6b55" },
  gunner: { nameCs: "Vrtačka", nameEn: "Drill", hp: 76, speed: 56, dmg: 12, radius: 19, coins: [8, 14], color: "#807960", eye: "#ff5a36", ranged: true, preferred: 335, fireCd: 2.45, projSpeed: 400, projDmg: 11 },
  brute: { nameCs: "Těžkooděnec", nameEn: "Heavy Trooper", hp: 190, speed: 44, dmg: 22, radius: 25, coins: [12, 22], color: "#7d6650", eye: "#ff4a2d" },
};

const BOSS_TIERS = [
  { nameCs: "DOZORCE SMĚNY", nameEn: "SHIFT OVERSEER", color: "#b66a3f", eye: "#ffb347", accent: "#e8a13c", addPool: ["scav", "stalker"] },
  { nameCs: "DRTIČ PLÁTŮ", nameEn: "PLATE CRUSHER", color: "#8a5a4a", eye: "#ff5c38", accent: "#d9583f", addPool: ["scav", "stalker", "drone"] },
  { nameCs: "REAKTOROVÝ TITÁN", nameEn: "REACTOR TITAN", color: "#6f7a5c", eye: "#ffd166", accent: "#e6b657", addPool: ["drone", "gunner", "stalker"] },
  { nameCs: "PÁN HLUBINY", nameEn: "LORD OF THE DEEP", color: "#5c4b68", eye: "#ff4c32", accent: "#b184d0", addPool: ["gunner", "brute", "stalker"] },
];

const UPGRADES = [
  { id: "damage", nameCs: "Servo úderu", nameEn: "Strike Servo", icon: "DMG", color: "#ef7133", descCs: "+15 % poškození všech zbraní.", descEn: "+15% damage of all weapons.", baseCost: 40, growth: 1.55, max: 15 },
  { id: "armor", nameCs: "Pancéřové pláty", nameEn: "Armor Plates", icon: "ARM", color: "#70a8c9", descCs: "-6,5 % přijímaného poškození.", descEn: "-6.5% damage taken.", baseCost: 45, growth: 1.6, max: 10 },
  { id: "hp", nameCs: "Chladicí jádro", nameEn: "Cooling Core", icon: "HP", color: "#a6c36b", descCs: "+20 maximální integrity a léčení.", descEn: "+20 max integrity and healing.", baseCost: 35, growth: 1.5, max: 12 },
  { id: "speed", nameCs: "Exo-servo", nameEn: "Exo Servo", icon: "SPD", color: "#e8a13c", descCs: "+6 % rychlosti pohybu.", descEn: "+6% movement speed.", baseCost: 50, growth: 1.58, max: 10 },
  { id: "luck", nameCs: "Spektrální skener", nameEn: "Spectral Scanner", icon: "LCK", color: "#b184d0", descCs: "Vyšší šance na vzácnější zbraně.", descEn: "Higher chance for rarer weapons.", baseCost: 60, growth: 1.62, max: 10 },
  { id: "magnet", nameCs: "Polní magnet", nameEn: "Field Magnet", icon: "MAG", color: "#69c7b7", descCs: "+28 % dosah přitahování šrotu.", descEn: "+28% scrap attraction range.", baseCost: 30, growth: 1.5, max: 8 },
];

var dpr = 1;
var vw = window.innerWidth;
var vh = window.innerHeight;
var state = "menu";
var modalReturn = "playing";
var soundOn = true;
var ambientTime = 0;
var gameTime = 0;
var lastFrame = performance.now();
var hudTimer = 0;
var weaponSeq = 0;
var enemySeq = 0;
var damageFlashTimer = 0;
var nearWeapon = null;
var audioCtx = null;
var noiseBuffer = null;
var player = null;
var boss = null;
var inventory = [];
var selectedSlot = 0;
var enemies = [];
var projectiles = [];
var particles = [];
var floatTexts = [];
var pickups = [];
var effects = [];
var waveState = { number: 0, active: false, toSpawn: 0, total: 0, spawnTimer: 0, spawnInterval: 0.6, breakTimer: 0, bossPending: false, bossFight: false, bossWave: 0 };
var decor = null;
var kills = 0;
var totalEarned = 0;

const keys = {};
const mouse = { x: vw / 2, y: vh / 2, down: false, inside: true };
const camera = { x: 0, y: 0, shake: 0 };

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (min, max) => min + Math.random() * (max - min);
const choose = (arr) => arr[Math.floor(Math.random() * arr.length)];
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function angleDiff(a, b) {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
}

function segmentCircle(x1, y1, x2, y2, cx, cy, radius) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(cx - x1, cy - y1) <= radius;
  let t = ((cx - x1) * dx + (cy - y1) * dy) / lenSq;
  t = clamp(t, 0, 1);
  return Math.hypot(cx - (x1 + dx * t), cy - (y1 + dy * t)) <= radius;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function clearKeys() {
  for (const key of Object.keys(keys)) delete keys[key];
  mouse.down = false;
}

function showOverlay(el) {
  el.classList.remove("hidden");
  el.setAttribute("aria-hidden", "false");
}

function hideOverlay(el) {
  el.classList.add("hidden");
  el.setAttribute("aria-hidden", "true");
}

function hideAllOverlays() {
  [ui.startScreen, ui.shopScreen, ui.pauseScreen, ui.helpScreen, ui.gameoverScreen].forEach(hideOverlay);
}

function initAudio() {
  if (!soundOn) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
  } catch (error) {
    audioCtx = null;
  }
}

function tone(freq, endFreq, duration, type, volume, delay = 0) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(20, freq), now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function noise(duration, volume, cutoff, delay = 0) {
  if (!audioCtx) return;
  if (!noiseBuffer) {
    noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const now = audioCtx.currentTime + delay;
  const src = audioCtx.createBufferSource();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();
  src.buffer = noiseBuffer;
  filter.type = "lowpass";
  filter.frequency.value = cutoff;
  gain.gain.setValueAtTime(Math.max(0.0002, volume), now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  src.connect(filter).connect(gain).connect(audioCtx.destination);
  src.start(now, Math.random() * 0.5, duration);
}

function sfx(name) {
  if (!soundOn || !audioCtx) return;
  switch (name) {
    case "swing":
      noise(0.09, 0.045, 950);
      tone(175, 78, 0.09, "sawtooth", 0.018);
      break;
    case "shoot":
      tone(330, 95, 0.06, "square", 0.022);
      noise(0.045, 0.018, 1900);
      break;
    case "shotgun":
      noise(0.19, 0.075, 760);
      tone(95, 42, 0.18, "sawtooth", 0.032);
      break;
    case "hit":
      noise(0.065, 0.03, 1500);
      tone(105, 58, 0.07, "triangle", 0.025);
      break;
    case "kill":
      noise(0.25, 0.06, 520);
      tone(82, 30, 0.25, "sawtooth", 0.026);
      break;
    case "coin":
      tone(900, 1420, 0.055, "sine", 0.03);
      tone(1220, 1800, 0.075, "sine", 0.022, 0.04);
      break;
    case "pickup":
      tone(470, 760, 0.08, "triangle", 0.03);
      tone(760, 1120, 0.1, "triangle", 0.026, 0.07);
      break;
    case "hurt":
      tone(112, 44, 0.22, "sawtooth", 0.045);
      noise(0.16, 0.035, 360);
      break;
    case "upgrade":
      [440, 554, 659, 880].forEach((f, i) => tone(f, f * 1.01, 0.14, "triangle", 0.025, i * 0.06));
      break;
    case "wave":
      tone(76, 54, 0.72, "sawtooth", 0.028);
      noise(0.58, 0.018, 170);
      break;
    case "boss":
      tone(54, 30, 1.1, "sawtooth", 0.045);
      tone(108, 62, 0.8, "square", 0.022, 0.08);
      noise(0.9, 0.045, 210);
      break;
    case "gameover":
      tone(145, 38, 1.4, "sawtooth", 0.045);
      noise(1.2, 0.035, 240);
      break;
    case "click":
      tone(310, 255, 0.04, "square", 0.016);
      break;
    default:
      break;
  }
}

function toggleSound() {
  soundOn = !soundOn;
  if (soundOn) {
    initAudio();
    sfx("click");
  }
  ui.soundBtn.textContent = soundOn ? "♪" : "×";
  ui.soundBtn.classList.toggle("off", !soundOn);
  ui.soundBtn.title = t(soundOn ? "soundTitleOn" : "soundTitleOff");
  ui.soundBtn.setAttribute("aria-label", t("soundAria"));
}

function flashDamage() {
  ui.damageFlash.classList.add("active");
  clearTimeout(damageFlashTimer);
  damageFlashTimer = setTimeout(() => ui.damageFlash.classList.remove("active"), 105);
}

function toast(message, kind = "") {
  const el = document.createElement("div");
  el.className = `toast ${kind}`.trim();
  el.textContent = message;
  ui.toastStack.appendChild(el);
  while (ui.toastStack.children.length > 5) ui.toastStack.firstElementChild.remove();
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 330);
  }, 2900);
}

function showBanner(title, sub = "") {
  ui.waveBanner.innerHTML = `${title}${sub ? `<small>${sub}</small>` : ""}`;
  ui.waveBanner.classList.remove("show");
  void ui.waveBanner.offsetWidth;
  ui.waveBanner.classList.add("show");
}

function createDecor() {
  const rnd = mulberry32(0xa17e5);
  const stains = [];
  const plates = [];
  const cracks = [];
  const conveyors = [];
  const pipes = [];
  const crates = [];
  const barrels = [];
  const lamps = [];
  const vents = [];
  const embers = [];

  for (let i = 0; i < 44; i++) {
    stains.push({
      x: rnd() * WORLD.w,
      y: rnd() * WORLD.h,
      rx: 22 + rnd() * 75,
      ry: 12 + rnd() * 35,
      rot: rnd() * TAU,
      alpha: 0.12 + rnd() * 0.18,
    });
  }

  for (let i = 0; i < 18; i++) {
    plates.push({
      x: 120 + rnd() * (WORLD.w - 240),
      y: 120 + rnd() * (WORLD.h - 240),
      w: 100 + rnd() * 220,
      h: 70 + rnd() * 160,
      rot: (rnd() - 0.5) * 0.18,
      hazard: rnd() > 0.55,
    });
  }

  for (let i = 0; i < 52; i++) {
    const x = rnd() * WORLD.w;
    const y = rnd() * WORLD.h;
    const points = [];
    let px = 0;
    let py = 0;
    const count = 3 + Math.floor(rnd() * 4);
    for (let j = 0; j < count; j++) {
      px += (rnd() - 0.5) * 32;
      py += (rnd() - 0.5) * 32;
      points.push({ x: px, y: py });
    }
    cracks.push({ x, y, points, alpha: 0.18 + rnd() * 0.2 });
  }

  for (let i = 0; i < 8; i++) {
    const horizontal = rnd() > 0.45;
    conveyors.push({
      x: 180 + rnd() * (WORLD.w - 360),
      y: 180 + rnd() * (WORLD.h - 360),
      w: 220 + rnd() * 260,
      h: 34,
      vertical: !horizontal,
      dir: rnd() > 0.5 ? 1 : -1,
      speed: 45 + rnd() * 45,
    });
  }

  for (let i = 0; i < 12; i++) {
    const horizontal = rnd() > 0.5;
    const x = 100 + rnd() * (WORLD.w - 200);
    const y = 100 + rnd() * (WORLD.h - 200);
    const length = 160 + rnd() * 320;
    pipes.push({
      x1: x,
      y1: y,
      x2: horizontal ? x + length : x,
      y2: horizontal ? y : y + length,
      phase: rnd() * TAU,
    });
  }

  for (let i = 0; i < 34; i++) {
    let x, y, tries = 0;
    do {
      x = 90 + rnd() * (WORLD.w - 180);
      y = 90 + rnd() * (WORLD.h - 180);
      tries++;
    } while (Math.hypot(x - WORLD.w / 2, y - WORLD.h / 2) < 220 && tries < 8);
    crates.push({
      x,
      y,
      size: 24 + rnd() * 22,
      rot: rnd() * TAU,
      hazard: rnd() > 0.72,
    });
  }

  for (let i = 0; i < 26; i++) {
    let x, y, tries = 0;
    do {
      x = 90 + rnd() * (WORLD.w - 180);
      y = 90 + rnd() * (WORLD.h - 180);
      tries++;
    } while (Math.hypot(x - WORLD.w / 2, y - WORLD.h / 2) < 200 && tries < 8);
    barrels.push({
      x,
      y,
      r: 9 + rnd() * 5,
      color: choose(["#6b4a2a", "#5f6335", "#66503c", "#4f5c52"]),
      rot: rnd() * TAU,
    });
  }

  for (let i = 0; i < 19; i++) {
    lamps.push({
      x: 100 + rnd() * (WORLD.w - 200),
      y: 100 + rnd() * (WORLD.h - 200),
      phase: rnd() * TAU,
      radius: 120 + rnd() * 70,
    });
  }

  for (let i = 0; i < 16; i++) {
    vents.push({
      x: 100 + rnd() * (WORLD.w - 200),
      y: 100 + rnd() * (WORLD.h - 200),
      w: 28 + rnd() * 26,
      h: 18 + rnd() * 16,
      rot: rnd() > 0.5 ? 0 : Math.PI / 2,
    });
  }

  for (let i = 0; i < 42; i++) {
    embers.push({
      x: rnd() * WORLD.w,
      y: rnd() * WORLD.h,
      phase: rnd() * TAU,
      speed: 0.4 + rnd() * 1.1,
      drift: 5 + rnd() * 16,
    });
  }

  return { stains, plates, cracks, conveyors, pipes, crates, barrels, lamps, vents, embers };
}

function makeStartingWeapon() {
  const base = WEAPONS.pickaxe;
  return {
    uid: ++weaponSeq,
    template: "pickaxe",
    name: L(base, "name"),
    type: base.type,
    rarity: "common",
    rarityName: L(RARITIES.common, "name"),
    rarityColor: RARITIES.common.color,
    dmg: base.dmg,
    cd: base.cd,
    range: base.range,
    arc: base.arc,
    knock: base.knock,
    speed: 0,
    spread: 0,
    pellets: 1,
    pierce: 0,
    color: base.color,
    icon: base.icon,
  };
}

function rollRarity(luckBonus = 0) {
  const luck = player.upgrades.luck + luckBonus;
  const weights = [
    RARITIES.common.weight,
    RARITIES.uncommon.weight + luck * 2.4,
    RARITIES.rare.weight + luck * 1.7,
    RARITIES.epic.weight + luck * 1.1,
    RARITIES.legendary.weight + luck * 0.65,
  ];
  const total = weights.reduce((sum, value) => sum + value, 0);
  let roll = Math.random() * total;
  const keysList = ["common", "uncommon", "rare", "epic", "legendary"];
  for (let i = 0; i < keysList.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return keysList[i];
  }
  return "common";
}

function chooseWeaponTemplate(wave) {
  const pool = Object.entries(WEAPONS).filter(([id, base]) => id !== "pickaxe" && base.minWave <= Math.max(1, wave));
  const total = pool.reduce((sum, [, base]) => sum + base.weight, 0);
  let roll = Math.random() * total;
  for (const [id, base] of pool) {
    roll -= base.weight;
    if (roll <= 0) return id;
  }
  return pool[0][0];
}

function generateWeapon(wave, luckBonus = 0) {
  const templateId = chooseWeaponTemplate(wave);
  const base = WEAPONS[templateId];
  const rarityId = rollRarity(luckBonus);
  const rarity = RARITIES[rarityId];
  const levelScale = 1 + Math.max(0, wave - 1) * 0.1;
  return {
    uid: ++weaponSeq,
    template: templateId,
    name: `${L(base, "name")}${L(rarity, "suffix")}`,
    type: base.type,
    rarity: rarityId,
    rarityName: L(rarity, "name"),
    rarityColor: rarity.color,
    dmg: base.dmg * rarity.mult * levelScale,
    cd: base.cd * (1 - (rarity.mult - 1) * 0.045),
    range: base.range,
    arc: base.arc || 0,
    knock: base.knock || 0,
    speed: base.speed || 0,
    spread: base.spread || 0,
    pellets: base.pellets || 1,
    pierce: base.pierce || 0,
    color: base.color,
    icon: base.icon,
  };
}

function playerDamageMult() {
  return 1 + player.upgrades.damage * 0.15;
}

function playerArmor() {
  return Math.min(0.68, player.upgrades.armor * 0.065);
}

function playerSpeed() {
  return 220 * (1 + player.upgrades.speed * 0.06);
}

function playerMagnet() {
  return 105 * (1 + player.upgrades.magnet * 0.28);
}

function getMoney() {
  return player ? player.money || 0 : 0;
}

function earnMoney(amount) {
  player.money += amount;
  totalEarned += amount;
}

function spendMoney(amount) {
  if (getMoney() < amount) return false;
  player.money -= amount;
  return true;
}

function addParticle(x, y, options) {
  const life = options.life || 0.4;
  particles.push({
    x,
    y,
    vx: options.vx || 0,
    vy: options.vy || 0,
    life,
    maxLife: life,
    size: options.size || 2,
    color: options.color || "#ffffff",
    kind: options.kind || "spark",
    drag: options.drag || 4,
  });
}

function addFloatText(x, y, text, color, size = 11) {
  floatTexts.push({ x, y, text, color, life: 0.75, maxLife: 0.75, size });
}

function resetGame() {
  player = {
    x: WORLD.w / 2,
    y: WORLD.h / 2,
    radius: 16,
    hp: 100,
    maxHp: 100,
    money: 0,
    aim: 0,
    moving: false,
    walkPhase: 0,
    attackTimer: 0,
    invuln: 0,
    recoil: 0,
    dustTimer: 0,
    upgrades: { damage: 0, armor: 0, hp: 0, speed: 0, luck: 0, magnet: 0 },
  };
  inventory = [makeStartingWeapon(), null, null, null, null];
  selectedSlot = 0;
  boss = null;
  enemies = [];
  projectiles = [];
  particles = [];
  floatTexts = [];
  pickups = [];
  effects = [];
  kills = 0;
  totalEarned = 0;
  gameTime = 0;
  hudTimer = 0;
  camera.shake = 0;
  camera.x = clamp(player.x - vw / 2, 0, Math.max(0, WORLD.w - vw));
  camera.y = clamp(player.y - vh / 2, 0, Math.max(0, WORLD.h - vh));
  waveState = { number: 0, active: false, toSpawn: 0, total: 0, spawnTimer: 0, spawnInterval: 0.6, breakTimer: 0, bossPending: false, bossFight: false, bossWave: 0 };
  nearWeapon = null;
  clearKeys();
  ui.interactPrompt.classList.remove("show");
  ui.bossBar.classList.add("hidden");
  ui.bossBar.setAttribute("aria-hidden", "true");
  if (!decor) decor = createDecor();
  renderHotbar();
  updateHud();
}

function startGame() {
  initAudio();
  resetGame();
  hideAllOverlays();
  state = "playing";
  showBanner(t("waveBanner", { n: "01" }), t("waveStartSub"));
  startWave(1);
  sfx("wave");
}

function startWave(number) {
  waveState.number = number;
  waveState.active = true;
  waveState.total = 5 + number * 2;
  waveState.toSpawn = waveState.total;
  waveState.spawnInterval = Math.max(0.18, 0.64 - number * 0.024);
  waveState.spawnTimer = 0.35;
  waveState.breakTimer = 0;
  waveState.bossPending = false;
  waveState.bossFight = false;
  waveState.bossWave = 0;
  boss = null;
  ui.bossBar.classList.add("hidden");
  ui.bossBar.setAttribute("aria-hidden", "true");
  if (number > 1) {
    showBanner(t("waveBanner", { n: String(number).padStart(2, "0") }), t("newSignature"));
    sfx("wave");
  }
}

function completeWave() {
  waveState.active = false;
  const bossNext = waveState.number % 5 === 0;
  waveState.bossPending = bossNext;
  waveState.breakTimer = bossNext ? 4 : 5;
  const bonus = 8 + waveState.number * 6;
  player.hp = Math.min(player.maxHp, player.hp + player.maxHp * 0.12);
  earnMoney(bonus);
  const clearedWave = String(waveState.number).padStart(2, "0");
  if (bossNext) {
    showBanner(t("waveCleared", { n: clearedWave }), t("bossIncoming"));
    toast(t("sectorClearedBoss", { bonus }), "rare");
  } else {
    showBanner(t("waveCleared", { n: clearedWave }), t("supplyCrate", { bonus }));
    toast(t("sectorCleared", { bonus }), "good");
  }
  const reward = generateWeapon(waveState.number, 1.5);
  spawnWeaponPickup(player.x + rand(-42, 42), player.y + rand(-42, 42), reward, 0.6, true);
  sfx("upgrade");
}

function updateHud() {
  if (!player) return;
  const pct = clamp((player.hp / player.maxHp) * 100, 0, 100);
  ui.hpFill.style.width = `${pct}%`;
  ui.hpFill.classList.toggle("low", pct < 30);
  ui.hpText.textContent = `${Math.ceil(Math.max(0, player.hp))} / ${player.maxHp}`;
  ui.money.textContent = Math.floor(getMoney());
  ui.wave.textContent = waveState.number ? String(waveState.number).padStart(2, "0") : "--";
  ui.kills.textContent = kills;
  const showStatus = state === "playing";
  ui.waveStatus.classList.toggle("show", showStatus);
  if (showStatus) {
    if (waveState.bossFight && boss) {
      ui.waveStatus.textContent = `BOSS // ${boss.name}`;
    } else if (waveState.active) {
      ui.waveStatus.textContent = t("enemiesStatus", { count: enemies.length + waveState.toSpawn, wave: waveState.number });
    } else if (waveState.breakTimer > 0) {
      ui.waveStatus.textContent = waveState.bossPending
        ? t("bossInStatus", { sec: Math.ceil(waveState.breakTimer) })
        : t("breakStatus", { sec: Math.ceil(waveState.breakTimer) });
    } else {
      ui.waveStatus.textContent = "";
    }
  }
  updateBossHud();
  if (state === "shop") {
    ui.shopMoney.textContent = Math.floor(getMoney());
  }
}

function updateBossHud() {
  const active = !!(state === "playing" && boss && waveState.bossFight && !boss.dead);
  ui.bossBar.classList.toggle("hidden", !active);
  ui.bossBar.setAttribute("aria-hidden", active ? "false" : "true");
  if (!active) return;
  const pct = clamp((boss.hp / boss.maxHp) * 100, 0, 100);
  ui.bossHpFill.style.width = `${pct}%`;
  ui.bossName.textContent = boss.name;
  ui.bossHpText.textContent = `${Math.ceil(Math.max(0, boss.hp))} / ${boss.maxHp}`;
  ui.bossPhase.textContent = t("phase", { roman: ["I", "II", "III"][clamp(boss.phase, 1, 3) - 1] });
  ui.bossBar.dataset.phase = String(boss.phase);
}

function updateActiveWeapon() {
  const weapon = inventory[selectedSlot];
  if (!weapon) {
    ui.activeName.textContent = t("emptySlot");
    ui.activeName.style.color = "#717a6e";
    ui.activeStats.textContent = t("pressEForWeapon");
    return;
  }
  ui.activeName.textContent = weapon.name;
  ui.activeName.style.color = weapon.rarityColor;
  const damage = Math.round(weapon.dmg * playerDamageMult());
  const kind = weapon.type === "melee" ? t("melee") : t("ranged");
  ui.activeStats.textContent = `${damage} DMG // ${weapon.cd.toFixed(2)}s // ${kind}`;
}

function weaponTitle(weapon) {
  const damage = Math.round(weapon.dmg * playerDamageMult());
  const speed = weapon.type === "melee" ? t("weaponTitleArea", { value: weapon.arc.toFixed(1) }) : t("weaponTitleSpeed", { value: weapon.speed });
  const type = weapon.type === "melee" ? t("weaponTypeMeleeLower") : t("weaponTypeRangedLower");
  return `${weapon.name}\n${weapon.rarityName} // ${type}\n${t("weaponTitleDamage", { value: damage })}\n${t("weaponTitleCooldown", { value: weapon.cd.toFixed(2) })}\n${speed}`;
}

function renderHotbar() {
  ui.hotbar.innerHTML = inventory
    .map((weapon, index) => {
      if (!weapon) {
        return `<button class="slot empty ${index === selectedSlot ? "selected" : ""}" data-slot="${index}" type="button" title="${t("emptySlotTitle", { n: index + 1 })}">
          <span class="slot-key">${SLOT_KEYS[index]}</span>
          <span class="slot-empty-mark">—</span>
          <span class="slot-name">${t("emptyLabel")}</span>
        </button>`;
      }
      return `<button class="slot ${index === selectedSlot ? "selected" : ""}" data-slot="${index}" type="button" style="--rarity:${weapon.rarityColor}" title="${weaponTitle(weapon).replace(/\n/g, "&#10;")}">
        <span class="slot-key">${SLOT_KEYS[index]}</span>
        <canvas width="64" height="64"></canvas>
        <span class="slot-rarity"></span>
        <span class="slot-name">${weapon.name}</span>
      </button>`;
    })
    .join("");

  ui.hotbar.querySelectorAll("canvas").forEach((iconCanvas, index) => {
    const weapon = inventory[index];
    if (!weapon) return;
    const iconCtx = iconCanvas.getContext("2d");
    iconCtx.translate(32, 32);
    drawWeaponGlyph(iconCtx, weapon.template, weapon.color, weapon.rarityColor);
  });
  updateActiveWeapon();
}

function selectSlot(index) {
  if (index < 0 || index >= inventory.length || state !== "playing") return;
  selectedSlot = index;
  sfx("click");
  renderHotbar();
}

function dropSlot(index) {
  if (state !== "playing") return;
  const weapon = inventory[index];
  if (!weapon) {
    toast(t("slotEmpty"), "bad");
    return;
  }
  inventory[index] = null;
  spawnWeaponPickup(player.x + rand(-26, 26), player.y + rand(-26, 26), weapon, 1.1);
  for (let i = 0; i < 8; i++) {
    addParticle(player.x, player.y, {
      vx: rand(-80, 80),
      vy: rand(-80, 80),
      life: rand(0.2, 0.45),
      size: rand(1, 3),
      color: weapon.rarityColor,
      kind: "spark",
      drag: 5,
    });
  }
  toast(t("dropped", { name: weapon.name }), "bad");
  sfx("click");
  renderHotbar();
}

function dropSelected() {
  dropSlot(selectedSlot);
}

function upgradeCost(def) {
  return Math.round(def.baseCost * Math.pow(def.growth, player.upgrades[def.id]));
}

function repairCost() {
  const missing = Math.max(0, player.maxHp - player.hp);
  const waveMult = 1 + 0.12 * Math.max(0, waveState.number - 1);
  return Math.ceil(Math.max(8, missing * 0.65) * waveMult);
}

function renderShop() {
  ui.shopMoney.textContent = Math.floor(getMoney());
  ui.upgradeGrid.innerHTML = UPGRADES.map((def) => {
    const level = player.upgrades[def.id];
    const maxed = level >= def.max;
    const cost = upgradeCost(def);
    const canBuy = !maxed && getMoney() >= cost;
    const pips = Array.from({ length: def.max }, (_, i) => `<span class="upgrade-pip ${i < level ? "on" : ""}"></span>`).join("");
    return `<article class="upgrade-card" style="--upgrade-color:${def.color}">
      <div class="upgrade-top">
        <div class="upgrade-icon">${def.icon}</div>
        <div class="upgrade-level">${t("shopLevel")} <strong>${level}</strong> / ${def.max}</div>
      </div>
      <h3 class="upgrade-name">${L(def, "name")}</h3>
      <p class="upgrade-desc">${L(def, "desc")}</p>
      <div class="upgrade-pips">${pips}</div>
      <button class="upgrade-buy ${maxed ? "maxed" : ""}" data-upgrade="${def.id}" type="button" ${maxed || !canBuy ? "disabled" : ""}>
        ${maxed ? t("shopMaxed") : t("shopUpgrade", { cost })}
      </button>
    </article>`;
  }).join("");

  const cost = repairCost();
  const full = player.hp >= player.maxHp - 0.1;
  ui.repairBtn.disabled = full || getMoney() < cost;
  ui.repairCost.textContent = full ? t("repairFull") : t("repairCost", { cost });
}

function buyUpgrade(id) {
  if (state !== "shop") return;
  const def = UPGRADES.find((item) => item.id === id);
  if (!def) return;
  const level = player.upgrades[id];
  if (level >= def.max) return;
  const cost = upgradeCost(def);
  if (!spendMoney(cost)) {
    toast(t("insufficientScrap"), "bad");
    sfx("click");
    return;
  }
  player.upgrades[id] += 1;
  if (id === "hp") {
    player.maxHp += 20;
    player.hp = Math.min(player.maxHp, player.hp + 20);
  }
  toast(t("upgraded", { name: L(def, "name"), level: player.upgrades[id] }), "good");
  sfx("upgrade");
  renderShop();
  renderHotbar();
  updateHud();
}

function repairPlayer() {
  if (state !== "shop") return;
  const missing = player.maxHp - player.hp;
  if (missing <= 0.1) return;
  const cost = repairCost();
  if (!spendMoney(cost)) {
    toast(t("insufficientRepair"), "bad");
    return;
  }
  player.hp = player.maxHp;
  toast(t("integrityRestored"), "good");
  sfx("upgrade");
  renderShop();
  updateHud();
}

function refreshWeaponName(weapon) {
  const base = WEAPONS[weapon.template];
  const rarity = RARITIES[weapon.rarity];
  if (!base || !rarity) return;
  weapon.name = `${L(base, "name")}${L(rarity, "suffix")}`;
  weapon.rarityName = L(rarity, "name");
}

function refreshLocalizedNames() {
  if (!player) return;
  for (const weapon of inventory) {
    if (weapon) refreshWeaponName(weapon);
  }
  for (const pickup of pickups) {
    if (pickup.kind === "weapon" && pickup.weapon) refreshWeaponName(pickup.weapon);
  }
  for (const enemy of enemies) {
    enemy.name = enemy.boss ? bossDisplayName(enemy.bossTier) : L(ENEMY_TYPES[enemy.type], "name");
  }
  if (boss) boss.name = bossDisplayName(boss.bossTier);
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.title = t("docTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(el.dataset.i18n);
    if (value.includes("<")) el.innerHTML = value;
    else el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  if (ui.soundBtn) {
    ui.soundBtn.title = t(soundOn ? "soundTitleOn" : "soundTitleOff");
    ui.soundBtn.setAttribute("aria-label", t("soundAria"));
  }
  if (player) {
    refreshLocalizedNames();
    renderHotbar();
    updateHud();
    if (state === "shop") renderShop();
    if (state === "gameover") renderGameoverStats();
  }
}

function setLanguage(next) {
  if (next !== "en" && next !== "cs") return;
  if (lang === next) return;
  lang = next;
  applyLanguage();
  sfx("click");
}

function openShop() {
  if (state !== "playing" && state !== "paused") return;
  modalReturn = state;
  if (state === "paused") hideOverlay(ui.pauseScreen);
  state = "shop";
  clearKeys();
  showOverlay(ui.shopScreen);
  renderShop();
  sfx("click");
}

function closeShop() {
  if (state !== "shop") return;
  hideOverlay(ui.shopScreen);
  state = modalReturn;
  if (state === "paused") showOverlay(ui.pauseScreen);
  sfx("click");
}

function openHelp() {
  if (state === "shop" || state === "help" || state === "gameover") return;
  modalReturn = state;
  if (state === "paused") hideOverlay(ui.pauseScreen);
  state = "help";
  clearKeys();
  showOverlay(ui.helpScreen);
  sfx("click");
}

function closeHelp() {
  if (state !== "help") return;
  hideOverlay(ui.helpScreen);
  state = modalReturn;
  if (state === "paused") showOverlay(ui.pauseScreen);
  sfx("click");
}

function pauseGame() {
  if (state !== "playing") return;
  state = "paused";
  clearKeys();
  showOverlay(ui.pauseScreen);
  sfx("click");
}

function resumeGame() {
  if (state !== "paused") return;
  hideOverlay(ui.pauseScreen);
  state = "playing";
  sfx("click");
}

function renderGameoverStats() {
  ui.gameoverStats.innerHTML = `
    <div class="gameover-stat"><span>${t("statReachedWave")}</span><strong>${waveState.number}</strong></div>
    <div class="gameover-stat"><span>${t("statKills")}</span><strong>${kills}</strong></div>
    <div class="gameover-stat"><span>${t("statEarned")}</span><strong>${Math.floor(totalEarned)}</strong></div>
    <div class="gameover-stat"><span>${t("statTime")}</span><strong>${formatTime(gameTime)}</strong></div>`;
}

function endGame() {
  if (state === "gameover") return;
  state = "gameover";
  clearKeys();
  sfx("gameover");
  renderGameoverStats();
  showOverlay(ui.gameoverScreen);
  updateHud();
}

function updateMouse(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
  mouse.inside = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= rect.width && mouse.y <= rect.height;
}

ui.hotbar.addEventListener("click", (event) => {
  const slot = event.target.closest(".slot");
  if (slot) selectSlot(Number(slot.dataset.slot));
});

ui.hotbar.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const slot = event.target.closest(".slot");
  if (slot) dropSlot(Number(slot.dataset.slot));
});

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("shop-btn").addEventListener("click", openShop);
document.getElementById("sound-btn").addEventListener("click", toggleSound);
document.getElementById("help-btn").addEventListener("click", openHelp);
document.getElementById("pause-btn").addEventListener("click", pauseGame);
document.getElementById("shop-close").addEventListener("click", closeShop);
document.getElementById("help-close").addEventListener("click", closeHelp);
document.getElementById("resume-btn").addEventListener("click", resumeGame);
document.getElementById("pause-shop-btn").addEventListener("click", openShop);
document.getElementById("pause-help-btn").addEventListener("click", openHelp);
document.getElementById("restart-btn").addEventListener("click", startGame);
document.getElementById("again-btn").addEventListener("click", startGame);
document.getElementById("repair-btn").addEventListener("click", repairPlayer);
document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

ui.upgradeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-upgrade]");
  if (button) buyUpgrade(button.dataset.upgrade);
});

canvas.addEventListener("contextmenu", (event) => event.preventDefault());
canvas.addEventListener("pointerdown", (event) => {
  updateMouse(event);
  if (event.button === 0 && state === "playing") {
    mouse.down = true;
    if (mouse.inside && player) {
      player.aim = Math.atan2(mouse.y + camera.y - player.y, mouse.x + camera.x - player.x);
    }
    if (player && player.attackTimer <= 0) tryAttack();
    event.preventDefault();
  }
});
window.addEventListener("pointermove", updateMouse);
window.addEventListener("pointerup", (event) => {
  if (event.button === 0) mouse.down = false;
});
window.addEventListener("blur", () => {
  clearKeys();
  if (state === "playing") pauseGame();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && state === "playing") pauseGame();
});

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) event.preventDefault();
  keys[key] = true;
  if (event.repeat) return;

  if (state === "playing") {
    if (key === "b") { openShop(); return; }
    if (key === "h") { openHelp(); return; }
    if (key === "escape") { pauseGame(); return; }
    if (key === "m") { toggleSound(); return; }
    if (key === "q") { dropSelected(); return; }
    if (key === "e") { interact(); return; }
    const slotIndex = SLOT_KEYS.indexOf(key);
    if (slotIndex !== -1) { selectSlot(slotIndex); return; }
  } else if (state === "paused") {
    if (key === "escape") resumeGame();
    if (key === "b") openShop();
    if (key === "h") openHelp();
    if (key === "m") toggleSound();
  } else if (state === "shop") {
    if (key === "b" || key === "escape") closeShop();
    if (key === "m") toggleSound();
  } else if (state === "help") {
    if (key === "h" || key === "escape") closeHelp();
    if (key === "m") toggleSound();
  } else if (state === "gameover") {
    if (key === "r" || key === "enter" || key === " ") startGame();
  } else if (state === "menu") {
    if (key === "enter" || key === " ") startGame();
    if (key === "h") openHelp();
    if (key === "m") toggleSound();
  }
});

window.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});
