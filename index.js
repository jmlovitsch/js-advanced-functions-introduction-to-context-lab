// Your code here
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (arrayOfArrays) => {

        return arrayOfArrays.map(employee => {
            return createEmployeeRecord(employee)
        })

}
let createTimeInEvent = (employeeRecord, dateTimeString) => {
    let newDTS = dateTimeString.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(newDTS[1], 10),
        date: newDTS[0]
    })

    return employeeRecord

}


let createTimeOutEvent = (employeeRecord, dateTimeString) => {
    let newDTS = dateTimeString.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(newDTS[1], 10),
        date: newDTS[0]
    })

    return employeeRecord
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}


let wagesEarnedOnDate = (employeeRecord, soughtDate) => {
    return (hoursWorkedOnDate(employeeRecord, soughtDate) * employeeRecord.payPerHour)
}

let allWagesFor = (employeeRecord) => {
    let wagesEarned = employeeRecord.timeInEvents.map(function(t) {
        return wagesEarnedOnDate(employeeRecord, t.date)
    })
    return wagesEarned.reduce(reducer)
}

let calculatePayroll = (arrayOfEmployeeRecords) => {
    let c =  arrayOfEmployeeRecords.map(function(e) {
        return allWagesFor(e)
    })
    return c.reduce(reducer)
}

let findEmployeeByFirstName = (srcArray, firstName) => {
     return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}
