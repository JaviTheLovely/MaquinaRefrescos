// tests/machine.test.js (Usando Jest)
const MaquinaRefrescos = require('C:/PROGRAMING/PYTHON 0/MaquinaRefrescos.js'); // Ruta absoluta correcta a tu archivo

describe('Máquina de Refrescos', () => {
    let maquina;
    
    beforeEach(() => {
        maquina = new MaquinaRefrescos(); // Crea una nueva instancia de la clase MaquinaRefrescos antes de cada prueba
    });
    
    test('Debe permitir seleccionar un tamaño de vaso', () => {
        expect(maquina.seleccionarTamaño('mediano')).toBe('Vaso mediano seleccionado (500 ml)');
    });
    
    test('Debe permitir seleccionar un tipo de refresco', () => {
        expect(maquina.seleccionarRefresco('Cola')).toBe('Refresco Cola seleccionado');
    });
    
    test('Debe permitir seleccionar la cantidad de hielo', () => {
        expect(maquina.seleccionarHielo(3)).toBe('Cantidad de hielo: 3 cubos');
    });
    
    test('Debe mostrar un mensaje si no hay vasos disponibles', () => {
        maquina.inventario.vasos = 0; // Simula que no hay vasos disponibles
        expect(maquina.dispensar()).toBe('Error: No hay vasos disponibles');
    });
    
    test('Debe mostrar un mensaje si no hay refresco disponible', () => {
        maquina.inventario.refresco['Cola'] = 0; // Simula que no hay refresco 'Cola' disponible
        expect(maquina.seleccionarRefresco('Cola')).toBe('Error: No hay refresco disponible');
    });
});


class MaquinaRefrescos {
    constructor() {
        this.inventario = {
            vasos: 10,
            refresco: { Cola: 5, Naranja: 5, Limón: 5 },
            hielo: 10
        };
        this.tamañoSeleccionado = null;
        this.refrescoSeleccionado = null;
        this.hieloSeleccionado = 0;
    }

    seleccionarTamaño(tamaño) {
        const tamaños = { pequeño: 250, mediano: 500, grande: 750 };
        if (tamaños[tamaño]) {
            this.tamañoSeleccionado = tamaños[tamaño];
            return `Vaso ${tamaño} seleccionado (${tamaños[tamaño]} ml)`;
        }
        return 'Error: Tamaño no válido';
    }

    seleccionarRefresco(tipo) {
        if (this.inventario.refresco[tipo] > 0) {
            this.refrescoSeleccionado = tipo;
            return `Refresco ${tipo} seleccionado`;
        }
        return 'Error: No hay refresco disponible';
    }

    seleccionarHielo(cantidad) {
        if (cantidad <= this.inventario.hielo) {
            this.hieloSeleccionado = cantidad;
            return `Cantidad de hielo: ${cantidad} cubos`;
        }
        return 'Error: No hay suficiente hielo';
    }

    dispensar() {
        if (this.inventario.vasos <= 0) {
            return 'Error: No hay vasos disponibles';
        }
        if (!this.refrescoSeleccionado) {
            return 'Error: No se ha seleccionado refresco';
        }
        this.inventario.vasos--;
        this.inventario.refresco[this.refrescoSeleccionado]--;
        this.inventario.hielo -= this.hieloSeleccionado;
        return `Dispensando ${this.tamañoSeleccionado} ml de ${this.refrescoSeleccionado} con ${this.hieloSeleccionado} cubos de hielo`;
    }
}

module.exports = MaquinaRefrescos;
