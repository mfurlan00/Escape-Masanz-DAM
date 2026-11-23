(function (global) {
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

    const weapons = {
        lapicero: {id:"lapicero", nombre:"Lapicero del sufrimiento", bonusAtaque:0, bonusPrecision:0, descripcion:"No escribe, sentencia."},
        tecladoRoto: {id:"tecladoRoto", nombre:"Teclado mecánico maldito", bonusAtaque:4, bonusPrecision:0.02, descripcion:"Hace más ruido que el profe pasando lista."},
        lanzaMopa: {id:"lanzaMopa", nombre:"Mopa legendaria", bonusAtaque:6, bonusPrecision:0.01, descripcion:"Limpia errores por la fuerza."},
        martilloMultiuso: {id:"martilloMultiuso", nombre:"Martillo de debugging", bonusAtaque:8, bonusPrecision:0, descripcion:"Si compila, compila."},
        katanaImpresora: {id:"katanaImpresora", nombre:"Espátula de impresora 3D", bonusAtaque:10, bonusPrecision:0.03, descripcion:"Separación de capas y esperanzas."},
        lanzaChispas: {id:"lanzaChispas", nombre:"Soldador sobrecargado", bonusAtaque:12, bonusPrecision:0.04, descripcion:"No recomendado por prevención de riesgos."},
        martilloTitanio: {id:"martilloTitanio", nombre:"Martillo TITANIO", bonusAtaque:15, bonusPrecision:0, descripcion:"La solución más FP a todos los problemas."},
        canonSonico: {id:"canonSonico", nombre:"Altavoz de los recreos", bonusAtaque:18, bonusPrecision:0.05, descripcion:"Compilador de decibelios."},

        boligrafo: {
            id: "boligrafo",
            nombre: "Bolígrafo",
            bonusAtaque: 0,
            bonusPrecision: 0,
            descripcion: "Un bolígrafo de María Ana Sanz, firmó una matrícula y nunca más volvió a la secretaría.",
        },

        teclado: {
            id: "teclado",
            nombre: "Teclado",
            bonusAtaque: 1,
            bonusPrecision: 0.04,
            descripcion: "Un teclado sacado de la A04, más años aquí que Jesucristo, eso sí, ni una tecla en su sitio",
        },

        raton: {
            id: "raton",
            nombre: "Ratón",
            bonusAtaque: 2,
            bonusPrecision: 0.07,
            descripcion: "Un ratón, lleno de mierda y restillo de sudor.",
        }





    };

    const armors = {
        sudadera_base: {id:"sudadera_base", nombre:"Sudadera de supervivencia", bonusDefensa:1, descripcion:"Contra el frío y las notas."},
        armadura_cpd: {id:"armadura_cpd", nombre:"Chaleco anti-bugs CPD", bonusDefensa:4, descripcion:"Protección informática de dudosa homologación."},
        bata_enfermeria: {id:"bata_enfermeria", nombre:"Bata de enfermería", bonusDefensa:3, descripcion:"Da más seguridad de la que debería."},
        armadura_laboratorio: {id:"armadura_laboratorio", nombre:"EPI de laboratorio", bonusDefensa:5, descripcion:"+5 defensa contra prácticas mal explicadas."},
        sudadera_cansat: {
            id: "sudadera_cansat",
            nombre: "Sudadera del CanSat",
            bonusDefensa: 0,
            descripcion: "Te obligaron a ponértela en el CanSat, fea de cojones pero es cómoda, algo es algo.",
        },
    };

    function getWeapon(id) {
    return weapons[id] ? deepClone(weapons[id]) : null;
  }

  function getArmor(id) {
    return armors[id] ? deepClone(armors[id]) : null;
  }

  function describeWeapon(id) {
    const weapon = getWeapon(id);
    if (!weapon) return 'Desconocido';
    return `${weapon.nombre} (+${weapon.bonusAtaque} ATQ, +${Math.round(weapon.bonusPrecision * 100)}% PREC)`;
  }

  function describeArmor(id) {
    const armor = getArmor(id);
    if (!armor) return 'Desconocido';
    return `${armor.nombre} (+${armor.bonusDefensa} DEF)`;
  }

  global.Items = {
    weapons,
    armors,
    getWeapon,
    getArmor,
    describeWeapon,
    describeArmor,
  };

})(window);