export class SpellTaskController{
    constructor(view){
        this.view = view;
        this.dragSrcEL = null;

    }

    addListeners(){
        [].forEach.call(this.view.getLetters(), this.addDnDHandlers.bind(this));
    }


    addDnDHandlers(elem) {
        elem.addEventListener('dragstart', this.handleDragStart.bind(this), false);
        elem.addEventListener('dragover', this.handleDragOver.bind(this), false);
        elem.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
        elem.addEventListener('drop', this.handleDrop.bind(this), false);
        elem.addEventListener('dragend', this.handleDragEnd.bind(this), false);
    }

    handleDragStart(e) {

        this.dragSrcEL = e.currentTarget;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
        this.dragSrcEL.classList.add('dragElem');
    }


    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.currentTarget.classList.add('over');
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
    }


    handleDragLeave(e) {
        e.currentTarget.classList.remove('over');
    }

    handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        // Don't do anything if dropping the same letter we're dragging.
        if (this.dragSrcEL != e.currentTarget) {
            var selectedEL = e.currentTarget;
            this.dragSrcEL.parentNode.removeChild(this.dragSrcEL);
            var dropHTML = e.dataTransfer.getData('text/html');
            selectedEL.insertAdjacentHTML('beforebegin',dropHTML);
            var dropElem = selectedEL.previousSibling;
            this.addDnDHandlers(dropElem);

        }
        e.currentTarget.classList.remove('over');
        return false;
    }

    handleDragEnd(e) {
        e.currentTarget.classList.remove('over');
    }
}