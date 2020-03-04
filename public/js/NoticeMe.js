

$(document).ready(function(){
    console.log('page');
  initButton();
})

function initButton(){
    $('#addStockForm').submit(function (e) {
        e.preventDefault();
        console.log('adding listener');
        var stockName = $('#stockName').val();
        $.post('addNewStock', {symbol: stockName}, (res) => {console.log(res)});
    }) 
}
