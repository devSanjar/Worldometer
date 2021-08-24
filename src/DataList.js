import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DataList () {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  // const [select, setSelect] = useState('')
  const [filteredCount, setFilteredCount] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((res) => {
        setCountries(res.data)
      })
  }, [])

  useEffect(() => {
    setFilteredCount(
      countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()))
    )
    // setFilteredCount(
    //   countries.filter((country) => country.name === select)
    // )
    // const selected = countries.filter((country) => country.name === select)
    // if (selected) {
    //   // setFilteredCount(selected)
    // }


  }, [search, countries,]);

  console.log('filteredCount', filteredCount);
  // console.log('select', select);

  const clearAll = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  return (
    <div className="container">
      <form>
        <h1>Worl<span style={{ color: '#4caf21' }}>O</span>meter</h1>
        <div className="row">
          <h1>{filteredCount.name}</h1>
          <div className="col-4">
            <div className="input-group mb-3">
              <input className='form-control' type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />

              <select value={search} onChange={(e) => setSearch(e.target.value)} className="form-select" id="inputGroupSelect01">
                <option defaultValue >Choose...</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Vanuatu">Vanuatu</option>
              </select>
            </div>

          </div>
        </div>

        <div className="row">
          {filteredCount.map((item, index) => (
            <div className="col-3" key={index}>
              <div className="card shadow-lg my-2" style={{ width: '18rem' }} >
                <img src={item.flag} alt={item.name} className="card-img-top shadow-sm" />
                <div className="card-body shadow-sm" >
                  <h2 className="card-title" style={{ textShadow: '0 0 3px #ff0000' }}>{item.name}</h2>
                  <h3 className="card-text" style={{ color: '#6c757d' }}>{item.capital}</h3>
                </div>
                {search.length > 0 ? <button onClick={clearAll} className='btn btn-outline-danger py-3 mt-3'>CLEAR</button> : ''}
              </div>
            </div>
          ))}
        </div>



        {/* 
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col-1">#</th>
              <th scope="col-2">Country</th>
              <th scope="col">Capital</th>
              <th scope="col">Location</th>
              <th scope="col">Flag</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {filteredCount.map((item, index) => (
            <tbody key={index}>
              <tr>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.capital}</td>
                <td>{item.region}</td>
                <td><img style={{ width: '30%' }} /></td>
                <td>
                  {search.length > 0 ? <button onClick={clearAll} className='btn btn-outline-warning '>CLEAR</button> : ''}
                </td>
              </tr>
            </tbody>
          ))}
        </table> */}

      </form>
    </div>
  )
}


export default DataList