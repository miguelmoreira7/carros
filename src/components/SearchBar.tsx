import { SearchManufacturer } from ".";
import { useState } from 'react';
import { useSearchParams } from "react-router-dom";

const SearchButton = ({extraClasses}: {extraClasses: string}) => (
  <button type="submit" className={`-ml-3 z-0 ${extraClasses}`}>
    <img src="/magnifying-glass.svg" alt="magnifying glass" className="w-10 h-10 object-contain" />
  </button>
)

const SearchBar = () => {

    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(manufacturer === '' && model === '') {
          return alert('Preencha os campos antes de pesquisar')
        }
        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
      if (model) {
        searchParams.set('model', model); 
      } else {
        searchParams.delete('model');
      }
      if (manufacturer) {
        searchParams.set('manufacturer', manufacturer); 
      } else {
        searchParams.delete('manufacturer');
      }
      setSearchParams(searchParams);
    }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
            />
            <SearchButton extraClasses="sm:hidden"/>
        </div>
        <div className="searchbar__item">
          <img src="/model-icon.png" alt="car model" className="absolute w-5 h-5 ml-4"/>
          <input 
          type="text" 
          name="model" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          placeholder="Modelo"
          className="searchbar__input"/>
          <SearchButton extraClasses="sm:hidden"/>
        </div>
        <SearchButton extraClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar