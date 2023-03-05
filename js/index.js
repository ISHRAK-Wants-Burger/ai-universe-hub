const datalimit = 6;

const loadAiUniverse = async (datalimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAi(data.data.tools, datalimit);
}

const displayAi = (aiUniverses, datalimit) => {

    // console.log(aiUniverses[0].id);
    const aiContainer = document.getElementById('ai-container');
    const seeMore = document.getElementById('see-more');

    if (datalimit && aiUniverses.length > 6) {
        aiUniverses = aiUniverses.slice(0, 6);
        seeMore.classList.remove('d-none');
    }
    else {
        seeMore.classList.add('d-none');
        aiContainer.textContent = '';
    }

    

    for(const aiUniverse of aiUniverses) {

        const aiUniverseDiv = document.createElement('div');
        aiUniverseDiv.classList.add('col');

        aiUniverseDiv.innerHTML = `
        <div class="card p-3">
            <img src="${aiUniverse.image}" class="card-img-top " alt="...">
            <div class="card-body text-muted">
                    <h5 class="card-title features-title">Features</h5>

                    <ol class="" >
                        <li class="">${aiUniverse.features[0] ? aiUniverse.features[0] : 'Null'}</li>
                        <li class="">${aiUniverse.features[1] ? aiUniverse.features[1] : 'Null'}</li>
                        <li class="">${aiUniverse.features[2] ? aiUniverse.features[2] : 'Null'}</li>
                    </ol>
            </div>
            <!--===================== footer ========= -->
            <div class="card-footer d-flex justify-content-between ">
                <div>
                    <h5 class="class-title p-2">${aiUniverse.name}</h5>
                    <p class="p-2"><i class="fa-regular fa-calendar-days"></i>  ${aiUniverse.published_in}</p>
                </div>
                <div>
                    <button onclick="displayModalDetails('${aiUniverse.id}')" class="btn home-footer mt-3" data-bs-toggle="modal"
                    data-bs-target="#modal-container" href="#"><i class="fa-solid fa-arrow-right"></i></button>
                </div>


             </div>
        </div>
        `;
         aiContainer.appendChild(aiUniverseDiv);
    }
    toggleSpinner(false);
}

// ====spinner

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }

}

// see more function
// const processSeeMore = () => {

//     toggleSpinner(true);
//     loadAiUniverse();
// }

//     see more button call
document.getElementById('btn-see-more').addEventListener('click', function () {
    // processSeeMore();

    toggleSpinner(true);
    loadAiUniverse();
})




//     =======   modal           ===================

const displayModalDetails = async id => {

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalValues(data.data);
}

const displayModalValues = aiUniverse =>{
    const modalDescriptionContainer = document.getElementById('modal-description-container');
    
        
    modalDescriptionContainer.innerHTML = `
    <div  class="modal-content">
    <div>
        <button type="button" class="btn close-modal-btn" data-bs-dismiss="modal"><i class="fa-sharp fa-solid fa-xmark"></i></button>
    </div>
    <div >
        <div class="d-flex flex-column flex-lg-row gap-2 ">
            <div  class="card modal-bg">
                <div class="p-2">
                    <p class="fw-semibold fs-6">${aiUniverse.description}</p>
                </div>

                <div style="" class="d-flex fw-semibold justify-content-center gap-2 mb-3">
                    <div class="border rounded bg-white text-success text-center p-3">
                    ${aiUniverse.pricing?aiUniverse.pricing[0].price!=="No cost"?aiUniverse.pricing[0].price:"Free of cost" : 'Free of Cost'}</div>
                    <div class="border rounded bg-white text-warning text-center p-3">
                    ${aiUniverse.pricing?aiUniverse.pricing[1].price!=="No cost"?aiUniverse.pricing[1].price:"Free of cost" : 'Free of Cost'}</div>
                    <div class="border rounded bg-white text-danger text-center p-3">
                    ${aiUniverse.pricing?aiUniverse.pricing[2].price!=="No cost"?aiUniverse.pricing[2].price:"Free of cost" : 'Free of Cost'}</div> 
                </div>

                <div class="d-flex justify-content-between ">
                    <div>
                        <h4 class="fw-semibold fs-6">Features</h4>
                        <ul style="font-size: small;">
                            ${aiUniverse.features[1] ? `<li>${aiUniverse.features[1].feature_name}</li>` : ''}
                            ${aiUniverse.features[2] ? `<li>${aiUniverse.features[2].feature_name}</li>` : ''}
                            ${aiUniverse.features[3] ? `<li>${aiUniverse.features[3].feature_name}</li>` : ''}
                            ${aiUniverse.features[4] ? `<li>${aiUniverse.features[4].feature_name}</li>` : ''}
                        </ul>
                    </div>
                    <div>
                        <h4 class="fw-semibold fs-6">Integrations</h4>
                        <ul style="font-size: small;">
                            <li>${aiUniverse?.integrations?.length > 0 ? aiUniverse.integrations.join('<li>') : 'No data found'}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="position-relative">
                <img src="${aiUniverse.image_link[0]}" style="height: 50vh;" class="img-fluid" alt="...">

                ${aiUniverse.accuracy.score !== null ? `<button id="accuracy-btn" class="btn btn-danger disabled position-absolute top-0 end-0">${aiUniverse.accuracy.score*100}% Accuracy</button>` : ''}

                <h4 class="pt-3 pb-2">${aiUniverse.input_output_examples ? aiUniverse?.input_output_examples[0]?.input : 'Can you give any example?'}</h4>
                <p>${aiUniverse.input_output_examples ? aiUniverse?.input_output_examples[0]?.output : 'No! Not yet! Take a break!!!'}</p>
            </div>
        </div>
    </div>
    `
}


toggleSpinner(true);
loadAiUniverse(datalimit);

