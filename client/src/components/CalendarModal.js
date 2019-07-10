import React, { Component } from "react";
import axios from "axios";

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class CalendarModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            days: []
        }
    }
    getMonthPlans = () =>{
        let date = this.format(this.state.date);
        let year = date.split("-")[0];
        let month = date.split("-")[1];
        axios.get("/meals/"+year+"/"+month).then((response)=>{
            console.log(response.data);
            this.setState({
                days: response.data
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    changeDate = (e) => {
        e.preventDefault();
        let newDate = this.state.date;
        newDate.setDate(1);

        console.log(e.target.id);
        if (e.target.id === "<") {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        this.setState({
            date: newDate
        }, this.getMonthPlans());

    }

    format = (date) => {
        return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1) < 10 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}-${date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate()}`
    }

    render() {
        console.log(months[this.state.date.getUTCMonth]);
        return (
            <div>
                <button type="button" data-toggle="modal" data-target="#cal">Calender</button>
                <div className="modal fade" id="cal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <button onClick={this.changeDate} id="<" className="mr-0 btn btn-secondary  " type="button" >{"<"}</button>
                                <div id="month" className="d-inline d-block btn" >{months[this.state.date.getUTCMonth]}</div>
                                <button onClick={this.changeDate} id=">" className="ml-0 btn btn-secondary  " type="button" >{">"}</button>

                            </div>
                            <div className="modal-body">
                                <table>
                                    <thead>

                                    </thead>
                                    <tbody>
                                        <tr>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarModal;

