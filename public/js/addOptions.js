
$(document).ready(()=>{
   var select = '';
for (i=1;i<=100;i++){
    select += '<option val=' + i + '>' + i + '</option>';
}
$('#UpSelector').html(select);
$('#DownSelector').html(select);
});