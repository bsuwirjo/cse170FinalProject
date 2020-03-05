$(document).ready(function(){
    initSettings();
})

function initSettings(){
}

function changePcts(){
    ga('send', 'event', 'updates', 'submit');
   var upPct = $('#upPercent').val();
   var dwnPct = $('#downPercent').val();
   alert(`You have updated change Percent: New up ${upPct}, New down ${dwnPct}`);
    $.post('changePercents', {upPercent : upPct, downPercent: dwnPct}, (res) => {
        console.log(res);
    })
    $('#pctDecreaseLabel').text(`Current Percent Decrease: ${dwnPct}`);
    $('#pctIncreaseLabel').text(`Current Percent Decrease: ${upPct}`);
    $('#upPercent').val("Enter Value between 0 - 100");
    $('#downPercent').val("Enter Value between 0 - 100");
}