function homepageSetup(){
    d3.csv("Drug-List.csv").get(
        function(data){
            drugArray = data;
            createCheckboxes(data.map(data => data.GenericName)); // only pass drug's generic names to fcn using mapping: https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
    })
    
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
        checkBox.id = i;
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
    textInput.type = "text";
    textInput.placeholder = "Drug Name";
    addButton.type = "button";
    addButton.onclick = generateTextBox;
    addButton.name = "textBoxButton"
    icon.name = "add-outline";
    dynamicDrugList.appendChild(divider);
    divider.appendChild(textInput);
    divider.appendChild(addButton);
    addButton.appendChild(icon);
}

function changeButtonIcon(){
    let textBoxList = document.getElementById("dynamicDrugList");
    console.log(textBoxList);
    let iconList = textBoxList.getElementsByTagName("ion-icon");
    console.log("iconList", iconList);
    for (i=0; i<iconList.length; i++){
        console.log("in the list",iconList[i])
        iconList[i].name="trash-outline";
    }

function removeDrugTextBox(){
    // to-do
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
            for (drugName of checkedDrugs){
                if (drugName.checked){
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

            // https://www.javatpoint.com/how-to-get-all-checked-checkbox-value-in-javascript
            // console.log("checked boxes", document.getElementsByName("GenericName"));


            table.appendChild(tBody);
            body.appendChild(table);
    })
}