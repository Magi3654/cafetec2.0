import Image from "next/image";
import Arrow from "../icons/arrow";

export default function Hero(){
    return(
    
        <section className=" mt-4 ">
            <div className="py-4">
                <h1 className="text-4xl font-semibold leading-16 text-center">
                    Bienvenido a cafetec
                    </h1>
                <p className="my-6 text-sm text-center">La cafeta siempre a tu alcance, entre clases</p>
            </div>
            <div className=" relative">
                <Image src={'/logo.png'} layout= {'fill'} objectFit={'contain'} alt={'logo'}/>
            </div>
            <div className="flex items-center ml-32">
                <button className="bg-yellow flex items-center gap-2 text-white px-4 py-2 rounded-full">
                    Ordena
                    <Arrow/>
                </button>
            </div>
        </section>
        
    )
}