module.exports={
    state: {},
    setState(stateKey, value){
        this.state[stateKey] = value
    },
    getState(stateKey){
        return this.state[stateKey]
    }
}