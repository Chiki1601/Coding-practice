// Dataset
const dataset = [
    { "name": "root", "parent": "" },
    { "name": "TC", "parent": "root" },
    { "name": "MU", "parent": "root" },
    { "name": "SE", "parent": "TC" },
    { "name": "XD", "parent": "TC" },
    { "name": "GF", "parent": "MU" },
    { "name": "IO", "parent": "MU" },
    { "name": "HG", "parent": "MU" },
];


// Margin convention
const margin = { top: 40, right: 40, bottom: 60, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// Draw svg container
const svg = d3.select('.tree-chart-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

function update() {
    // Stratify the data 
    let hierarchyDataset = d3.stratify()
        .id(d => d.name)
        .parentId(d => d.parent)
        (dataset);

    // Tree layout
    const treeLayout = d3.tree()
        .size([width, height]);

    treeLayout(hierarchyDataset);

    const nodeData = hierarchyDataset.descendants();
    const linkData = hierarchyDataset.links();

    // Link generator
    const linkGenerator = d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y);

    // Draw links
    svg.selectAll('.link')
        .data(linkData)
        .join('path')
        .attr('class', 'link')
        .attr('d', d => linkGenerator(d))
        .attr('fill', 'none')
        .attr('stroke', 'grey');

    const widthRect = 100;
    const heightRect = 50;

    svg.selectAll('g.node').remove();


    // filters go in defs element
    var defs = svg.append("defs");

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "120%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 1)
        .attr("dy", 1)
        .attr("result", "offsetBlur");

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");


    // Draw nodes
    const node = svg.selectAll('.node')
        .data(nodeData)
        .join('g')
        .attr('class', d => d.data.parent === '' ? 'root node' : 'node child')
        .attr('transform', d => `translate(${d.x - widthRect / 2}, ${d.y})`)

    node
        .append('rect')
        .attr('width', widthRect)
        .attr('height', heightRect)
        .attr('fill', '#f8f9fa')
        .style("filter", "url(#drop-shadow)")
        .attr('rx', '5');

    node
        .append("text")
        .attr('transform', `translate(${widthRect / 2},${heightRect / 2})`)
        .attr('fill', '#343a40')
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.name);

    // Select all nodes except root to add the remove button
    const childNode = d3.selectAll('g.child')

    var close = childNode.append('g')
        .attr('class', 'remove-icon-group')
        .on('click', function (d) {
            removeItem(d);
        })
        .attr('transform', 'translate(' + (widthRect - 15) + ',13)');

    close.append('circle')
        .attr('class', 'remove-icon')
        .attr('fill', '#dc3545')
        .attr('r', 10);

    close.append('line')
        .attr('x1', -4)
        .attr('x2', 4)
        .attr('y1', -4)
        .attr('y2', 4)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);

    close.append('line')
        .attr('x1', 4)
        .attr('x2', -4)
        .attr('y1', -4)
        .attr('y2', 4)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);



    var add = node.append('g')
        .attr('class', 'add-icon-group')
        .on('click', function (d) {
            addItem(d);
        })
        .attr('transform', 'translate(' + (widthRect - 15) + ',37)');

    add.append('circle')
        .attr('class', 'add-icon')
        .attr('fill', '#007bff')
        .attr('r', 10)

    add.append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 4)
        .attr('y2', -4)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);

    add.append('line')
        .attr('x1', 4)
        .attr('x2', -4)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);
}


function removeItem(d) {
    for (var i = 0; i < dataset.length; i++) {
        if (dataset[i].parent === d.data.name) {
            dataset.splice(i, 1);
            i--;
        }

        if (dataset[i].name === d.data.name) {
            dataset.splice(i, 1);
            i--;
        }

    }
    update();
}

function addItem(d) {
    let newName = ''; 
    let newNode = { "name": '', "parent": '' };

    // Open modal
    $("#myModal").modal();

    $("#saveModal").off('click'); // Unbind click event 
    $('#saveModal').on('click', function (e) {

        // Get input data on save button clicked
        newName = $('#nameNodeInput').val();
        newNode = { "name": newName, "parent": d.data.name };
        dataset.push(newNode);

        update();

        $('#myModal').modal('hide');
        $('#nameNodeInput').val('');
    });
}

// Call MAIN function
update();
