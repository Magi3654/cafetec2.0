'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/layout/menu/MenuItem";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function MenuPage() {
    
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories));
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        });
    }, [])

    useEffect(() => {
        if (categories.length > 0 && menuItems.length > 0) {
            setIsLoaded(true);
        }
    }, [categories, menuItems]);

    useEffect(() => {
        if (isLoaded) {
            const hash = window.location.hash;
            if (hash) {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [isLoaded]);

    return (
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}>
                    <div id={c.name.replace(/\s+/g, '-')} className="text-center ">
                        <SectionHeaders mainHeader={c.name} />
                    </div>
                    <div className="grid grid-flow-col gap-4 mt-6 mb-10">
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <MenuItem key={item._id} {...item}/>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}