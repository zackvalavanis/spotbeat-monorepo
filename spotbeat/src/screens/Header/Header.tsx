import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { useLocationCity } from '../../components/Location/location'


export function Header() {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState(false)
  const Location = useLocationCity()




  const handleOpenModal = () => {
    console.log('openingModal')
    setModalVisible(true)
  }


  return (
    <div className="header-container">
      <div className="header-image-container">
        <img src="/logo.png" alt="SpotBeat Logo" onClick={() => navigate('/home')} />
      </div>

      <div className="header-title-container">
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#fcfcfc', border: 'none', outline: 'none', cursor: 'pointer' }}
        >
          <h1>SpotBeat</h1>
        </button>
      </div>

      <div className='location-modal-button-container'>
        <button onClick={handleOpenModal} className='button-open-location-modal'>
          Location: {Location ? Location : 'unknown'}
        </button>
      </div>

      <Modal
        show={modalVisible}
        onClose={() => setModalVisible(false)}>
        Location: {Location ? Location : 'unknown'}
      </Modal>
    </div>
  )
}