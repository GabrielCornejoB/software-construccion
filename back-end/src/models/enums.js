class Unit {
    // Metro
    static meter = new Unit("m");
    static squareMeter = new Unit("m2");
    static cubicMeter = new Unit("m3");
    static linealMeter = new Unit("ml");
    // Distancias transporte
    static cubicMeterKm = new Unit("m3-km");
    static journey = new Unit("viaje");
    // Peso
    static kilogram = new Unit("kg");
    static ton = new Unit("ton");
    static pound = new Unit("lb");
    // Volumen
    static gallon = new Unit("gal");
    // Tiempo
    static hour = new Unit("hr");
    static day = new Unit("dia");
    // Abstractos
    static pipet = new Unit("pipeta");
    static unit = new Unit("un");
    static bag = new Unit("saco");
    static tin = new Unit("lata");
    static keg = new Unit("cuñete");
    static roll = new Unit("rollo");

    constructor(name) {
        this.name = name;
    }
}

class Clasification {
    static steels = new Clasification("Aceros");
    static additives = new Clasification("Aditivos");
    static argos = new Clasification("Argos");
    static aggregates = new Clasification("Áridos");
    static fittings = new Clasification("Herrajes");
    static woods = new Clasification("Maderas");
    static mixes = new Clasification("Mezclas");
    static prefabs = new Clasification("Prefabricados");
    static premixed = new Clasification("Premezclados");
    static pvc = new Clasification("PVC");
    static transport = new Clasification("Transportes");

    constructor(name) {
        this.name = name;
    }
}

class Group {
    static designs = new Group("Diseños");
    static testings = new Group("Ensayos");
    static equipments = new Group("Equipos");
    static tools = new Group("Herramientas");
    static labour = new Group("M.O.");
    static materials = new Group("Materiales");
    static polymerics = new Group("Polimericos");
    static services = new Group("Servicios");
    static subcontracts = new Group("Subcontrato");
    static subproducts = new Group("Subproducto");
    static transport = new Group("Transportes");

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
    Unit,
    Clasification, 
    Group,
    getKeys
}