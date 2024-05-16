import { useState } from "react";

export default function DeleteButton({label, onDelete}) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div className="font-semibold text-sm text-center">¿Seguro que deseas eliminar el producto?</div>
                    <div className="flex gap-2 mt-2">
                        <button 
                            type="button" 
                            onClick={() => setShowConfirm(false)}
                            className="border border-slate-100 rounded-lg shadow-md text-sm px-3">
                            Cancelar
                        </button>

                        <button 
                            type="button" 
                            onClick={onDelete}
                            className="border border-slate-100 bg-yellow text-white rounded-lg shadow-md text-sm px-3">
                            Sí,&nbsp;eliminar!
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button 
            type="button"
            onClick={() => setShowConfirm(true)} 
            className="border border-slate-100 rounded-lg shadow-md">
            {label}
        </button>
    );
}