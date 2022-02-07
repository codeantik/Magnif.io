import discord from '../../images/discord.svg'
import slack from '../../images/slack.svg'
import './Chat.css'

export default function Chat() {
  return (
    <div className="chatbox-container">
      <div className="chatbox-normal">
        <div className="chatbox-normal-body">
          <div className="chatbox-normal-text">
            <p>This is the chat text</p>
          </div>
        </div>
        <div className="chatbox-normal-detail">
            <span style={{ color: 'gray'}}>3:30 am</span>
            <img src={discord} alt="app" height="30" width="30" />
          </div>
      </div>
      <div className="chatbox-email">
        <div className="chatbox-email-subject">Subject: Something Important</div>
        <hr />
        <div className="chatbox-email-body">
          <p>Dear sir, </p>
          <p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
          <p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
          <p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
          <p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
          <p> lorem ipsum</p><br></br>
          <p>Regards,</p>
          <p>John Doe</p>
        </div>
      </div>
    </div>
  )
}