'use client'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition, Field, Label } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, CreditCardIcon } from "@heroicons/react/20/solid"
import { UseProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import clsx from 'clsx'

export default function AddressInputs({adressProps, setAddressProps, selectedCard, setSelectedCard}) {
        // const {phone, streetAddress, postalCode, city,country} = adressProps;
        const [selected, setSelected] = useState(null);
        const [cards, setCards] = useState([]);
        const [query, setQuery] = useState('');
        const {loading, data} = UseProfile();

        console.log(cards);
        console.log(selected);

        useEffect(() => {
                fetch('/api/payment').then(res => {
                res.json().then(cards => {
                        setCards(cards);
                });
                })
        }, [])

        const filteredCards = query === '' 
        ? cards 
        : cards.filter((card) => card.nombrePropietario.toLowerCase().includes(query.toLowerCase()));

    return(
        <>
                <Field className="my-2">
                        <Label className="my-3 mx-1 text-sm font-semibold">Método de pago:</Label>
                        <Combobox value={selectedCard} onChange={setSelectedCard}>
                                <div className="relative my-2 mb-4">
                                        <CreditCardIcon className='group absolute inset-y-2 left-4 size-5 fill-black'/>
                                        <ComboboxInput
                                                className={clsx(
                                                'w-full rounded-lg bg-gray py-1.5 pr-8 pl-12 text-md text-black',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                                displayValue={(card) => card?.nombrePropietario || ''}
                                                onChange={(event) => setQuery(event.target.value)}
                                        />
                                        <ComboboxButton className="group absolute inset-y-0 left-1 justify-end">
                                                <ChevronDownIcon className="size-6 fill-black" />
                                        </ComboboxButton>
                                </div>
                                <Transition
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setQuery('')}
                                >

                                        <ComboboxOptions
                                                anchor="bottom"
                                                className="w-[var(--input-width)] rounded-xl bg-slate-100 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                        >
                                                {filteredCards.length === 0 && query !== '' ? (
                                                        <div key="no-results" className='text-md font-medium'> 
                                                                Sin resultados
                                                        </div>
                                                ) : (
                                                        filteredCards.map((card) => (
                                                                <ComboboxOption
                                                                        key={card.id}
                                                                        value={card}
                                                                        className={({active}) =>
                                                                                `cursor-default border-b border-slate-200 select-none relative py-2 pl-10 pr-4 ${
                                                                                        active ? 'text-black font-semibold ' : 'text-black'
                                                                                }`
                                                                        }
                                                                >
                                                                        {({selected, active}) => (
                                                                                <>
                                                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                                {card.nombrePropietario}
                                                                                        </span>

                                                                                        {selected && (
                                                                                                <span  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                                                        active ? 'text-yellow' : 'text-white'}`}
                                                                                                >
                                                                                                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                                                                                </span>
                                                                                        )}
                                                                                </>
                                                                        )}
                                                                </ComboboxOption>
                                                        ))
                                                )}
                                        </ComboboxOptions>
                                </Transition>
                        </Combobox>
                </Field>
        </>
    )
}
