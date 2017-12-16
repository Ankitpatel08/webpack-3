import css from '../css/app-1.scss';
console.log("this is app1 js");

var element = document.querySelector('.cta');

element.addEventListener('click', (evt) => {
    alert('executed');

    import(/* webpackChunkName: 'app-1/js/test' */ './import-check').then(importFile => {
            const ImportFile = importFile.default;
            new ImportFile();
        }
    );
});
