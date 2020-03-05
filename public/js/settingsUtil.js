$(document).ready(function(){
    initSettings();
})

function initSettings(){
    $('#changePercentBtn').submit(function (e){
        e.preventDefault();
        let upPct = $('upPercent').val();
        let dwnPct = $('downPercent').val();
        $.post('changePercents', {upPercent : upPct, downPercent: dwnPct}, (res) => {
            console.log(res);
        })
        $.get('settings');
        window.location.href = ('/settings');
    })
}

function changePcts(){
   var upPct = $('upPercent').val();
   var dwnPct = $('downPercent').val();
    $.post('changePercents', {upPercent : upPct, downPercent: dwnPct}, (res) => {
        console.log(res);
    })
    console.log(dwnPct);
    $('#pctDecreaseLabel').text(`Current Percent Decrease: ${dwnPct}`);
}