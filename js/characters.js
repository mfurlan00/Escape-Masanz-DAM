(function (global) {
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

    const Allies = {
        luis: {
            id: "luis",
            nombre: "Luis",
            descripcion: "Veterano del centro, el PPP, desde que sobrevivió a Ana Yañez todos lo respetan.",
            bonus: "+2 al daño cuerpo a cuerpo."
        },

        saul: {
            id: "saul",
            nombre: "Saúl",
            descripcion: "El mayor delincuente de MASANZ, el domiñol, no te la juegues con el, o puedes acabar apuñalado.",
            bonus: "+3 al daño con armas corto-punzantes."
        },

        iker: {
            id: "iker",
            nombre: "Iker",
            descripcion: "Más fuerte que el vinagre, segunda parte, esta vez con carnet",
            bonus: "+4 al daño cuerpo a cuerpo"
        },

        ian: {
            id: "ian",
            nombre: "Ian",
            descripcion: "Se quedó en tardes, peor horario de sueño que un adicto a la cocaína. Catalán, negocia hasta el último céntimo",
            bonus: "+2 a la tacañería"
        },

        renzo: {
            id: "renzo",
            nombre: "Renzo",
            descripcion: "También conocido como Paul, dicen por ahí que tiene gustos raros, pero corre con ganas",
            bonus: "+2 de velocidad"
        },

        
    };

    const Enemies = {
        inigo: {
            id: 'inigo',
            nombre: 'Iñigo Romanos',
            descripcion: 'Profesor que ataca con sus clases de ENDE más aburridas que mirar como crece el césped',        
            salud: 50,
            ataque: 12,
            defensa: 4,
            precision: 0.75,
            recompensa: {
                progreso: 12,
                estres: -10,
            },
            habilidad: 'Hace más daño si tu estrés es alto',
            effect: (playerState) => (playerState.resources.estres > 70 ? 4 : 0),
        },

        alberto: {
            id: 'alberto', nombre: 'Alberto · El Tutor Supremo',
            descripcion: 'Tutor, apóstol de ChatGPT, sacerdote de las bases de datos y fiel a la espera de GTA VI. Trae un JOIN que no has pedido.',
            salud: 56, ataque: 10, defensa: 5, precision: 0.79,
            recompensa: {progreso: 18, estres: -12, snacks: 1},
            habilidad: 'JOIN INFINITO: cuanto más estrés tienes, más te duele el SQL.',
            effect: (state) => state.resources.estres >= 65 ? 4 : 0,
            debuff: 0.015,
            frases: ['¿Y si le preguntas a ChatGPT?', 'SELECT * FROM tus_excusas;', 'GTA VI saldrá antes que tu diagrama E/R.', 'Eso con una clave foránea se arregla.']
        },
        javi: {
            id: 'javi', nombre: 'Javi · Java Final Boss',
            descripcion: 'En clase es majísimo. En el examen se transforma en la excepción que nadie capturó. Ama Java con una intensidad preocupante.',
            salud: 63, ataque: 11, defensa: 4, precision: 0.77,
            recompensa: {progreso: 22, estres: -10, energia: 15},
            habilidad: 'NULLPOINTER EXCEPTION: en ocasiones sube la dificultad.',
            effect: (state) => state.turno % 3 === 0 ? 3 : 0,
            debuff: 0.018,
            frases: ['En clase era fácil, ¿no?', 'public static void sufrir(String[] args)', 'Eso lo hacéis con un for en dos minutos.', 'Examen: 14 ejercicios, 40 minutos. Suerte.']
        },

        felix: {
            id: 'felix',
            nombre: 'Félix',
            descripcion: 'Este hombre parece que no va a dejar de hablar nunca.',
            salud: 54,
            ataque: 10,
            defensa: 5,
            precision: 0.7,
            recompensa: {
                progreso: 10, 
                energia: 10,
            },
            habilidad: 'Reduce tu precisión cada vez que habla de termodinámica',
            effect: () => 0,
            debuff: 0.05,
        },
    };

    function getAlly(id) {
        return Allies[id] ? deepClone(Allies[id]) : null;
    }

    function getEnemy(id) {
        return Enemies[id] ? { ...deepClone(Enemies[id]), effect: Enemies[id].effect } : null;
    }

    function applyAllyBonus(state, allyId) {
        switch (allyId) { 
            case 'luis':
                state.stats.ataque += 2;
                state.flags.allyLuis = true;
                break;
            case 'saul':
                state.stats.ataque += 3;
                state.flags.allySaul = true;
                break;
            case 'iker':
                state.stats.ataque += 4;
                state.flags.allyIker = true;
                break;
            case 'ian':
                state.stats.precision += 0.05;
                state.flags.allyIan = true;
                break;
            case 'renzo':
                state.stats.precision += 0.05;
                state.flags.allyRenzo = true;
                break;
        } 
    }

    global.Characters = {
        Allies,
        Enemies,
        getAlly,
        getEnemy,
        applyAllyBonus,
    };
})(window);