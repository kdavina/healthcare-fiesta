function homepageSetup(){
    d3.csv("Drug-List.csv").get(
        function(data){
            drugArray = data;
            createCheckboxes(data.map(data => data.GenericName)); // only pass drug's generic names to fcn using mapping: https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
    })

    generateTextBox();
        
    
}

function createCheckboxes(items){
    for (i = 0; i < items.length; i++){
        // https://stackoverflow.com/questions/28678027/create-and-populate-with-dom-a-checkbox-list-with-array-values-in-javascript/28678424
        let sampleDiv = document.createElement("div");
        let checkBox = document.createElement("input");
        let label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.name = "GenericName";
        checkBox.value = items[i];
        label.setAttribute("for", i);
        label.innerHTML = items[i];
        drugList.appendChild(sampleDiv)
        sampleDiv.appendChild(checkBox);
        sampleDiv.appendChild(label);
    };
}

function generateTextBox(){
    changeButtonIcon();
    let divider = document.createElement("div");
    let textInput = document.createElement("input");
    let addButton = document.createElement("button");
    let icon = document.createElement("ion-icon");
    do {newId = Math.floor(Math.random() * 100);}
    while (document.getElementById(newId) && document.getElementById(newId + 1) && document.getElementById(newId + 2));
    divider.id = newId;
    textInput.type = "text";
    textInput.placeholder = "Drug Name";
    textInput.id = newId + 1;
    textInput.className = "inputtedDrugNames";
    addButton.type = "button";
    addButton.onclick = generateTextBox;
    addButton.className = "textBoxButton"
    addButton.id = newId + 2;
    icon.name = "add-outline";
    dynamicDrugList.appendChild(divider);
    divider.appendChild(textInput);
    divider.appendChild(addButton);
    addButton.appendChild(icon);
}

function changeButtonIcon(){
    let dynamicDrugList = document.getElementById("dynamicDrugList");
    let buttonList = dynamicDrugList.getElementsByClassName("textBoxButton");
    let iconList = dynamicDrugList.getElementsByTagName("ion-icon");
    for (i=0; i<iconList.length; i++){
        iconList[i].name = "trash-outline";
        buttonList[i].onclick =  removeDrugTextBox;
    }

function removeDrugTextBox(){
    let deleteDiv = document.getElementById(this.id-2);
    deleteDiv.remove();
}

}
function generateTable(){
    d3.csv("Drug-List.csv").get(
        function(data){
            let drugArray = data;
            // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
            let body = document.getElementsByTagName("body")[0];
            let table = document.createElement("table");
            let tBody = document.createElement("tbody"); 
            // console.log("header names", d3.keys(data[0])); // https://stackoverflow.com/questions/20456232/d3-js-is-there-a-way-to-access-csv-header-values-into-a-dropdown
            let headerRow = document.createElement("tr");
            let headerData = d3.keys(data[0]);
            for (i=0; i< headerData.length; i++){
                let cell = document.createElement("th");
                // console.log("headerData[i]", headerData[i]);
                let cellText = document.createTextNode(headerData[i]);
                cell.appendChild(cellText);
                headerRow.appendChild(cell);
            }
            tBody.appendChild(headerRow);
            let checkedDrugs = document.getElementsByName("GenericName");
            let inputtedDrugNames = [].slice.call(document.getElementsByClassName("inputtedDrugNames")); // convert hTML collection to an Array https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
            inputtedDrugNames = inputtedDrugNames.map( inputtedDrugNames => inputtedDrugNames.value);
            console.log("before inputtedDrugNames", inputtedDrugNames);
            for (drugName of checkedDrugs){
                if (drugName.checked){
                    if (inputtedDrugNames.indexOf(drugName.value) !== -1){inputtedDrugNames.splice(inputtedDrugNames.indexOf(drugName.value),1);}
                    let row = document.createElement("tr");
                    let fetchedGenericName = drugName.value;
                    const drugData = Object.values(data.find(element => element.GenericName === drugName.value));
                    console.log("drugData", drugData);
                    // console.log("parsing individual drug data", d3.keys(drugData));
                    // console.log("drugData.length", drugData.length);
                    for (i=0; i < drugData.length; i++){
                        console.log("entered row")
                        let cell = document.createElement("td");
                        console.log("drugData[i]", drugData[i]);
                        let cellText = document.createTextNode(drugData[i]);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        console.log("cellText", cellText);
                    }
                    tBody.appendChild(row);
                }   
            }
            inputtedDrugNames = inputtedDrugNames.filter ( e => e) ;// strip empty strings
            console.log(inputtedDrugNames);
            for (remainingDrugName of inputtedDrugNames){
                let row = document.createElement("tr");
                const drugData = Object.values(data.find(element => element.GenericName === remainingDrugName));
                for (i=0; i < drugData.length; i++){
                    console.log("entered row")
                    let cell = document.createElement("td");
                    console.log("drugData[i]", drugData[i]);
                    let cellText = document.createTextNode(drugData[i]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    console.log("cellText", cellText);
                }
                tBody.appendChild(row);
            }
            console.log("inputtedDrugNames", inputtedDrugNames);
            // https://www.javatpoint.com/how-to-get-all-checked-checkbox-value-in-javascript
            // console.log("checked boxes", document.getElementsByName("GenericName"));


            table.appendChild(tBody);
            body.appendChild(table);
    })
}