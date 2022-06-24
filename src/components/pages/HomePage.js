import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import axios from "axios";
import Select from "react-select";
import AsyncSelect from "react-select/async";

export default function HomePage() {

    const location = useLocation();

    const showData = () => {
        console.log(location.state);
    }
    const [access_token, setAccessToken] = useState("Bearer Token");
    const [balance, setBalance] = useState('Chọn tài khoản để kiểm tra số dư')

    const options = [
        {value: '1008846', label: '1008846'},
        {value: '1008847', label: '1008847'},
    ]

    const [value, setValue] = useState({
        value: 'Danh sách TK ngân hàng', label: 'Danh sách TK ngân hàng'
    });

    const dot = (color = '#F0B90B') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles: StylesConfig<ColourOption> = {
        control: (styles) => ({...styles, backgroundColor: 'white'}),
        option: (styles, {data, isDisabled, isFocused, isSelected}) => {
            const color = '#F0B90B';
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? '#F0B90B'
                        : isFocused
                            ? '#F0B90B'
                            : 'white',
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? 'black'
                        : 'black',
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? '#F0B90B'
                            : '#F0B90B'
                        : '#F0B90B',
                },
            };
        },
        input: (styles) => ({...styles, ...dot()}),
        placeholder: (styles) => ({...styles, ...dot('#ccc')}),
        singleValue: (styles, {data}) => ({...styles, ...dot(data.color)}),
    };

    const handleChange = (option) => {
        if (option['value'] === '1008846') {
            setBalance('10000000')
            setValue({
                value: option['value'], label: option['value']
            })
        } else {
            setBalance('20000000')
            setValue({
                value: option['value'], label: option['value']
            })
        }
    }

    const SelectComponent = () => (
        <Select
            options={options}
            styles={colourStyles}
            value={value}
            onChange={(option) => handleChange(option)}
        />
    )

    const generateAccessToken = (event) => {
        // Prevent page reload
        event.preventDefault();


        const requestBody = {
            username: location.state[0].customer_id,
            password: 'password',
        };

        axios.post('http://103.226.250.25:8078/authentication/v1/authenticate', requestBody)
            .then(response => (
                setAccessToken('Bearer-' + response.data.access_token)
            ));

    };

    return (
        <div className="">
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-4 col-xl-2 px-sm-2 px-0">
                        <div
                            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
                            style={{backgroundColor: '#1C192C'}}>
                            <div className="d-flex ju pb-3 mb-md-0 me-md-auto text-white mt-4"
                                 style={{flexDirection: 'column'}}>
                                <p className="fs-5 d-block">Tài khoản</p>
                                <div className="dropdown pb-4">
                                    <p className="d-none d-sm-inline mx-1 customer-name">{location.state[0].customer_name}</p>
                                </div>
                                <p className="tax-field">Mã số thuế: {location.state[0].customer_id}</p>
                                <p className="tax-field">Tài khoản ngân hàng</p>
                                <SelectComponent/>
                                <p className="tax-field" style={{marginTop: 20}}>Số dư khả dụng</p>
                                <p className="tax-field" style={{color: '#F0B90B'}}>{balance}</p>
                            </div>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu">
                                <li className="nav-item">
                                    <a href="" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i> <span
                                        className="ms-1 d-none d-sm-inline">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#submenu1" data-bs-toggle="collapse"
                                       className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-speedometer2"></i> <span
                                        className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                                    <ul className="collapse show nav flex-column ms-1" id="submenu1"
                                        data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Item</span> 1 </a>
                                        </li>
                                        <li>
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Item</span> 2 </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-table"></i> <span
                                        className="ms-1 d-none d-sm-inline">History</span></a>
                                </li>
                                <li>
                                    <a href="#submenu2" data-bs-toggle="collapse"
                                       className="nav-link px-0 align-middle ">
                                        <i className="fs-4 bi-bootstrap"></i> <span
                                        className="ms-1 d-none d-sm-inline">Settings</span></a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu2"
                                        data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Item</span> 1</a>
                                        </li>
                                        <li>
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Item</span> 2</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#submenu3" data-bs-toggle="collapse"
                                       className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-grid"></i> <span
                                        className="ms-1 d-none d-sm-inline">Products</span> </a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu3"
                                        data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Product</span> 1</a>
                                        </li>
                                        <li>
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Product</span> 2</a>
                                        </li>
                                        <li>
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Product</span> 3</a>
                                        </li>
                                        <li>
                                            <a href="" className="nav-link px-0"> <span
                                                className="d-none d-sm-inline">Product</span> 4</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-people"></i> <span
                                        className="ms-1 d-none d-sm-inline" style={{color: '#F0B90B'}}>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                            <hr></hr>

                        </div>
                    </div>
                    <div className="col py-3">
                        <div className="info-block">
                            <p className="main-title">Thông tin doanh nghiệp</p>
                            <div className="main-info">
                                <div className="info-item">
                                    <p className="info">Mã số thuế</p>
                                    <p className="info">{location.state[0].customer_id}</p>
                                </div>
                                <div className="info-item item-bg-lighter">
                                    <p className="info">Tên doanh nghiệp</p>
                                    <p className="info">{location.state[0].customer_name}</p>
                                </div>
                                <div className="info-item">
                                    <p className="info">Địa chỉ doanh nghiệp</p>
                                    <p className="info">{location.state[0].customer_address}</p>
                                </div>
                                <div className="info-item item-bg-lighter">
                                    <p className="info">Số điện thoại liên hệ</p>
                                    <p className="info">{location.state[0].customer_phone}</p>
                                </div>
                                <div className="info-item">
                                    <p className="info">ERPConnect Public key</p>
                                    <p className="info">{location.state[0].erpconnect_public_key.slice(0, 20)}</p>
                                </div>
                                <div className="info-item item-bg-lighter">
                                    <p className="info">Customer Public key</p>
                                    <p className="info">{location.state[0].customer_public_key}</p>
                                </div>
                                <div className="info-item">
                                    <p className="info">Access Token</p>
                                    <button className="button-access-token" onClick={generateAccessToken}>Cấp lại Access
                                        Token
                                    </button>
                                </div>
                                <div className="info-item">
                                    <div className="token-zone display-linebreak">{access_token}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
