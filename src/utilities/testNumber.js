class TestNumber{

    constructor(){
        this.date = new Date()
    }

    getTestNumber(){
        const year = this.date.getFullYear().toString()
        // getMonth() is zero based, need to add 1
        const month = (this.date.getMonth()+1).toString()
        const day = this.date.getDate().toString()
        const hours = this.date.getHours().toString()
        const minutes = this.date.getMinutes().toString()
        const seconds = this.date.getSeconds().toString()
        const testNumber = year+month+day+hours+minutes+seconds
        return testNumber
    }

}

module.exports = TestNumber