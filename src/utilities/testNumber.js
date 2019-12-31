class TestNumber{

    constructor(){
        this.date = new Date()
    }

    getTestNumber(){
        const year = this.date.getFullYear().toString()
        // getMonth() is zero based, need to add 1
        const month = (this.date.getMonth()+1).toString()
        const day = this.date.getDate().toString()
        const hours = this.getHours()
        const minutes = this.getMinutes()
        const seconds = this.date.getSeconds().toString()
        const testNumber = year+month+day+hours+minutes+seconds
        return testNumber
    }

    getHours(){
        let hours = this.date.getHours().toString()
        if (hours.length == 1){
            hours = '0'+hours
        }
        return hours
    }

    getMinutes(){
        let minutes = this.date.getMinutes().toString()
        if (minutes.length == 1){
            minutes = '0'+minutes
        }
        return minutes
    }

    getSeconds(){
        let seconds = this.date.getSeconds().toString()
        if (seconds.length == 1){
            seconds = '0'+seconds
        }
        return seconds
    }

}

module.exports = TestNumber