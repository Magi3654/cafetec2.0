import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link, setLink}){

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link);
                    })
                }
                throw new Error('Ups algo salio mal');
            });
            
            await toast.promise(uploadPromise, {
                uploading: 'Cargando...',
                success: 'Carga completa',
                error: 'error',
            });
        }
    }
    return(
        <>
        {link && (
            <Image className="rounded-lg w-full h-full" src={link} width={250} height={250} alt={'avatar'}/>
        )}
        {!link && (
            <div className="bg-babyYellow p-4 text-brown rounded-lg mb-1">
                no image
            </div>
        )
        }
        </>
    )
}