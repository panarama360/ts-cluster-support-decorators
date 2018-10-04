import {EmitterInterface} from "./EmitterInterface";
import {ProcessEmitter} from "./ProcessEmitter";
import MetadataStorage from "./metadata/MetadataStorage";
import DataStorage from "./DataStorage";

class ClusterSupport {

    private emitter: EmitterInterface;

    constructor(){

    }

    init(emiter?: EmitterInterface){
        this.setEmitter(emiter)
        this.initListener()
    }

    setEmitter(emiter: EmitterInterface){
        this.emitter = emiter;
        return this.emitter
    }

    getEmmiter(): EmitterInterface{
        return this.emitter || this.setEmitter(new ProcessEmitter())
    }

    private initListener() {
        MetadataStorage.variableMetadata.forEach(variable => {
            this.getEmmiter().on(variable.identifer, (data)=>{
                DataStorage.set(variable.identifer, data, true)
            })
        })
    }
}

export default new  ClusterSupport()
