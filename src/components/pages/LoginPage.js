import React, {useState} from 'react'
import {Link, useHistory,} from 'react-router-dom'

import '../../App.css'
import axios from "axios";

export default function SignInPage() {

    const history = useHistory();

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        const requestBody = {
            username: event.target.elements.customerid.value,
            password: event.target.elements.password.value
        };

        axios.post('http://103.226.250.25:8079/authentication/v1/login', requestBody)
            .then(response => (
                history.push( {
                    pathname: "/home",
                    state: [response.data, requestBody]
                })
            ));

    };

    return (
        <div className="text-center m-5-auto">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Mã số thuế</label><br/>
                    <input type="text" name="customerid" required />
                </p>
                <p>
                    <label>Mật khẩu</label>
                    <Link to="/forget-password"><label className="right-label">Cấp lại mật khẩu</label></Link>
                    <br/>
                    <input type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Đăng nhập</button>
                </p>
            </form>
            <footer>
                <p>Hoặc bạn cần - <Link to="/register">Đăng ký tài khoản doanh nghiệp</Link></p>
                <p><Link to="/">Trở về trang chủ</Link></p>
            </footer>
        </div>
    )
}


