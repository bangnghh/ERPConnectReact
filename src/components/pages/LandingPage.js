import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function LandingPage() {
    return (
        <header style={ HeaderStyle }>
            <h1 className="landing-page-title text-center">ERPConnect Admin</h1>
            <p className="main-para text-center">Hệ thống tích hợp kết nối giao dịch đa ngân hàng</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">Đăng nhập</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>Đăng ký </span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    //background: `url(${BackgroundImage})`,
    backgroundColor: "#181625"
}