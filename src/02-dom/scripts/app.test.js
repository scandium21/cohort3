import basicDOM from './app.js'

const add = (a,b) => a+b;
test('test dom', () => {
    console.log('pringting dom:',basicDOM.dom);
    let p = basicDOM.dom.createElement('p');
    p.textContent = "testing...";
    console.log(p.textContent, p);
})