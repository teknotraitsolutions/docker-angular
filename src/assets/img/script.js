function showhide() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        var element = document.getElementById("eye");
        element.classList.add("fa-eye");
        element.classList.remove("fa-eye-slash");
    } else {
        x.type = "password";
        var element = document.getElementById("eye");
        element.classList.remove("fa-eye");
        element.classList.add("fa-eye-slash");
    }
}

function myFunction(e) {
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });
    e.target.className = "active";
}