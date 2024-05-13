import Image from "next/image";

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
                <div className="gird grid-cols-3 gap-4"> 
                    <div className="bg-babyYellow p-4 rounded-lg text-center" >
                        <img src="" alt="cheetos"/>
                        <h4>Cheetos</h4>
                        <p className="">125gr "Descripcion"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}