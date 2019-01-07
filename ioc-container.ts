export class IoCContainer {
    private static _instance: IoCContainer = new IoCContainer();
    private _dependencies: { [key: string]: Object } = {};

    private constructor() {
        if (IoCContainer._instance) {
            throw new Error('singleton class. cannot instantiate using new.');
        }
        IoCContainer._instance = this;
    }

    public static get instance(): IoCContainer {
        return IoCContainer._instance;
    }

    register(name: string, dependencies: string[], implementation: any) {
        if (this._dependencies[name]) {
            throw new Error('dependency already registered');
        }
        const dependenciesImplementations = this.getDependenciesImplementations(dependencies);
        this._dependencies[name] = new implementation(...dependenciesImplementations);
    }

    resolve<T>(name: string): T {
        if (!this._dependencies[name]) {
            throw new Error(`unsolved dependency ${name}`);
        }
        return <T>this._dependencies[name];
    }

    private getDependenciesImplementations(names: string[]): Object[] {
        return names.map(name => this.resolve(name));
    }
}