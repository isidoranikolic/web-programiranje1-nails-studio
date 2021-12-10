jQuery(document).ready(function ($) {
  function copyToClipboard() {
    const element = document.getElementById('promo');
    const $temp = $('<input>');
    $('body').append($temp);
    $temp.val($(element).text()).select();
    document.execCommand('copy');
    $temp.remove();
  }

  $('#promo-button').click(function () {
    copyToClipboard();
    $('#promo-button').addClass('success');

    setTimeout(() => {
      $('#promo-modal').removeClass('visible');
    }, 2000);
  });

  $('#close-button').click(function () {
    $('#promo-modal').removeClass('visible');
  });

  if (!localStorage.getItem('used')) {
    const promoCode = localStorage.getItem('promoCode') || createCode(5);
    $('#promo').text(promoCode);

    $('#promo-modal').addClass('visible');

    localStorage.setItem('promoCode', promoCode);
  }

  $(function () {
    $('#datepicker').datepicker({ dateFormat: 'dd-mm-yy' });
  });

  $('#exampleModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const text = button.data('text');
    const heading = button.data('heading');
    const image = button.data('image');

    const modal = $(this);
    modal.find('.modal-body img').attr('src', image);
    modal.find('.modal-body img').attr('alt', heading);
    modal.find('.modal-title').text(heading);
    modal.find('.modal-body p').text(text);
  });

  $('.collapse')
    .on('show.bs.collapse hide.bs.collapse', function () {
      $('#with-promo').prop('disabled', true);
    })
    .on('shown.bs.collapse hidden.bs.collapse', function () {
      $('#with-promo').prop('disabled', false);
    });

  $('#select-color').on('click', function () {
    $("a[href='#contact-us'").click();

    const color = $('.colors-block').attr('color');

    $('#message').val(
      `Hi, I would like ${color} color for my nails. When are you available?`
    );
  });

  $('.colors-block div').on('click', function () {
    $('.st0').css('fill', $(this).attr('data-color'));
    $('.colors-block').css('borderBottomColor', $(this).attr('data-color'));
    $('.colors-block').attr('color', $(this).attr('title'));
  });

  $('.preloader').fadeOut('slow');

  $('.fixed-side-navbar a, .primary-button a, #footer-menu-links a').on(
    'click',
    function (event) {
      if (this.hash !== '') {
        event.preventDefault();

        const hash = this.hash;

        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            window.location.hash = hash;
          }
        );
      }
    }
  );

  const mainHeader = $('.parallax-content');
  mainHeader.css({ 'background-position': 'center center' });

  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();

    mainHeader.css({
      'background-position': 'center calc(50% + ' + scrollTop * 0.5 + 'px)',
    });
  });

  $('body').scrollspy({
    target: '.fixed-side-navbar',
    offset: 200,
  });

  const owlObject = $('#owl-gallery');

  owlObject.owlCarousel({
    pagination: true,
    paginationNumbers: false,
    autoPlay: 6000,
    items: 3,
    itemsDesktop: [1000, 3],
    itemsDesktopSmall: [900, 2],
    itemsTablet: [600, 1],
    itemsMobile: false,
  });
});

