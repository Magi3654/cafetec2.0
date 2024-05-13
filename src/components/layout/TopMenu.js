import Image from "next/image";
import MenuItem from "./menu/MenuItem";

export default function TopMenu(){
    return(
        <section className="">
    
            <div className="text-center">
                <h3 className=" text-brown font-bold text-4xl leading-12 ">
                    Lo mas popular
                </h3>
                <h2 className="text-darkGray font-semibold text-2xl">
                    Elije tu antojo
                </h2>
                <div className="grid grid-cols-3 gap-4"> 
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                </div>
            </div>
        </section>
    )
}