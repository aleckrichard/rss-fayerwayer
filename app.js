const RSS_URL = 'http://localhost:3000/fetch-xml';

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {

    console.log(data);


    const channelTitle = data.querySelector("channel > title")?.textContent;
    const channelLink = data.querySelector("channel > link")?.textContent;
    const lastBuildDate = data.querySelector("channel > lastBuildDate")?.textContent;
    console.log(`Titulo  del canal: ${channelTitle}`);
    console.log(`Link: ${channelLink}`);
    console.log(`last Build Date: ${lastBuildDate}`);

    document.getElementById("title").innerHTML = channelTitle;
    document.getElementById("link").innerHTML = channelLink;
    document.getElementById("updated").innerHTML = lastBuildDate;

    // Obtener los elementos <item>
    const items = data.getElementsByTagName("item");
    const listElement = document.getElementById("rss-list");

    if (!listElement) {
      console.error("Elemento con id 'rss-list' no encontrado.");
      return;
    }

    Array.from(items).forEach(item => {
      const title = item.getElementsByTagName("title")[0]?.textContent || "Sin título";
      const contentElement = item.getElementsByTagName("content:encoded")[0];
      const content = contentElement ? contentElement.textContent : "Sin contenido";

      // Convertir el contenido HTML de content:encoded en un DOM y agregar la clase img-fluid a las imágenes
      const contentHTML = contentElement ? contentElement.innerHTML : "Sin contenido";
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = contentHTML;
      
      // Agregar la clase "img-fluid" a todas las imágenes dentro del contenido
      const images = tempDiv.querySelectorAll("img");
      images.forEach(img => {
        img.classList.add("img-fluid");  // Clase de Bootstrap para hacerlo responsivo
      });

      const col = document.createElement("div");
      col.classList.add("col-md-4", "mb-4");

      const card = document.createElement("div");
      card.classList.add("card", "h-100");

      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <div class="card-text">${tempDiv.innerHTML}</div>
        </div>
      `;

      col.appendChild(card);
      listElement.appendChild(col);
    });
  })
  .catch(error => console.error("Error al procesar el XML:", error));