function createCode(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function addPulse(element) {
  element.classList.add('pulse');

  setTimeout(() => {
    element.classList.remove('pulse');
  }, 1000);
}

function mySubmitFunction(e) {
  e.preventDefault();

  let errors = [];

  const dateInput = document.getElementById('datepicker').value;
  const dateValidation = dateValidate(dateInput);

  if (dateValidation !== true) {
    const error = document.getElementById('error-date-message');

    error.innerHTML = dateValidation;
    addPulse(error);
    errors.push('date');
  } else {
    document.getElementById('error-date-message').innerHTML = '';
    errors.filter((item) => item !== 'date');
  }

  if (document.getElementById('with-promo')) {
    if (document.getElementById('with-promo').checked) {
      const promoInput = document.getElementById('promo-code').value;
      const promoCodeValidation = promoValidate(promoInput);

      if (promoCodeValidation !== true) {
        const error = document.getElementById('error-promo-message');

        error.innerHTML = promoCodeValidation;
        addPulse(error);
        errors.push('promo');
      } else {
        document.getElementById('error-promo-message').innerHTML = '';
        errors.filter((item) => item !== 'promo');
      }
    } else {
      document.getElementById('error-promo-message').innerHTML = '';
    }
  }

  const amPmValidation = amPmValidate();

  if (amPmValidation !== true) {
    const error = document.getElementById('error-ampm-message');

    error.innerHTML = amPmValidation;
    addPulse(error);
    errors.push('ampm');
  } else {
    document.getElementById('error-ampm-message').innerHTML = '';
    errors.filter((item) => item !== 'ampm');
  }

  const nameInput = document.getElementById('name').value;
  const nameValidation = nameValidate(nameInput);

  if (nameValidation !== true) {
    const error = document.getElementById('error-name-message');

    error.innerHTML = nameValidation;
    addPulse(error);
    errors.push('name');
  } else {
    document.getElementById('error-name-message').innerHTML = '';
    errors.filter((item) => item !== 'name');
  }

  const emailInput = document.getElementById('email').value;
  const emailValidation = emailValidate(emailInput);

  if (emailValidation !== true) {
    const error = document.getElementById('error-email-message');

    error.innerHTML = emailValidation;
    addPulse(error);
    errors.push('email');
  } else {
    document.getElementById('error-email-message').innerHTML = '';
    errors.filter((item) => item !== 'email');
  }

  if (errors.length) {
    return;
  }

  document.getElementById('equation-block').innerHTML = `${
    Math.floor(Math.random() * 50) + 1
  } + ${Math.floor(Math.random() * 50) + 1}`;
  document.getElementById('custom-captcha').classList.add('visible');
}

function submitAfterCaptcha(e) {
  e.preventDefault();

  const numberString = document.getElementById('equation-block').innerHTML;
  const numbers = numberString.split(' + ');

  if (+numbers[0] + +numbers[1] !== +document.getElementById('captcha').value) {
    document.getElementById('robot').classList.add('visible');

    setTimeout(() => {
      document.getElementById('custom-captcha').classList.remove('visible');
      document.getElementById('robot').classList.remove('visible');
    }, 3000);
    return;
  }

  document.getElementById('custom-captcha').classList.remove('visible');

  if (
    !localStorage.getItem('used') &&
    document.getElementById('with-promo').checked
  ) {
    localStorage.setItem('used', true);
  }

  document.getElementById('form-success').classList.add('visible');
  document.getElementById('contact').reset();
  removePromo();

  setTimeout(() => {
    document.getElementById('form-success').classList.remove('visible');
  }, 4000);
}

function promoValidate(promoCode) {
  if (localStorage.getItem('promoUsed')) {
    return 'Promo code has been already used!';
  }

  const savedPromoCode = localStorage.getItem('promoCode');

  if (!promoCode) {
    return "You didn't enter the promo code!";
  }

  if (savedPromoCode !== promoCode) {
    return 'Your promo code is invalid!';
  }

  return true;
}

function dateValidate(date) {
  if (!date) {
    return 'Date is missing!';
  }

  const dateReg = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;

  if (!dateReg.test(date)) {
    return 'Date format is not correct, it needs to be DD-MM-YYYY!';
  }

  const parts = date.split('-');
  const selectedDate = new Date(
    Number(parts[2]),
    Number(parts[1]) - 1,
    Number(parts[0])
  );
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    return 'Date must be in the future, time machine is not inveted yet. Or is it?';
  }

  return true;
}

function amPmValidate() {
  if (
    !document.getElementById('am-option').checked &&
    !document.getElementById('pm-option').checked
  ) {
    return 'Please, select morning or afternoon apointment!';
  }

  return true;
}

