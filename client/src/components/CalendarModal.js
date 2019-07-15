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
               
                if(distance !== 0){
                  newDate.setUTCDate(newDate.getUTCDate() + distance);
                }

                let matchingDays = this.state.days.filter((val) => {
                    return val.date === this.format(newDate)
                });
                let bg = curMonth !== newDate.getUTCMonth() ? "bg-danger" : "bg-primary";
                bg += " border"
                if(matchingDays.length){
                    console.log(matchingDays);
                    let bf = matchingDays[0].breakfast.length; 
                    let ln = matchingDays[0].lunch.length; 
                    let dn = matchingDays[0].dinner.length; 

                   children.push(
                        <td key={this.format(newDate)} id={this.format(newDate)} onClick={this.changeDate} data-toggle="modal" data-target="#cal" className={bg}>
                            {newDate.getUTCDate()}
                            {bf > 0 ? <small className="meal-note bg-info rounded">Br</small> : ""}
                            {ln > 0 ? <small className="meal-note bg-success rounded">Lu</small> : ""}
                            {dn > 0 ? <small className="meal-note bg-warning rounded">Di</small> : ""}
                        </td>);
                }else{
                   children.push(<td key={this.format(newDate)} id={this.format(newDate)} onClick={this.changeDate} data-toggle="modal" data-target="#cal" className={bg}>{newDate.getUTCDate()}</td>);
                }

                newDate.setUTCDate(newDate.getUTCDate() + 1);

            }
            calHTML.push(<tr key={i}>{children}</tr>);
         }
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

        console.log(e.target.id);
        if (e.target.id === "<") {
            newDate.setUTCMonth(newDate.getUTCMonth() - 1);
            console.log(newDate);
            this.setState({
                date: newDate
            }, this.getMonthPlans());
    
        } else if(e.target.id === ">"){
            newDate.setUTCMonth(newDate.getUTCMonth() + 1);
            console.log(newDate);
            this.setState({
                date: newDate
            }, this.getMonthPlans());
    
        } else if(e.target.className.includes("meal-note")){
            this.props.setDate(new Date(e.target.parentNode.id));
        } else {
            this.props.setDate(new Date(e.target.id));

        }
       
    }

    format = (date) => {
        return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1) < 10 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}-${date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate()}`
    }

    render() {        
        
       
        return (
            <div>
                <button className="btn" onClick={this.getMonthPlans} type="button" data-toggle="modal" data-target="#cal">Calendar</button>
                <div className="modal fade" id="cal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <button onClick={this.changeDate} id="<" className="mr-0 btn btn-secondary  " type="button" >{"<"}</button>
                                <div id="month" className="d-inline d-block btn" >{months[this.state.date.getUTCMonth()]} {this.state.date.getUTCFullYear()}</div>
                                <button onClick={this.changeDate} id=">" className="ml-0 btn btn-secondary  " type="button" >{">"}</button>

                            </div>
                            <div className="modal-body table-responsive">
                                <table className="m-auto table">
                                    <thead>
                                        <tr>
                                            <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
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

