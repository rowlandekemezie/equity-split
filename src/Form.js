import React from 'react';

export default ({ value, errors, isDisabled, handleOnSubmit, handleOnChange }) => 
  <form className="form-inline" onSubmit={handleOnSubmit} style={{padding: '10px'}}>
    <div className="form-group input-field">
      <label htmlFor="name">Name:</label>
      <input 
        type="name" 
        className={`form-control ${errors.name ? "error": " "}`}
        placeholder="Enter Name" 
        name="name" 
        value={value.name}
        onChange={handleOnChange}
      />
    </div>
    <div className="form-group input-field">
      <label htmlFor="fixedShare">Fixed Share:</label>
      <input 
        type="text" 
        className={`form-control ${!errors.fixedShare? "has-error": " "}`} 
        placeholder="Enter Fixed Share" 
        name="fixedShare"
        value={value.fixedShare}
        onChange={handleOnChange}
      />
    </div>
    <div className="form-group input-field">
      <label htmlFor="memberCash">Member Cash:</label>
      <input 
        type="text" 
        className={`form-control ${!errors.memberCash? "has-error": " "}`} 
        placeholder="Enter Member Cash" 
        name="memberCash"
        value={value.memberCash}
        onChange={handleOnChange}
      />
    </div>
    <div className="form-group input-field">
      <label htmlFor="investorCash">Investor Cash:</label>
      <input 
        type="text" 
        className={`form-control ${!errors.investorCash? "has-error": " "}`} 
        placeholder="Enter Investor Cash"
        name="investorCash"
        value={value.investorCash}
        onChange={handleOnChange}
      />
    </div>
    <div className="form-group input-field">
      <label htmlFor="hourlyRate">Hourly Rate:</label>
      <input 
        type="text"
        className={`form-control ${!errors.hourlyRate? "has-error": " "}`} 
        id="hourlyRate" 
        placeholder="Enter Hourly Rate" 
        name="hourlyRate"
        value={value.hourlyRate}
        onChange={handleOnChange}
      />
    </div>
    <div className="form-group input-field">
      <label htmlFor="startDate">Start Date:</label>
      <input 
        type="date" 
        className={`form-control ${!errors.startDate? "has-error": " "}`} 
        placeholder="Enter Start Date" 
        name="startDate"
        value={value.startDate}
        onChange={handleOnChange}
      />
    </div>
    <div className="form-group input-field">
      <label htmlFor="vestedDate">Vested Date:</label>
      <input 
        type="date" 
        className={`form-control ${!errors.vestedDate? "has-error": " "}`} 
        placeholder="Enter Vested Date" 
        name="vestedDate"
        value={value.vestedDate}
        onChange={handleOnChange}
      />
    </div>
    <div className="form-group input-field">
      <label htmlFor="hours">Hours:</label>
      <input 
        type="hours" 
        className={`form-control ${!errors.hours? "has-error": " "}`} 
        placeholder="Enter Hours" 
        name="hours"
        value={value.hours}
        onChange={handleOnChange}
    />
    </div>
    <button type="submit" disabled={isDisabled} className="btn btn-primary">Submit</button>
  </form>