function nameValidate(name) {
  if (!name) {
    return 'Your name is missing!';
  }

  const nameReg = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{1,20}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{1,30})+$/;

  if (!nameReg.test(name)) {
    return 'Please enter your name properly! First letter of each word has to be capitalized, no special characters and no numbers.';
  }

  return true;
}

function emailValidate(email) {
  if (!email) {
    return 'Your email is missing!';
  }

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailReg.test(String(email).toLowerCase())) {
    return 'Your email address is invalid. It should look something like this: username@somemail.com!';
  }

  return true;
}

function removePromo() {
  if (localStorage.getItem('used')) {
    document.getElementsByClassName('checkbox-block')[0].innerHTML = '';
    document.getElementById('collapseExample').innerHTML = '';
    document.getElementById('promo-modal').classList = '';
  }
}

removePromo();

// HERO HEADER

const heroHeaderData = {
  heading: 'NailZ studio',
  highlightedText: 'Checkout',
  subtext: 'my previous work and save a date',
  buttonText: 'Discover More',
};

function createHeroHeader() {
  const container = document.getElementById('hero-header-content');

  container.innerHTML = `<h1>${heroHeaderData.heading}</h1>
      <h2><em>${heroHeaderData.highlightedText}</em> ${heroHeaderData.subtext}</h2>
      <div class="primary-button">
        <a href="#services">${heroHeaderData.buttonText}</a>
      </div>`;
}

createHeroHeader();

// ********************************************************

// MENU

const menuData = [
  {
    text: 'Intro',
    href: 'home',
  },
  {
    text: 'Services',
    href: 'services',
  },
  {
    text: 'Portfolio',
    href: 'portfolio',
  },
  {
    text: 'Pick your favorite color',
    href: 'color-picker',
  },
  {
    text: 'Contact us',
    href: 'contact-us',
  },
  {
    text: 'My story',
    href: 'my-story',
  },
];

function createMenu() {
  const container = document.getElementById('menu-links');
  let items = '';

  menuData.map((item) => {
    items += `<li class="nav-item">
      <a class="nav-link" href="#${item.href}"><span>${item.text}</span></a>
      </li>`;
  });

  container.innerHTML = items;
}

createMenu();

// ********************************************************

// SERVICES

const servicesData = {
  mainHeading: 'More About Nails Studio',
  helperText:
    'We offer a wide variety of services to make your nails look nicer. At NailZ studio you will receive exceptional customer service! The quality of the products we use make our service stand out! What are you waiting for? Book your appointment now!',
  buttonText: 'Take a look at the gallery',
  services: [
    {
      heading: 'Gel polish!',
      text:
        'Gel polishes are more flexible, so they stand up to chips; gels are cured under a UV or LED lamp and polishes cure in oxygen.',
      imageUrl: 'img/service_1.jpg',
      modalText:
        "There’s a reason why gel nail polish has become a modern beauty mainstay: it's virtually indestructible, impossibly glossy, and offered at nearly every nail salon. However, the most enticing aspect of a gel mani? Zero risk in chipping your polish the minute you dig through your handbag to check your phone — not to mention, for several weeks to come.",
    },
    {
      heading: 'Strengthening nails with gel!',
      text:
        'Everyone that uses gel polish needs to know about the “acrygel” technique.  Acrygel is a combination of the words acrylic and gel.',
      imageUrl: 'img/service_2.jpg',
      modalText:
        'It’s a method for adding strength to your nails using acrylic powder and gel foundation, so you get the strength of acrylic with the soak-off ability of gel.',
    },
    {
      heading: 'Pouring nails with gel!',
      text:
        'The nails are poured using a template to achieve the desired length.',
      imageUrl: 'img/service_3.jpg',
      modalText:
        'This technique uses builder gels to strengthen nails. The length of the nail is obtained by pouring the gel over a template that is placed under the nail.',
    },
    {
      heading: 'Nail extension tips!',
      text:
        'Nail extension look very nice. By upgrading, you will achieve the length and shape of your nails as you want.',
      imageUrl: 'img/service_4.jpg',
      modalText:
        'The procedure begins with the preparation of the nail for the upgrade, then the nail surface is filtered and tips are glued to such a nail. The tip is shaped and shortened to the desired length. The gel is then applied and dried under a UV lamp. Your nails will be tidy until the next correction.',
    },
    {
      heading: 'The Russian manicure!',
      text:
        'Among the large list of services for nail care and hand skin in salon NailZ, you can choose a hardware manicure.',
      imageUrl: 'img/service_5.jpg',
      modalText:
        'The process is to use an electronic file with very fine bits to file off the living skin around the nail plate. They also file off the dead cuticle skin on the nail plate.',
    },
    {
      heading: 'Medical pedicure!',
      text:
        'Medical pedicure implies medical treatment of feet and nails and it is necessary for thorough treatment of feet ichthyosis, tinea pedis, thick nail plates.',
      imageUrl: 'img/service_6.jpg',
      modalText:
        'The feet are soaked in a special bath with smelling salt. The use of protective hygienic bag is mandatory as it preserves the bath sterility. Pedicure bath provides ozone vibration massage which disinfects the feet. After a 10 minute bath, the first step of pedicure treatment is deep foot scrubbing. The second phase implies nail clipping and shaping. After this procedure, feet and toenails are disinfected and moisturized by special protective cream which is applied by a pleasant massage. The treatment is very pleasant, lasts for 90 minutes and is performed by highly trained medical nurse who uses sterile instruments, thus preventing infections and diseases of feet and nail skin.',
    },
  ],
};

