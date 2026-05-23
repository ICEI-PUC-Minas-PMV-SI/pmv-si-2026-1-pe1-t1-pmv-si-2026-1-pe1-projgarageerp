const menus = document.querySelectorAll(".menu");

menus.forEach(menu => {

    const button = menu.querySelector(".form-select");

    const options = menu.querySelectorAll(".option");

    button.addEventListener("click", function(){

        menu.classList.toggle("active");

    });

    options.forEach(option => {

        option.addEventListener("click", function(e){

            e.preventDefault();

            button.textContent = this.textContent;

            menu.classList.remove("active");

            console.log(this.textContent);

        });

    });

});
