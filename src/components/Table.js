import React from "react";
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends React.Component {
    constructor() {
        super()
        this.state = {
            saldo: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(localStorage.getItem('saldo'))
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e,i) {
        
    }
    render() {
        const { saldo } = this.state;
        return (
            <div>
                <div>
                    Saldo: {saldo}
                </div>
                <ReactTable
                    data={this.props.data}
                    columns={[
                        {
                            Header: 'Rank',
                            accessor: 'rank'
                        },
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            Header: 'Price',
                            accessor: 'quotes.IDR.price'
                        },
                        {
                            Header: 'Percent Change 24H',
                            accessor: 'quotes.IDR.percent_change_24h'
                        },
                        {
                            Header: 'Volume 24H',
                            accessor: 'quotes.IDR.volume_24h'
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
                                // console.log(rowInfo.original);
                                window.location = "/transaksi";
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