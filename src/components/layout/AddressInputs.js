'use client'
import { useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import clsx from 'clsx'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition, Field, Label } from '@headlessui/react'

const people = [
        { id: 1, name: 'Tom Cook' },
        { id: 2, name: 'Wade Cooper' },
        { id: 3, name: 'Tanya Fox' },
        { id: 4, name: 'Arlene Mccoy' },
        { id: 5, name: 'Devon Webb' },
];

export default function AddressInputs({adressProps, setAddressProps}){
        const {phone, streetAddress, postalCode, city,country} = adressProps;
        const [selected, setSelected] = useState(people[0]);
        const [query, setQuery] = useState('');

        const filteredPeople = query === ''
                ? people
                : people.filter((person) => {
                        return person.name.toLowerCase().includes(query.toLowerCase())
                })
    
    return(
        <>
                <Field className="my-2">
                        <Label className="my-2 mx-1 text-sm font-medium">Metodo de pago:</Label>
                        <Combobox value={selected} onChange={(value) => setSelected(value)}>
                                <div className="relative my-1">
                                        <ComboboxInput
                                                className={clsx(
                                                'w-full rounded-lg border-none bg-gray py-1.5 pr-8 pl-3 text-sm/6 text-black',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                                displayValue={(person) => person?.name}
                                                onChange={(event) => setQuery(event.target.value)}
                                        />
                                        <ComboboxButton className="group absolute inset-y-0 -right-32 md:-right-36 lg:-right-40 px-2.5">
                                                <ChevronDownIcon className="size-5 fill-black" />
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
                                                className="w-[var(--input-width)] rounded-xl border border-slate-100 bg-slate-100 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                        >
                                                {filteredPeople.map((person) => (
                                                        <ComboboxOption
                                                                key={person.id}
                                                                value={person}
                                                                className="group flex cursor-default border-b border-slate-200 items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                                        >
                                                                <CheckIcon className="invisible size-4 fill-yellow group-data-[selected]:visible" />
                                                                <div className="text-sm/6 text-black font-medium group-data-[selected]:font-bold">{person.name}</div>
                                                        </ComboboxOption>
                                                ))}
                                        </ComboboxOptions>
                                </Transition>
                        </Combobox>
                </Field>
        </>
    )
}
