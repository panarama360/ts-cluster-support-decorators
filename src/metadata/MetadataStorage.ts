import {VariableMetadata} from "./VariableMetadata";
import {MethodMetadata} from "./MethodMetadata";
import {ClassMetadata} from "./ClassMetadata";

class MetadataStorage {
    public variableMetadata: VariableMetadata[] = [];
    public methodMetadata: MethodMetadata[] = [];
    public classMetadata: ClassMetadata[] = []
}

export default new MetadataStorage()