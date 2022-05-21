const EventEmitter = require('events');
const axios = require('axios');

class CompareAPI {
    constructor(config) {
        this.onCheck = config.onCheck || function(){};

        this.apiUrl = config.apiUrl;
        const events = new EventEmitter();
        this.events = events;
        this.timeout = config.timeout || 10000;
        this.successStatus = config.successStatus || 200;
    }

    start = () => {
        let oldData;
        this.onCheck();
        this._fetchApi().then(res=>{
            if(typeof(res) != 'number') {
                oldData = res;
            }else{
                this.events.emit('fetchError', {
                    message: 'Error occurred on data fetch...',
                    code: res,
                });
                oldData = {};
            }

            setInterval(async ()=>{
                this.onCheck();
                const data = await this._fetchApi();
                if(typeof(data) != 'number'){
                    if(JSON.stringify(oldData)!=JSON.stringify(data)){
                        this.events.emit('dataChanged', {oldData,newData: data});
                        oldData=data;
                    }
                }else{
                    this.events.emit('fetchError', {
                        message: 'Error occurred on data fetch...',
                        code: data,
                    });
                }
            }, this.timeout);
        });
    }

    _fetchApi = async () => {
        let res;
        try{
            res = await axios.get(this.apiUrl);
        }catch(err){
           res = {
               status: err.response.status,
           }
        }
        if(res.status != this.successStatus)return res.status;
        return res.data;
    }
}

module.exports = CompareAPI;
