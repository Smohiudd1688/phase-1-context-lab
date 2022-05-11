/* Your Code Here */

//takes an array as a parameter and converts information into a singular employee object
function createEmployeeRecord (employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

//takes an array of arrays as a parameter and converts information into aray of employee objects
function createEmployeeRecords(employeesArray) {
    const employeeObjects = [];
    for (const employee of employeesArray) {
        employeeObjects.push(createEmployeeRecord(employee));
    }
    return employeeObjects;
}

//creates an objects of date/time information and add it to the array in the object
function createTimeInEvent(dateStamps) {
    const hour = parseInt(dateStamps.slice(11));
    const date = dateStamps.slice(0, 10);

    this.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date
    });

    return this;
}

//creates an objects of date/time information and add it to the array in the object
function createTimeOutEvent(dateStamps) {
    const hour = parseInt(dateStamps.slice(11));
    const date = dateStamps.slice(0, 10);

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
    });

    return this;
}

//finds the given date in the employee infor and calculates time worked that day
function hoursWorkedOnDate(date) {
    let timeIn;
    let timeOut;
    this.timeInEvents.find((object) => {
        if (object.date === date) {
            timeIn = object.hour;
        }
    });

    this.timeOutEvents.find((object) => {
        if (object.date === date) {
            timeOut = object.hour;
        }
    });

    return (timeOut-timeIn)/100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function calculatePayroll(employeeObjects) {
    let totalPay = 0;
    for (const employee of employeeObjects) {
        totalPay += allWagesFor.apply(employee);
    }
    return totalPay - 1200;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => {
        return employee.firstName === firstName;
    });
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

