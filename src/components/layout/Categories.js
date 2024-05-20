'use client'
import { useEffect, useState } from "react";
import Arrow from "../icons/Arrow";
import ChevronRight from "@/components/icons/ChevronRight"
import Link from "next/link";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories));
        });
    }, [])
    

    return (
        <section className="my-3">
            <div className="grid grid-cols-2 items-center">
                <h1 className="font-bold text-2xl my-2 leading-12">Categorías</h1>
                
                <Link href={'/menu'}>
                <div className="flex underline text-sm text-darkGray text-right justify-end items-center">
                    <span>Mirar todas</span>
                    <ChevronRight/>
                </div>
                </Link>
                
            </div>
            <div className="flex mx-auto overflow-x-auto py-2">
                {categories?.length > 0 && categories.map(c => (
                    <Link key={c.name} href={`/menu#${c.name.replace(/\s+/g, '-')}`} className="mx-2">
                        <button className="bg-yellow rounded-full px-2 py-4 mx-2 font-semibold text-sm whitespace-nowrap">
                            <span className="px-1">{c.name}</span>
                        </button>
                    </Link>
                ))}
            </div>
        </section>
    );
}