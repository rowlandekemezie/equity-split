import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';


export default ({data}) => 
  <div>
    {console.log(data, 'what is data here')}
    <Pie data={data} />
  </div>