import Image from "next/image";
import MenuItem from "./menu/MenuItem";

export default function TopMenu(){
    return(
        <section className="flex border-t border-gray">
            <div className="text-justify">
                <h3 className="font-bold text-2xl my-2 leading-12 ">
                    Lo más popular
                </h3>
                <div className="grid grid-cols-3 gap-4"> 
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                </div>
            </div>
        </section>
    )
}