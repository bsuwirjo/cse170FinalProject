$(document).ready(function(){
    initSettings();
})

function initSettings(){
}

function changePcts(){
    ga('send', 'event', 'updates', 'submit');
   var upPct = $('#upPercent').val();
   var dwnPct = $('#downPercent').val();
   if (upPct > 100 || upPct < 0){
       alert('Please update percent to be in range');
       $('#upPercent').val("Enter Value between 0 - 100");
       $('#downPercent').val("Enter Value between 0 - 100");
       return;
   } else if (dwnPct > 100 || dwnPct < 0){
       alert('Please update percent to be in range');
       $('#upPercent').val("Enter Value between 0 - 100");
       $('#downPercent').val("Enter Value between 0 - 100");
       return;
   }
   alert(`You have updated change Percent: New up ${upPct}, New down ${dwnPct}`);
    $.post('changePercents', {upPercent : upPct, downPercent: dwnPct}, (res) => {
    })
    $('#pctDecreaseLabel').text(`Current Percent Decrease: ${dwnPct}`);
    $('#pctIncreaseLabel').text(`Current Percent Decrease: ${upPct}`);
    $('#upPercent').val("Enter Value between 0 - 100");
    $('#downPercent').val("Enter Value between 0 - 100");
}