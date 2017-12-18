import Import1 from './import-1';
import Import2 from './import-2';

import css from '../css/app-2.scss';
console.log("this is app2 js");

class MyClass {
    constructor() {
        this._initImports();
    }

    _initImports() {
        let import1 = Import1.default,
            import2 = Import2.default;

            new import1();
            new import2();
    }
}