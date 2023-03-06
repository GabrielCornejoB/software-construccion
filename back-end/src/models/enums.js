class Unidad {
    // Metro
    static metro = new Unidad("m");
    static metro2 = new Unidad("m2");
    static metro3 = new Unidad("m3");
    // Distancias transporte
    static metro3_km = new Unidad("m3-km");
    static viaje = new Unidad("viaje");
    // Peso
    static kilogramo = new Unidad("kg");
    static tonelada = new Unidad("ton");
    static libra = new Unidad("lb");
    // Volumen
    static galon = new Unidad("gal");
    static ml = new Unidad("ml");
    // Tiempo
    static hora = new Unidad("hr");
    static dia = new Unidad("dia");
    // Abstractos
    static pipeta = new Unidad("pipeta");
    static unidad = new Unidad("un");
    static saco = new Unidad("saco");
    static lata = new Unidad("lata");
    static cunete = new Unidad("cuñete");
    static rollo = new Unidad("rollo");

    constructor(name) {
        this.name = name;
    }
}

class Clasificacion {
    static aceros = new Clasificacion("Acero");
    static aditivos = new Clasificacion("Aditivos");
    static argos = new Clasificacion("Argos");
    static aridos = new Clasificacion("Áridos");
    static herrajes = new Clasificacion("Herrajes");
    static maderas = new Clasificacion("Maderas");
    static mezclas = new Clasificacion("Mezclas");
    static prefabricados = new Clasificacion("Prefabricados");
    static premezlcados = new Clasificacion("Premezclados");
    static pvc = new Clasificacion("PVC");
    static transportes = new Clasificacion("Transportes");

    constructor(name) {
        this.name = name;
    }
}

class Grupo {
    static disenos = new Grupo("Diseños");
    static ensayos = new Grupo("Ensayos");
    static equipos = new Grupo("Equipos");
    static herramientas = new Grupo("Herramientas");
    static manoDeObra = new Grupo("M.O.");
    static materiales = new Grupo("Materiales");
    static polimericos = new Grupo("Polimericos");
    static servicios = new Grupo("Servicios");
    static subcontrato = new Grupo("Subcontrato");
    static subproducto = new Grupo("Subproducto");
    static transportes = new Grupo("Transportes");

    constructor(name) {
        this.name = name;
    }
}

function getKeys(enumName) {
    let keys = [];  
    for (const key in enumName) {
        keys.push(enumName[key].name);
    }
    return keys;
}

module.exports = {
    Unidad,
    Clasificacion, 
    Grupo,
    getKeys
}