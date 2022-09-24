export interface Serializable<T> {
    deserialize(plainObject: any): T;
}
