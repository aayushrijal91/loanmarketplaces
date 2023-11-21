// AOS.init({ duration: 1500 });

document.querySelectorAll('a[href="#form"], a[href="#home-loans"], a[href="#lenders"],a[href="#why-choose-us"],a[href="#how-it-works"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

$(window).on('scroll', () => {
    if ($(this).scrollTop() >= 600) {
        $('#return-to-top').fadeIn(300);
    } else {
        $('#return-to-top').fadeOut(300);
    }
});

$('#return-to-top').on('click', () => {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
});

$(() => {
    $('#banks-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
        autoplay: true,
        dots: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "80px",
                    dots: false,
                }
            }
        ]
    });

    let loanCap = 2000000;
    let termCap = 7;

    $('#borrowSlider').on('input', function () {
        let value = $("#borrowSlider").val();
        let formattedVal = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $('#borrowAmount').html(formattedVal);

        $(this).parents('.range').find('.sliderThumb.amount').css('left', (value * (95 / loanCap)) + "%");
        $(this).parents('.range').find('.progressBar.amount').css('width', (value * (98 / loanCap)) + "%");
    });

    $('#termSlider').on('input', function () {
        let value = $("#termSlider").val();
        let formattedVal2 = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $('#borrowTerm').html(formattedVal2);

        $(this).parents('.range').find('.sliderThumb.year').css('left', (value * (94 / termCap)) + "%");
        $(this).parents('.range').find('.progressBar.year').css('width', (value * (98 / termCap)) + "%");
    });

    $('input[type="radio"].loanType').on('change', function () {
        if ($(this).is(':checked')) {
            let checkedValue = $(this).val();
            localStorage.setItem("loanType", checkedValue);

            $('#form-tab-1').hide();
            $('#form-tab-2').fadeIn();

            $('.checkedValue').html(checkedValue);
            $(`.unusedoption`).fadeIn();
            $(`.unusedoption[data-src="${checkedValue}"]`).hide();
            $('.loanSvg').hide();
            $(`.loanSvg[data-src="${checkedValue}"]`).fadeIn();
        }
    });

    $('.show-form-tab-1').on('click', function () {
        $('.form-tab').hide();
        $('#form-tab-1').fadeIn();
    });

    $('.show-form-tab-2').on('click', function () {
        $('.form-tab').hide();
        $('#form-tab-2').fadeIn();
    });

    $('.show-form-tab-3').on('click', function () {
        $('.form-tab').hide();
        $('#form-tab-3').fadeIn();
    });

    // widget
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.partnerId) {
        localStorage.setItem('externalPartnerId', params.partnerId);
    } else {
        if (localStorage.getItem("externalPartnerId") === null) {
            localStorage.setItem("externalPartnerId", 1821);
        }
    }

    let sourceval = "LOANOPTIONS";
    let sourceUrl = SITE_URL;
    let externalPartnerId = localStorage.getItem("externalPartnerId");
    let targetSystem = "SKYNET";

    localStorage.setItem("sourceUrl", SITE_URL);

    localStorage.setItem("source", sourceval);

    localStorage.setItem("targetSystem", targetSystem);

    if (localStorage.getItem("quote") === null) {
        let quote = {
            type: "CAR_LOAN",
            usage: "CONSUMER",
            amount: "50000",
            term: "5",
            source: sourceval,
            sourceUrl: sourceUrl,
            targetSystem: targetSystem,
            externalPartnerId: externalPartnerId,
        }
        localStorage.setItem('quote', JSON.stringify(quote));
    }

    function generate(n) {
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

        if (n > max) {
            return generate(max) + generate(n - max);
        }

        max = Math.pow(10, n + add);
        var min = max / 10; // Math.pow(10, n) basically
        var number = Math.floor(Math.random() * (max - min + 1)) + min;

        return ("" + number).substring(add);
    }

    var gid = generate(12);

    if (localStorage.getItem("quoteId") === null) {
        if (localStorage.getItem("uid") === null) {
            localStorage.setItem("uid", gid);
        } else {

        }
    } else {
        localStorage.setItem("uid", localStorage.getItem("quoteId"));
    }

    function carloansubmitquote() {
        return Array("CAR_LOAN", "CONSUMER");
    }

    function personalloansubmitquote() {
        return Array("PERSONAL_LOAN", "CONSUMER");
    }

    function equipmentloansubmitquote() {
        return Array("EQUIPMENT_LOAN", "COMMERCIAL_FULL_DOC");
    }

    function updateLoacalStorage(typeval, usageval) {
        let amount = $("#borrowSlider").val();
        let year = $("#termSlider").val();

        let quote = {
            type: typeval,
            usage: usageval,
            amount: amount,
            term: year,
            source: sourceval,
            sourceUrl: sourceUrl,
            targetSystem: targetSystem,
            externalPartnerId: externalPartnerId,
        }

        localStorage.setItem('quote', JSON.stringify(quote));
    }

    function gotoApplication(loanType) {
        if (loanType == "Car Loan") {
            arr = carloansubmitquote();
        } else if (loanType == "Personal Loan") {
            arr = personalloansubmitquote();
        } else if (loanType == "Equipment Loan") {
            arr = equipmentloansubmitquote();
        }

        updateLoacalStorage(arr[0], arr[1]);

        window.location.href = SITE_URL + '/application';
    }

    $(".show-form-tab-4").on('click', function (e) {
        e.preventDefault();

        let loanType = localStorage.getItem("loanType");

        if (loanType == "Home Loan") {
            $('.form-tab').hide();
            $('#form-tab-4').fadeIn();
        } else {
            gotoApplication(loanType);
        }
    })

    $(".show-form-tab-5").on('click', function () {
        $('.form-tab').hide();
        $('#form-tab-5').fadeIn();
    });

    $("#submitHomeLoan").on('click', function (e) {
        e.preventDefault();

        let fullname = $('#fullname').val();
        let phone_number = $('#phone_number').val();
        let email_address = $('#email_address').val();
        let namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
        let phonePattern = /^(?:\+?61|0)[2-57-8](?:\d{8}|\s\d{4}\s\d{4})$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let error = !namePattern.test(fullname) || !phonePattern.test(phone_number) || !emailPattern.test(email_address);

        !namePattern.test(fullname) ? $('#fullname_error').fadeIn() : $('#fullname_error').hide();
        !phonePattern.test(phone_number) ? $('#phonenumber_error').fadeIn() : $('#phonenumber_error').hide();
        !emailPattern.test(email_address) ? $('#email_error').fadeIn() : $('#email_error').hide();

        if (!error) {
            $("#form").submit();
        }
    });
});
