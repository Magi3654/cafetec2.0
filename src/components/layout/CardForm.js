import { useState } from "react";
import { decryptNumber } from "@/models/Cards";

export default function CardForm({onSubmit, card}) {
    const [nombrePropietario, setNombrePropietario] = useState(card?.nombrePropietario || '');
    const [numero, setNumero] = useState(card?.numero || '');
    const [fechaVencimiento, setFechaVencimiento] = useState(card?.fechaVencimiento || '');
    const [cvv, setCvv] = useState(card?.cvv || '');
    const [pais, setPais] = useState(card?.pais || '');

    const handleChange = (ev) => {
        let value = ev.target.value;

        value = value.replace(/\D/g, '');

        // Add the slash after the second digit
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }

        // Limit the length to 5 characters (MM/AA)
        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        setFechaVencimiento(value);
    }

    const handleFormat = (ev) => {
        let value = ev.target.value;

        value = value.replace(/\D/g, '');

        // Add - after the fourt digit
        if (value.length > 4) {
            value = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12, 16);
        }

        // Limit the length to 16 characters
        if (value.length > 19) {
            value = value.slice(0, 19);
        }

        setNumero(value)
    }

    return (
        <form onSubmit={ev => onSubmit(ev, {nombrePropietario, numero, fechaVencimiento, cvv, pais,})}
            className="mt-8 max-w-2xl mx-auto">

            <div className="grow flex flex-col">
                <label className="font-semibold text-sm">Nombre del propietario</label>
                <input
                    className="input"
                    type="text"
                    placeholder="ej. Juán López"
                    value={nombrePropietario}
                    onChange={ev => setNombrePropietario(ev.target.value)}/>

                <label className="font-semibold text-sm">Número de tarjeta</label>
                <input
                    className="input"
                    type="text"
                    placeholder="0000-0000-0000-0000"
                    maxLength="19"
                    value={numero}
                    onChange={handleFormat}/>

                <div className="grid grid-cols-2 gap-8 mt-2">
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Fecha de vencimiento</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="MM/AA"
                            maxLength="5"
                            autoComplete="off"
                            value={fechaVencimiento}
                            onChange={handleChange}/>   
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Código de seguridad</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="***"
                            maxLength="3"
                            autoComplete="off"
                            value={cvv}
                            onChange={ev => setCvv(ev.target.value)}/>   
                    </div>
                </div>

                <label className="font-semibold text-sm">Pais</label>
                <input
                    className="input"
                    type="text"
                    placeholder="ej. México"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}/>

                <button
                    className="border border-gray shadow-md mt-4"
                    type="submit"
                >
                    Guardar
                </button>   
            </div>
        </form>
    )
}