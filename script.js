window.onload = function(){

    const tbody = document.querySelector("tbody");
    let municipalitiesArray = [];
     
    fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff").then(response => response.json()).then(dataJSON=>{
    const populations = dataJSON.dataset.value;
    const municipalities = dataJSON.dataset.dimension.Alue.category.label;

    Object.values(municipalities).forEach(value =>{
        municipalitiesArray.push((value));
    })

    //test first batch of data 
    console.log(municipalitiesArray[1]);
    console.log(populations[2]);


    //fetch additional data (employment data )
    fetch('https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065').then(response => response.json()).then(employmentData =>{
        const employmentAmounts = employmentData.dataset.value;
        
        //test the employment data
        console.log(employmentAmounts[0])

        for(let i = 0; i < municipalitiesArray.length; i++){
            
            //Final test that all data  can be accessed
            console.log(municipalitiesArray[i])
            console.log(populations[i])
            console.log(employmentAmounts[i])
            
            let municipality = municipalitiesArray[i];
            let population = populations[i];
            let employmentAmount = employmentAmounts[i];
            let employmentPercentage = ((employmentAmount / population) * 100).toFixed(2);

            //Test that there are no undifined values
            console.log("-------------------");
            console.log(employmentPercentage);

            const row = document.createElement("tr");

            //Javascript code for the CSS elemnts
            row.setAttribute("data-employment-percentage", employmentPercentage);
                if (employmentPercentage > 45) {
                    row.setAttribute("data-employment-percentage-over-45", true);
                } else if (employmentPercentage < 25) {
                    row.setAttribute("data-employment-percentage-under-25", true);
                }
            
            
            const municipalityCell = document.createElement("td");
            municipalityCell.innerText = municipality;
            const populationCell = document.createElement("td");
            populationCell.innerText = population;
            const employmentAmountCell = document.createElement("td");
            employmentAmountCell.innerText = employmentAmount;
            const employmentPercentageCell = document.createElement("td");
            employmentPercentageCell.innerText = employmentPercentage + "%";

            //Time to append the data 
            row.appendChild(municipalityCell);
            row.appendChild(populationCell);
            row.appendChild(employmentAmountCell);
            row.appendChild(employmentPercentageCell);
                
            tbody.appendChild(row);

        }






    })




})





 
        
        
        

    









 
}


 


