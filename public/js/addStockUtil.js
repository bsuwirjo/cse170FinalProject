

$(document).ready(function(){
    console.log('page');
  initButton();
})

function initButton(){
    $('#addStockForm').submit(function (e) {
        e.preventDefault();
        var stockName = $('#stockName').val();
        $('.listgroup ul').append(`<li class="list-group-item stock" <div class="stock">${stockName}
        </div>
        </li>`)
      
        $.post('addNewStock', {symbol: stockName}, (e, res) =>{
            console.log(res);
        });
        $.get('addStock');
        window.location.href = ('addStock');
        // Add something to check response, if not valid, alert the user to try again otherwise say it was successful
    }) 
}


