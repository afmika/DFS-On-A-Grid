const dir = [
    [ 0, -1],
    [ 0,  1],
    [ 1,  0],
    [-1,  0]
];

class PathFinder {

    /**
     * @param {string} origin 
     * @param {string} dest 
     * @param {string} obstacle 
     */
    constructor( origin, dest, obstacle ) {
        this.origin = origin || 'O';
        this.dest = dest || 'D';
        this.obstacle = obstacle || '#';
        this.clear = '.';
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
    DFS (grid, pos, solutions, current, fun) {
        let [old_y, old_x] = pos;
        if ( solutions.length >= this.maxSolution ) {
            return false;
        }
        if ( grid[old_y][old_x] == this.dest ) {
            return true;
        }
        for (let d of dir) {
            let n_pos = [
                d[0] + old_y,
                d[1] + old_x
            ];
            let [y, x] = n_pos;
            let notValid = x < 0 || y < 0 || x >= grid[0].length || y >= grid.length;
            if ( !notValid && grid[y][x] != this.obstacle ) {
                let ncurrent = current + '-' + this.strPos( n_pos );
                grid[old_y][old_x] = this.obstacle;
                if (this.DFS (grid, n_pos, solutions, ncurrent, fun) ) {
                    fun ( ncurrent );
                    solutions.push( ncurrent );
                }
                grid[old_y][old_x] = this.clear;
            }
        }
        return false;
    }

    /**
     * @param {string[][]} grid 
     * @param {Function} fun 
     */
    find ( grid, fun ) {
        let solutions = [], pos = null;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++ ) {
                if ( grid[i][j] == this.origin ) {
                    pos = [i, j]; 
                    break;
                }
            }
            if ( pos != null) break;
        }
        this.DFS(grid, pos, solutions, this.strPos( pos ), fun);
        return solutions;
    }

}