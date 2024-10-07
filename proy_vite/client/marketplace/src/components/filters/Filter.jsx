import { useState } from 'react'
import './Filter.css'

const Filter = ()=>{
    const[selectedTeam, setSelectedTeam] = useState("team");
    const[selectedSize, setSelectedSize] = useState(null);
    const[priceRange, setPriceRange] = useState(0);
    const[selectedTypes, setSelectedTypes] = useState({
        Local:false,
        Visitante:false,
        Tercera:false,
        Arquero:false,
        Retro:false
    })

    const clearFilters = ()=>{
        setSelectedTeam("team");
        setSelectedSize(null);
        setPriceRange(0);
        setSelectedTypes({
            Local:false,
            Visitante:false,
            Tercera:false,
            Arquero:false,
            Retro:false
        })
        console.log(selectedTypes);
    }

    return(
        <>
            <h2>Filtros</h2>
            <div>
                <h3>Equipo</h3>
                <select name="select-team" id="select-team" value={selectedTeam} onChange={(e)=>setSelectedTeam(e.target.value)}>
                    <option value="team">Seleccione un equipo</option>
                    <option value="boca">Boca</option>
                    <option value="river">River</option>
                    <option value="velez">Velez</option>
                </select>
            </div>
            <div>
                <h3>Talle</h3>
                <div>
                    {["S", "M", "L", "XL", "XXL"].map((size)=>(
                        <button key={size} onClick={(e)=>setSelectedSize(size)}>{size}</button>
                    ))}
                </div>
            </div>
            <div>
                <h3>Precio</h3>
                <input type="range" min="0" max="1000000" onChange={(e)=>setPriceRange(e.target.value)}/>
                <span>${priceRange}</span>
            </div>
            <div>
                <h3>Tipo</h3>
                {["Local", "Visitante", "Tercera", "Arquero", "Retro"].map((type)=>(
                    <div key={type} class="checkbox-container">
                        <input type="checkbox" checked={selectedTypes[type]} onChange={(e)=>setSelectedTypes({...selectedTypes, [type]:e.target.checked})}/>
                        <label htmlFor="">{type}</label>
                    </div>
                ))}
            </div>
            <button onClick={console.log(selectedTeam)}>Aplicar filtros</button>
            <button onClick={clearFilters}>Limpiar filtros</button>
        </>
    );
}

export default Filter;