function createServices() {
  // Single part
  const containerSingle = document.getElementById('services-single-content');

  containerSingle.getElementsByTagName('h4')[0].innerHTML =
    servicesData.mainHeading;

  containerSingle.getElementsByTagName('p')[0].innerHTML =
    servicesData.helperText;

  containerSingle.getElementsByTagName('a')[0].innerHTML =
    servicesData.buttonText;

  // Repeating part
  const containerRepeating = document.getElementById(
    'services-repeating-content'
  );
  let items = '';

  const forLoopEnd =
    servicesData.services.length > 4 ? 4 : servicesData.services.length;

  for (let index = 0; index < forLoopEnd; index++) {
    items += `<div class="col-md-6">
      <div class="service-item" data-toggle="modal" data-target="#exampleModal" data-image="${servicesData.services[index].imageUrl}" data-heading="${servicesData.services[index].heading}" data-text="${servicesData.services[index].modalText}">
        <h4>${servicesData.services[index].heading}</h4>
        <div class="line-dec"></div>
        <p>
          ${servicesData.services[index].text}
        </p>
      </div>
    </div>`;
  }

  if (servicesData.services.length > 4) {
    items += `<div class="col-12">
      <div class="service-item clickable" onclick="showMoreServices()">
      <span>Show more</span>
      </div>
      </div>`;
  }

  containerRepeating.innerHTML = items;
}

function showMoreServices() {
  const containerRepeating = document.getElementById(
    'services-repeating-content'
  );

  containerRepeating.removeChild(containerRepeating.lastChild);

  let items = '';

  for (let index = 4; index < servicesData.services.length; index++) {
    items += `<div class="col-md-6">
          <div class="service-item" data-toggle="modal" data-target="#exampleModal" data-image="${servicesData.services[index].imageUrl}" data-heading="${servicesData.services[index].heading}" data-text="${servicesData.services[index].modalText}">
            <h4>${servicesData.services[index].heading}</h4>
            <div class="line-dec"></div>
            <p>
              ${servicesData.services[index].text}
            </p>
          </div>
        </div>`;
  }

  items += `<div class="col-12">
      <div class="service-item clickable" onclick="createServices()">
      <span>Show less</span>
      </div>
      </div>`;

  containerRepeating.insertAdjacentHTML('beforeEnd', items);
}

createServices();

// ********************************************************

// PORTFOLIO

