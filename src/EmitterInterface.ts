export interface EmitterInterface {
    notifyAll(key, data): void
    on(event, cb: Function)
    emit(key: string, data: any)
}