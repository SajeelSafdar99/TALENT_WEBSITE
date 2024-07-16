document.addEventListener("DOMContentLoaded", function() {
    const radiosContainer = document.querySelector('.radios-1');
    const imgContainer = document.querySelector('.img-slider__container-1-1');
    const imgItems = document.querySelectorAll('.img-item-1');

    let imagesPerSlide = 4;
    let currentSlide = 0;
    let autoSlideInterval;

    function updateRadios() {
        radiosContainer.innerHTML = ''; // Clear existing radios
        const totalImages = imgItems.length;
        const totalSlides = Math.ceil(totalImages / imagesPerSlide);

        for (let i = 0; i < totalSlides; i++) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'slider-control-1';
            radio.id = `radio-1-${i + 1}`;
            if (i === 0) radio.checked = true;

            const label = document.createElement('label');
            label.htmlFor = `radio-1-${i + 1}`;

            radiosContainer.appendChild(radio);
            radiosContainer.appendChild(label);

            radio.addEventListener('change', () => {
                currentSlide = i;
                const offset = i * -100;
                imgContainer.style.transform = `translateX(${offset}%)`;
                resetAutoSlide();
                updateActiveRadio(i);
            });
        }

        updateActiveRadio(0);
    }

    function updateActiveRadio(index) {
        const allRadios = document.querySelectorAll('.radios-1 input[type="radio"]');
        const allLabels = radiosContainer.querySelectorAll('label');

        allRadios.forEach((radio, idx) => {
            if (idx === index) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });

        allLabels.forEach((label, idx) => {
            if (idx === index) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    function checkScreenSize() {
        const width = window.innerWidth;

        if (width <= 576) {
            imagesPerSlide = 1;
        } else if (width <= 768) {
            imagesPerSlide = 2;
        } else {
            imagesPerSlide = 4;
        }

        updateRadios();
        resetAutoSlide();
    }

    function autoSlide() {
        const totalImages = imgItems.length;
        const totalSlides = Math.ceil(totalImages / imagesPerSlide);

        currentSlide = (currentSlide + 1) % totalSlides;
        const offset = currentSlide * -100;
        imgContainer.style.transform = `translateX(${offset}%)`;
        updateActiveRadio(currentSlide);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 5000);
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});


