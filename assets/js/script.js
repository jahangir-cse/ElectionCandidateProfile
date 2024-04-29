$(document).ready(function () {
    function fetchImageAsBase64(url) {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }
    $(document).on('change', '#profile', function () {
        let fileInput = this;
        const files = fileInput.files;
        if (files && files.length > 0) {
            const file = files[0];
            const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
            if (allowedFormats.includes(file.type)) {
                const imageUrl = URL.createObjectURL(file);
                fetchImageAsBase64(imageUrl)
                    .then(base64 => {
                        $('.profile-img-div').html(`<img src="${base64}">`);
                    });               
            } else {
                fileInput.value = '';
            }
        } else {
            
        }
    });
    $(document).on('keyup', '#candidate-name-input', function () {
        let nameInput = $(this).val().trim();
        $('.cadidate-name').text(nameInput);
    });
    $(document).on('keyup', '#candidate-designation-input', function () {
        let nameInput = $(this).val().trim();
        $('.cadidate-designation').text(nameInput);
    });
    $('.banner-section .single-item:first-child()').addClass('active');
    $(document).on('click', '.banner-section .single-item', function () {
        $('.banner-section .single-item').removeClass('active');
        $(this).addClass('active');
    });
});
$(document).ready(function () {  
    //var text = $('.banner-section .single-item.active .title').text();
    //var image = convertTextToImage(text);
    //$('.banner-section .single-item.active .title').html(image); 
    var form = ""; 
    $(document).on('click','#downloadButton', function () {

        var titleText = $('.banner-section .single-item.active .title').text();
        var nameText = $('.banner-section .single-item.active .cadidate-name').text();
        var designationText = $('.banner-section .single-item.active .cadidate-designation').text();
        var titleImage = convertTextToImage(titleText,'lightgreen');
        var nameImage = convertTextToImage(nameText,'#fff');
        var designationImage = convertTextToImage(designationText,'#fff');
        $('.banner-section .single-item.active .title').html(titleImage);
        $('.banner-section .single-item.active .cadidate-name').html(nameImage);
        $('.banner-section .single-item.active .cadidate-designation').html(designationImage);

        form = $('.single-item.active .downloadAndPrintContent'),
        cache_width = form.width(),
        a4 = [595.28, 841.89];

        $('body').scrollTop(0);
        createImage();
    });

    function createImage() {
        getCanvas().then(function (canvas) {
            var img = canvas.toDataURL("image/jpeg", 1.0);
            var link = document.createElement('a');
            link.href = img;
            link.download = 'image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            form.width(cache_width);
        });
    }

    function getCanvas() {
        form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
        var contentHeight = form[0].scrollHeight;
        return html2canvas(form, {
            imageTimeout: 2000,
            removeContainer: true,
            logging: true,
            scale: 2,
            dpi: 300,      
            //height: contentHeight
        });
    }  
    function convertTextToImage(text,color) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = 250;
        canvas.height = 30;
        context.font = 'bold 18px Arial';
        context.fillStyle = color;
        context.fillText(text, 10, 25);
        var image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }    
});
