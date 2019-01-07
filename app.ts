import { IoCContainer } from "./ioc-container";

interface IDoA {
    doA(): void;
}

interface IDoB {
    doB(): void;
}

interface IDoC {
    doC(): void;
}

class ConcreteA implements IDoA {
    doA(): void {
        console.log('doing a');
    }

}

class ConcreteB implements IDoB {
    doB(): void {
        console.log('doing b');
    }

}

class ConcreteC implements IDoC {

    constructor(
        private _concreteA: IDoA,
        private _concreteB: IDoB) { }
    doC(): void {
        this._concreteA.doA();
        this._concreteB.doB();
        console.log('doing c');
    }

}


const container = IoCContainer.instance;
container.register('IDoA', [], ConcreteA);
container.register('IDoB', [], ConcreteB);
container.register('IDoC', ['IDoA', 'IDoB'], ConcreteC);


const a = container.resolve<IDoA>('IDoA');
a.doA();
const b = container.resolve<IDoB>('IDoB');
b.doB();
const c = container.resolve<IDoC>('IDoC');
c.doC();