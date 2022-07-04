function applyControlsToImage(img) {

    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
    
    // Drag n drop
    img.onmousedown = function (event) {
        let remove = false;

        let relX = img.getBoundingClientRect().x - event.pageX;
        let relY = img.getBoundingClientRect().y - event.pageY;
        
        function move(event) {
            // TODO: The image should not be centered on the mouse when moved
            img.style.left = event.pageX + relX + 'px';
            img.style.top = event.pageY + relY + 'px';

            if (event.pageX > window.innerWidth - 80 && event.pageY > window.innerHeight - 80) {
                remove = true;
                document.querySelector('#bin').style.width = '900px';
                document.querySelector('#bin').style.height = '900px';
                document.querySelector('#bin').style.z_index = 300;
            } else {
                remove = false;
                document.querySelector('#bin').style.width = '70px';
                document.querySelector('#bin').style.height = '70px';
                document.querySelector('#bin').style.z_index = 1;
            }
        }
    
        document.addEventListener('mousemove', move);
    
        document.onmouseup = function (event) {
            document.removeEventListener('mousemove', move);

            if (remove)  {
                img.remove();
                document.querySelector('#bin').style.width = '70px';
                document.querySelector('#bin').style.height = '70px';
                document.querySelector('#bin').style.z_index = 1;
            }
        };
    
    };

    // Resize
    img.addEventListener('mouseenter', () => {
        function resize(event) {
            img.style.height = img.offsetHeight - event.deltaY / 2 + 'px';
        }

        window.addEventListener('wheel', resize);

        img.addEventListener('mouseleave', () => {
            window.removeEventListener('wheel', resize);
        });
    });
    
}

document.querySelector('#board-name').addEventListener('input', (event) => {
    let newTitle = event.target.value;
    if (newTitle != '') {
        document.title = newTitle;
    } else {
        document.title = 'Board';
    }
});


// NOT MY CODE
// https://htmldom.dev/paste-an-image-from-the-clipboard/
document.addEventListener('paste', function (evt) {
    // Get the data of clipboard
    const clipboardItems = evt.clipboardData.items;
    const items = [].slice.call(clipboardItems).filter(function (item) {
        // Filter the image items only
        return item.type.indexOf('image') !== -1;
    });
    if (items.length === 0) {
        return;
    }

    const item = items[0];
    // Get the blob of image
    const blob = item.getAsFile();

    let newImg = document.createElement('img');
    
    newImg.style.height = '300px';
    newImg.classList.add('item');
    newImg.draggable = false;
    applyControlsToImage(newImg);
    newImg.src = URL.createObjectURL(blob);
    
    document.body.appendChild(newImg);
});
