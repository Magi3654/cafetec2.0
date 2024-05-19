import { useEffect } from "react";
import { useState } from "react";

export default function CardForm({onSubmit, card}) {
    const [propietario, setPropietario] = useState(card?.nombrePropietario || '');
    const [numeroTarjeta, setNumeroTarjeta] = useState(card?.numero || '');
    const [fechaVencimiento, setFechaVencimiento] = useState(card?.fechaVencimiento || '');
    const [cvv, setCvv] = useState(card?.cvv || '');
    const [pais, setPais] = useState(card?.pais || '');

    return (
        <form onSubmit={ev => onSubmit(ev, {propietario, numeroTarjeta, fechaVencimiento, cvv, pais,})}
            className="mt-8 max-w-2xl mx-auto">

            <div className="grow flex flex-col">
                <label className="font-semibold text-sm">Nombre del propietario</label>
                <input
                    className="input"
                    type="text"
                    placeholder="ej. Juan Lopez"
                    value={propietario}
                    onChange={ev => setPropietario(ev.target.value)}/>

                <label className="font-semibold text-sm">Numero de tarjeta</label>
                <input
                    className="input"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={numeroTarjeta}
                    onChange={ev => setNumeroTarjeta(ev.target.value)}/>

                <div className="flex mt-2">
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Fecha de vencimiento</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="MM/AA"
                            value={fechaVencimiento}
                            onChange={ev => setFechaVencimiento(ev.target.value)}/>   
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Código de seguridad</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="***"
                            value={cvv}
                            onChange={ev => setCvv(ev.target.value)}/>   
                    </div>
                </div>

                <label className="font-semibold text-sm">Pais</label>
                <input
                    className="shadow border border-gray rounded py-2 px-3 m-2 w-2/3 text-darkGray"
                    type="text"
                    placeholder="ej. Mexico"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}/>

                <button
                    className="border border-gray shadow-md"
                    type="submit"
                >
                    Guardar
                </button>   
            </div>
        </form>
    )
}