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
    $(document).on('click', '.bannar-section .single-item', function () {
        $('.bannar-section .single-item').removeClass('active')
        $(this).addClass('active');
    });
});
$(document).ready(function () {   
    var form = ""; 
    $(document).on('click','#downloadButton', function () {
        form = $('.downloadAndPrintContent.active'),
        cache_width = form.width(),
        a4 = [595.28, 841.89];

        $('body').scrollTop(0);
        createPDF();
    });

    function createPDF() {
        getCanvas().then(function (canvas) {
            var
                img = canvas.toDataURL("image/jpeg", 1.0),
                doc = new jsPDF({
                    unit: 'px',
                    format: 'a4'
                });
            doc.addImage(img, 'JPEG', 20, 20);
            doc.save('bannar.pdf');
            form.width(cache_width);
        });
    }

    function getCanvas() {
        form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
        return html2canvas(form, {
            imageTimeout: 2000,
            removeContainer: true,
            logging: true,
            scale: 2,
            dpi: 300
        });
    }
});