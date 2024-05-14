import Image from "next/image";
import Arrow from "../icons/Arrow";

export default function Hero(){
    return(
    
        <section className="mt-4">
            <div className="py-4">
                <h1 className="text-4xl font-semibold leading-16 text-center">
                    Bienvenido a CafeTec
                    </h1>
                <p className="my-6 text-sm text-center">La cafetería siempre a tu alcance, entre clases.</p>
            </div>
            
        </section>
        
    )
}