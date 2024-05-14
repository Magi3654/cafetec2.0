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
                        ? 'Updating category...'
                        : 'Creating your new category...',
            success: editedCategory
                        ? 'Category update'
                        : 'Category created',
            error: 'Error, sorry...'
        });
    }

    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not an admin'
    }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="flex flex-col grow">
                        <label className="text-sm font-semibold">
                            {editedCategory ? 'Update category' : 'New Category Name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text" className="rounded-md bg-gray py-2 px-4 my-2" value={categoryName} placeholder="Category name" onChange={ev => setCategoryName(ev.target.value)}></input>
                    </div>

                    <div className="pb-2">
                        <button className="border bg-yellow" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>

            <div>
                <h2 className="mt-8 mb-2 font-semibold text-sm">Edit category:</h2>
                {categories?.length > 0 && categories.map(c => (
                    <button onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name)
                        }}
                        className="bg-gray border-semiGray shadow-md rounded-md p-2 px-4 flex gap-1 cursor-pointer mb-2">
                        <span className="text-sm font-normal text-darkGray">{c.name}</span>
                    </button>
                ))}
            </div>
        </section>
    )
}
