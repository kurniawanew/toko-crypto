import React from "react";
import Navbar from './Navbar';

class Transaction extends React.Component {
    constructor() {
        super();
        var cart = JSON.parse(localStorage.getItem('cart'));
        this.state = {
            cart: cart,
            harga: cart.quotes.IDR.price,
            hargaBeli: cart.quotes.IDR.price,
            jumlahBeli: 1,
            hargaJual:0,
            jumlahJual: 0,
            saldo: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(localStorage.getItem('saldo')),
            myOwn: this.myCryptoCheck(cart)
        };
        this.handleSubmitBuy = this.handleSubmitBuy.bind(this);
        this.handleChangeJumlah = this.handleChangeJumlah.bind(this);
        this.handleChangeHarga = this.handleChangeHarga.bind(this);
        this.handleSubmitSell = this.handleSubmitSell.bind(this);
        this.handleChangeJual = this.handleChangeJual.bind(this);
        this.myCryptoCheck = this.myCryptoCheck.bind(this);
    }
    handleSubmitBuy(e) {
        e.preventDefault();
        if (localStorage.getItem('saldo') >= this.state.hargaBeli) {
            var myCrypto = localStorage.getItem('MyCrypto') ? JSON.parse(localStorage.getItem('MyCrypto')) : [];
            var is_has = false;
            for (let i = 0; i < myCrypto.length; i++) {
                if (myCrypto[i].idCrypto === this.state.cart.id) {
                    myCrypto[i].jumlah = parseFloat(myCrypto[i].jumlah) + parseFloat(this.state.jumlahBeli);
                    is_has = true;
                    break;
                }                
            }
            if (!is_has) {
                myCrypto.push({
                    name: this.state.cart.name,
                    symbol: this.state.cart.symbol,
                    idCrypto: this.state.cart.id,
                    jumlah: parseFloat(this.state.jumlahBeli)
                });
            }
            localStorage.setItem('MyCrypto', JSON.stringify(myCrypto));

            var sisaSaldo = localStorage.getItem('saldo') - this.state.hargaBeli;
            localStorage.setItem('saldo', sisaSaldo);
            this.setState({
                saldo: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sisaSaldo)
            })
            window.location = '/mycrypto';
        } else {
            alert('Your balance is not enough!');
        }
    }
    handleChangeJumlah(e) {
        this.setState({
            jumlahBeli: e.target.value,
            hargaBeli: this.state.harga * e.target.value
        });
    }
    handleChangeHarga(e) {
        this.setState({
            hargaBeli: e.target.value,
            jumlahBeli: e.target.value / this.state.harga
        });
    }
    myCryptoCheck(cart) {
        var myCryp = localStorage.getItem('MyCrypto') ? JSON.parse(localStorage.getItem('MyCrypto')) : [];
        var myOwn = false;
        for (let j = 0; j < myCryp.length; j++) {
            if (cart.id === myCryp[j].idCrypto) {
                myOwn = myCryp[j];
                break;
            }            
        }
        return myOwn;
    }
    handleSubmitSell(e) {
        e.preventDefault();
        var saldoNow = parseFloat(localStorage.getItem('saldo')) + (parseFloat(this.state.jumlahJual) * parseFloat(this.state.cart.quotes.IDR.price));
        localStorage.setItem('saldo', saldoNow);
        var myCrypto = localStorage.getItem('MyCrypto') ? JSON.parse(localStorage.getItem('MyCrypto')) : [];
        for (let i = 0; i < myCrypto.length; i++) {
            if (myCrypto[i].idCrypto === this.state.cart.id) {
                var sisaJumlah = myCrypto[i].jumlah - this.state.jumlahJual;
                if (sisaJumlah <= 0) {
                    myCrypto.splice(i,1);
                } else {
                    myCrypto[i].jumlah = sisaJumlah;
                }
                break;
            }
        }
        localStorage.setItem('MyCrypto', JSON.stringify(myCrypto));
        window.location = '/mycrypto';        
    }
    handleChangeJual(e) {
        var myOwnJumlah = this.state.myOwn.jumlah;
        var theValue;
        if (e.target.value > myOwnJumlah) {
            this.setState({
                jumlahJual: myOwnJumlah,
            });
            theValue = myOwnJumlah;
        } else {
            this.setState({
                jumlahJual: e.target.value
            });
            theValue = e.target.value;
        }
        this.setState({
            hargaJual: theValue * this.state.cart.quotes.IDR.price
        });
    }
    render() {
        const { cart } = this.state;
        const inputStyle = {
            border: '1px solid black'
        };
        const sell = this.state.myOwn.idCrypto === cart.id ? (
            <div>
                <div style={{ width: '100%' }}>
                    <h1 style={{ float: 'left', width: '50%' }}>Sell {cart.name}</h1>
                    <h1 style={{ float: 'right', width: '50%', textAlign: 'right' }}>You have: {this.state.myOwn.jumlah}</h1>
                </div>
                <form onSubmit={this.handleSubmitSell}>
                    <label>
                        {cart.symbol}
                        <input type="number" style={{ border: '1px solid black' }} value={this.state.jumlahJual} onChange={this.handleChangeJual} />
                    </label>
                    <label>
                        IDR
                        <input type="number" value={this.state.hargaJual} disabled={true} />
                    </label>
                    <input type="submit" value="Sell" />
                </form>
            </div>
        ) : (<div></div>);

        return (
            <div>
                <Navbar />
                <div style={{marginTop: '50px'}}>
                    <div style={{width: '100%'}}>
                        <h1 style={{float: 'left', width: '50%'}}>Buy {cart.name}</h1>
                        <h1 style={{float: 'right', width: '50%', textAlign: 'right'}}>Balance: {this.state.saldo}</h1>
                    </div>
                    <form onSubmit={this.handleSubmitBuy}>
                        <label>
                            {cart.symbol}
                            <input type="number" style={inputStyle} value={this.state.jumlahBeli} onChange={this.handleChangeJumlah} />
                        </label>
                        <label>
                            IDR
                            <input type="number" style={inputStyle} value={this.state.hargaBeli} onChange={this.handleChangeHarga}/>
                        </label>
                        <input type="submit" value="Buy" />
                    </form>
                    <hr style={{marginTop: '50px', marginBottom: '50px'}}/>
                    {sell}
                </div>
            </div>
        )
    }
}

export default Transaction;