const status = document.getElementById("statusText");


const config = {

    level1: "Constant",
    level2: "Gene or Category",
    level3: "Hotspots or Subtypes",
    value: "SUM(% of Overall Cases)"

};



status.innerHTML =
    "Initializing...";



tableau.extensions.initializeAsync()

.then(() => {


    status.innerHTML =
        "Connected. Reading worksheet...";


    const dashboard =
        tableau.extensions.dashboardContent.dashboard;


const worksheet =
    dashboard.worksheets.find(
        ws => ws.name === "Sunburst Subset"
    );


    worksheet.getSummaryDataAsync()

    .then(data => {


        status.innerHTML =
            "Building hierarchy...";



        const fields = {};



        data.columns.forEach((column, index) => {

            fields[column.fieldName] = index;

        });



        console.log("Available fields:");

        console.log(fields);



        const hierarchy = {

            name: "root",
            children: []

        };



        function getOrCreateNode(parent, name) {


            let node =
                parent.children.find(
                    d => d.name === name
                );



            if (!node) {

                node = {

                    name: name,
                    children: []

                };


                parent.children.push(node);

            }


            return node;

        }



        data.data.forEach(row => {


const cleanValue = value =>
    value === "null" ? null : value;


const level1 =
    cleanValue(
        row[
            fields[config.level1]
        ]?.formattedValue
    );


const level2 =
    cleanValue(
        row[
            fields[config.level2]
        ]?.formattedValue
    );

const level3Raw =
    row[
        fields[config.level3]
    ]?.formattedValue;


const level3 =
    level3Raw &&
    level3Raw.trim().toLowerCase() !== "null"
        ? level3Raw
        : null;


const value =
    Number(
        row[
            fields[config.value]
        ]?.value ?? 0
    );



     if (!level2) {

    return;

}

const node2 =
    getOrCreateNode(
        hierarchy,
        level2
    );


if (level3 && level3 !== "null") {

    const node3 =
        getOrCreateNode(
            node2,
            level3
        );

    node3.value =
        (node3.value || 0) + value;

}
else {

    node2.value =
        (node2.value || 0) + value;

}


if (level3) {

    const node3 =
        getOrCreateNode(
            node2,
            level3
        );

    node3.value =
        (node3.value || 0) + value;

}
else {

    node2.value =
        (node2.value || 0) + value;

}


        });



        console.log(
            "SUNBURST HIERARCHY:",
            hierarchy
        );



        status.innerHTML =
            "Rendering sunburst...";



        drawSunburst(hierarchy);



        status.innerHTML =
            "Complete";



    })

    .catch(error => {


        status.innerHTML =
            "Data error:<br>" +
            error.message;


        console.error(error);


    });



})

.catch(error => {


    status.innerHTML =
        "Initialization error:<br>" +
        error.message;


    console.error(error);


});