import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState([]);
  const url = 'https://jsonplaceholder.typicode.com/users/';

  const api = () => {
    Axios.get(url)
      .then((res) => {
        setValue(res.data);
        setSearch(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (e.target.value === '') {
      setValue(search);
    } else {
      setValue(
        search.filter(
          (searchItem) =>
            searchItem.email
              .toLowerCase()
              .includes(
                e.target.value.toLowerCase()
              ) /*---includes return [true or false]*/
        )
      );
    }
  }

  const handleDelete = (e, items) => {
    e.preventDefault();
    const newItems = value.filter((valueItem) => valueItem.id !== items);
    setValue(newItems);
    console.log(value);
    console.log(newItems);
  };

  return (
    <div className='container p-10'>
      <input
        type='text'
        name='search'
        id='search'
        onChange={(event) => handleSearch(event)}
        placeholder='search here'
        className='p-2 border  rounded-md focus:ring focus:ring-offset-1 outline-none ml-[83%]'
      />
      <br />
      <br />
      <table className=' table border text-center w-full  '>
        <thead className='border *:border *:p-2 '>
          <th>Id </th>
          <th>Name</th>
          <th>UserName</th>
          <th>Email</th>
          <th>City</th>
          <th>ZipCode</th>
          <th>Edit Option</th>
        </thead>
        <tbody>
          {value.map((item, index) => (
            <tr key={index} className='border *:border *:p-2 '>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address.city}</td>
              <td>{item.address.zipcode}</td>
              <td>
                <button
                  type='button'
                  className='border px-3 py-2 rounded-full'
                  onClick={(e) => handleDelete(e, item.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
