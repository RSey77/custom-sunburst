function drawSunburst(data) {


const labelOverrides = {

    "KIT/PDGFRA Primary Mutation": {
        lines: [
            "KIT/", 
            "PDGFRA"
        ],
        size: 13.5
    },

    "Non-KIT/PDGFRA": {
        lines: [
            "Non-KIT/", 
            "PDGFRA"
        ],
        size: 13.5
    },

  "KIT": {
        lines: [
            "KIT", 
            "(CD117)"
        ],
        size: 14
    },

    "Exon 11": {
        lines: [
            "Exon 11"
        ],
        size: 14
    },

       "Exon 9": {
        lines: [
            "Exon 9"
        ],
        size: 14
    },

  "Exon 13": {
        lines: [
            "Exon 13"
        ],
        size: 5
    },

       "Exon 17": {
        lines: [
            "Exon 17"
        ],
        size: 5
    },

  "PDGFRA": {
        lines: [
            "PDGFRA"
        ],
        size: 14
    },

    "Exon 18": {
        lines: [
            "Exon 18"
        ],
        size: 14
    },

      "Exon 12": {
        lines: [
            "Exon 12"
        ],
        size: 14
    },

    "Exon 14": {
        lines: [
            "Exon 14"
        ],
        size: 14
    }, 

    "SDHA": {
        lines: [
            "SDHA"
        ],
        size: 14
    }, 

    "SDH-Deficient": {
        lines: [
            "SDH-",
            "Deficient"
        ],
        size: 14
    },

      "SDH Silencing Epimutations": {
        lines: [
            "SDH-Silencing", 
            "Epimutations"
        ],
        size: 14
    },

    "SDHB/SDHC/SDHD": {
        lines: [
            "SDHB/SDHC/",
            "SDHD"
        ],
        size: 14
    }, 

    "SDH-Competent": {
        lines: [
            "SDH-",
            "Competent"
        ],
        size: 14
    }, 

    "Other Rare Aberrations": {
        lines: [
            "Other Rare", 
            "Aberrations"
        ],
        size: 14
    }, 

       "RTK Fusions (NTRK3 or FGFR1)": {
        lines: [
            "RTK Fusions", 
            "(NTRK3 or FGFR1)"
        ],
        size: 14
    }, 
       "NF1": {
        lines: [
            "NF1"
        ],
        size: 14
    }, 
       "PIK3CA": {
        lines: [
            "PIK3CA"
        ],
        size: 14
    }, 
       "BRAF": {
        lines: [
            "BRAF"
        ],
        size: 14
    }, 
       "RAS": {
        lines: [
            "RAS"
        ],
        size: 14
    }
};



d3.select("#chart")
    .selectAll("*")
    .remove();



const width = 800;
const height = 800;
const radius = Math.min(width, height) * 0.50;



const svg =
    d3.select("#chart")
        .append("svg")
        .attr(
            "viewBox",
            `0 0 ${width} ${height}`
        )
        .attr(
            "preserveAspectRatio",
            "xMidYMid meet"
        )
        .attr(
            "width",
            "100%"
        )
        .attr(
            "height",
            "100%"
        )
        .style(
            "background",
            "transparent"
        );



const g =
    svg.append("g")
        .attr(
            "transform",
            `translate(${width / 2},${height / 2})`
        );



const root =
    d3.hierarchy(data)
        .sum(
            d =>
                d.value || 0
        )
        .sort(
            (a,b) =>
                b.value - a.value
        );



d3.partition()
    .size(
        [
            2 * Math.PI,
            radius
        ]
    )
    (root);



const originalPositions =
    new Map();



root.descendants()
    .forEach(d => {

        originalPositions.set(
            d,
            {
                x0: d.x0,
                x1: d.x1,
                y0: d.y0,
                y1: d.y1
            }
        );

    });



const arc =
    d3.arc()
        .startAngle(
            d => d.x0
        )
        .endAngle(
            d => d.x1
        )
        .innerRadius(
            d => d.y0
        )
        .outerRadius(
            d => d.y1
        );

   const categoryColors = new Map([
    ["KIT/PDGFRA Primary Mutation", "#3B7ADB"],
    ["KIT", "#3B86DB"],
    ["Exon 11", "#4C91DF"],
    ["Exon 9", "#5D9DE4"],
    ["Exon 13", "#7FB4EC"],
    ["Exon 17", "#6EA8E8"], 
    ["PDGFRA", "#3B6EDB"],
    ["Exon 18", "#4B7CE0"],
    ["Exon 12", "#5C8AE4"],
    ["Exon 14", "#6C97E8"],
    ["Non-KIT/PDGFRA", "#3B59DB"],
    ["SDH-Deficient", "#3B60DB"],
   ["SDHA", "#6C89E8"],
  ["SDHB/SDHC/SDHD", "#5B7CE4"],
  ["SDH Silencing Epimutations", "#4B6EE0"], 
    ["SDH-Competent", "#3B51DB"],
  ["Other Rare Aberrations", "#6C8BE6"], 
    ["RTK Fusions (NTRK3 or FGFR1)", "#536EE1"],
    ["NF1", "#4760DE"], 
    ["PIK3CA", "#607DE4"], 
    ["BRAF", "#7899E9"],
    ["RAS", "#84A7EC"]
]);
   



function getCategoryColor(d) {

    return (
        categoryColors.get(
            d.data.name
        )
        ||
        "#999"
    );

}



const paths =
    g.selectAll("path")
        .data(
            root.descendants()
                .filter(
                    d =>
                        d.depth
                )
        )
        .enter()
        .append("path")
        .attr(
            "d",
            arc
        )
        .attr(
            "fill",
            d =>
                getCategoryColor(d)
        )
        .attr(
            "stroke",
            "white"
        )
        .attr(
            "stroke-width",
            1
        )
        .style(
            "cursor",
            "pointer"
        );


paths.append("title")
    .text(d => {

                 const manualTooltips = {

            "KIT/PDGFRA Primary Mutation":
                "KIT/PDGFRA Primary Mutation\n\n80-85% of all GIST cases",
            
             "Non-KIT/PDGFRA":
                "Neither KIT nor PDGFRA Primary Mutation\n\n10-15% of all GIST cases",

        "SDH-Deficient":
                "SDH-Deficient\n\n5-10% of all GIST cases", 
            
            "SDH-Competent":
                "Non-KIT/PDGFRA, SDH-Competent\n\n5-7% of all GIST cases",

            "KIT":
                "KIT Primary Mutation\n\n75-80% of all GIST cases",
        
            "Exon 11":
                "KIT, Exon 11\n\n50-70% of all GIST cases",

            "Exon 9":
                "KIT, Exon 9\n\n9-14% of all GIST cases",

            "Exon 13":
                "KIT, Exon 13\n\n1-2% of all GIST cases",

            "Exon 17":
                "KIT, Exon 17\n\n1-2% of all GIST cases",
          
            "PDGFRA":
                "testing\n\nAdditional notes here",

            "Exon 18":
                "PDGFRA, Exon 18\n\n4-8% of all GIST cases",

             "Exon 12":
                "PDGFRA, Exon 12\n\n1-2% of all GIST cases",

            "Exon 14":
                "PDGFRA, Exon 14\n\nLess than 1% of all GIST cases",
        
            "SDHA":
                "SDH-Deficient, SDHA\n\n0.9-2.25% of all GIST cases",

            "SDHB/SDHC/SDHD":
                "SDH-Deficient, SDHB/SDHC/SDHD\n\n1-2.25% of all GIST cases",

          "SDH Silencing Epimutations":
                "SDH-Deficient, SDH Epimutations\n\n1-2.25% of all GIST cases",

            "RTK Fusions (NTRK3 or FGFR1)":
                "RTK Fusions (NTRK3 or FGFR1)\n\nLess than 1% of all GIST cases",

             "NF1":
                "NF1 Mutation\n\n1-5% of all GIST cases",

            "PIK3CA":
                "PIK3CA Mutation\n\n1.5-2% of all GIST cases",
            
             "BRAF":
                "BRAF Mutation\n\n0.5-2% of all GIST cases",

            "RAS":
                "RAS Mutation\n\nAbout 0.4% of all GIST cases",
          
             "Other Rare Aberrations":
                "Other Rare Mutations\n\nAbout 1% of all GIST cases"

        };


        if (manualTooltips[d.data.name]) {

            return manualTooltips[d.data.name];

        }


        return (
            d.data.name +
            "\n\n" +
            d.value.toFixed(1) +
            "%"
        );


    });



const labels =
    g.selectAll(".sunburst-label")
        .data(
            root.descendants()
                .filter(
                    d =>
                        d.depth
                )
        )
        .enter()
        .append("text")
        .attr(
            "class",
            "sunburst-label"
        )
        .attr(
            "font-family",
            "Arial"
        )
        .attr(
            "font-size",
            12
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .attr(
            "pointer-events",
            "none"
        );

        function updateLabels() {


    labels.each(function(d) {


        const text =
            d3.select(this);



        text
            .selectAll("tspan")
            .remove();



       const node = d;



        const angle =
            node.x1 - node.x0;



        const middleRadius =
            (
                node.y0 +
                node.y1
            ) / 2;



        const arcLength =
            middleRadius *
            angle;



        const thickness =
            node.y1 -
            node.y0;



        if (
            arcLength < 55 ||
            thickness < 18
        ) {

            text.style(
                "display",
                "none"
            );

            return;

        }



        text.style(
            "display",
            null
        );



        const midAngle =
            (
                node.x0 +
                node.x1
            ) / 2;



        const x =
            middleRadius *
            Math.cos(
                midAngle -
                Math.PI / 2
            );



        const y =
            middleRadius *
            Math.sin(
                midAngle -
                Math.PI / 2
            );



        const rotation =
            midAngle *
            180 /
            Math.PI;



        text.attr(
            "transform",
            `
            translate(
                ${x},
                ${y}
            )
            rotate(
                ${
                    rotation < 180
                    ?
                    rotation - 90
                    :
                    rotation + 90
                }
            )
            `
        );



        const maxChars =
            Math.floor(
                arcLength / 7
            );



        const override =
            labelOverrides[d.data.name];



        const words =
            override
            ?
            override.lines
            :
            String(
                d.data.name
            )
            .split(
                /[\s\/\-_]+/
            )
            .filter(
                Boolean
            );



        const lines = [];

        let line = "";



        words.forEach(word => {


            const test =
                line
                ?
                line + " " + word
                :
                word;



            if (
                test.length <= maxChars
            ) {

                line = test;

            }
            else {

                if (line) {

                    lines.push(line);

                }

                line = word;

            }


        });



        if (line) {

            lines.push(line);

        }



        const finalLines =
            override
            ?
            override.lines
            :
            lines.slice(
                0,
                2
            );



        text.attr(
            "font-size",
            override?.size || 12
        );



        finalLines.forEach(
            (line,index) => {


                text.append("tspan")
                    .attr(
                        "x",
                        0
                    )
                    .attr(
                        "dy",
                        index === 0
                        ?
                        `${-(finalLines.length - 1) / 2}em`
                        :
                        "1em"
                    )
                    .text(
                        line
                    );


            }
        );


    });


}



updateLabels();



paths.on(
    "click",
    (event,p) => {


        event.stopPropagation();



        if (!p.children) {

            return;

        }



        zoom(p);


    }
);



g.append("circle")
    .attr(
        "r",
        30
    )
    .attr(
        "fill",
        "#071038"
    )
    .attr(
        "stroke",
        "#071038"
    )
    .style(
        "cursor",
        "pointer"
    )
    .on(
        "click",
        () => {


            root.descendants()
                .forEach(d => {


                    const original =
                        originalPositions.get(d);



                    if (original) {

                        d.x0 =
                            original.x0;

                        d.x1 =
                            original.x1;

                        d.y0 =
                            original.y0;

                        d.y1 =
                            original.y1;

                    }


                });



            zoom(root);


        }
    );

    function zoom(target) {


    root.each(d => {


        d.target = {


            x0:
                Math.max(
                    0,
                    Math.min(
                        1,
                        (
                            d.x0 -
                            target.x0
                        )
                        /
                        (
                            target.x1 -
                            target.x0
                        )
                    )
                )
                *
                2 *
                Math.PI,



            x1:
                Math.max(
                    0,
                    Math.min(
                        1,
                        (
                            d.x1 -
                            target.x0
                        )
                        /
                        (
                            target.x1 -
                            target.x0
                        )
                    )
                )
                *
                2 *
                Math.PI,



          y0:
    (
        d.y0 - target.y0
    ) /
    (
        radius - target.y0
    ) *
    radius,


y1:
    (
        d.y1 - target.y0
    ) /
    (
        radius - target.y0
    ) *
    radius

        };


    });



    const duration = 750;



    paths.transition()
        .duration(duration)
        .attrTween(
            "d",
            d => {


                const i =
                    d3.interpolate(
                        d,
                        d.target
                    );



                return t => {


                    const b =
                        i(t);

d.x0 = b.x0;
d.x1 = b.x1;
d.y0 = b.y0;
d.y1 = b.y1;

updateLabels();

                    d.current =
                        b;



                    return arc({

                        x0:
                            b.x0,

                        x1:
                            b.x1,

                        y0:
                            b.y0,

                        y1:
                            b.y1

                    });


                };


            }
        );







    setTimeout(
        () => {


            root.each(d => {


                if (d.target) {


                    d.x0 =
                        d.target.x0;


                    d.x1 =
                        d.target.x1;


                    d.y0 =
                        d.target.y0;


                    d.y1 =
                        d.target.y1;


                }


            });




        },
        duration
    );


}

function resizeSVG() {


    const chart =
        document.getElementById(
            "chart"
        );



    if (!chart) {

        return;

    }



    const svgNode =
        svg.node();



    if (!svgNode) {

        return;

    }



    svgNode.style.width =
        chart.clientWidth +
        "px";



    svgNode.style.height =
        chart.clientHeight +
        "px";


}



window.addEventListener(
    "resize",
    resizeSVG
);



resizeSVG();

}