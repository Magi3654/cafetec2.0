export default function SectionHeaders({subHeader, mainHeader}) {
    return (
        <>
            <h3 className="uppercase font-bold leading-4">
                {subHeader}
            </h3>

            <h2 className="font-bold text-yellow text-2xl ">
                {mainHeader}
            </h2>
        </>
    );
}