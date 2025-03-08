window.onload = function() {
    $('#onload').fadeIn();
    $('body').addClass('hidden');
    setTimeout(function() {
        alert('Pagina cargada completamente');
        $('#onload').fadeOut();
        $('body').removeClass('hidden');
    }, 3000); // 3 segundos
}
