import {CommonVar, WatchClusterVar, WatchVar} from "../Decorators";
import * as cluster from "cluster";
import ClusterSupport from "../ClusterSupport";

@WatchClusterVar()
class Controller{

    @CommonVar()
    anyVars: number;

    constructor(){
        setTimeout(()=>{process.exit(0)}, 10000)
    }

    @WatchVar('anyVars')
    watch(){
        console.log("Update value 'anyVars'", this.anyVars)
    }
}



if(cluster.isMaster){
    cluster.fork()
    cluster.fork()
    cluster.fork()
}else{
    console.log(cluster.worker.id)
    new Controller()
}

ClusterSupport.init()
