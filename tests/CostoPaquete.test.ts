/**
 * @author Raul Galindo
 * @description Test for
 */

function calcularCostoImplementacion(
    costoActivacion,
    costoMigracion,
    costoCapacitacion,
    isPagoMensual = false
) {
    const costoTotal = costoActivacion + costoMigracion + costoCapacitacion
    const numeroMeses = 12
    if (isPagoMensual) {
        return costoTotal / numeroMeses
    }
    return costoTotal
}

function calcularCostoCapacitacion(
    cantidadUsuariosRequeridos: number,
    cantidadUsuariosAntesDePagoExtra: number,
    costoCapacitacionBase: number,
    costoCapacitacionUsuarioExtra: number
): number {
    if (cantidadUsuariosRequeridos > cantidadUsuariosAntesDePagoExtra) {
        let cantidadUsuariosExtras =
            cantidadUsuariosRequeridos - cantidadUsuariosAntesDePagoExtra
        const costoUsuariosExtrasCapacitaciones =
            cantidadUsuariosExtras * costoCapacitacionUsuarioExtra

        return costoCapacitacionBase + costoUsuariosExtrasCapacitaciones
    }

    return costoCapacitacionBase
}

function calcularCostoMembresia(costoBaseMensual, isPagoMensual = false) {
    const numeroMeses = 12
    if (isPagoMensual) {
        return costoBaseMensual
    }

    return costoBaseMensual * numeroMeses
}

function calcularCostoTimbres(
    timbresRequeridos,
    timbresGratis,
    precioTimbreExtra
) {
    let costoTotal = 0
    if (timbresRequeridos > timbresGratis) {
        costoTotal = (timbresRequeridos - timbresGratis) * precioTimbreExtra
        return costoTotal
    }
    return costoTotal
}

function calcularCostoFacturacionAnual(costoBaseMensual) {
    const mesesDelAño = 12
    return costoBaseMensual * mesesDelAño
}

function calcularCostoUsuario(
    cantidadUsuariosRequeridos,
    cantidadGratisIncluidos,
    costoUsuarioExtra,
    hasPrecioUsuarioExtraVariable = false,
    costoUsuarioExtraDespuesDeLimite,
    cantidadDeUsuariosAntesDelDescuento
) {
    if (hasPrecioUsuarioExtraVariable) {
        if (cantidadUsuariosRequeridos > cantidadDeUsuariosAntesDelDescuento) {
            const cantidadAntesDelRango =
                cantidadDeUsuariosAntesDelDescuento - cantidadGratisIncluidos
            const cantidadDespuesDelRango =
                cantidadUsuariosRequeridos - cantidadDeUsuariosAntesDelDescuento
            const costoDespuesDelLimite =
                cantidadDespuesDelRango * costoUsuarioExtraDespuesDeLimite
            const costoAntesDelLimite =
                cantidadAntesDelRango * costoUsuarioExtra
            return costoDespuesDelLimite + costoAntesDelLimite
        }
    }
    const costo = Math.abs(
        (cantidadGratisIncluidos - cantidadUsuariosRequeridos) *
            costoUsuarioExtra
    )
    return costo
}

function calcularCostoPrimerAno(
    costoBase,
    isImplementacionMensual,
    isRentaMensual,
    costoImplementacion,
    costoMembresia,
    costoTimbres,
    costoUsuarios
) {
    if (!isImplementacionMensual) {
        costoMembresia = costoMembresia - costoBase
    }

    let costoTotalFinal = Math.floor(
        costoImplementacion + costoMembresia + costoTimbres + costoUsuarios
    )

    if (!isRentaMensual) {
        costoTotalFinal = Math.floor(costoTotalFinal * 0.9)
    }

    return costoTotalFinal
}

function calcularCostoSegundoAno(costoMembresia, costoTimbres, costoUsuarios) {
    return Math.round(costoMembresia + costoTimbres + costoUsuarios)
}

describe('Calcular costos de paquetes', () => {
    describe('🎨 Paquete Institutional', () => {
        it('Costo primer año con 20 usuario, 100 timbres, membresia mensual e implementacion mensual', () => {
            expect(
                calcularCostoPrimerAno(
                    2990,
                    true,
                    true,
                    calcularCostoImplementacion(
                        19000,
                        19000,
                        calcularCostoCapacitacion(20, 20, 19000, 924),
                        true
                    ),
                    calcularCostoMembresia(2990, true),
                    calcularCostoTimbres(100, 100, 1),
                    calcularCostoUsuario(1, 1, 499, false, 499, 1)
                )
            ).toBe(7740)
        })

        it('Costo primer año con 21 usuario, 100 timbres, membresia mensual e implementacion mensual', () => {
            expect(
                calcularCostoPrimerAno(
                    2990,
                    true,
                    true,
                    calcularCostoImplementacion(
                        19000,
                        19000,
                        calcularCostoCapacitacion(21, 20, 19000, 924),
                        true
                    ),
                    calcularCostoMembresia(2990, true),
                    calcularCostoTimbres(100, 100, 1),
                    calcularCostoUsuario(21, 1, 716, false, 499, 1)
                )
            ).toBe(7817)
        })

        it('Costo primer año con 40 usuario, 100 timbres, membresia mensual e implementacion mensual', () => {
            expect(
                calcularCostoPrimerAno(
                    2990,
                    true,
                    true,
                    calcularCostoImplementacion(
                        19000,
                        19000,
                        calcularCostoCapacitacion(21, 20, 19000, 924),
                        true
                    ),
                    calcularCostoMembresia(2990, true),
                    calcularCostoTimbres(100, 100, 1),
                    calcularCostoUsuario(1, 1, 499, false, 499, 1)
                )
            ).toBe(7817)
        })
    })
})
