// https://api.blablagues.net/?rub=blagues

function fetchBlagues(){
    questionDisplay.textContent = "";
    reponseDisplay.textContent ="";

    fetch("https://api.blablagues.net/?rub=blagues")
    .then((response) => response.json())
    .then((data)=>
    {
        let content = data.data.content;
        let question = content.text_head;
        let reponse = content.text?content.text : content.text_hidden;

        questionDisplay.textContent = question;
        reponseDisplay.textContent = reponse;
    }
    )
}
fetchBlagues();

document.body.addEventListener("click",fetchBlagues);