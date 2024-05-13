import Image from "next/image";

export default function RegisterPage() {
    return (
        <section className="mt-8">
            <h1 className="text-center text-2xl font-bold my-2">Register</h1>
            <form className="flex flex-col mx-20">
                <input type="email" placeholder="email" className="rounded-md bg-gray py-2 px-4 m-2"></input>
                <input type="password" placeholder="password" className="rounded-md bg-gray py-2 px-4 m-2"></input>
                <button type="submit" className="m-2 py-2 px-4 rounded-md bg-yellow text-white font-semibold text-xl">Register</button>
                <div className="my-4 text-center text-darkGray">or login with provider</div>
                <button className="flex gap-4 justify-center m-2 py-2 px-4 rounded-md border border-darkGray font-semibold text-lg">
                    <Image src={'/google.png'} alt={''} width={24} height={24} className="pt-1"></Image>
                    Login with Google
                </button>
            </form>
        </section>
    );
}