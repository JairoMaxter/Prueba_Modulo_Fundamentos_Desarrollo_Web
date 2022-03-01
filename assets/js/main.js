$(document).ready(function () {

    $("form").submit(function (event) {

        event.preventDefault();

        let valueInput = $("#heroeInput").val();

        $.ajax({
            url: "https://superheroapi.com/api.php/4905856019427443/" + valueInput,
            success: function (data) {
                console.log(data)

                let name = data.name;
                let appearance = data.appearance;
                let biography = data.biography;
                let image = data.image.url;
                let powerstats = data.powerstats;
                let work = data.work;

                $("#heroInfo").html(`
                    <div class="card" style="width: 18rem;">
                        <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">contenido pendiente</p>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">Genero: ${appearance.gender}</li>
                        <li class="list-group-item">raza: ${appearance.race}</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                        </ul>
                        <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>
                 `);
            },
        });
    });
});