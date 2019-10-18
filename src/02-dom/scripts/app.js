const basicDom = {
    
    dom: document,

    clickEventListener: () => {
        document.querySelector('.main').addEventListener('click', (evt) => {
            console.log(evt);
            console.log('event target: ', evt.target);
        });
    },

    displayOlChildren: () => {
        idShow.addEventListener('click', () => {
            basicDOM.showChildren(document.querySelector('.ol'));
        });
    },

    showChildren: (elem) => {
        let elemChildren = elem.children;
        if (elemChildren.length != 0 ) {
            
        }
    },


}


export default basicDom;


