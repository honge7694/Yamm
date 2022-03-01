import React, {useState} from 'react'
import Camera from '../components/Camera'
import Modal from '../components/Modal'

function capture() {
  
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl">
        <div className="">
            {showModal ?
              <>
                <Modal closeModal={closeModal}/>
                  <div className="text-white bg-main/30 p-2 pd-8 rounded-3xl">
                    <Camera/>
                  </div>
              </>
            :                    
                <div className="text-white bg-main/30 p-2 pd-8 rounded-3xl">
                <Camera/>
              </div>
            }
        </div>

    </div>
  )
}

export default capture