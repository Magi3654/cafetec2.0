'use client'
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { UseProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage(){
    const [newCategoryName, setNewCategoryName] = useState('')
    const {loading:profileLoading, data:profileData} = UseProfile();

    async function handleNewCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name:newCategoryName}),
            });

            if (response.ok) {
                resolve()
            }

            else {
                reject()
            }
        });

        await toast.promise(creationPromise, {
            loading: 'Creating your new category...',
            success: 'Category created',
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
            <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>New Category Name</label>
                        <input type="text" value={newCategoryName} onChange={ev => setNewCategoryName(ev.target.value)}></input>
                    </div>

                    <div className="pb-2">
                        <button className="border bg-yellow" type="submit">Create</button>
                    </div>
                </div>
            </form>
        </section>
    )
}
