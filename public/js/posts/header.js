/******************************************
**** JS Listeners for posts/header.ejs ****
******************************************/

$(() => {
    //Accordion animation for drop-menu
    $(".drop-menu").accordion({
        active: false,
        collapsible: true
    });
    //Changes arrow position based on previous click/state
    $(".drop-menu").on('click', (event) => {
        if ($('.drop-arrow').text() === "▸")
            $('.drop-arrow').text('▾');
        else
            $('.drop-arrow').text('▸');
    });
});
