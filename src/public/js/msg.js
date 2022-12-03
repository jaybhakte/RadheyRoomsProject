var upbtn  = document.getElementById('upbtn');
var msgDiv = document.getElementById('listMsg')

var setMsg = 'success';

var msg = `<div class="alert alert-${setMsg} alert-dismissible fade show" role="alert">
<strong>Updated Successfully !!</strong>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

upbtn.addEventListener('click',function(){
    msgDiv.innerHTML = msg;
})

