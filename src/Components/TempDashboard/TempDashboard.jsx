import './tempDashboard.css';
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TagIcon from '@mui/icons-material/Tag';
export default function TempDashboard() {
  return (
    <div className="tempdb-container">
        <aside className="tempdb-left">
            <div className="schedule">
                <h4>Schedule</h4>
                <div className="lines">
                    <div className="line">
                        <div>
                            <h6>9:00 AM</h6> 
                            <div className='txt' style={{ marginLeft: '300px' }}>Meeting with Joe</div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="line">
                        <div>
                            <h6>1:00 PM</h6>
                            <div className='txt' style={{ marginRight: '300px' }}>Assignment with Due</div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="line">
                        <div>
                            <h6>3:00 PM</h6>
                            <div className='txt' style={{ marginLeft: '250px', marginRight: '200px'}}>Meeting with Dan</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="todolist">
                <h4>Todo List</h4>
                <div className="list">
                    <div className="todo">
                        <input type="checkbox" name="1" value="1" />
                        <label htmlFor="1">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="2" value="2" />
                        <label htmlFor="2">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="3" value="3" />
                        <label htmlFor="3">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="4" value="4" />
                        <label htmlFor="4">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    {/* <div className="todo">
                        <input type="checkbox" name="5" value="5" />
                        <label htmlFor="5">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="6" value="6" />
                        <label htmlFor="6">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </aside>
        <aside className="tempdb-right">
            <div className="notification-container">
                <h4>Notifications</h4>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6>Task pending</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>Just Now</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#3c9295', fontSize: '16px' }}>Dan</span> sent you a message</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>1 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#3c9295', fontSize: '16px' }}>Joe</span> sent you a message</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>3 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#3c9295', fontSize: '16px' }}>Dan</span> accepted your request</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>5 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#3c9295', fontSize: '16px' }}>John</span> accepted your request</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>7 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6>Task awaiting</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>8 hr ago</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>
  );
}
