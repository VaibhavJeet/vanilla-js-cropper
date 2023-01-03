var actionButton = document.querySelectorAll('.action-button button')
var hiddenUpload = document.querySelector('.action-button .hidden-upload')
var image_workspaceSpan = document.querySelector('.image-workspace span')
var preview_containerSpan = document.querySelector('.preview-container span')
var zoom = document.querySelectorAll('.bottom-control .zoom svg')
var rotate = document.querySelectorAll('.bottom-control .rotate svg')
var flip = document.querySelectorAll('.bottom-control .flip svg')
var open = document.getElementById("open");
var modal_container = document.getElementById("modal_container");
var close = document.getElementById("close");
var cross = document.getElementById("cross");

//open and close modal
open.addEventListener('click', () => {
    modal_container.classList.add('show');
})
close.addEventListener('click', () => {
    modal_container.classList.remove('show');
})
cross.addEventListener('click', () => {
    modal_container.classList.remove('show');
})


// upload image
actionButton[0].onclick = () => hiddenUpload.click()
hiddenUpload.onchange = () => {
    // apdate on new file selected issue removed here
    document.querySelector('.image-workspace').innerHTML = `<img src="" alt="">`
    var image_workspace = document.querySelector('.image-workspace img')

    var file = hiddenUpload.files[0]
    var url = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }))
    image_workspace.src = url
    image_workspaceSpan.style.display = 'none'
    preview_containerSpan.style.display = 'none'

    var options = {
        dragMode: 'move',
        preview: '.img-preview',
        viewMode: 2,
        aspectRatio : 1,
        modal: false,
        background: false,

        ready: function () {

            // zoom for image
            zoom[0].onclick = () => cropper.zoom(0.1)
            zoom[1].onclick = () => cropper.zoom(-0.1)

            // rotate image
            rotate[0].onclick = () => cropper.rotate(45)
            rotate[1].onclick = () => cropper.rotate(-45)

            // flip image
            var flipX = -1
            var flipY = -1
            flip[0].onclick = () => {
                cropper.scale(flipX, 1)
                flipX = -flipX
            }
            flip[1].onclick = () => {
                cropper.scale(1, flipY)
                flipY = -flipY
            }
            
            actionButton[1].onclick = () => {
                cropper.reset()
            }

            actionButton[2].onclick = () => {
                var baseimg = cropper.getCroppedCanvas().toDataURL()
                document.getElementById("avatarImg").src = baseimg
            }
        }
    }

    var cropper = new Cropper(image_workspace, options)
}