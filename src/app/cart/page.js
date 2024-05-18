import SectionHeaders from "@/components/layout/SectionHeaders";

export default function CartPage() {
    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            <div className="grid gap-4 grid-cols-2">
                <div>
                    Products
                </div>
                <div>Right</div>
            </div>
        </section>
    );
}