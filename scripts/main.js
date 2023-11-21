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

let loanCap = 2000000;
let termCap = 7;
let currentBorrowAmount = $("#borrowSlider").val();
let currentBorrowTerm = $("#termSlider").val();

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

$(() => {
    $('input[type="radio"]').on('change', function () {
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

    $('#show-form-tab-1').on('click', function () {
        $('#form-tab-3').hide();
        $('#form-tab-2').hide();
        $('#form-tab-1').fadeIn();
    });

    $('#show-form-tab-2').on('click', function () {
        $('#form-tab-1').hide();
        $('#form-tab-3').hide();
        $('#form-tab-2').fadeIn();
    });

    $('#show-form-tab-3').on('click', function () {
        $('#form-tab-1').hide();
        $('#form-tab-2').hide();
        $('#form-tab-3').fadeIn();
    });
});

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
})


// widget
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

if(params.partnerId) {
    localStorage.setItem('externalPartnerId', params.partnerId);
} else {
    if(localStorage.getItem("externalPartnerId") === null) {
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

document.documentElement.style.setProperty('--widgetPrimary', '#5614BB');
document.documentElement.style.setProperty('--widgetSecondary', '#5614BB');
document.documentElement.style.setProperty('--widgetTertiary', '#5614BB');
document.documentElement.style.setProperty('--widgetQuaternary', '#f2f2f2');

function carloansubmitquote() {
    // let type = $("#loantype").val();
    // let loantype = (type == "Business") ? 'COMMERCIAL_FULL_DOC' : 'CONSUMER';
    return Array("CAR_LOAN", "CONSUMER");
}

function personalloansubmitquote() {
    return Array("PERSONAL_LOAN", "CONSUMER");
}

function equipmentloansubmitquote() {
    return Array("EQUIPMENT_LOAN", "COMMERCIAL_FULL_DOC");
}

function loansubmit(typeval, usageval) {
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

$("#form").on('submit', function(e) {
    e.preventDefault();

    let arr = [];
    let loanType = localStorage.getItem("loanType");

    if(loanType == "Car Loan") {
        arr = carloansubmitquote();
    } else if(loanType =="Personal Loan") {
        arr = personalloansubmitquote();
    } else if(loanType == "Equipment Loan") {
        arr = equipmentloansubmitquote();
    } else {
        arr = [];
    }

    loansubmit(arr[0], arr[1]);

    window.location.href = SITE_URL + '/application.php';
})