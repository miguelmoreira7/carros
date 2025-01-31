import { CustomnFilterProps } from "../types";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


const CustomFilter = ({title, options}: CustomnFilterProps) => {

  const [selected, setSelected] = useState(options[0]);
  const [searchParams, setSearchParams] = useSearchParams()

  const handleUpdateParams = (e: {title: string, value: string}) => {
    searchParams.set(title, e.value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    handleUpdateParams(selected)
  }, [selected])
  

  return (
    <div className="w-fit">
      <Listbox
      value={selected}
      onChange={(e) => setSelected(e)}>
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <img src="/chevron-up-down.svg" alt="chevron up down" className="w-5 h-5 ml-4 object-contain" />
          </Listbox.Button>
          <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                key = {option.title}
                value={option}
                className={({active}) => `relative cursor-default select-none py-2 px-4
                ${active ? 'bg-primary-blue text-white': 'text-gray-900'}`}
                >
                  {({selected}) => (
                    <span className={`block truncate${selected ? 'font-medium':'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter