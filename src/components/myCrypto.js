import React from "react";
import Navbar from './Navbar';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios';

class MyCrypto extends React.Component {
    constructor() {
        super()
        this.state = {
            saldo: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(localStorage.getItem('saldo')),
            myCrypto: localStorage.getItem('MyCrypto') ? JSON.parse(localStorage.getItem('MyCrypto')) : []
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <h1 style={{marginTop: '50px'}}>Balance: {this.state.saldo}</h1>
                <ReactTable 
                    data={this.state.myCrypto}
                    columns={[
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            Header: 'Symbol',
                            accessor: 'symbol'
                        },
                        {
                            Header: 'Amount',
                            accessor: 'jumlah'
                        },
                        {
                            Header: 'Action',
                            Cell: (e) => <div><span style={{ cursor: 'pointer' }}>Buy</span> <span style={{ cursor: 'pointer' }}>Sell</span></div>
                        }
                    ]}
                    defaultPageSize={this.state.myCrypto.length > 0 ? this.state.myCrypto.length : 10}
                    className="-striped -highlight"
                    getTrProps={(state, rowInfo) => {
                        return {
                            onClick: (e) => {
                                axios({
                                    method: 'GET',
                                    url: 'https://api.coinmarketcap.com/v2/ticker/' + rowInfo.original.idCrypto +'/?convert=IDR'
                                })
                                .then(function (response) {
                                    localStorage.setItem('cart', JSON.stringify(response.data.data));
                                    window.location = '/transaksi';
                                });
                            }
                        }
                    }}
                />
            </div>
        )
    }
}

export default MyCrypto;