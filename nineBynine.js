angular.module('Sudoku')
    .controller('nineByNineCtrl', function ($scope) {
        $scope.backtracking = false;

        $scope.nineBynine_array2D = [
            [{text: '1', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '2', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '', color: ''}, {text: '3', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '4', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '5', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '6', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '7', color: ''}, {text: '', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '8', color: ''}, {text: '', color: ''}],

            [{text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''},
                {text: '', color: ''}, {text: '', color: ''}, {text: '9', color: ''}]
        ];

        $scope.clear9by9 = function () {
            $scope.nineBynine_array2D.forEach(function (item, index) {
                $scope.nineBynine_array2D[index].forEach(function (item1, index1) {
                    $scope.nineBynine_array2D[index][index1].text = '';
                })
            })
        };
        $scope.solve9by9 = function () {
            $scope.backtracking = true;
            $scope.backtrack9by9(0, 0);
            $scope.backtracking = false;
        };

        $scope.backtrack9by9 = function (x, y) {
            //create variable for each tested number
            var numbers = 1;
            //if element is not empty string fill with next number until no clashes then
            if (!$scope.nineBynine_array2D[x][y].text) {
                do
                {
                    $scope.nineBynine_array2D[x][y].text = numbers;
                    if ($scope.CheckRows9by9(x, y)) {
                        if ($scope.CheckColumns9by9(x, y)) {
                            if ($scope.Checkbox9by9(x, y)) {
                                y = y + 1;
                                if (y == 9) {
                                    y = 0;
                                    x = x + 1;
                                    if (x == 9)
                                        return true;
                                }
                                if ($scope.backtrack9by9(x, y))
                                    return true;
                                y = y - 1;
                                if (y < 0) {
                                    y = 8;
                                    x = x - 1;
                                }
                            }
                        }
                    }

                    numbers = numbers + 1;
                } while (!(numbers == 10));
                $scope.nineBynine_array2D[x][y].text = '';
                return false;
            }
            else {
                y = y + 1;
                if (y == 9) {
                    y = 0;
                    x = x + 1;
                    if (x == 9)
                        return true;
                }
                return $scope.backtrack9by9(x, y);
            }
        };

        $scope.CheckRows9by9 = function (xval, yval) {
            var noclash = true;
            for (var x = 0; x <= 8; x++) {
                if ($scope.nineBynine_array2D[x][yval].text) {
                    if (x != xval) {
                        if ($scope.nineBynine_array2D[x][yval].text == $scope.nineBynine_array2D[xval][yval].text) {
                            noclash = false;
                        }
                    }
                }
            }
            return noclash;
        };

        $scope.CheckColumns9by9 = function (xval, yval) {
            var noclash = true;
            for (var y = 0; y <= 8; y++) {
                if ($scope.nineBynine_array2D[xval][y].text) {
                    if (y != yval) {
                        if ($scope.nineBynine_array2D[xval][y].text == $scope.nineBynine_array2D[xval][yval].text) {
                            noclash = false;
                        }
                    }
                }
            }
            return noclash;
        };

        $scope.Checkbox9by9 = function (xval, yval) {
            var noclash = true;
            var xbegin;
            var ybegin;
            if (xval < 3) {
                xbegin = 0;
            }
            else if (xval < 6) {
                xbegin = 3;
            }
            else {
                xbegin = 6;
            }
            if (yval < 3) {
                ybegin = 0;
            }
            else if (yval < 6) {
                ybegin = 3;
            }
            else {
                ybegin = 6;
            }
            for (var y = ybegin; y <= (ybegin + 2); y++) {
                for (var x = xbegin; x <= (xbegin + 2); x++) {
                    if ($scope.nineBynine_array2D[x][y].text) {
                        if (!(x == xval && y == yval)) {
                            if ($scope.nineBynine_array2D[x][y].text == $scope.nineBynine_array2D[xval][yval].text) {
                                noclash = false;
                            }
                        }
                    }
                }
            }
            return noclash;
        }

        $scope.box_changed9by9 = function () {
            var x, y;
            if ($scope.backtracking)
                return;
            for (x = 0; x <= 8; x++) {
                for (y = 0; y <= 8; y++) {
                    $scope.nineBynine_array2D[x][y].color = 'black';
                }
            }
            for (x = 0; x <= 8; x++) {
                for (y = 0; y <= 8; y++) {
                    if ($scope.CheckRows9by9(x, y)) {
                        if ($scope.CheckColumns9by9(x, y)) {
                            if (!$scope.Checkbox9by9(x, y)) {
                                $scope.nineBynine_array2D[x][y].color = 'red';
                            }
                        }
                        else {
                            $scope.nineBynine_array2D[x][y].color = 'red';
                        }
                    }
                    else {
                        $scope.nineBynine_array2D[x][y].color = 'red';
                    }
                }
            }

        }

    });