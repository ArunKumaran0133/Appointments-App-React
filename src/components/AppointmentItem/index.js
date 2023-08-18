import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleStar} = props
  const {id, date, tittle, isStared} = eachAppointment

  const imgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const isClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="item-container">
      <div className="heading-star-container">
        <p className="heading">{tittle}</p>
        <button
          type="button"
          className="star-btn"
          onClick={isClickStar}
          data-testid="star"
        >
          <img src={imgUrl} className="star-image" alt="star" />
        </button>
      </div>
      <p className="date-text">Date : {date}</p>
    </li>
  )
}

export default AppointmentItem
