import React from 'react';
import FileUploadChart from './Charts/FileUploadChart';
import PieChart from './Charts/PieChart';
import TopicSearchChart from './Charts/TopicsSearchChart';
import BarChart from './Charts/BarChart'
import './tempAnalytics.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
export default function TempDashboard() {

  return (
    <div className="analytics">
        <div className="first-div">
            <div className="first-inner">
                <h1>Users</h1>
                <div className="users">
                    <div className="table-row">
                        <div className="name">Name</div>
                        <div className="status">Status</div>
                    </div>
                    <div className="table-row">
                        <div className="name">
                            <span><AccountCircleRoundedIcon className="row-icon" /></span>
                            <span>John Doe</span>
                        </div>
                        <div className="status">
                            <span>Inactive</span>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="name">
                            <span><AccountCircleRoundedIcon className="row-icon"/></span>
                            <span>John Doe</span>
                        </div>
                        <div className="status">
                            <span>Active</span>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="name">
                            <span><AccountCircleRoundedIcon className="row-icon"/></span>
                            <span>John Doe</span>
                        </div>
                        <div className="status">
                            <span>Active</span>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="name">
                            <span><AccountCircleRoundedIcon className="row-icon"/></span>
                            <span>John Doe</span>
                        </div>
                        <div className="status">
                            <span>Active</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="first-inner">
                <h1>Type of File Uploaded</h1>
                <FileUploadChart/>
            </div>
        </div>
        <div className="second-div">
            <div className="second-inner">
                <h1>Which Team Uses it</h1>
                <BarChart />
            </div>
            <div className="second-inner">
                <h1>Most Viewed File Type</h1>
                <PieChart/>
            </div>
        </div>
        <div className="third-div">
            <div className="third-inner timer-section">
                <h1 style={{ margin: '20px auto'}}>Time Saved</h1>
                <div style={{ marginBottom: '100px', color: '#3c9295', fontSize: '20px', padding: '20px', lineHeight: '55px'}}>
                    <div className="timer">Saved 100s on 18 November</div>
                    <div className="timer">Saved 34s on day before yesterday</div>
                    <div className="timer">Saved 57s on yesterday</div>
                    <div className="timer">Saved 75s on today</div>
                </div>
            </div>
            <div className="third-inner topic-search">
                <h1>Frequently Searched Topics</h1>
                <TopicSearchChart/>
            </div>
        </div>
    </div>
  );
}
