import React, { Component } from 'react';

class Main extends Component {
    state = {
        menuData: [
            { id: 1, name: 'Dosa', price: 100, selected: false },
            { id: 2, name: 'Idly', price: 50, selected: false },
            { id: 3, name: 'Vada', price: 30, selected: false },
            { id: 4, name: 'Uthappam', price: 80, selected: false },
            { id: 5, name: 'Tea', price: 20, selected: false },
            { id: 6, name: 'Coffee', price: 20, selected: false }
        ],
        orderData: [],
        editOrderButton: true,
        orderButton: false,
        orderButtonName: 'Order',
        orderTotal: 0,
        finalViewSection: false
    }

    handleChange = (event)  => {
        console.log(event);
        const menuData = [...this.state.menuData];
        const index = menuData.indexOf(event);
        event.selected = !event.selected;
        menuData[index] = { ...event };
        console.log(menuData[index]);
      
        console.log(menuData);
        this.setState({ menuData });
        console.log(this.state);
    }

    handleOrder = () => {
        const orderButton = !this.state.orderButton;
        const editOrderButton = !this.state.editOrderButton;
        const orderData = this.state.menuData.filter(item => item.selected);
        console.log(orderData);
        this.setState({ orderData, orderButton, editOrderButton });
    }

    getCheckboxStatus() {
        if (this.state.orderButton === true) {
            return true;
        } else {
            return false;
        }
    }

    handleEdit = () => {
        const orderButtonName = 'Update Order';
        const orderButton = this.state.orderButton ? false : true;
        const editOrderButton = this.state.editOrderButton ? false : true;
        this.setState({ orderButton, editOrderButton, orderButtonName });
    }

    generateBill = () => {
        const finalViewSection = true;
        this.setState({ finalViewSection });
    }

    handleTip = (event) => {
        let total = 0;
        for (let i = 0; i < this.state.orderData.length; i++) {
            total += this.state.orderData[i].price;
        }
        const value = event.target.value;
        const tip = (value / 100) * total;
        const finalBill = total + tip;
        console.log("hello", value, tip);
        this.setState({ orderTotal: finalBill });

    }

    calculateTotal() {
        let total = 0;
        for (let i = 0; i < this.state.orderData.length; i++) {
            total += this.state.orderData[i].price;
        }
        return total;
    }

    renderFinalBill(totalAmount) {
        if(this.state.finalViewSection)
        return (
            <div className='row'>
                <h4>Billing Counter</h4>
                <table className="table table-bordered table-sm text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderData.map(item => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="2"><b>Bill Amount</b></td>
                            <td><b>{totalAmount}</b></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Tip</td>
                            <td width="30%">
                                <div className="input-group input-group-sm">
                                    <input type="text" onInput={this.handleTip} className="form-control form-control-sm" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><b>Final Bill Amount</b></td>
                            <td><b>{this.state.orderTotal}</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ); else 
        return <div></div>
    }



    render() {
        const totalAmount = this.calculateTotal();

        return (
            <div className='container'>
                <div className="pt-2"><h4>#FrontEndRound1Slot2</h4></div>
                <div className='row mt-5'>
                    <div className='col-md-4'>
                        <div className='row'>
                            <h4>Menu</h4>
                            <table className="table table-bordered table-sm text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Selected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.menuData.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <div className="form-check">
                                                        <input disabled={this.getCheckboxStatus()} onChange={() => this.handleChange(item)} className="form-check-input" type="checkbox" checked={item.selected} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='row justify-content-end'>
                            <button type="button" disabled={this.state.editOrderButton} onClick={this.handleEdit} className="btn btn-secondary mr-1 btn-sm">Edit</button>
                            <button type="button" disabled={this.state.orderButton} onClick={this.handleOrder} className="btn btn-primary btn-sm">{this.state.orderButtonName}</button>
                        </div>
                    </div>
                    <div className="offset-md-2 col-md-4">
                        <div className='row'>
                            <h4>Order Details</h4>
                            <table className="table table-bordered table-sm text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.orderData.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td>{totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='row justify-content-end'>
                            <button type="button" onClick={() => this.generateBill()} className="btn btn-primary btn-sm">Generate Final Bill</button>
                        </div>
                        {this.renderFinalBill(totalAmount)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;