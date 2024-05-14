'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function UserTabs({isAdmin}){
     const path = usePathname();
    return(
        <div className="flex mx-auto gap-2 tabs justify-center">
                <Link 
                className={path === '/profile'? 'active':''} 
                href={'/profile'}>
                Perfil
                </Link>
                {isAdmin &&(
                    <>
                        <Link 
                        href={'/categories'}
                        className={path === '/categories'? 'active':''}
                        >
                        Categorias
                        </Link>
                        <Link 
                        href={'/menu-items'}
                        className={path === '/menu-items'? 'active':''}
                        >
                        Carga de Alimentos
                        </Link>
                        <Link 
                        href={'/users'}
                        className={path === '/users'? 'active':''}
                        >
                        Usuarios
                        </Link>
                    </>
                )}
            </div>
    )
}