const portfolioData = [
  {
    imageUrl: 'img/1st-big-item.jpg',
    previewUrl: 'img/1st-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Gel nail extension',
  },
  {
    imageUrl: 'img/2nd-big-item.jpg',
    previewUrl: 'img/2nd-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Gel polish',
  },
  {
    imageUrl: 'img/3rd-big-item.jpg',
    previewUrl: 'img/3rd-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Nail extension tips',
  },
  {
    imageUrl: 'img/4th-big-item.jpg',
    previewUrl: 'img/4th-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Gel polish',
  },
  {
    imageUrl: 'img/5th-big-item.jpg',
    previewUrl: 'img/5th-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Gel nail extension',
  },
  {
    imageUrl: 'img/6th-big-item.jpg',
    previewUrl: 'img/6th-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Gel polish',
  },
  {
    imageUrl: 'img/7th-big-item.jpg',
    previewUrl: 'img/7th-item.jpg',
    alt: 'crveni nokti',
    mainText: ' NailZ',
    subText: 'Nail extension tips',
  },
  {
    imageUrl: 'img/8th-big-item.jpg',
    previewUrl: 'img/8th-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Gel polish',
  },
  {
    imageUrl: 'img/9th-big-item.jpg',
    previewUrl: 'img/9th-item.jpg',
    alt: 'crveni nokti',
    mainText: 'NailZ',
    subText: 'Gel nail extension',
  },
];

function createPortfolio() {
  const container = document.getElementById('owl-gallery');
  let items = '';

  portfolioData.map((item, index) => {
    items += `<div class="item">
        <div class="testimonials-item">
          <a href="${item.imageUrl}" data-lightbox="image-${index + 1}"
            ><img src="${item.previewUrl}" alt="${item.alt}"
          /></a>
          <div class="text-content">
            <h4>${item.mainText}</h4>
            <span>${item.subText}</span>
          </div>
        </div>
        </div>`;
  });

  container.innerHTML = items;
}

createPortfolio();

// ********************************************************

// About

const aboutData = {
  nav: ['1997', '2003 - 2011', '2011 - 2015', '2015'],
  tabContent: [
    {
      imgUrl: 'img/1st-tab.jpg',
      alt: 'isidora',
      text:
        'Hi, My Name is Isidora Nikolić, I was born on the 26th of June 1997. I live in the Nova Pazova.',
    },
    {
      imgUrl: 'img/2nd-tab.jpg',
      alt: 'osnovna skola nova pazova',
      text: 'I started primary school in 2003 and graduated in 2011.',
    },
    {
      imgUrl: 'img/3rd-tab.jpg',
      alt: 'vazduhoplovna akademija beograd',
      text: 'After elementary school in 2011 i started Aviation academy.',
    },
    {
      imgUrl: 'img/4th-tab.jpg',
      alt: 'visa ict beograd',
      text:
        "After graduating from high school, I started studying at 'Visoka ICT' school, and until graduation I am separated by two exams.",
    },
  ],
};

function createAbout() {
  const containerTabs = document.getElementById('nav-tab');
  let tabItems = '';

  aboutData.nav.map((item, index) => {
    tabItems += `<li>
      <a
        class="nav-item nav-link ${index === 0 ? 'active' : ''}"
        id="tab${index}-tab"
        data-toggle="tab"
        href="#tab${index}"
        role="tab"
        aria-controls="tab${index}"
        aria-selected="true"
        >${item}</a
      >
      </li>`;
  });

  containerTabs.innerHTML = tabItems;

  const containerContent = document.getElementById('first-tab-group');
  let contantItems = '';

  aboutData.tabContent.map((item, index) => {
    contantItems += `<div
        class="tab-pane fade show ${index === 0 ? 'active' : ''}"
        id="tab${index}"
        role="tabpanel"
        aria-labelledby="tab${index}-tab"
        >
        <img src="${item.imgUrl}" alt="${item.alt}" />
        <p>
          ${item.text}
        </p>
        </div>`;
  });

  containerContent.innerHTML = contantItems;
}

