$(() => {
    $(".drop-menu").accordion({
        active: false,
        collapsible: true
    });
    $(".drop-menu").on('click', (event) => {
        if ($('.drop-arrow').text() === "▸")
            $('.drop-arrow').text('▾');
        else
        $('.drop-arrow').text('▸');

    });
    
});
