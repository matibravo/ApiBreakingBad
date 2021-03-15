console.log("Hola soy Matías xD");

const $fragmento = document.createDocumentFragment(),
      $template = document.getElementById("template-card").content,
      $contenedorTarjetas = document.querySelector(".container-cards"),
      $btnUp = document.querySelector(".btnUp");

const getAll = async ()=>{

    try {
        let respuesta = await fetch("https://breakingbadapi.com/api/characters"),
            json = await respuesta.json();

            console.log(respuesta, json);

            if(!respuesta.ok) throw { codigo: respuesta.status, texto: respuesta.statusText};

            json.forEach(element => {
                //template

                $template.querySelector(".info").id = element.char_id;
                $template.querySelector("img").setAttribute("src", element.img);
                $template.querySelector(".id").textContent = `Id: ${element.char_id}`;
                $template.querySelector(".nombre").textContent = `Nombre: ${element.name}`;
                $template.querySelector(".alias").textContent = `Alias: ${element.nickname}`;
                $template.querySelector(".cumpleanio").textContent = `Nació: ${element.birthday}`;
                $template.querySelector(".ocupacion").textContent = `Ocupación: ${element.occupation}`;
                $template.querySelector(".temporada").textContent = `Temporadas: ${element.appearance}`;
                $template.querySelector(".estado").textContent = `Estado: ${element.status}`;    
                
                

                let $clone = document.importNode($template, true);
                $fragmento.appendChild($clone);             
                
            });

            $contenedorTarjetas.appendChild($fragmento);

            

                    
    } catch (error) {

        let mensaje = error.texto  || "Ocurrio un error";
            console.log(`Error: ${error.codigo} - ${mensaje}`);
        
    }
}


document.addEventListener("DOMContentLoaded", getAll);


document.addEventListener("keyup", e=>{

    //console.log(e.target.value.toLowerCase());

    if(e.key === "escape") e.target.value = "" ;

    document.querySelectorAll(".cards").forEach(element =>{
        //console.log(element.textContent); //me trae el texto q contiene el elemento

        (element.textContent.toLowerCase().includes(e.target.value))
        ? element.classList.remove("oculto")
        :element.classList.add("oculto");
        
    });

    
});

document.addEventListener("touchend", e=>{

    if(e.target.matches(".busqueda")){
        document.querySelectorAll(".cards").forEach(element =>{
            //console.log(element.textContent); //me trae el texto q contiene el elemento
    
            (element.textContent.toLowerCase().includes(e.target.value))
            ? element.classList.remove("oculto")
            :element.classList.add("oculto");
            
        });
    }   
    
});

window.addEventListener("scroll", e=>{

    //console.log(scrollY);
    
    (window.scrollY > 400)
    ? $btnUp.classList.remove("ocultar")
    : $btnUp.classList.add("ocultar");   
    
    document.addEventListener("click", e=>{    

        if(e.target === $btnUp){        
            //console.log($btnUp);    
            window.scroll(0,0);
        }
    });
});
