'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function UserTabs({isAdmin}){
    const path = usePathname();
    return(
        <div className="tabs">
                <Link 
                className={path === '/profile'? 'active': 'tab'} 
                href={'/profile'}>
                Perfil
                </Link>
                {isAdmin &&(
                    <>
                        <Link href={'/categories'} className = {path === '/categories' ? 'active' : 'tab'}>
                            Categorías
                        </Link>

                        <Link href={'/menu-items'} className = {path.includes('menu-items') ? 'active' : 'tab'}>
                            Productos
                        </Link>

                        <Link href={'/users'} className = {path.includes('/users')  ? 'active' : 'tab'}>
                            Usuarios
                        </Link>
                    </>
                )}
            </div>
    )
}