import React from "react";
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Navbar from './Navbar';

class Table extends React.Component {
    constructor() {
        super()
        this.state = {
            saldo: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(localStorage.getItem('saldo'))
        }
    }
    render() {
        const { saldo } = this.state;
        return (
            <div>
                <Navbar />
                <div className="saldo">
                    <h1>Balance: {saldo}</h1>
                </div>
                <ReactTable
                    data={this.props.data}
                    columns={[
                        {
                            Header: 'Rank',
                            accessor: 'rank',
                            width: 50
                        },
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            Header: 'Symbol',
                            accessor: 'symbol'
                        },
                        {
                            Header: 'Price',
                            accessor: 'quotes.IDR.price'
                        },
                        {
                            Header: 'Total Supply',
                            accessor: 'total_supply'
                        },
                        {
                            Header: '% Change 24H',
                            accessor: 'quotes.IDR.percent_change_24h'
                        },
                        {
                            Header: 'Volume 24H',
                            accessor: 'quotes.IDR.volume_24h'
                        },
                        {
                            Header: 'Action',
                            Cell: (e) => <div><span style={{ cursor: 'pointer' }}>Buy</span></div>
                        }
                    ]}
                    defaultSorted={[
                        {
                            id: "rank",
                            desc: false
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTrProps={(state, rowInfo) => {
                        return {
                            onClick: (e) => {
                                if (rowInfo.original.quotes.IDR.price <= localStorage.getItem('saldo')) {
                                    localStorage.setItem('cart', JSON.stringify(rowInfo.original));
                                    window.location = '/transaksi';
                                } else {
                                    alert('Your balance is not enough');
                                }
                            }
                        }
                    }}
                    />
            </div>
        )
    }
}

Table.propTypes = {
    data: PropTypes.array.isRequired
}

export default Table