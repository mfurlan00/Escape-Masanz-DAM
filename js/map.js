(function(global){
const rooms = {
 atrio: {nombre:'Atrio de entrada', descripcion:'El portal del sufrimiento académico. Huele a lunes y a impresora sin tóner.',tipo:'Inicio',vecinos:['pasillo_informatica','secretaria','patio','biblioteca'],eventos:['inspeccion','rumor_escape','snack_pasillo','nota_atrio']},
 pasillo_informatica:{nombre:'Pasillo de informática',descripcion:'Se oyen teclados, lloros y alguien preguntando qué hace el static.',tipo:'Conexiones',vecinos:['atrio','A01','A02','A03','A04','A05','A06','cpd'],eventos:['aliado_luis','aliado_saul','aliado_ian','aliado_renzo','enemigo_inigo','snack_pasillo','hallazgo_usb']},
 A01:{nombre:'Aula A01 · Programación',descripcion:'Cada silla es una trampa. Cada null es una amenaza.',tipo:'Aula',vecinos:['pasillo_informatica'],eventos:['enemigo_javi','examen_pop','estudiar_evento','hallazgo_herramientas']},
 A02:{nombre:'Aula A02 · Bases de datos',descripcion:'Hay más relaciones que en un reality. La mayoría, muchos a muchos.',tipo:'Aula',vecinos:['pasillo_informatica'],eventos:['enemigo_alberto','examen_pop','burocracia','hallazgo_usb']},
 A03:{nombre:'Aula A03 · Entornos',descripcion:'Ni Git puede revertir las decisiones tomadas aquí.',tipo:'Aula',vecinos:['pasillo_informatica'],eventos:['enemigo_inigo','estudiar_evento','examen_pop']},
 A04:{nombre:'Aula A04 · Legado',descripcion:'Un museo de ratones ópticos y monitores que ya han pedido la jubilación.',tipo:'Botín',vecinos:['pasillo_informatica'],eventos:['hallazgo_herramientas','hallazgo_materiales','snack_pasillo']},
 A05:{nombre:'Aula A05 · Proyecto',descripcion:'Aquí se inventaron 73 proyectos y se entregaron tres.',tipo:'Proyecto',vecinos:['pasillo_informatica'],eventos:['proyecto_final','estudiar_evento','hallazgo_componentes']},
 A06:{nombre:'Aula A06 · Refugio',descripcion:'Una silla cómoda. El recurso más raro de la educación pública.',tipo:'Descanso',vecinos:['pasillo_informatica'],eventos:['descanso','refugio','cache_snacks']},
 cpd:{nombre:'CPD · Servidores',descripcion:'El santuario del cable etiquetado a boli. Quizá aquí esté la tarjeta de huida.',tipo:'Misión',vecinos:['pasillo_informatica'],eventos:['hallazgo_cpd','apagones','hallazgo_usb']},
 secretaria:{nombre:'Secretaría',descripcion:'El último guardián no es un profesor: es un formulario PDF.',tipo:'Misión',vecinos:['atrio'],eventos:['hallazgo_llave','burocracia','inspeccion']},
 patio:{nombre:'Patio',descripcion:'Zona segura salvo que suene el timbre. Aquí se fraguan los grandes planes.',tipo:'Refugio',vecinos:['atrio','taller','azotea'],eventos:['aliado_iker','aliado_renzo','hallazgo_materiales','cache_snacks','refugio']},
 taller:{nombre:'Taller de robótica',descripcion:'Impresoras 3D y piezas que solo funcionan cuando no las miras.',tipo:'Fabricación',vecinos:['patio'],eventos:['arsenal_robotica','hallazgo_materiales','proyecto_robotica','hallazgo_componentes']},
 biblioteca:{nombre:'Biblioteca',descripcion:'La zona donde todo el mundo estudia o lo simula admirablemente.',tipo:'Descanso',vecinos:['atrio'],eventos:['aliado_ian','estudiar_evento','suenio_profetico','cache_snacks']},
 azotea:{nombre:'Azotea',descripcion:'Vista panorámica de la libertad. Y del suspenso si te descuidas.',tipo:'Misión',vecinos:['patio','salida'],eventos:['hallazgo_azotea','refugio','rumor_escape']},
 salida:{nombre:'Salida de emergencia',descripcion:'La puerta de la salvación. Tarjeta, plano y llave: las tres reliquias.',tipo:'Final',vecinos:['azotea'],eventos:['escape_final']},
};
Object.keys(rooms).forEach(id=>{rooms[id].id=id});
const MapManager={getRoom:id=>rooms[id]||null,getCurrentRoom:()=>rooms[global.GameState.getState().location]||rooms.atrio,canMoveTo(id){return this.getCurrentRoom().vecinos.includes(id)},moveTo(id){if(!this.canMoveTo(id))return {ok:false,message:'No puedes teletransportarte sin permiso del tutor.'}; const state=global.GameState.getState();state.location=id;global.GameState.registerRoomVisit(id);return {ok:true,room:rooms[id]}},getNeighbors(){return this.getCurrentRoom().vecinos.map(id=>rooms[id]).filter(Boolean)},getRoomEvents(id){return rooms[id]?.eventos||[]},listRooms(){return Object.values(rooms)}};
global.MapManager=MapManager;
})(window);