createAbout();

// ********************************************************

// FOOTER

const footerData = {
  buttonText: 'Back to top',
  social: [
    {
      url: 'https://www.facebook.com/',
      icon: './img/facebook.svg',
      alt: 'facebook icon',
    },
    {
      url: 'https://twitter.com/',
      icon: './img/twitter.svg',
      alt: 'twitter icon',
    },
    {
      url: 'https://www.linkedin.com/',
      icon: './img/linkedin.svg',
      alt: 'linkedin icon',
    },
    {
      url: 'https://www.instagram.com/',
      icon: './img/instagram.svg',
      alt: 'dribble icon',
    },
  ],
};

const footerAssets = [
  {
    name: 'main.js',
    href:
      'https://isidoranikolic.github.io/web-programiranje1-nails-studio/js/main.js',
  },
  {
    name: 'plugins.js',
    href:
      'https://isidoranikolic.github.io/web-programiranje1-nails-studio/js/plugins.js',
  },
  {
    name: 'main.css',
    href:
      'https://isidoranikolic.github.io/web-programiranje1-nails-studio/css/main.css',
  },
  {
    name: 'robots.txt',
    href:
      'https://isidoranikolic.github.io/web-programiranje1-nails-studio/robots.txt',
  },
  {
    name: 'sitemap',
    href:
      'https://isidoranikolic.github.io/web-programiranje1-nails-studio/sitemap.xml',
  },
  {
    name: 'Docs',
    href:
      'https://isidoranikolic.github.io/web-programiranje1-nails-studio/dokumentacija.pdf',
  },
];

function createFooter() {
  const container = document.getElementById('social-content');
  let items = '';

  footerData.social.map((item) => {
    items += `<li>
        <a href="${item.url}" target="_blank">
        <img src="${item.icon}" alt="${item.alt}" />
          </a>
        </li>`;
  });

  container.innerHTML = items;

  const footerButton = document.getElementById('footer-button');

  footerButton.innerHTML = footerData.buttonText;

  const containerMenuAssets = document.getElementById('footer-menu-assets');
  let assetsItems = '';

  footerAssets.map((item) => {
    assetsItems += `<li class="nav-item">
      <a class="nav-link" target="_blank" href="${item.href}"><span>${item.name}</span></a>
      </li>`;
  });

  containerMenuAssets.innerHTML = assetsItems;

  const containerMenuLinks = document.getElementById('footer-menu-links');
  let menuItems = '';

  menuData.map((item) => {
    menuItems += `<li class="nav-item">
      <a class="nav-link" href="#${item.href}"><span>${item.text}</span></a>
      </li>`;
  });

  containerMenuLinks.innerHTML = menuItems;
}

createFooter();

const colors = [
  { name: 'Pearl White', code: '#ffffff' },
  { name: 'Black', code: '#000000' },
  { name: 'Medium Slate Blue', code: '#18184e' },
  { name: 'Fire Brick', code: '#751515' },
  { name: 'Plum', code: '#7e3e79' },
  { name: 'Orchid', code: '#751540' },
  { name: 'Dark Orchid', code: '#440d87' },
  { name: 'Navy', code: '#001252' },
  { name: 'Cadet Blue', code: '#0a383e' },
  { name: 'Medium Sea Green', code: '#317d4b' },
  { name: 'Olive', code: '#6e7510' },
  { name: 'Goldenrod', code: '#aa813c' },
  { name: 'Hard Red', code: '#cd0707' },
  { name: 'Olive Drab', code: '#377237' },
  { name: 'Deep Sky Blue', code: '#0793cf' },
];

function createColors() {
  const container = document.getElementById('colors-block');
  let items = '';

  colors.map((color) => {
    items += ` <div style="background-color: ${color.code}" data-color="${color.code}" title="${color.name}"></div>`;
  });

  container.innerHTML = items;
}

createColors();
