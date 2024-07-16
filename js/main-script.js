$(document).ready(function() {
    const progressBar = $('#progressBar');
    const progressBarDuration = 5000; // 5 seconds
    let interval;

    function startProgressBar() {
        progressBar.css('transition', 'width ' + progressBarDuration + 'ms linear');
        progressBar.width('100%');
    }

    function resetProgressBar() {
        progressBar.css('transition', 'none');
        progressBar.width('0%');
    }

    function updateSlideNumbers() {
        const totalSlides = $('#carouselExample .carousel-item').length;
        const currentSlideIndex = $('#carouselExample .carousel-item.active').index() + 1;
        const nextSlideIndex = (currentSlideIndex % totalSlides) + 1;

        $('#currentSlide').text(String(currentSlideIndex).padStart(2, '0'));
        $('#nextSlide').text(String(nextSlideIndex).padStart(2, '0'));
    }

    function startCarouselInterval() {
        interval = setInterval(function() {
            $('#carouselExample').carousel('next');
        }, progressBarDuration);
    }

    $('#carouselExample').on('slide.bs.carousel', function () {
        resetProgressBar();
        clearInterval(interval);
    });

    $('#carouselExample').on('slid.bs.carousel', function () {
        startProgressBar();
        startCarouselInterval();
        updateSlideNumbers();
    });

    $('#carouselExample').carousel({
        interval: false // We control the interval manually
    });

    startProgressBar();
    startCarouselInterval();
    updateSlideNumbers();
});







document.addEventListener("DOMContentLoaded", function() {
    function setupSlider(sliderWrapper, uniqueId) {
        const radiosContainer = sliderWrapper.querySelector(`.radios-${uniqueId}`);
        const imgContainer = sliderWrapper.querySelector(`.img-slider__container-${uniqueId}`);
        const imgItems = sliderWrapper.querySelectorAll(`.img-item-${uniqueId}`);

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
                radio.name = `slider-control-${uniqueId}`;
                radio.id = `radio-${uniqueId}-${i + 1}`;
                if (i === 0) radio.checked = true;

                const label = document.createElement('label');
                label.htmlFor = `radio-${uniqueId}-${i + 1}`;

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
            const allRadios = radiosContainer.querySelectorAll(`input[name="slider-control-${uniqueId}"]`);
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
    }

    document.querySelectorAll(".slider-wrapper-1").forEach((sliderWrapper, index) => {
        setupSlider(sliderWrapper, `1-${index + 1}`);
    });
});










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







jQuery("#carousel").owlCarousel({
    autoplay: true,
    rewind: false, /* use rewind if you don't want loop */
    margin: 20,
    loop: true,
    /*
   animateOut: 'fadeOut',
   animateIn: 'fadeIn',
   */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 3000,
    smartSpeed: 800,
    nav: true,
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 3
        },

        1024: {
            items: 4
        },

        1366: {
            items: 4
        }
    }
});


jQuery("#carousel1").owlCarousel({
    autoplay: true,
    rewind: false, /* use rewind if you don't want loop */
    margin: 20,
    loop: true,
    /*
   animateOut: 'fadeOut',
   animateIn: 'fadeIn',
   */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 3000,
    smartSpeed: 800,
    nav: true,
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 3
        },

        1024: {
            items: 4
        },

        1366: {
            items: 4
        }
    }
});