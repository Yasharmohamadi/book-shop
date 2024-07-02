// This array includes all our Products.
let allItems = [
    {id: 1, name: 'توپ های ماه اوت', price: '180000', src: './img/toophaye-mahe-ot.jpeg', count: 1},
    {id: 2, name: 'استالین', price: '210000', src: './img/estalin.webp', count: 1},
    {id: 3, name: 'ورشو 1920', price: '160000', src: './img/varsho.jpg', count: 1},
    {id: 4, name: 'صلحی که همه صلح هارا', price: '150000', src: './img/solhi-ke.jpg', count: 1},
    {id: 5, name: 'شاهنشاه', price: '280000', src: './img/shahanshah.webp', count: 1},
    {id: 6, name: 'سلام اول', price: '220000', src: './img/salame-aval.webp', count: 1},
    {id: 7, name: 'خاطرات یک ابله سیاسی', price: '170000', src: './img/khaterat.webp', count: 1},
    {id: 8, name: 'جاسوسی که سقوط کرد', price: '200000', src: './img/jasoosi.webp', count: 1},
    {id: 9, name: 'به سوی ایستگاه فنلاند', price: '130000', src: './img/be-soye-istgah.webp', count: 1}
];
// This array is for storage basl=ket items.
let userBasket = [];

const $ = document;
const itemsContainer = $.querySelector('.items');
const basketItemsContainer = $.querySelector('.tbody');
const basketTitleElement = $.querySelector('.basket_title');
const basketSection = $.querySelector('.basket');
const emptyBasketButton = $.querySelector('.final_basket_empty');
const submitShoppingButton = $.querySelector('.final_btn_elem');
const totalPriceElement = $.querySelector('.final_num');

let itemContainerFlagment = $.createDocumentFragment();
let basketItemFlagment = $.createDocumentFragment();

// Here we create HTML tag with allItems arraty and append to index.
allItems.forEach(function (item) {
    let itemContainer = $.createElement('div');
    itemContainer.classList.add('item');
    
    let itemImage = $.createElement('img');
    itemImage.classList.add('item_image');
    itemImage.src = item.src;
    
    let itemTitle = $.createElement('h3');
    itemTitle.classList.add('item_title');
    itemTitle.innerHTML = item.name;
    
    let itemPriceContainer = $.createElement('div');
    itemPriceContainer.classList.add('item_price_container');
    
    let itemPrice = $.createElement('p');
    itemPrice.classList.add('item_price');
    itemPrice.innerHTML = item.price;
    
    let itemUnit = $.createElement('span');
    itemUnit.classList.add('item_unit');
    itemUnit.innerHTML = 'تومان';
    
    let itemButton = $.createElement('button');
    itemButton.classList.add('item_btn');
    itemButton.innerHTML = 'افزودن به سبد خرید';
    itemButton.addEventListener('click', function() {
        addToBasketArray(item, item.id);
    });
    
    // price number and price unit added to price container.
    itemPriceContainer.append(itemPrice, itemUnit);
    // all detail added to item container.
    itemContainer.append(itemImage, itemTitle, itemPriceContainer, itemButton);
    // item container added to items section.
    itemContainerFlagment.append(itemContainer);  
    
});
itemsContainer.append(itemContainerFlagment);  

// this function run when user click on add to basaket btn and push target item to basket array.
function addToBasketArray(item, itemId) {
    let hasItem = userBasket.some(function(item) {
        return item.id == itemId;
    });

    if(hasItem) {
        item.count ++;
        createBasketItem(userBasket);
        calcTotalPrice(userBasket);
    } else {
        userBasket.push(item);
        createBasketItem(userBasket);
        calcTotalPrice(userBasket);
    };
};

// this function run when user item add to basket array and create basket item from new basket array.
function createBasketItem(userBasket) {
    basketItemsContainer.innerHTML = "";

    userBasket.forEach(function (item) {
        
        let basTr;
        basTr = $.createElement('tr');
        basTr.classList.add('goods_rows');    
        
        let basImgTd;
        basImgTd = $.createElement('td');
        
        let basImg;
        basImg = $.createElement('img');
        basImg.classList.add('basket_img');
        basImg.src = item.src;
        basImgTd.append(basImg);
        
        let basName;
        basName = $.createElement('td');
        basName.innerHTML = item.name;
        
        let basPriceContainer;
        basPriceContainer = $.createElement('td');
        basPriceContainer.classList.add('basket_price_container');
        
        let basNum;
        basNum = $.createElement('p');
        basNum.classList.add('basket_num');
        basNum.innerHTML = item.price;
        
        let basUnit;
        basUnit = $.createElement('p');
        basUnit.classList.add('basket_unit');
        basUnit.innerHTML = 'تومان';
        basPriceContainer.append(basNum, basUnit);
        
        let basInputTd;
        basInputTd = $.createElement('td');
        
        let basInput;
        basInput = $.createElement('input');
        basInput.classList.add('basket_input');
        basInput.type = 'number';
        basInput.value = item.count;
        basInput.min = '1';
        basInput.max = '9';
        basInput.addEventListener('change', function() {
            changeCountInput(item, basInput.value)
        });
        basInputTd.append(basInput);
        
        let basDelTd;
        basDelTd = $.createElement('td');
        
        let basDel;
        basDel = $.createElement('button');
        basDel.classList.add('basket_del_button');
        basDel.innerHTML = 'حذف';
        basDel.addEventListener('click', function() {
            removeBasketItem(item.id);
        });
        basDelTd.append(basDel);
        
        basTr.append(basImgTd, basName, basPriceContainer, basInputTd, basDelTd)
        basketItemFlagment.append(basTr);
        
        // this function remove hidden class, hidden class add to basket item for hidden item when basket is empty.
        showBasket();
    });
    basketItemsContainer.append(basketItemFlagment);
};

// this function run when user click on remove button and define a new basket array for new basket item. and old basket array equal to new basket array than call createBasketItem function.
function removeBasketItem(itemId) {
    let itemDeleteIndex = userBasket.findIndex(function(item) {
        return item.id == itemId;
    });

    userBasket.splice(itemDeleteIndex, 1);

    calcTotalPrice(userBasket);
    createBasketItem(userBasket);

    if(userBasket.length == 0) {
        hiddenBasket();
    };
};

// this function remove hidden class, hidden class add to basket item for hidden item when basket is empty.
function showBasket() {
    basketTitleElement.classList.remove('hidden');
    basketSection.classList.remove('hidden');
};

// this function addded hidden class, hidden class remove from basket item for show item when basket is busy.
function hiddenBasket() {
    basketTitleElement.classList.add('hidden');
    basketSection.classList.add('hidden');
};

// this function run when user click on empty basket button, than this function user basket array equal to empty array and call create basket item function.
function emptyBasketHandler() {
    userBasket = [];
    createBasketItem(userBasket);
    hiddenBasket();
};

// this function create fir a JOKE. when user click on submit buyying web alert run and show to he/she : you are dont reading book so why you want to buyying?
function submitShoppingHandler() {
    alert('حالا مثلا خریدی ، میخونی؟ :(');
};

// this function calculate total basket price.
function calcTotalPrice(userBasket) {
    let totalPriceValue = 0;
    
    userBasket.forEach(function(item) {
        totalPriceValue += item.count * item.price;
    });
    totalPriceElement.innerHTML = totalPriceValue;
};

function changeCountInput(item, basInputValue) {
    item.count = basInputValue;
    calcTotalPrice(userBasket);

};

emptyBasketButton.addEventListener('click', emptyBasketHandler);
submitShoppingButton.addEventListener('click', submitShoppingHandler);