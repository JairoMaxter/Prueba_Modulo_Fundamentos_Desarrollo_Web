/*
    Autor: Jairo Rodriguez
    Fecha: 06-03-2022
    version: 1.0.0.0
*/
$(document).ready(function () {

    function validar(input) {
        if (input == '') {
            alert("Debe ingresar un número");
            return false;
        } else if (parseInt(input) < 1 || parseInt(input) > 732) {
            alert("El numero debe ser mayor a 0 y menor a 732");
            return false;
        } else if (!isNaN(parseInt(input))) {
            return true;
        } else {
            alert("Solo puede ingresar números");
            return false;
        }
    }

    $("form").submit(function (event) {

        event.preventDefault();

        let valueInput = $("#heroeInput").val();

        if (validar(valueInput)) {

            $.ajax({
                url: "https://superheroapi.com/api.php/4905856019427443/" + valueInput,
                success: function (data) {
                    console.log(data)

                    //Nombre del heroe
                    let name = data.name;

                    //Datos de Apariencia del heroe
                    let appearance = data.appearance;
                    let gender = appearance.gender;
                    let race = appearance.race;
                    let heightArray = appearance.height;
                    let weightArray = appearance.weight;
                    let eyeColor = appearance["eye-color"];
                    let hairColor = appearance["hair-color"];
                    
                    let appearanceArray = [gender, race, heightArray[1], weightArray[1], eyeColor, hairColor];

                    //Datos Biograficos del heroe
                    let biography = data.biography;
                    let fullName = biography["full-name"];
                    let alterEgos = biography["alter-egos"];
                    let aliasesArray = biography.aliases;
                    let placeOfBirth = biography["place-of-birth"];
                    let firstAppearance = biography["first-appearance"];
                    let publisher = biography.publisher;
                    let alignment = biography.alignment;

                    let biographyArray = [fullName, alterEgos, aliasesArray[1], firstAppearance, publisher, alignment];

                    //Imagen principal del heroe
                    let image = data.image.url;

                    //Estadisticas de Poder del heroe
                    let powerstats = data.powerstats;
                    let intelligence = parseInt(powerstats.intelligence);
                    let strength = parseInt(powerstats.strength);
                    let speed = parseInt(powerstats.speed);
                    let durability = parseInt(powerstats.durability);
                    let power = parseInt(powerstats.power);
                    let combat = parseInt(powerstats.combat);

                    let powerstatsArray = [intelligence, strength, speed, durability, power, combat];

                    //Trabajo y/o Base del heroe
                    let work = data.work;
                    let occupation = work.occupation;
                    let base = work.base;

                    let workArray = [occupation, base];

                    //Conecciones y grupo al que pertenece el heroe
                    let connections = data.connections;
                    let groupAffiliation = connections["group-affiliation"];
                    let relatives = connections.relatives;

                    let connectionsArray = [groupAffiliation, relatives];

                    let dataArray = [appearance, biography, work, connections, powerstats];            

              
                    //Tarjeta con datos del heroe
                    $("#heroInfo").html(`
                    <div class="card" style="width: 100%;">
                        <div class="row">

                            <!--Columna de Imagen y Nombre-->

                            <div class="col">
                                <img src="${image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text"><b>Alias</b>: ${biography.aliases}</p>
                                </div>
                            </div>

                            <!--Columna de Botones Info-->

                            <div class="col">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <button data-bs-toggle="collapse" data-bs-target="#demo1" class="btn btn-light">Appearance</button>
                                        <div id="demo1" class="collapse">                           
                                            <p><b>Gender:</b> ${gender}, <b>Race:</b> ${race}, <b>Height:</b> ${heightArray[1]}, <b>Weight:</b> ${weightArray[1]}, <b>Eye Color:</b> ${eyeColor}, <b>Hair Color:</b> ${hairColor}</p>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                    <button data-bs-toggle="collapse" data-bs-target="#demo2" class="btn btn-light">Biography</button>
                                        <div id="demo2" class="collapse">                           
                                            <p><b>FullName:</b> ${fullName}, <b>AlterEgos:</b> ${alterEgos}, <b>Aliases:</b> ${aliasesArray}, <b>Place Of Birth:</b> ${placeOfBirth}, <b>First Appearance:</b> ${firstAppearance}, <b>Publisher:</b> ${publisher}, <b>Alignment:</b> ${alignment}</p>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                    <button data-bs-toggle="collapse" data-bs-target="#demo3" class="btn btn-light">Work</button>
                                        <div id="demo3" class="collapse">                           
                                            <p><b>Occupation:</b> ${occupation}, <b>Base:</b> ${base}</p>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                    <button data-bs-toggle="collapse" data-bs-target="#demo4" class="btn btn-light">Connections</button>
                                        <div id="demo4" class="collapse">                           
                                            <p><b>Group Affiliation:</b> ${groupAffiliation}, <b>Relatives:</b> ${relatives}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="card-body">
                                <!-- <form>
                                        <button class="btn btn-primary mx-auto my-3 ">Back</button>
                                        <button class="btn btn-primary mx-auto my-3 ">Next</button>
                                    </form> -->
                                </div>
                            </div>
                        </div>    
                    </div>
                 `);

                    let chart = new CanvasJS.Chart("chartContainer", {
                        theme: "light2", // "light1", "light2", "dark1", "dark2"
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `Power stats of ${name}`
                        },
                        data: [{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}%",
                            dataPoints: [
                                { y: (100 * intelligence / (intelligence + strength + speed + durability + power + combat)).toFixed(2), label: "Intelligence" },
                                { y: (100 * strength / (intelligence + strength + speed + durability + power + combat)).toFixed(2), label: "Strength" },
                                { y: (100 * speed / (intelligence + strength + speed + durability + power + combat)).toFixed(2), label: "Speed" },
                                { y: (100 * durability / (intelligence + strength + speed + durability + power + combat)).toFixed(2), label: "Durability" },
                                { y: (100 * power / (intelligence + strength + speed + durability + power + combat)).toFixed(2), label: "Power" },
                                { y: (100 * combat / (intelligence + strength + speed + durability + power + combat)).toFixed(2), label: "Combat" }
                            ]
                        }]
                    });
                    chart.render();
                },
            });
        }
    });
});

