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
    describe('🎨 Paquete Grow', () => {
        // describe('• Implementacion', () => {
        //     it('Costo Implementacion anual', () => {
        //         expect(
        //             calcularCostoImplementacion(9800, 9800, 9800, false)
        //         ).toBe(29400)
        //     })
        //     it('Costo Implementacion mensual', () => {
        //         expect(
        //             calcularCostoImplementacion(9800, 9800, 9800, true)
        //         ).toBe(2450)
        //     })
        // })
        // describe('• Membresia', () => {
        //     it('Costo membresia anual', () => {
        //         expect(calcularCostoMembresia(2990, false)).toBe(35880)
        //     })
        //     it('Costo membresia mensual', () => {
        //         expect(calcularCostoMembresia(2990, true)).toBe(2990)
        //     })
        // })
        // describe('• Timbres', () => {
        //     it('Costo timbres', () => {
        //         expect(calcularCostoTimbres(100, 100, 1)).toBe(0)
        //     })
        //     it('Costo timbres extras', () => {
        //         expect(calcularCostoTimbres(101, 100, 1)).toBe(1)
        //     })
        // })
        // describe('• Facturacion', () => {
        //     it('Costo facturacion anual', () => {
        //         expect(calcularCostoFacturacionAnual(2990)).toBe(35880)
        //     })
        // })
        // describe('• Usuario', () => {
        //     it('Costo 1 usuario', () => {
        //         expect(calcularCostoUsuario(1, 1, 499, false, 499, 1)).toBe(0)
        //     })
        //     it('Costo 2 usuarios', () => {
        //         expect(calcularCostoUsuario(2, 1, 499, false, 499, 1)).toBe(499)
        //     })
        // })
        // describe('• Primer año', () => {
        //     it('Costo primer año con implementacion anual, renta anual, 100 timbres, 1 usuario', () => {
        //         expect(
        //             calcularCostoPrimerAno(
        //                 2990,
        //                 true,
        //                 true,
        //                 calcularCostoImplementacion(9800, 9800, 9800, true),
        //                 calcularCostoMembresia(2990, true),
        //                 calcularCostoTimbres(100, 100, 1),
        //                 calcularCostoUsuario(22, 1, 499, false, 499, 1)
        //             )
        //         ).toBe(0)
        //     })
        //     // it('Costo primer año con implementacion anual, renta mensual, 100 timbres, 1 usuario', () => {
        //     //     expect(
        //     //         calcularCostoPrimerAno(
        //     //             2990,
        //     //             false,
        //     //             true,
        //     //             calcularCostoImplementacion(9800, 9800, 9800, false),
        //     //             calcularCostoMembresia(2990, true),
        //     //             calcularCostoTimbres(100, 100, 1),
        //     //             calcularCostoUsuario(1, 1, 499, false, 499, 1)
        //     //         )
        //     //     ).toBe(29400)
        //     // })
        //     // it('Costo primer año con implementacion mensual, renta mensual, 100 timbres, 1 usuario', () => {
        //     //     expect(
        //     //         calcularCostoPrimerAno(
        //     //             2990,
        //     //             true,
        //     //             true,
        //     //             calcularCostoImplementacion(9800, 9800, 9800, true),
        //     //             calcularCostoMembresia(2990, true),
        //     //             calcularCostoTimbres(100, 100, 1),
        //     //             calcularCostoUsuario(1, 1, 499, false, 499, 1)
        //     //         )
        //     //     ).toBe(5440)
        //     // })
        //     // it('Costo primer año con implementacion mensual, renta mensual, 101 timbres, 2 usuario', () => {
        //     //     expect(
        //     //         calcularCostoPrimerAno(
        //     //             2990,
        //     //             true,
        //     //             true,
        //     //             calcularCostoImplementacion(9800, 9800, 9800, true),
        //     //             calcularCostoMembresia(2990, true),
        //     //             calcularCostoTimbres(101, 100, 1),
        //     //             calcularCostoUsuario(2, 1, 499, false, 499, 49)
        //     //         )
        //     //     ).toBe(5940)
        //     // })
        //     // it('Costo primer año con implementacion anual, renta anual, 200 timbres, 10 usuario', () => {
        //     //     console.log(
        //     //         calcularCostoImplementacion(9800, 9800, 9800, false)
        //     //     )
        //     //     console.log(calcularCostoMembresia(2990, false))
        //     //     console.log(calcularCostoTimbres(200, 100, 1))
        //     //     console.log(calcularCostoUsuario(10, 1, 499, false, 499, 49))
        //     //     expect(
        //     //         calcularCostoPrimerAno(
        //     //             2990,
        //     //             false,
        //     //             false,
        //     //             calcularCostoImplementacion(9800, 9800, 9800, false),
        //     //             calcularCostoMembresia(2990, false),
        //     //             calcularCostoTimbres(200, 100, 1),
        //     //             calcularCostoUsuario(10, 1, 499, false, 499, 49)
        //     //         )
        //     //     ).toBe(60192)
        //     // })
        //     // it('Costo primer año con membresia anual, implementacion mensual, 100 timbres, 1 usuario', () => {
        //     //     expect(
        //     //         calcularCostoPrimerAno(
        //     //             calcularCostoImplementacion(9800, 9800, 9800, true),
        //     //             calcularCostoMembresia(2990, false),
        //     //             calcularCostoTimbres(100, 100, 1),
        //     //             calcularCostoUsuario(1, 1, 499, false, 499, 1)
        //     //         )
        //     //     ).toBe(35340)
        //     // })
        // })
        // describe('• Segundo año', () => {
        //     it('Costo segundo año con 1 usuario, 100 timbres, membresia mensual', () => {
        //         expect(
        //             calcularCostoSegundoAno(
        //                 calcularCostoMembresia(2990, true),
        //                 calcularCostoTimbres(100, 100, 1),
        //                 calcularCostoUsuario(1, 1, 499, false, 499, 1)
        //             )
        //         ).toBe(2990)
        //     })
        //     it('Costo segundo año con 1 usuario, 100 timbres, membresia anual', () => {
        //         expect(
        //             calcularCostoSegundoAno(
        //                 calcularCostoMembresia(2990, false),
        //                 calcularCostoTimbres(100, 100, 1),
        //                 calcularCostoUsuario(1, 1, 499, false, 499, 1)
        //             )
        //         ).toBe(35880)
        //     })
        //     it('Costo segundo año con 2 usuario, 100 timbres, membresia mensual', () => {
        //         expect(
        //             calcularCostoSegundoAno(
        //                 calcularCostoMembresia(2990, true),
        //                 calcularCostoTimbres(100, 100, 1),
        //                 calcularCostoUsuario(2, 1, 499, false, 499, 1)
        //             )
        //         ).toBe(3489)
        //     })
        // })
    })

    describe('🎨 Paquete Institutional', () => {
        // describe('• Usuario', () => {
        //     it('Costo 1 usuario', () => {
        //         expect(calcularCostoUsuario(1, 1, 716, false, 499, 49)).toBe(0)
        //     })

        //     it('Costo 49 usuarios', () => {
        //         expect(calcularCostoUsuario(49, 1, 716, false, 499, 49)).toBe(
        //             34368
        //         )
        //     })

        //     it('Costo 50 usuarios', () => {
        //         expect(calcularCostoUsuario(50, 1, 716, false, 499, 49)).toBe(
        //             35084
        //         )
        //     })
        // })

        describe('• Primer año', () => {
            // it('Costo primer año con implementacion anual, renta anual, 100 timbres, 1 usuario', () => {
            //     expect(
            //         calcularCostoPrimerAno(
            //             8990,
            //             false,
            //             false,
            //             calcularCostoImplementacion(19000, 19000, 19000, false),
            //             calcularCostoMembresia(8990, false),
            //             calcularCostoTimbres(100, 100, 1),
            //             calcularCostoUsuario(1, 1, 716, false, 716, 1)
            //         )
            //     ).toBe(140301)
            // })

            // it('Costo primer año con implementacion anual, renta mensual, 100 timbres, 1 usuario', () => {
            //     expect(
            //         calcularCostoPrimerAno(
            //             8990,
            //             false,
            //             true,
            //             calcularCostoImplementacion(19000, 19000, 19000, false),
            //             calcularCostoMembresia(8990, true),
            //             calcularCostoTimbres(100, 100, 1),
            //             calcularCostoUsuario(1, 1, 716, false, 716, 1)
            //         )
            //     ).toBe(57000)
            // })

            it('Costo primer año con implementacion mensual, renta mensual, 100 timbres, 1 usuario', () => {
                expect(
                    calcularCostoPrimerAno(
                        8990,
                        false,
                        false,
                        calcularCostoImplementacion(19000, 19000, 19000, false),
                        calcularCostoMembresia(8990, false),
                        calcularCostoTimbres(1, 100, 1),
                        calcularCostoUsuario(23, 1, 716, false, 716, 49)
                    )
                ).toBe(0)
            })

            // it('Costo segundo año con 22 usuario, 100 timbres, membresia mensual', () => {
            //     expect(
            //         calcularCostoSegundoAno(
            //             calcularCostoMembresia(8990, true),
            //             calcularCostoTimbres(1, 100, 1),
            //             calcularCostoUsuario(23, 1, 716, false, 716, 49)
            //         )
            //     ).toBe(0)
            // })

            // it('Costo primer año con implementacion mensual, renta mensual, 101 timbres, 2 usuario', () => {
            //     expect(
            //         calcularCostoPrimerAno(
            //             8990,
            //             true,
            //             true,
            //             calcularCostoImplementacion(19000, 19000, 19000, true),
            //             calcularCostoMembresia(8990, true),
            //             calcularCostoTimbres(101, 100, 1),
            //             calcularCostoUsuario(2, 1, 716, false, 716, 49)
            //         )
            //     ).toBe(14457)
            // })

            // it('Costo primer año con implementacion anual, renta anual, 200 timbres, 10 usuario', () => {
            //     console.log(
            //         calcularCostoImplementacion(19000, 19000, 19000, false)
            //     )
            //     console.log(calcularCostoMembresia(8990, false))
            //     console.log(calcularCostoTimbres(200, 100, 1))
            //     console.log(calcularCostoUsuario(10, 1, 716, false, 716, 49))

            //     expect(
            //         calcularCostoPrimerAno(
            //             8990,
            //             false,
            //             false,
            //             calcularCostoImplementacion(19000, 19000, 19000, false),
            //             calcularCostoMembresia(8990, false),
            //             calcularCostoTimbres(200, 100, 1),
            //             calcularCostoUsuario(10, 1, 716, false, 716, 49)
            //         )
            //     ).toBe(146190)
            // })
        })
    })

    // describe('🎨 Paquete Manufacturing', () => {
    //     describe('• Usuario', () => {
    //         it('Costo 1 usuario', () => {
    //             expect(calcularCostoUsuario(1, 1, 829, true, 499, 49)).toBe(0)
    //         })

    //         it('Costo 49 usuarios', () => {
    //             expect(calcularCostoUsuario(49, 1, 829, true, 499, 49)).toBe(
    //                 39792
    //             )
    //         })

    //         it('Costo 50 usuarios', () => {
    //             expect(calcularCostoUsuario(50, 1, 829, true, 499, 49)).toBe(
    //                 40291
    //             )
    //         })
    //     })
    // })
})
