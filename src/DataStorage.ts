import ClusterSupport from "./ClusterSupport";
import MetadataStorage from "./metadata/MetadataStorage";
export class DataStorage {
    public classWatch: any[] = []
    private store: any = {}
    get(metadataLabel: string): any{
        return this.store[metadataLabel];
    }

    set(metadataLabel: string, value: any, withoutEmmit:boolean = false ){
        this.store[metadataLabel] = value;
        if(!withoutEmmit)
            ClusterSupport.getEmmiter().notifyAll(metadataLabel, this.store[metadataLabel])
        const [className, propertyKey] = metadataLabel.split('_')
        this.classWatch
        .filter(cl => cl.constructor.name === className)
        .forEach(cl => MetadataStorage.methodMetadata
            .filter(method=> method.target.constructor.name == className && method.nameVar == propertyKey)
            .forEach(method => cl[method.propertyKey]())
        )

    }
}

export default new DataStorage()