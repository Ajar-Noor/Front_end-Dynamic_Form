import React, { useState } from 'react'

const Players = () => {
  const [Players, setPlayers] = useState([{
    FirstName: '', LastName: '',
    BirthDate: '', Age: '',
    Address: '', PhoneNo: '',
    errors: {}
  }])

  const addForm = () => {
    const values = [...Players]
    values.push({
      FirstName: '', LastName: '',
      BirthDate: '', Age: '',
      Address: '', PhoneNo: ''
    })

    setPlayers((prevPlayers) => [...prevPlayers, values])
  };

  const handleInput = (formindex, field, value) => {
    const values = [...Players]
    values[formindex][field] = value;
    values[formindex].errors = validateForm(values[formindex])
    setPlayers(values)
  }

  const removeForm = (index) => {
    const values = [...Players]
    values.splice(index, 1)
    setPlayers(values)
  }

  // useEffect(() => {
  //   console.log(Players)
  // }, [Players])

  const validateForm = (value) => {
    const errors = {};
    const regex = /^0[0-9]{3}-[0-9]{7}$/;
    if (!value.FirstName) {
      errors.FirstName = 'First Name is required!'
    }
    if (!value.LastName) {
      errors.LastName = 'Last Name is required!'
    }
    if (!value.BirthDate) {
      errors.BirthDate = 'BirthDate is required!'
    }
    if (!(value.Age > 18)) {
      errors.Age = 'Your Age must be greater than 18!'
    }
    if (!value.Address) {
      errors.Address = 'Residential Address is required!'
    }
    if (!value.PhoneNo) {
      errors.PhoneNo = 'Phone No is required!';
    } else if (!regex.test(value.PhoneNo)) {
      errors.PhoneNo = 'Invalid Phone No';
    }
    return errors;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const updatedPlayers = Players.map((value) => {
      return {
        ...value,
        errors: validateForm(value)
      };
    });
    setPlayers(updatedPlayers);

    const hasValidationErrors = updatedPlayers.some(
      (player) => Object.keys(player.errors).length > 0
    );

    if (!hasValidationErrors) {
      alert('Form is submitted');
    } else {
      alert('There are Validation errors.');
    }

  }

  return (
    <>
      <div>

        <div>
          <form onSubmit={handleOnSubmit}>

            {Players.length > 0 && (
              <div>
                {Players.map((field, index) => (
                  <div key={index} className='h-[550px] w-[800px] bg-[#fafafa] rounded-2xl mx-auto my-[80px]  px-[100px] py-[50px] drop-shadow-md'>
                    <div>
                      <h1 className='justify-center content-center grid text-4xl pb-6 font-bold'>Player: {index + 1}</h1>
                    </div>
                    <div className='flex gap-5 ml-[40px]'>
                      <div>
                        <label htmlFor='firstname' className='text-[#575757] ml-3 flex'>First Name</label>
                        <input type='text' id='1' value={field.FirstName} placeholder='First Name...' className='border-2 box-border p-3 border-[#575757] drop-shadow-md rounded-3xl h-[40px] w-[250px]' onChange={(e) => handleInput(index, 'FirstName', e.target.value)}></input>
                        {field.errors && field.errors.FirstName && (<p className='text-[red]'>{field.errors.FirstName}</p>)}
                      </div>

                      <div>
                        <label htmlFor='lastname' className='text-[#575757] ml-3 mt-2.5'>Last Name</label>
                        <input type='text' id='2' value={field.LastName} placeholder='Last Name...' className='border-2 box-border p-3  border-[#575757] drop-shadow-md rounded-3xl h-[40px] w-[250px]' onChange={(e) => handleInput(index, 'LastName', e.target.value)}></input>
                        {field.errors && field.errors.LastName && (<p className='text-[red]'>{field.errors.LastName}</p>)}
                      </div>
                    </div>
                    <br></br>
                    <div className='flex gap-5 ml-[40px]'>
                      <div>
                        <label htmlFor='BirthDate' className='text-[#575757] ml-3 flex'>Date of Birth</label>
                        <input type='date' id='1' value={field.BirthDate} className='border-2 box-border p-3  border-[#575757] drop-shadow-md rounded-3xl h-[40px] w-[250px]' onChange={(e) => handleInput(index, 'BirthDate', e.target.value)}></input>
                        {field.errors && field.errors.BirthDate && (<p className='text-[red]'>{field.errors.BirthDate}</p>)}
                      </div>

                      <div>
                        <label htmlFor='age' className='text-[#575757] ml-3 mt-2.5'>Age</label>
                        <input type='number' id='2' value={field.Age} placeholder='Enter your Age...' className='border-2 box-border p-3  border-[#575757] drop-shadow-md rounded-3xl h-[40px] w-[250px]' onChange={(e) => handleInput(index, 'Age', parseInt(e.target.value))}></input>
                        {field.errors && field.errors.Age && (<p className='text-[red]'>{field.errors.Age}</p>)}
                      </div>
                    </div>

                    <br></br>

                    <div className='flex gap-5 ml-[40px]'>
                      <div>
                        <label htmlFor='Address' className='text-[#575757] ml-3 flex'>Addresss</label>
                        <input type='text' id='1' value={field.Address} placeholder='Enter Your Residential Address...' className='border-2 box-border p-3  border-[#575757] drop-shadow-md rounded-3xl h-[40px] w-[250px]' onChange={(e) => handleInput(index, 'Address', e.target.value)}></input>
                        {field.errors && field.errors.Address && (<p className='text-[red]'>{field.errors.Address}</p>)}
                      </div>

                      <div>
                        <label htmlFor='PhoneNo' className='text-[#575757] ml-3 mt-2.5'>Phone No</label>
                        <input
                          type='text'
                          id='2'
                          value={field.PhoneNo}
                          placeholder='03XZ-YYYYYYY'
                          className='border-2 box-border p-3  border-[#575757] drop-shadow-md rounded-3xl h-[40px] w-[250px]'
                          onChange={(e) => handleInput(index, 'PhoneNo', e.target.value)}
                        />
                        {field.errors && field.errors.PhoneNo && (<p className='text-[red]'>{field.errors.PhoneNo}</p>)}
                      </div>
                    </div>
                    <br></br>
                    <div className='ml-[190px]'>
                      <button type='submit'
                        className='h-[40px] w-[80px] bg-[#b1abb1] rounded-3xl font-normal drop-shadow-md'>
                        Submit
                      </button>
                      <button type='button' className='h-[40px] w-[80px] bg-[#b1abb1] rounded-3xl ml-16 font-normal drop-shadow-md' onClick={addForm}>Next</button>
                    </div>
                    {index > 0 && <button type='button' className='h-[40px] w-[80px] bg-[#b1abb1] rounded-3xl font-normal ml-[260px] mt-4 drop-shadow-md' onClick={removeForm}>Remove</button>}
                  </div>
                ))}
              </div>
            )}

          </form>

        </div>

      </div>
    </>
  )
}

export default Players
