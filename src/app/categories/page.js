'use client'
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { UseProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage(){

    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([]);
    const {loading:profileLoading, data:profileData} = UseProfile();
    const [editedCategory, setEditedCategory] = useState(null)

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = {name:categoryName};

            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);

            if (response.ok) {
                resolve()
            }

            else {
                reject()
            }
        });

        await toast.promise(creationPromise, {
            loading: editedCategory
                        ? 'Actualizando categoría...'
                        : 'Creando nueva categoría...',
            success: editedCategory
                        ? 'Categoría actualizada'
                        : 'Categoría creada',
            error: 'Error'
        });
    }

    if (profileLoading) {
        return 'Cargando información de usuario...'
    }

    if (!profileData.admin) {
        return 'No eres administrador.'
    }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="flex flex-col grow">
                        <label className="text-sm font-semibold">
                            {editedCategory ? 'Actualizar categoría' : 'Agregar categoría'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text" className="rounded-md bg-gray py-2 px-4 my-2" value={categoryName} placeholder="Nombre de la categoría" onChange={ev => setCategoryName(ev.target.value)}></input>
                    </div>

                    <div className="pb-2">
                        <button className="border bg-yellow" type="submit">
                            {editedCategory ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </div>
            </form>

            <div>
                <h2 className="mt-8 mb-2 font-semibold text-sm">Editar categoría:</h2>
                {categories?.length > 0 && categories.map(c => (
                    <button onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name)
                        }}
                        className="bg-gray border-semiGray shadow-md rounded-md p-2 px-4 flex gap-1 cursor-pointer mb-2">
                        <span className="text-sm font-normal text-black">{c.name}</span>
                    </button>
                ))}
            </div>
        </section>
    )
}
