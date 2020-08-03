const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext('2d');
const width  = canvas.width;
const height = canvas.height;

let finder = new PruningSearch();
finder.maxSolution = 350;


function createGrid (n, m) {
    let grid = new Array(n);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(m).fill('.');
    }
    return grid;
}
const dim = 5;
let grid = createGrid(dim, dim);

const dim_x = width  / grid[0].length;
const dim_y = height / grid.length;
drawGrid(grid, finder, dim_x, dim_y );

let solutions = finder.find(grid, trajectory => {
    let length = trajectory.split('-').length;
});

if ( solutions.length != 0 ) {
    console.log(solutions.length + ' paths found');
    drawPath(solutions[randomInt(solutions.length)], 'rgba(20, 1, 100, 0.3)', dim_x, dim_y);
}


