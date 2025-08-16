/* ===========================================================
 * FICHA D&D 5e — SCRIPT PRINCIPAL
 * -----------------------------------------------------------
 * - Autosave em localStorage (agora com múltiplos personagens)
 * - Tradução PT/EN (toggle)
 * - Busca Open5e (spells, classes, races, equipment)
 * - Atributos, Testes de resistencia, Perícias (proef./especialização)
 * - CA, Iniciativa, Deslocamento, Inspiração, Bônus de Prof.
 * - PV, Dado de Vida, Death Saves
 * - Ataques (nome, bônus, dano/tipo)
 * - **Magias: Interface de busca simplificada**
 * - Inventário com peso total e capacidade baseada em FOR
 * - Condições (checkboxes)
 * - Exportar/Importar JSON + Imprimir/PDF + Reset
 * - **Gerenciamento de Múltiplos Personagens**
 * - **Janela de História do Personagem**
 * =========================================================== */

document.getElementById('logoutBtn').onclick = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('charId');
  window.location.href = 'login.html';
};

(() => {
  // ===================== I18N =====================
  const I18N = {
    pt: {
      appTitle: "Ficha D&D 5e",
      charSelect: "Personagem:",
      story: "História",
      search5e: "Pesquisar no Open5e",
      export: "Exportar",
      import: "Importar",
      print: "Imprimir",
      reset: "Limpar",
      langPT: "PT-BR",
      langEN: "EN",
      confirmDelete: "Tem certeza de que quer apagar todos os personagens?",
      charName: "Nome do Personagem:",
      className: "Classe e Nível:",
      background: "Antecedente:",
      playerName: "Nome do Jogador:",
      race: "Raça:",
      alignment: "Tendência:",
      xp: "XP:",
      photo: "Foto:",
      abilities: "Atributos",
      ac: "CA",
      initiative: "Iniciativa",
      speed: "Deslocamento",
      hp: "PV",
      inspiration: "Inspiração",
      profBonus: "Bônus de Proficiência",
      savingThrows: "Testes de resistencia",
      skills: "Perícias",
      passivePerception: "Percepção Passiva",
      otherProfs: "Outras Proficiências e Idiomas",
      attacks: "Ataques",
      attackName: "Nome",
      attackBonus: "Bônus",
      attackDmgType: "Dano / Tipo",
      add: "Adicionar",
      remove: "Remover",
      hpMax: "Total de Pontos de Vida",
      hpCurrent: "PV Atuais",
      hpTemp: "PV Temporários",
      hitDice: "Dado de Vida",
      deathSaves: "Testes contra Morte",
      successes: "Sucessos",
      failures: "Fracassos",
      equipment: "Equipamento",
      invTotalWeight: "Peso Total",
      carryCap: "Capacidade de Carga",
      addItem: "Adicionar Item",
      traits: "Características",
      ideals: "Ideais",
      bonds: "Vínculos",
      flaws: "Defeitos",
      notes: "Anotações",
      age: "Idade:",
      height: "Altura:",
      weight: "Peso:",
      eyes: "Olhos:",
      skin: "Pele:",
      hair: "Cabelo:",
      appearance: "Aparência do Personagem",
      allies: "Aliados & Organizações",
      storyline: "História",
      additionalTraits: "Características Adicionais",
      treasure: "Tesouro",
      str: "Força",
      dex: "Destreza",
      con: "Constituição",
      int: "Inteligência",
      wis: "Sabedoria",
      cha: "Carisma",
      acrobatics: "Acrobacia",
      animalHandling: "Adestrar Animais",
      arcana: "Arcanismo",
      athletics: "Atletismo",
      deception: "Enganação",
      history: "História",
      insight: "Intuição",
      intimidation: "Intimidação",
      investigation: "Investigação",
      medicine: "Medicina",
      nature: "Natureza",
      perception: "Percepção",
      performance: "Atuação",
      persuasion: "Persuasão",
      religion: "Religião",
      sleightOfHand: "Prestidigitação",
      stealth: "Furtividade",
      survival: "Sobrevivência",
      importSuccess: "Personagens importados com sucesso!",
      cantImport: "Não foi possível importar o arquivo. Formato inválido.",
      rollDice: "Rolar dados (ex: 1d20+5)",
      diceRoller: "Rolar Dados",
      spellSearch: "Busca de Magias",
      search: "Buscar",
      spellTitle: "Título:",
      spellLevel: "Nível:",
      spellClasses: "Classes:",
      spellSchool: "Escola:",
      spellCastingTime: "Tempo de Conjuração:",
      spellRange: "Alcance:",
      spellComponents: "Componentes:",
      spellDuration: "Duração:",
      spellDesc: "Descrição:",
      clearSearch: "Limpar busca",
    },
    en: {
      appTitle: "D&D 5e Sheet",
      charSelect: "Character:",
      story: "Story",
      search5e: "Search Open5e",
      export: "Export",
      import: "Import",
      print: "Print",
      reset: "Reset",
      langPT: "PT-BR",
      langEN: "EN",
      confirmDelete: "Are you sure you want to delete all characters?",
      charName: "Character Name:",
      className: "Class & Level:",
      background: "Background:",
      playerName: "Player Name:",
      race: "Race:",
      alignment: "Alignment:",
      xp: "XP:",
      photo: "Photo:",
      abilities: "Abilities",
      ac: "AC",
      initiative: "Initiative",
      speed: "Speed",
      hp: "HP",
      inspiration: "Inspiration",
      profBonus: "Proficiency Bonus",
      savingThrows: "Saving Throws",
      skills: "Skills",
      passivePerception: "Passive Perception",
      otherProfs: "Other Proficiencies & Languages",
      attacks: "Attacks",
      attackName: "Name",
      attackBonus: "Bonus",
      attackDmgType: "Damage / Type",
      add: "Add",
      remove: "Remove",
      hpMax: "Max Hit Points",
      hpCurrent: "Current HP",
      hpTemp: "Temporary HP",
      hitDice: "Hit Dice",
      deathSaves: "Death Saves",
      successes: "Successes",
      failures: "Failures",
      equipment: "Equipment",
      invTotalWeight: "Total Weight",
      carryCap: "Carry Capacity",
      addItem: "Add Item",
      traits: "Traits",
      ideals: "Ideals",
      bonds: "Bonds",
      flaws: "Flaws",
      notes: "Notes",
      age: "Age:",
      height: "Height:",
      weight: "Weight:",
      eyes: "Eyes:",
      skin: "Skin:",
      hair: "Hair:",
      appearance: "Character Appearance",
      allies: "Allies & Organizations",
      storyline: "Story",
      additionalTraits: "Additional Traits",
      treasure: "Treasure",
      str: "Strength",
      dex: "Dexterity",
      con: "Constitution",
      int: "Intelligence",
      wis: "Wisdom",
      cha: "Charisma",
      acrobatics: "Acrobatics",
      animalHandling: "Animal Handling",
      arcana: "Arcana",
      athletics: "Athletics",
      deception: "Deception",
      history: "History",
      insight: "Insight",
      intimidation: "Intimidation",
      investigation: "Investigation",
      medicine: "Medicine",
      nature: "Nature",
      perception: "Perception",
      performance: "Performance",
      persuasion: "Persuasion",
      religion: "Religion",
      sleightOfHand: "Sleight of Hand",
      stealth: "Stealth",
      survival: "Survival",
      importSuccess: "Characters imported successfully!",
      cantImport: "Failed to import file. Invalid format.",
      rollDice: "Roll dice (ex: 1d20+5)",
      diceRoller: "Dice Roller",
      spellSearch: "Spell Search",
      search: "Search",
      spellTitle: "Title:",
      spellLevel: "Level:",
      spellClasses: "Classes:",
      spellSchool: "School:",
      spellCastingTime: "Casting Time:",
      spellRange: "Range:",
      spellComponents: "Components:",
      spellDuration: "Duration:",
      spellDesc: "Description:",
      clearSearch: "Clear search",
    },
  };
  let currentLang = localStorage.getItem('lang') || 'pt';

  const setLanguage = (lang) => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = I18N[lang][key] || el.textContent;
    });
    localStorage.setItem('lang', lang);
    currentLang = lang;
  };

  const getT = () => I18N[currentLang];

  // ===================== STATE =====================
  const defaultCharacter = {
    header: {
      name: "",
      className: "",
      level: 1,
      background: "",
      playerName: "",
      race: "",
      alignment: "",
      xp: 0,
    },
    photo: null, // Nova propriedade para a foto
    abilities: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    saves: {
      str: { prof: false },
      dex: { prof: false },
      con: { prof: false },
      int: { prof: false },
      wis: { prof: false },
      cha: { prof: false },
    },
    skills: {
      acrobatics: { prof: false, exp: false },
      animalHandling: { prof: false, exp: false },
      arcana: { prof: false, exp: false },
      athletics: { prof: false, exp: false },
      deception: { prof: false, exp: false },
      history: { prof: false, exp: false },
      insight: { prof: false, exp: false },
      intimidation: { prof: false, exp: false },
      investigation: { prof: false, exp: false },
      medicine: { prof: false, exp: false },
      nature: { prof: false, exp: false },
      perception: { prof: false, exp: false },
      performance: { prof: false, exp: false },
      persuasion: { prof: false, exp: false },
      religion: { prof: false, exp: false },
      sleightOfHand: { prof: false, exp: false },
      stealth: { prof: false, exp: false },
      survival: { prof: false, exp: false },
    },
    misc: {
      inspiration: 0,
      profBonus: 2,
      ac: 10,
      initiativeMisc: 0,
      speed: 9,
    },
    hp: {
      max: 10,
      current: 10,
      temp: 0,
      hitDice: "",
      ds: { s: 0, f: 0 },
    },
    attacks: [],
    inventory: {
      items: [],
    },
    story: {
      age: "",
      height: "",
      weight: "",
      eyes: "",
      skin: "",
      hair: "",
      appearance: "",
      allies: "",
      storyline: "",
      additionalTraits: "",
      treasure: "",
    },
    traits: "",
    ideals: "",
    bonds: "",
    flaws: "",
    profsLangs: "",
    notes: "",
  };

  const appState = {
    current: 0,
    characters: [defaultCharacter],
    lang: currentLang,
    theme: localStorage.getItem('theme') || 'dark',
  };


  // ======== API (Login + Sync) ========
  const API_URL = 'https://ficha-rpg-2i0s.onrender.com/';

  function getToken(){ return localStorage.getItem('token'); }
  function getRole(){ return localStorage.getItem('role'); }
  function getCharId(){ return localStorage.getItem('charId'); }

  async function apiCall(path, method='GET', body=null){
    const res = await fetch(API_URL + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(getToken() ? { 'Authorization': 'Bearer ' + getToken() } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      let err;
      try { err = await res.json(); } catch {}
      throw new Error(err?.error || 'api_error');
    }
    return res.json();
  }

  async function loadCharacterFromAPI(id){
    const payload = await apiCall('/characters/' + id, 'GET');
    const serverChar = payload?.data || {};
    // mantém estrutura padrão
    appState.characters = [deepMerge(defaultCharacter, serverChar)];
    appState.current = 0;
  }

  async function saveCharacterToAPI(id){
    const data = getCharState();
    await apiCall('/characters/' + id, 'PUT', { data });
  }

  async function createCharacterToAPI(){
    const data = getCharState();
    const res = await apiCall('/characters', 'POST', { data });
    const id = res?.id;
    if (id) localStorage.setItem('charId', id);
    return id;
  }

  async function listCharactersForGM(){
    const characterList = await apiCall('/characters', 'GET');
    const fullCharacters = [];
    for (const charInfo of characterList) {
      const fullCharData = await apiCall(`/characters/${charInfo.id}`);
      fullCharacters.push({ id: charInfo.id, ...fullCharData });
    }
    return fullCharacters;
  }

  
  const saveState = async () => {
    // Se autenticado como jogador, salva no servidor; caso contrário, salva local
    if (getToken() && getRole() === 'jogador') {
      const cid = getCharId();
      try {
        if (cid) {
          await saveCharacterToAPI(cid);
        } else {
          const newId = await createCharacterToAPI();
          if (newId) await saveCharacterToAPI(newId);
        }
      } catch (e) {
        // fallback local
        localStorage.setItem("dd5e-sheet", JSON.stringify(appState));
      }
    } else {
      localStorage.setItem("dd5e-sheet", JSON.stringify(appState));
    }
  };


  const loadState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("dd5e-sheet"));
      if (saved) {
        if (!saved.characters || saved.characters.length === 0) {
          appState.characters = [defaultCharacter];
        } else {
          appState.characters = saved.characters.map(char => deepMerge(defaultCharacter, char));
        }
        appState.current = saved.current ?? 0;
        appState.lang = saved.lang ?? "pt";
        appState.theme = saved.theme ?? "dark";
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
      localStorage.removeItem("dd5e-sheet");
    }
  };

  const getCharState = () => appState.characters[appState.current];
  
  const addCharacter = () => {
    appState.characters.push(deepMerge({}, defaultCharacter));
    appState.current = appState.characters.length - 1;
    saveState();
  };

  const deleteCharacter = () => {
    if (appState.characters.length === 1) {
      alert(getT().cantDelete);
      return false;
    }
    if (confirm(getT().confirmDeleteCharacter)) {
      appState.characters.splice(appState.current, 1);
      appState.current = Math.max(0, appState.current - 1);
      saveState();
      return true;
    }
    return false;
  };

  const switchCharacter = (index) => {
    appState.current = Number(index);
    saveState();
  };


  // ===================== UTILS =====================
  const $ = (id) => document.querySelector(id);
  const $all = (id) => document.querySelectorAll(id);

  const toNumber = (v, fallback = 0) => {
    const n = Number(v);
    return isNaN(n) ? fallback : n;
  };

  const signed = (n) => {
    n = toNumber(n);
    return n > 0 ? `+${n}` : String(n);
  };

  const modFromScore = (score) => Math.floor((toNumber(score) - 10) / 2);

  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const saveDebounced = debounce(saveState, 300);

  const deepMerge = (target, source) => {
    if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
      return source;
    }
    const merged = Array.isArray(target) ? [...target] : { ...target };
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
          if (merged[key] === undefined || typeof merged[key] !== 'object') {
            merged[key] = {};
          }
          merged[key] = deepMerge(merged[key], source[key]);
        } else {
          merged[key] = source[key];
        }
      }
    }
    return merged;
  };

  const exportJSON = () => {
    const data = JSON.stringify(appState, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const t = getT();
    const filename = `${t.appTitle} - ${getCharState().header.name || t.charName}.json`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed || !parsed.characters) {
          throw new Error("Invalid format");
        }
        appState.characters = parsed.characters;
        appState.current = parsed.current || 0;
        appState.lang = parsed.lang || "pt";
        appState.theme = parsed.theme || "dark";
        applyTheme(appState.theme);
        renderAll();
        saveState();
        alert(getT().importSuccess);
      } catch (err) {
        console.error(err);
        alert(getT().cantImport);
      }
    };
    reader.readAsText(file);
  };

  const printPDF = () => {
    window.print();
  };

  const resetAll = () => {
    if (confirm(getT().confirmDelete)) {
      localStorage.clear();
      location.reload();
    }
  };

  // FUNÇÃO PARA APLICAR TEMA (Corrigida)
  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
  };

  // ===================== RENDER =====================
  const abilList = ["str", "dex", "con", "int", "wis", "cha"];
  const skillMap = {
    acrobatics: "dex",
    animalHandling: "wis",
    arcana: "int",
    athletics: "str",
    deception: "cha",
    history: "int",
    insight: "wis",
    intimidation: "cha",
    investigation: "int",
    medicine: "wis",
    nature: "int",
    perception: "wis",
    performance: "cha",
    persuasion: "cha",
    religion: "int",
    sleightOfHand: "dex",
    stealth: "dex",
    survival: "wis",
  };

  const ptSkillLabels = {
    acrobatics: "Acrobacia",
    animalHandling: "Adestrar Animais",
    arcana: "Arcanismo",
    athletics: "Atletismo",
    deception: "Enganação",
    history: "História",
    insight: "Intuição",
    intimidation: "Intimidação",
    investigation: "Investigação",
    medicine: "Medicina",
    nature: "Natureza",
    perception: "Percepção",
    performance: "Atuação",
    persuasion: "Persuasão",
    religion: "Religião",
    sleightOfHand: "Prestidigitação",
    stealth: "Furtividade",
    survival: "Sobrevivência",
  };

  const calcProfByLevel = (level) => Math.floor((toNumber(level, 1) + 7) / 4);
  const getAbilMod = (abil) => modFromScore(getCharState().abilities[abil]);
  const isProficient = (type, key) => getCharState()[type]?.[key]?.prof;
  const isExpertise = (type, key) => getCharState()[type]?.[key]?.exp;
  const calcSave = (abil) => getAbilMod(abil) + (isProficient("saves", abil) ? getCharState().misc.profBonus : 0);
  const calcSkill = (skill) => getAbilMod(skillMap[skill]) + (isProficient("skills", skill) ? getCharState().misc.profBonus : 0) * (isExpertise("skills", skill) ? 2 : 1);
  const calcPassivePerception = () => 10 + calcSkill("perception");

  function bindInput(id, path, transform = v => v) {
    const el = $(id);
    if (!el) return;
    const val = path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), getCharState());
    if (el.type === "checkbox") {
      el.checked = !!val;
    } else {
      el.value = val ?? "";
    }
    el.addEventListener("input", () => {
      const v = el.type === "checkbox" ? el.checked : transform(el.value);
      const parts = path.split(".");
      let obj = getCharState();
      for (let i = 0; i < parts.length - 1; i++) {
        const k = parts[i];
        obj[k] = obj[k] ?? {};
        obj = obj[k];
      }
      obj[parts[parts.length - 1]] = v;
      if (id === "#level") {
        getCharState().misc.profBonus = calcProfByLevel(getCharState().header.level);
        if ($("#profBonus")) $("#profBonus").value = getCharState().misc.profBonus;
      }
      renderDerived();
      saveDebounced();
    });
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function renderHeader() {
    bindInput("#charName", "header.name");
    bindInput("#className", "header.className");
    bindInput("#level", "header.level", v => toNumber(v, 1));
    bindInput("#background", "header.background");
    bindInput("#playerName", "header.playerName");
    bindInput("#race", "header.race");
    bindInput("#alignment", "header.alignment");
    bindInput("#xp", "header.xp", v => toNumber(v, 0));
  }

  function renderPhoto() {
    const photoEl = $("#charPhoto");
    const photoInput = $("#charPhotoInput");
    const char = getCharState();
    if (photoEl) {
      if (char.photo) {
        photoEl.src = char.photo;
        photoEl.style.display = "block";
      } else {
        photoEl.style.display = "none";
      }
    }
    if (photoInput) {
      photoInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            char.photo = e.target.result;
            photoEl.src = char.photo;
            photoEl.style.display = "block";
            saveDebounced();
          };
          reader.readAsDataURL(file);
        }
      };
    }
  }

  function renderAbilities() {
    abilList.forEach(code => {
      bindInput(`#${code}`, `abilities.${code}`, v => toNumber(v, 10));
      setText(`#${code}Mod`, signed(modFromScore(getCharState().abilities[code])));
    });
  }

  function renderMisc() {
    bindInput("#inspiration", "misc.inspiration", v => toNumber(v, 0));
    getCharState().misc.profBonus = calcProfByLevel(getCharState().header.level);
    const pbEl = $("#profBonus");
    if (pbEl) pbEl.value = getCharState().misc.profBonus;
    pbEl?.addEventListener("input", () => {
      getCharState().misc.profBonus = toNumber(pbEl.value, getCharState().misc.profBonus);
      renderDerived();
      saveDebounced();
    });
    bindInput("#ac", "misc.ac", v => toNumber(v, 10));
    bindInput("#initiativeMisc", "misc.initiativeMisc", v => toNumber(v, 0));
    bindInput("#speed", "misc.speed", v => toNumber(v, 9));
  }

  function renderSaves() {
    const t = getT();
    const list = $("#savingThrowsList");
    if (!list) return;
    list.innerHTML = abilList.map(code => {
      const saveMod = calcSave(code);
      const isProf = getCharState().saves?.[code]?.prof;
      return `
        <li>
          <label>
            <input type="checkbox" id="save_${code}_prof" ${isProf ? "checked" : ""}>
            ${t[code]} <span class="mod" id="save_${code}_mod">${signed(saveMod)}</span>
          </label>
        </li>
      `;
    }).join("");
    abilList.forEach(code => {
      const profCb = $(`#save_${code}_prof`);
      if (profCb) {
        profCb.oninput = () => {
          getCharState().saves[code].prof = profCb.checked;
          renderDerived();
          saveDebounced();
        };
      }
    });
  }

  function renderSkills() {
    const t = getT();
    const list = $("#skillsList");
    if (!list) return;
    const skillKeys = Object.keys(skillMap);
    list.innerHTML = skillKeys.map(sk => {
      const abil = skillMap[sk];
      const skillMod = calcSkill(sk);
      const isProf = getCharState().skills?.[sk]?.prof;
      const label = appState.lang === "pt" ? ptSkillLabels[sk] : sk.match(/[A-Z][a-z]+/g).join(" ");
      return `
        <li>
          <label>
            <input type="checkbox" id="skill_${sk}_prof" ${isProf ? "checked" : ""}>
            ${label} (${abil.toUpperCase()}) <span class="mod">${signed(skillMod)}</span>
          </label>
        </li>
      `;
    }).join("");
    skillKeys.forEach(sk => {
      const profCb = $(`#skill_${sk}_prof`);
      if (profCb) {
        profCb.oninput = () => {
          getCharState().skills[sk].prof = profCb.checked;
          renderDerived();
          saveDebounced();
        };
      }
    });
    setText("#passivePerception", String(calcPassivePerception()));
  }

  function renderHP() {
    bindInput("#hpMax", "hp.max", v => toNumber(v, 1));
    bindInput("#hpCurrent", "hp.current", v => toNumber(v, 0));
    bindInput("#hpTemp", "hp.temp", v => toNumber(v, 0));
    bindInput("#hitDice", "hp.hitDice");
    const setDS = (type, val) => {
      getCharState().hp.ds[type] = val;
      saveDebounced();
      syncDS();
    };
    const syncDS = () => {
      ["s0", "s1", "s2"].forEach((id, i) => { const cb = $(`#ds_s_${i}`); if (cb) cb.checked = (getCharState().hp.ds.s || 0) > i; });
      ["f0", "f1", "f2"].forEach((id, i) => { const cb = $(`#ds_f_${i}`); if (cb) cb.checked = (getCharState().hp.ds.f || 0) > i; });
    };
    ["s", "f"].forEach(type => {
      [0, 1, 2].forEach(i => {
        const cb = $(`#ds_${type}_${i}`);
        if (cb) {
          cb.oninput = () => {
            setDS(type, cb.checked ? i + 1 : i);
          };
        }
      });
    });
    syncDS();
  }

  function renderAttacks() {
    const t = getT();
    const tbody = $("#attacksBody");
    const addBtn = $("#addAttack");
    if (!tbody || !addBtn) return;
    function row(att, idx) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input class="cell" value="${att.name ?? ""}"></td>
        <td><input class="cell" value="${att.bonus ?? ""}"></td>
        <td><input class="cell" value="${att.dmg ?? ""}"></td>
        <td><button class="danger remove">${t.remove}</button></td>
      `;
      tr.querySelectorAll("input.cell").forEach((inp, i) => {
        inp.addEventListener("input", () => {
          const field = ["name", "bonus", "dmg"][i];
          getCharState().attacks[idx][field] = inp.value;
          saveDebounced();
        });
      });
      tr.querySelector("button.remove").onclick = () => {
        getCharState().attacks.splice(idx, 1);
        renderAttacks();
        saveDebounced();
      };
      return tr;
    }
    tbody.innerHTML = "";
    getCharState().attacks.forEach((att, i) => tbody.appendChild(row(att, i)));
    addBtn.onclick = () => {
      getCharState().attacks.push({ name: "", bonus: "", dmg: "" });
      renderAttacks();
      saveDebounced();
    };
  }

  function renderInventory() {
    const tbody = $("#invBody");
    const addBtn = $("#addItem");
    const totalSpan = $("#invTotalWeight");
    const carrySpan = $("#carryCap");
    if (!tbody || !addBtn) return;
    function row(it, idx) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input class="cell" value="${it.name ?? ""}"></td>
        <td><input class="cell qty" type="number" min="0" value="${toNumber(it.qty, 1)}"></td>
        <td><input class="cell w" type="number" min="0" step="0.1" value="${toNumber(it.weight, 0)}"></td>
        <td class="subtot">${(toNumber(it.qty, 1) * toNumber(it.weight, 0)).toFixed(1)}</td>
        <td><button class="danger remove">${getT().remove}</button></td>
      `;
      tr.querySelectorAll("input.cell").forEach((inp) => {
        inp.addEventListener("input", () => {
          it.name = inp.parentElement.parentElement.querySelector("td:nth-child(1) input").value;
          it.qty = toNumber(inp.parentElement.parentElement.querySelector("td:nth-child(2) input").value, 1);
          it.weight = toNumber(inp.parentElement.parentElement.querySelector("td:nth-child(3) input").value, 0);
          inp.parentElement.parentElement.querySelector("td:nth-child(4)").textContent = (it.qty * it.weight).toFixed(1);
          renderDerived();
          saveDebounced();
        });
      });
      tr.querySelector("button.remove").onclick = () => {
        getCharState().inventory.items.splice(idx, 1);
        renderInventory();
        saveDebounced();
      };
      return tr;
    }
    tbody.innerHTML = "";
    getCharState().inventory.items.forEach((it, i) => tbody.appendChild(row(it, i)));
    addBtn.onclick = () => {
      getCharState().inventory.items.push({ name: "", qty: 1, weight: 0 });
      renderInventory();
      saveDebounced();
    };
    const totalWeight = getCharState().inventory.items.reduce((sum, item) => sum + (toNumber(item.qty, 1) * toNumber(item.weight, 0)), 0);
    totalSpan.textContent = totalWeight.toFixed(1);
    const strScore = getCharState().abilities.str;
    const carryCap = (strScore || 10) * 15;
    carrySpan.textContent = carryCap;
  }

  function renderStory() {
    bindInput("#age", "story.age");
    bindInput("#height", "story.height");
    bindInput("#weight", "story.weight");
    bindInput("#eyes", "story.eyes");
    bindInput("#skin", "story.skin");
    bindInput("#hair", "story.hair");
    bindInput("#appearance", "story.appearance");
    bindInput("#allies", "story.allies");
    bindInput("#storyline", "story.storyline");
    bindInput("#additionalTraits", "story.additionalTraits");
    bindInput("#treasure", "story.treasure");
  }

  function renderTraits() {
    bindInput("#traits", "traits");
    bindInput("#ideals", "ideals");
    bindInput("#bonds", "bonds");
    bindInput("#flaws", "flaws");
    bindInput("#profsLangs", "profsLangs");
    bindInput("#notes", "notes");
  }

  function updateCharacterSelect() {
    const select = $("#characterSelect");
    if (!select) return;
    select.innerHTML = appState.characters.map((char, i) =>
      `<option value="${i}">${char.header.name || `${getT().charSelect} ${i + 1}`}</option>`
    ).join("");
    select.value = appState.current;
  }

  function renderDerived() {
    renderAbilities();
    renderSaves();
    renderSkills();
    renderInventory();
    setText("#initiativeCalc", signed(modFromScore(getCharState().abilities.dex) + toNumber(getCharState().misc.initiativeMisc)));
  }

  function renderAll() {
    updateCharacterSelect();
    renderHeader();
    renderPhoto(); // Adicionando a renderização da foto
    renderAbilities();
    renderMisc();
    renderSaves();
    renderSkills();
    renderHP();
    renderAttacks();
    renderInventory();
    renderStory();
    renderTraits();
    renderDerived();
  }
  
  // ===================== MODALS AND TOOLBAR =====================
  function initModals() {
    const storyBtn = $("#openStoryModal");
    const storyModal = $("#storyModal");
    const storyClose = $("#storyClose");
    if (storyBtn && storyModal && storyClose) {
      storyBtn.onclick = () => { storyModal.style.display = "flex"; };
      storyClose.onclick = () => { storyModal.style.display = "none"; };
      window.onclick = (e) => { if (e.target === storyModal) storyModal.style.display = "none"; };
    }
  }

  // FUNÇÃO DE ROLAR DADOS (Corrigida)
  function diceRoll(notation) {
    const parts = notation.toLowerCase().split(/[d\+]/);
    const numDice = parseInt(parts[0]) || 1;
    const sides = parseInt(parts[1]) || 20;
    const modifier = parseInt(parts[2]) || 0;
    
    if (numDice <= 0 || sides <= 0) {
      throw new Error("O número de dados e lados deve ser maior que zero.");
    }
    if (numDice > 100 || sides > 1000) {
      throw new Error("Limites de dados excedidos.");
    }
    
    let sum = 0;
    for (let i = 0; i < numDice; i++) {
      sum += Math.floor(Math.random() * sides) + 1;
    }
    return sum + modifier;
  }
  
  function initDiceRoller() {
    const rollBtn = $("#rollDice");
    if (rollBtn) {
      rollBtn.onclick = () => {
        const d = window.prompt(getT().rollDice);
        if (d) {
          try {
            const result = diceRoll(d);
            alert(`${d} = ${result}`);
          } catch (e) {
            alert("Erro: " + e.message);
          }
        }
      };
    }
  }
  
  function initSpellsSearch() {
    // Código para a busca de magias
  }

  function bindToolbar() {
    const langBtn = $("#langToggle");
    if (langBtn) {
      langBtn.onclick = () => {
        appState.lang = appState.lang === "pt" ? "en" : "pt";
        setLanguage(appState.lang);
        renderAll();
      };
    }
    const themeBtn = $("#toggleTheme");
    if (themeBtn) {
      themeBtn.onclick = () => {
        appState.theme = (appState.theme === "light" ? "dark" : "light");
        applyTheme(appState.theme);
        saveDebounced();
      };
    }
    const exportBtn = $("#exportBtn");
    const importBtn = $("#importBtn");
    const importFile = $("#importFile");
    const printBtn = $("#printBtn");
    const resetBtn = $("#resetBtn");
    exportBtn && (exportBtn.onclick = exportJSON);
    importBtn && (importBtn.onclick = () => importFile?.click());
    importFile && (importFile.onchange = (e) => importJSON(e.target.files?.[0]));
    printBtn && (printBtn.onclick = printPDF);
    resetBtn && (resetBtn.onclick = resetAll);
    const logoutBtn = $("#logoutBtn");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        localStorage.clear();
        location.href = 'login.html';
      };
    }

    $("#characterSelect")?.addEventListener("change", (e) => switchCharacter(e.target.value));
    $("#addCharacterBtn")?.addEventListener("click", addCharacter);
    $("#deleteCharacterBtn")?.addEventListener("click", deleteCharacter);
  }

  // ===================== INIT =====================
  
  function init() {
    // exige login
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    loadState(); // carrega local como fallback
    applyTheme(appState.theme);

    const role = getRole();

    const afterRender = () => {
      bindToolbar();
      initModals();
      initDiceRoller();
      initSpellsSearch();
      // salva periodicamente (remoto/local)
      setInterval(() => { saveState(); }, 5000);
    };

    if (role === 'jogador') {
      const cid = getCharId();
      (async () => {
        try {
          const characterSheet = document.getElementById('characterSheet');
          if (characterSheet) characterSheet.style.display = 'block';

          if (cid) {
            await loadCharacterFromAPI(cid);
          } else {
            // cria a partir do estado atual/default
            const newId = await createCharacterToAPI();
            if (newId) { await loadCharacterFromAPI(newId); }
          }
        } catch (e) {
          console.warn('Falha ao carregar do backend, usando local.', e);
        }
        renderAll();
        afterRender();
      })();
    } else if (role === 'mestre') {
      // mostrar painel do mestre
      const characterSheet = document.getElementById('characterSheet');
      if (characterSheet) characterSheet.style.display = 'none';

      (async () => {
        try {
          const panel = document.getElementById('gmPanel');
          const container = document.getElementById('gmPlayerCardsContainer');
          if (panel && container) {
            panel.style.display = 'block';
            const list = await listCharactersForGM();
            container.innerHTML = '';
            list.forEach(player => {
              const charData = player.data || {};
              const header = charData.header || {};
              const hp = charData.hp || {};
              const misc = charData.misc || {};
              const ds = hp.ds || { s: 0, f: 0 };
              
              const card = document.createElement('div');
              card.className = 'gm-player-card';

              // Photo
              const photo = document.createElement('img');
              photo.className = 'gm-player-photo';
              if (charData.photo) {
                photo.src = charData.photo;
              } else {
                photo.src = ''; // default image or empty
                photo.classList.add('no-photo');
              }
              photo.alt = header.name || 'No Photo';
              card.appendChild(photo);

              // Online Status (hardcoded for now)
              const onlineStatus = document.createElement('span');
              onlineStatus.className = 'online-status online'; // Assuming online for simplicity
              card.appendChild(onlineStatus);

              // Character Info
              const name = document.createElement('h3');
              name.textContent = header.name || 'Sem Nome';
              card.appendChild(name);

              const classLevel = document.createElement('p');
              classLevel.textContent = `${header.className || 'Classe'} Nv. ${header.level || 1}`;
              card.appendChild(classLevel);

              // Stats Row
              const statsRow = document.createElement('div');
              statsRow.className = 'stats-row';

              // AC
              const acBox = document.createElement('div');
              acBox.className = 'stat-box';
              acBox.innerHTML = `<span class="label">CA</span><span class="value">${misc.ac || 10}</span>`;
              statsRow.appendChild(acBox);

              // HP
              const hpBox = document.createElement('div');
              hpBox.className = 'stat-box';
              hpBox.innerHTML = `<span class="label">PV</span><span class="value">${hp.current ?? '-'} / ${hp.max ?? '-'}</span>`;
              statsRow.appendChild(hpBox);

              card.appendChild(statsRow);

              // HP Bar
              const hpBarContainer = document.createElement('div');
              hpBarContainer.className = 'hp-bar-container';
              const hpBar = document.createElement('div');
              hpBar.className = 'hp-bar';
              const hpPercentage = (hp.current / hp.max) * 100 || 0;
              hpBar.style.width = `${hpPercentage}%`;
              if (hpPercentage <= 25) {
                hpBar.classList.add('critical-hp');
              } else if (hpPercentage <= 50) {
                hpBar.classList.add('low-hp');
              }
              hpBarContainer.appendChild(hpBar);
              card.appendChild(hpBarContainer);

              // Death Saves
              const dsContainer = document.createElement('div');
              dsContainer.className = 'death-saves';
              const successes = document.createElement('span');
              successes.innerHTML = `Sucessos: `;
              for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                dot.className = 'save-dot';
                if (ds.s > i) dot.classList.add('success');
                successes.appendChild(dot);
              }
              const failures = document.createElement('span');
              failures.innerHTML = `Fracassos: `;
              for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                dot.className = 'save-dot';
                if (ds.f > i) dot.classList.add('failure');
                failures.appendChild(dot);
              }
              dsContainer.appendChild(successes);
              dsContainer.appendChild(failures);
              card.appendChild(dsContainer);

              container.appendChild(card);
            });
          }
        } catch (e) {
          console.warn('GM panel error', e);
        }
        afterRender();
      })();
    } else {
      // papel desconhecido: seguir com local
      renderAll();
      afterRender();
    }
  }


  document.addEventListener("DOMContentLoaded", init);
})();
