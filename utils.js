let createCheckboxes = function(items){
    for (i = 0; i < items.length; i++){
        // https://stackoverflow.com/questions/28678027/create-and-populate-with-dom-a-checkbox-list-with-array-values-in-javascript/28678424
        let checkBox = document.createElement("input");
        let label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.value = items[i][0];
        drugList.appendChild(checkBox);
        drugList.appendChild(label);
        label.appendChild(document.createTextNode(items[i][0]));
    };
}