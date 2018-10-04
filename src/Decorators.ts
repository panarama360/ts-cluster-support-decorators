import DataStorage from "./DataStorage";
import MetadataStorage from "./metadata/MetadataStorage";

export function CommonVar(label?:string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const identifer = target.constructor.name+"_"+propertyKey+"_CLUSTER";
        MetadataStorage.variableMetadata.push({
            label,
            identifer,
            targe: target.constructor,
            propertyKey
        })
        return{
            get: function() {
                return DataStorage.get(identifer)
            },
            set: function(value) {
                DataStorage.set(identifer,value)
            },
            enumerable: true,
            configurable: true
        };

    }
}


export function WatchVar(name: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.methodMetadata.push({
            nameVar: name,
            propertyKey,
            target
        })
    }
}

export function WatchClusterVar(): Function{
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var original = target;
        MetadataStorage.classMetadata = target;
        function construct(constructor, args) {
            var c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        var f: any = function (...args) {
            DataStorage.classWatch.push(this);
            return construct(original, args);
        }
        f.prototype = original.prototype;
        return f;
    }
}