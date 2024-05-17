'use client'
import Image from "next/image";

import MenuItem from "./menu/MenuItem";
import { useEffect, useState } from "react";

export default function TopMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3))
            });
        });
    }, []);

    return(
        <section className="flex border-t border-gray">
            <div className="text-justify">
                <h3 className="font-bold text-2xl my-2 leading-12 ">
                    Lo más popular
                </h3>
                <div className="grid grid-cols-3 gap-4"> 
                    {bestSellers?.length > 0 && bestSellers.map(item => (
                        <MenuItem {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}