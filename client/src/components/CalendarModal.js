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
    showCal = () =>{
        let newDate = new Date(this.state.date.getTime());
        newDate.setUTCDate(1);
        let curMonth = newDate.getUTCMonth();
        let calHTML = [];
         for(let i= 0; i < 5 ; i++){
            let children = [];
            for(let k = 0; k < 7 ; k++){
                let currentDay = newDate.getUTCDay();
                let distance = k - currentDay;
                console.log("Current Day: " + currentDay);
                console.log("K: " + k);
                console.log("Distance: " +  distance);
                console.log("First date: " + newDate.getUTCDate());
                if(distance !== 0){
                  newDate.setUTCDate(newDate.getUTCDate() + distance);
                }
                console.log("2nd date: " + newDate.getUTCDate());

                let matchingDays = this.state.days.filter((val) => {
                    return val.date === this.format(newDate)
                });
                console.log(matchingDays);
                let bg = curMonth !== newDate.getUTCMonth() ? "bg-warning" : "bg-info";
                bg += " border"
                if(matchingDays.length){
                   children.push(<td className={bg}>{newDate.getUTCDate() + " " + matchingDays[0]._id}</td>);
                }else{
                   children.push(<td className={bg}>{newDate.getUTCDate()}</td>);
                }

                newDate.setUTCDate(newDate.getUTCDate() + 1);

            }
            console.log("Children"+ children);
            calHTML.push(<tr>{children}</tr>);
         }
        console.log(calHTML);
        return (
           calHTML
                
        );
    }
    
    componentDidMount() {
        this.getMonthPlans();
    }

    changeDate = (e) => {
        e.preventDefault();
        let newDate = this.state.date;
        newDate.setUTCDate(1);

        console.log(e.target.id);
        if (e.target.id === "<") {
            newDate.setUTCMonth(newDate.getUTCMonth() - 1);
        } else {
            newDate.setUTCMonth(newDate.getUTCMonth() + 1);
        }
        console.log(newDate);
        this.setState({
            date: newDate
        }, this.getMonthPlans());

    }

    format = (date) => {
        return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1) < 10 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}-${date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate()}`
    }

    render() {        
        
       
        return (
            <div>
                <button type="button" data-toggle="modal" data-target="#cal">Calender</button>
                <div className="modal fade" id="cal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <button onClick={this.changeDate} id="<" className="mr-0 btn btn-secondary  " type="button" >{"<"}</button>
                                <div id="month" className="d-inline d-block btn" >{months[this.state.date.getUTCMonth()]}</div>
                                <button onClick={this.changeDate} id=">" className="ml-0 btn btn-secondary  " type="button" >{">"}</button>

                            </div>
                            <div className="modal-body">
                                <table className="m-auto">
                                    <thead>
                                        <tr>
                                            <th className="col-1">Su</th><th className="col-1">Mo</th><th className="col-1">Tu</th><th className="col-1">We</th><th className="col-1">Th</th><th className="col-1">Fr</th><th className="col-1">Sa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                                {
                                            this.showCal()
                                            }
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

