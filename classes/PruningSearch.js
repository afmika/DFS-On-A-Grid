const dir = [
    [ 0, -1],
    [ 0,  1],
    [ 1,  0],
    [-1,  0]
];

class PruningSearch {

    constructor() {
        this.maxSolution = Infinity;
    }

    /**
     * @param {number[]} pos 
     * @returns {string}
     */
    strPos ( pos ) {
        return `${pos[0]},${pos[1]}`;
    }
    
    /**
     * @param {string[][]} grid 
     * @param {number[]} pos 
     * @param {string[]} solutions 
     * @param {string} current 
     * @param {Function} fun 
     */
    DFS (grid, pos, solutions, current, fun, n_cell) {
        if ( this.maxSolution < solutions.length) {
            return false;
        }
        let [old_y, old_x] = pos;
        if ( solutions.length >= this.maxSolution ) {
            return false;
        }
        
        if ( old_y == grid.length - 1 && old_x == grid[0].length - 1 ) {
            if (n_cell > 1) {
                // the path reaches the lower right
                // too early without visiting all other squares
                return false;
            } else {
                // we are good, <= 1 square left to reach
                return true;
            }
        }

        for (let d of dir) {
            let n_pos = [
                d[0] + old_y,
                d[1] + old_x
            ];
            let [y, x] = n_pos;
            let notValid = x < 0 || y < 0 || x >= grid[0].length || y >= grid.length;
            if ( !notValid && grid[y][x] == '.' ) {
                let ncurrent = current + '-' + this.strPos( n_pos );
                grid[old_y][old_x] = '#';
                if (this.DFS (grid, n_pos, solutions, ncurrent, fun, n_cell - 1) ) {
                    fun ( ncurrent );
                    solutions.push( ncurrent );
                }
                grid[old_y][old_x] = '.';
            }
        }
        return false;
    }

    /**
     * @param {string[][]} grid 
     */
    getNbCell ( grid ) {
        return grid.length * grid[0].length;
    }

    /**
     * @param {string[][]} grid 
     * @param {Function} fun 
     */
    find ( grid, fun ) {
        let solutions = [], pos = [0, 0];
        let n_cell = this.getNbCell( grid );
        this.DFS(grid, pos, solutions, this.strPos( pos ), fun, n_cell);
        return solutions;
    }

}