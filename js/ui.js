(function (global) {
  const dom = {};

  function h(tag, attrs = {}) {
    const element = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'text') {
        element.textContent = value;
      } else if (key === 'class') {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    return element;
  }

  function renderResources(state) {
    const container = dom.resourceBars;
    container.innerHTML = '';
    const resources = state.resources;
    const limits = global.GameState.getLimits();
    Object.entries(resources).forEach(([key, value]) => {
      const wrapper = h('div', { class: 'resource-bar' });
      const label = h('div', { class: 'resource-label' });
      label.append(h('span', { text: ({salud:'❤️ Salud',energia:'⚡ Energía',hambre:'🍕 Hambre',estres:'🧠 Estrés',progreso:'📚 Progreso'})[key] || key.toUpperCase() }));
      label.append(h('span', { text: `${Math.round(value)}/${limits[key]?.max ?? ''}` }));
      const outer = h('div', { class: 'progress-outer' });
      const fill = h('div', { class: 'progress-inner' });
      const percent = limits[key] ? (value / limits[key].max) * 100 : value;
      fill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
      if (key === 'salud' && value < 30) fill.style.background = "var(--danger)";
      outer.append(fill);
      wrapper.append(label, outer);
      container.append(wrapper);
    });
  }

  function renderAllies(allies) {
    dom.allyList.innerHTML = '';
    if (!allies.length) {
      dom.allyList.append(h('li', { text: 'Nadie quiere arriesgarse (por ahora).' }));
      return;
    }
    allies.forEach((allyId) => {
      const ally = global.Characters.getAlly(allyId);
      const item = h('li');
      if(!ally) return;
      item.append(h('strong',{text:ally.nombre}), document.createTextNode(' — '+ally.bonus));
      dom.allyList.append(item);
    });
  }

  function renderLocation(room) {
    if (!room) return;
    dom.locationInfo.innerHTML = '';
    dom.locationInfo.append(h('h2', { text: room.nombre }));
    dom.locationInfo.append(h('p', { text: room.descripcion }));
    dom.locationInfo.append(h('p', { text: `Zona ${room.tipo}` }));
  }

  function renderEquipment(state) {
    if (!dom.equipmentPanel) return;
    dom.equipmentPanel.innerHTML = '';
    dom.equipmentPanel.append(h('h2', { text: 'Equipo' }));
    const details = global.GameState.getEquipmentDetails();
    const weapon = details.weapon ? `${details.weapon.nombre} (+${details.weapon.bonusAtaque} ATQ)` : 'Sin arma equipada';
    const armor = details.armor ? `${details.armor.nombre} (+${details.armor.bonusDefensa} DEF)` : 'Sin armadura equipada';
    dom.equipmentPanel.append(h('p', { text: `Arma: ${weapon}` }));
    dom.equipmentPanel.append(h('p', { text: `Armadura: ${armor}` }));
    dom.equipmentPanel.append(h('p', { text: `Materiales: ${state.inventory.materiales || 0}` }));
    if (state.flags.campamentoPatio) {
      dom.equipmentPanel.append(h('p', { class: 'badge-success', text: 'Campamento del patio activo' }));
    }
  }

  function renderMiniMap(state) {
    if (!dom.miniMap) return;
    const rooms = global.MapManager.listRooms();
    dom.miniMap.innerHTML = '';
    rooms.forEach((room) => {
      const cell = h('div', { class: 'minimap-room' });
      if (state.visitedRooms[room.id]) cell.classList.add('visited');
      if (state.location === room.id) cell.classList.add('current');
      cell.textContent = room.nombre;
      dom.miniMap.append(cell);
    });
  }

  function renderLog(logEntries) {
    dom.storyLog.innerHTML = '';
    logEntries.forEach((entry) => appendLog(entry.text, entry.turno));
  }

  function appendLog(text, turno = null) {
    const entry = h('div', { class: 'story-entry' });
    if (turno !== null && turno !== undefined) {
      const tag = h('div', { class: 'tag', text: `Turno ${turno}` });
      entry.append(tag);
    }
    const body = h('div');
    body.textContent = text;
    entry.append(body);
    dom.storyLog.append(entry);
    dom.storyLog.scrollTop = dom.storyLog.scrollHeight;
  }

  function setActions(actions = []) {
    dom.actionButtons.innerHTML = '';
    actions.forEach((action) => {
      const btn = h('button', { text: action.label });
      btn.title = `Atajo: ${dom.actionButtons.children.length+1}`;
      if (action.disabled) btn.disabled = true;
      btn.addEventListener('click', action.onClick);
      dom.actionButtons.append(btn);
    });
  }

  function toggleConfigPanel(show) {
    const panel = dom.configPanel;
    if (show) panel.classList.remove('hidden');
    else panel.classList.add('hidden');
  }

  const UI = {
    init(handlers = {}) {
      dom.resourceBars = document.getElementById('resourceBars');
      dom.allyList = document.getElementById('allyList');
      dom.locationInfo = document.getElementById('locationInfo');
      dom.equipmentPanel = document.getElementById('equipmentPanel');
      dom.miniMap = document.getElementById('miniMap');
      dom.storyLog = document.getElementById('storyLog');
      dom.actionButtons = document.getElementById('actionButtons');
      dom.configPanel = document.getElementById('configPanel');
      dom.fastTextToggle = document.getElementById('fastTextToggle');

      document.getElementById('configBtn').addEventListener('click', () => toggleConfigPanel(true));
      document.getElementById('closeConfig').addEventListener('click', () => toggleConfigPanel(false));
      dom.fastTextToggle.addEventListener('change', (e) => {
        global.GameState.toggleFastMode(e.target.checked);
      });

      document.getElementById('saveBtn').addEventListener('click', handlers.onSave);
      document.getElementById('loadBtn').addEventListener('click', handlers.onLoad);
      document.getElementById('deleteBtn').addEventListener('click', handlers.onDelete);
      document.getElementById('newGameBtn').addEventListener('click', handlers.onNewGame);
    },

    render(state) {
      renderResources(state);
      renderAllies(state.allies);
      renderLocation(global.MapManager.getCurrentRoom());
      renderEquipment(state);
      renderMiniMap(state);
      dom.fastTextToggle.checked = Boolean(state.flags.modoRapido);
      const turn = document.getElementById('turnDisplay');
      if(turn) turn.textContent = `TURNO ${String(state.turno).padStart(3,'0')}`;
      const mission=document.getElementById('missionStats');
      if(mission){mission.replaceChildren();[['💳 Tarjeta',state.inventory.tarjetaCPD],['🗺️ Plano',state.inventory.planoAzotea],['🗝️ Llave',(state.inventory.llaves||0)>0]].forEach(([title,ok])=>{let chip=h('span',{text:`${ok?'✅':'⬜'} ${title}`});if(ok)chip.classList.add('ready');mission.append(chip)});}
      const hud=document.getElementById('combatHud');const fight=global.Combat?.getState();
      if(hud){hud.replaceChildren();hud.classList.toggle('active',Boolean(fight));if(fight){const enemy=fight.enemy;const header=h('div',{class:'combat-title'});header.append(h('span',{text:`⚔️ ${enemy.nombre}`}),h('span',{text:`${Math.max(0,enemy.saludActual)} / ${enemy.salud} HP`}));const meter=h('div',{class:'combat-meter'});const fill=h('div');fill.style.width=`${Math.max(0,enemy.saludActual/enemy.salud*100)}%`;meter.append(fill);hud.append(header,meter,h('small',{text:enemy.habilidad||'Este examen no viene en los apuntes.'}));}}

    },

    renderLog,
    appendLog,
    setActions,
    clearActions() {
      dom.actionButtons.innerHTML = '';
    },
  };

  global.UI = UI;
})(window);
