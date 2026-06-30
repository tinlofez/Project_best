import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import "../assets/css/present.css";
function Present() {
  const [boxOpened, setBoxOpened] = useState(false)

  return (
    <SectionWrapper>
      <div className='flex flex-col items-center justify-center gap-8'>
        <h1 className={`present-title ${boxOpened ? 'present-title--hidden' : ''}`}>
          Click the box to see your gifts!
        </h1>
      </div>
      <div className="birthday-gift">
        <input
          id='click'
          type='checkbox'
          checked={boxOpened}
          onChange={() => setBoxOpened((prev) => !prev)}
        />
        <label className='gift' htmlFor='click'>
          <div className="gift-top"></div>
          <div className="gift-bottom"></div>
          <div id="raffle-red" className="entry raffle raffle-1">
            <div className="no-scale">
              <span className="ticket-text">Cheesecake</span>
            </div>
          </div>
          <div id="raffle-red" className="entry raffle raffle-2">
            <div className="no-scale">
              <span className="ticket-text">Flowers</span>
            </div>
          </div>
          <div id="raffle-red" className="entry raffle raffle-3">
            <div className="no-scale">
              <span className="ticket-text">Cute<br/>Keychain</span>
            </div>
          </div>
        </label>
      </div>
    </SectionWrapper>
  )
}

export default Present