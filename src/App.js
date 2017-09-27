import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'node-uuid';
import color from 'color';
import { Pie, HorizontalBar } from 'react-chartjs-2';

import Form from './Form';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    data:  (localStorage['data'] && JSON.parse(localStorage['data'])) || [],
    newMember: {
      name: '',
      fixedShare: 0,
      memberCash: 0,
      investorCash: 0,
      hourlyRate: 0,
      startDate: '',
      vestedDate: '',
      hours: 0
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if(!this.validateInput(this.state.newMember)) return;

    const newMember = {...this.state.newMember, id: uuid()};
    this.setState({data: this.state.data.concat(newMember)}, () => {
      this.setState({newMember: { 
        name: '', fixedShare: 0, memberCash: 0, 
        investorCash: 0, hourlyRate: 0,
        startDate: '', vestedDate: '', hours: 0
      }});
      this.updateLocalStorage();
    });
  }

  componentDidMount() {
    localStorage.clear()
    if(typeof Storage !== undefined) {
      if(!localStorage.data) {
        localStorage['data'] = JSON.stringify(this.state.data);
      } else {
       console.log("%cApp will not remember data created as LocalStorage Is Not Available", 
       "color: hotpink; background: #333; font-size: x-large;font-family: Courier;");
      }
    }
  }

  updateLocalStorage() {
    if(typeof Storage !== undefined) {
      localStorage['data']  = JSON.stringify(this.state.data);
    }
  }

  validateInput (values) {
    const regex  = /^[0-9]+(\.[0-9]*)?$/;

    return {
      fixedShare: regex.test(values['fixedShare']),
      memberCash: regex.test(values['memberCash']),
      investorCash: regex.test(values['investorCash']),
      hourlyRate: regex.test(values['hourlyRate']),
      hours: regex.test(values['hours']),
      startDate: /\d{4}-\d{2}-\d{2}$/.test(values['startDate']),
      vestedDate: /\d{4}-\d{2}-\d{2}$/.test(values['vestedDate'])
    }
  }

  handleOnChange = ({target: { name, value }}) => {
    this.setState({newMember: {...this.state.newMember, [name]: value }})
  }

  getTotalShare() {
    return this.state.data.reduce((acc, {totalShare}) => acc + parseFloat(totalShare), 0);
  }

  getTotalValue () {
    return this.state.data.reduce((acc, {hourlyRate, hours, memberCash}) =>  acc + parseFloat(hourlyRate * hours + (memberCash * 4)), 0).toFixed(2);
  }

  getTotalFixedShare() {
    return this.state.data.reduce((acc, {fixedShare}) => acc + parseFloat(fixedShare), 0);
  }

  getTotalNonCash() {
    return this.state.data.reduce((acc, {nonCash}) => acc + parseFloat(nonCash), 0).toFixed(2);
  }

  getTotalHourlyRate() {
    return this.state.data.reduce((acc, {hourlyRate}) => acc + parseFloat(hourlyRate), 0).toFixed(2);
  }

  getTotalVariableShare() {
    return this.state.data.reduce((acc, {variableShare}) => acc + parseFloat(variableShare), 0).toFixed(2)
  }

  getTotalHours() {
    return this.state.data.reduce((acc, {hours}) => acc + parseFloat(hours), 0).toFixed(2)
  }

  getTotalMemberCash() {
    return this.state.data.reduce((acc, {memberCash}) => acc + parseFloat(memberCash), 0)
  }

  getTotalDays() {
    return this.state.data.reduce((acc, {days}) => acc + days, 0);
  }

  getTotalInvestorCash() {
    return this.state.data.reduce((acc, {investorCash}) => acc + parseFloat(investorCash), 0)
  }

  updateMembershipRecord = (member) => {
    let { hours, hourlyRate, memberCash, fixedShare, startDate } = member;
    let nonCash = hourlyRate * hours;
    let value = nonCash + (memberCash * 4);
    let variableShare = value / this.getTotalValue() * (1 - this.getTotalFixedShare()/100) * 100;
    let today = moment(new Date(), 'YYYY-MM-DD');
    let start = moment(startDate);
    let totalShare = (variableShare + parseFloat(fixedShare)).toFixed(2);

    member['nonCash'] = nonCash.toFixed(2);
    member['value'] = value.toFixed(2);
    member['totalShare'] = totalShare;
    member['shares'] = (totalShare * 100).toFixed(0);
    member['variableShare'] = parseFloat(variableShare).toFixed(2);
    member['days'] = today.diff(start, 'days');

    return member;
  }

  calculateResult = () => {
    const result = this.state.data.map(this.updateMembershipRecord);
    this.setState({data: result}, () => this.updateLocalStorage());
  }

  renderHead() {
    return (
      <tr className="text-center">
        <th>Name</th>
        <th>Total Share %</th>
        <th># Shares</th>
        <th>$ Value</th>
        <th>% Fixed Share</th>
        <th>% Variable Share</th>
        <th>$ Member Cash</th>
        <th>$ Investor Cash</th>
        <th>$ Non Cash</th>
        <th>$ Hourly Rate</th>
        <th>State Date</th>
        <th>Vested Date</th>
        <th>Days</th>
        <th>Hours</th>
      </tr>
    )
  }

  renderBody = () => {
    return this.state.data.map((member) => <tr key={member.id}>
      <td>{member.name}</td>
      <td>{member.totalShare || 0}</td>
      <td>{member.shares || 0}</td>
      <td>${member.value || 0}</td>
      <td>{member.fixedShare || 0}%</td>
      <td>{member.variableShare || 0}%</td>      
      <td>{member.memberCash || 0}</td>
      <td>{member.investorCash}</td>
      <td>{member.nonCash || 0}</td>
      <td>${member.hourlyRate}</td>
      <td>{member.startDate}</td>
      <td>{member.vestedDate}</td>
      <td>{member.days || 0}</td>
      <td>{member.hours || 0}</td>
    </tr>)
  }

  renderTotal () {
    return (
      <tr style={{fontWeight: 'bold'}}>
        <td>Total</td>
        <td>{Math.round(this.getTotalShare())}%</td>
        <td>{Math.round(this.getTotalShare()) * 100}</td>
        <td>{this.getTotalValue()}</td>
        <td>{this.getTotalFixedShare()}%</td>
        <td>{this.getTotalVariableShare()}%</td>
        <td>{this.getTotalMemberCash()}</td>
        <td>{this.getTotalInvestorCash()}</td>
        <td>{this.getTotalNonCash()}</td>
        <td>{this.getTotalHourlyRate()}</td>
        <td></td>
        <td></td>
        <td>{this.getTotalDays()}</td>
        <td>{this.getTotalHours()}</td>
      </tr>
    )
  }

  equitySpit = () => {
    return this.state.data.map(({totalShare}) => parseFloat(totalShare))
  }

  labels = () => {
    return this.state.data.map(({ name })=> name);
  }

  backgroundColor() {
    return this.state.data.map((_, i) => color.hsl(60 * i, 60 * i, 60).toString())
  }

  render() {
    const errors = this.validateInput(this.state.newMember);
    const isDisabled = Object.keys(errors).some(i => errors[i] === false);

    const chartData = {
      labels: this.labels(),
      datasets: [{
        label: 'Equity Split',
        data: this.equitySpit(),
        backgroundColor: this.backgroundColor(),
      }]
    };

    return (
      <div className="container">
        <div className="text-center well">
          <h2>Welcome to Equity Split Calculator</h2>
        </div>
        <Form 
          value={this.state.newMember} 
          handleOnSubmit={this.handleOnSubmit} 
          handleOnChange={this.handleOnChange}
          errors={errors}
          isDisabled={isDisabled}
        />
        <table className="table table-striped table-bordered table-responsive">
          <thead>
            {this.renderHead()}
          </thead>
          <tbody>
            {this.renderBody()}
            {(this.getTotalShare())? this.renderTotal(): null}
          </tbody>
        </table>
        <button type="submit" className="btn btn-warning btn-lg" onClick={this.calculateResult}>Calculate</button>
        <Pie data={chartData} width={800} />
        <HorizontalBar data={chartData} width={800} />
      </div>
    );
  }
}

export default App;