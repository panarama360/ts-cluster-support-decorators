import * as cluster from "cluster";
import {EmitterInterface} from "./EmitterInterface";
import {EventEmitter} from "events";

export class ProcessEmitter extends EventEmitter implements EmitterInterface{

    notifyAll(key, data): void {
        process.send({type: 'support0cluster', key, data})
    }

    constructor(){
        super()
        if(cluster.isMaster)
            this.initMaster()
        else
            this.initWorker()
    }

    private initMaster(){
        const workers = Object.keys(cluster.workers).map(value => cluster.workers[value])
        workers.forEach(value => value.on('message', data => {
            console.log('master message')
            if(data.type && data.type == 'support0cluster' && data.key)
                workers.filter(value1 => value1.id!=value.id).forEach(value1 => {
                    value1.send(data)
                })
        }))

    }

    private initWorker(){
        process.on('message', (data)=>{
            if(data.type && data.type == 'support0cluster' && data.key){
                this.emit(data.key, data.data)
            }
        })
    }

}