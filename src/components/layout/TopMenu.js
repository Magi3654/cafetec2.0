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
        <section className="flex border-t my-3 border-gray">
            <div className="text-justify">
                <h3 className="font-bold text-2xl my-3 leading-12 ">
                    Lo más popular
                </h3>
                <div className="grid grid-cols-2 gap-4 my-4"> 
                    {bestSellers?.length > 0 && bestSellers.map(item => (
                        <MenuItem key={item.name} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}