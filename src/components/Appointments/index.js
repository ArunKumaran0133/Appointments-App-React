import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {tittle: '', date: '', appointmentList: [], isFilterActive: false}

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  tittleInput = event => {
    const tittleName = event.target.value
    this.setState({tittle: tittleName})
  }

  onDateInput = event => {
    const dateInput = event.target.value
    this.setState({date: dateInput})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {tittle, date} = this.state
    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    if (tittle.length > 0 && formatDate.length > 0) {
      const newAppointment = {
        id: uuidv4(),
        date: formatDate,
        tittle,
        isStared: false,
      }

      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        tittle: '',
        date: '',
      }))
    }
  }

  getFilteredStar = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStared === true,
      )
    }
    return appointmentList
  }

  render() {
    const {date, tittle, isFilterActive} = this.state
    const isBtnClicked = isFilterActive ? 'button-stared' : 'button-star'

    const filteredList = this.getFilteredAppointmentList()
    return (
      <div className="main-bg-container">
        <div className="appointment-card-container">
          <div className="input-image-container">
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <form
              className="input-main-container"
              onSubmit={this.onAddAppointment}
            >
              <h1 className="heading">Add Appointment</h1>
              <div className="input-container">
                <label htmlFor="title" className="input-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  placeholder="Title"
                  onChange={this.tittleInput}
                  value={tittle}
                  autoComplete="OFF"
                />
              </div>
              <div className="input-container">
                <label htmlFor="date" className="input-label">
                  date
                </label>
                <input
                  type="date"
                  id="date"
                  className="input"
                  onChange={this.onDateInput}
                  value={date}
                />
              </div>
              <div>
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <hr className="hr-line" />
          <div className="appointment-heading-button-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={isBtnClicked}
              onClick={this.getFilteredStar}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
