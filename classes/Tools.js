const origin_color = 'rgba(20, 20, 100, 0.6)';
const obstacle_color = 'rgba(120, 0, 60, 0.6)';
const dest_color = 'rgba(100, 200, 200, 0.8)';

/**
 * @param {string[][]} grid 
 * @param {PathFinder} finder
 * @param {number} dim_x 
 * @param {number} dim_y
 */
function drawGrid ( grid, finder, dim_x, dim_y) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const v = grid[i][j];
            if ( v == finder.obstacle ) {
                ctx.beginPath();
                ctx.strokeStyle = obstacle_color;
                ctx.strokeRect(j * dim_x, i * dim_y, dim_x, dim_y);
                ctx.closePath();
            }
            if ( v == finder.origin ) {
                ctx.beginPath();
                ctx.fillStyle = origin_color;
                ctx.fillRect(j * dim_x, i * dim_y, dim_x, dim_y);
                ctx.closePath();
            }
            if ( v == finder.dest ) {
                ctx.beginPath();
                ctx.fillStyle = obstacle_color;
                ctx.fillRect(j * dim_x, i * dim_y, dim_x, dim_y);
                ctx.closePath();
            }
        }
    }
}

/**
 * @param {string} path 
 * @param {string} color 
 * @param {number} dim_x 
 * @param {number} dim_y 
 */
function drawPath ( path, color, dim_x, dim_y) {
    let temp = path.split("-");
    const [offx, offy] = [ dim_x , dim_y ].map( d => d / 2 );
    let begin = true;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    temp.forEach( (pos, id) => {
        let [x, y] = pos.split(',').map(it => parseInt(it));
        let [px, py] = [x * dim_x + offx, y * dim_y + offy];
        if ( begin ) {
            ctx.moveTo(py, px);
            begin = false;
        } else {
            ctx.lineTo(py, px);
        }
        ctx.fillRect(py - offx, px - offy, dim_x, dim_y);
    });
    ctx.stroke();
    ctx.closePath();
}

function randomInt( max ) {
    return Math.floor( Math.random() * max );
}

function randColor() {
    return randomInt( 255 );
}