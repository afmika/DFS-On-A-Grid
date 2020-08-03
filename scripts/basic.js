const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext('2d');
const width  = canvas.width;
const height = canvas.height;

let finder = new PathFinder('O', 'D', '#');
finder.maxSolution = 10000;

let grid = [
    "O....##.",
    "......#.",
    "..#.#...",
    "..#.....",
    "#.......",
    "....#..#",
    "..#....#",
    "..#D..#."
];

const dim_x = width  / grid[0].length;
const dim_y = height / grid.length;
drawGrid(grid, finder, dim_x, dim_y );

let best = null;
let cur_length = -1;
let solutions = finder.find(grid.map( st => st.split('') ), trajectory => {
    let length = trajectory.split('-').length;
    if ( best == null ) {
        best = trajectory;
        cur_length = length;
    } else {
        let m = Math.min(length, cur_length);
        if ( m != cur_length ) {
            best = trajectory;
            cur_length = length;
        }
    }    
});

let best_color = 'rgba(100, 1, 1, 0.8)';
let randsol_color = `rgba(10, 1, 100, 0.1)`;
if ( solutions.length != 0 ) {
    console.log(solutions.length + ' paths found');
    drawPath(best, best_color, dim_x, dim_y);
    drawPath(solutions[randomInt(solutions.length)], randsol_color, dim_x, dim_y);
}