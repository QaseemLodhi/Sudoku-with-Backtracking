angular.module('Sudoku', [])
    .controller('mainCtrl', function ($scope) {
        $scope.backtracking = false;

        $scope.fourByfour_array2D = [
            [{text: '1', color: ''}, {text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}],
            [{text: '', color: ''}, {text: '2', color: ''}, {text: '', color: ''}, {text: '', color: ''}],
            [{text: '', color: ''}, {text: '', color: ''}, {text: '3', color: ''}, {text: '', color: ''}],
            [{text: '', color: ''}, {text: '', color: ''}, {text: '', color: ''}, {text: '4', color: ''}]
        ];

        $scope.clear = function () {
            $scope.fourByfour_array2D.forEach(function (item, index) {
                $scope.fourByfour_array2D[index].forEach(function (item1, index1) {
                    $scope.fourByfour_array2D[index][index1].text = '';
                })
            })
        }
        $scope.solve4 = function () {

            $scope.backtracking = true;
            //for (var x = 0; x <= 3; x++) {
            //    for (var y = 0; y <= 3; y++) {
            //        //v4Subbox[x, y] = v4box[x, y].Text;
            //    }
            //}
            $scope.v4backtrack(0, 0);
            //for (var x = 0; x <= 3; x++) {
            //    for (var y = 0; y <= 3; y++) {
            //        //v4box[x, y].Text = v4Subbox[x, y];
            //    }
            //}
            $scope.backtracking = false;
        }
        $scope.v4backtrack = function (x, y) {
            var numbers = 1;
            //if element is empty string fill with next number until no clashes then
            if (!$scope.fourByfour_array2D[x][y].text) { //  string.IsNullOrEmpty(v4Subbox[x, y])
                do
                {
                    //v4Subbox[x, y] = Convert.ToString(numbers);//$scope.fourByfour_array2D[x][y]
                    $scope.fourByfour_array2D[x][y].text = numbers;
                    if ($scope.v4CheckRows(x, y)) {
                        if ($scope.v4CheckColumns(x, y)) {
                            if ($scope.v4Checkbox(x, y)) {
                                y = y + 1;
                                if (y == 4) {
                                    y = 0;
                                    x = x + 1;
                                    if (x == 4)
                                        return true;
                                }
                                if ($scope.v4backtrack(x, y))
                                    return true;
                                y = y - 1;
                                if (y < 0) {
                                    y = 3;
                                    x = x - 1;
                                }
                            }
                        }
                    }

                    numbers = numbers + 1;
                } while (!(numbers == 5));
                //v4Subbox[x, y] = "";//$scope.fourByfour_array2D[x][y]
                $scope.fourByfour_array2D[x][y].text = '';
                return false;
            }
            else {
                y = y + 1;
                if (y == 4) {
                    y = 0;
                    x = x + 1;
                    if (x == 4)
                        return true;
                }
                return $scope.v4backtrack(x, y);
            }

        }

        $scope.v4CheckRows = function (xval, yval) {
            var noclash = true;
            for (var x = 0; x <= 3; x++) {
                if ($scope.fourByfour_array2D[x][yval].text)//!string.IsNullOrEmpty(v4Subbox[x, yval])
                {
                    if (x != xval) {
                        if ($scope.fourByfour_array2D[x][yval].text == $scope.fourByfour_array2D[xval][yval].text)//v4Subbox[x, yval] == v4Subbox[xval, yval]
                        {
                            noclash = false;
                        }
                    }
                }
            }
            return noclash;
        };

        $scope.v4CheckColumns = function (xval, yval) {
            var noclash = true;
            for (var y = 0; y <= 3; y++) {
                if ($scope.fourByfour_array2D[xval][y].text)//!string.IsNullOrEmpty(v4Subbox[xval, y])
                {
                    if (y != yval) {
                        if ($scope.fourByfour_array2D[xval][y].text == $scope.fourByfour_array2D[xval][yval].text)//v4Subbox[xval, y] == v4Subbox[xval, yval]
                        {
                            noclash = false;
                        }
                    }
                }
            }
            return noclash;
        };

        $scope.v4Checkbox = function (xval, yval) {
            var noclash = true;
            var xbegin;
            var ybegin;
            if (xval < 2) {
                xbegin = 0;
            }
            else if (xval < 4) {
                xbegin = 2;
            }
            else {
                xbegin = 3;
            }
            if (yval < 2) {
                ybegin = 0;
            }
            else if (yval < 4) {
                ybegin = 2;
            }
            else {
                ybegin = 3;
            }
            for (var y = ybegin; y <= (ybegin + 1); y++) {
                for (var x = xbegin; x <= (xbegin + 1); x++) {
                    if ($scope.fourByfour_array2D[x][y].text)//!string.IsNullOrEmpty(v4Subbox[x, y])
                    {
                        if (!(x == xval && y == yval)) {
                            if ($scope.fourByfour_array2D[x][y].text == $scope.fourByfour_array2D[xval][yval].text)//v4Subbox[x, y] == v4Subbox[xval, yval]
                            {
                                noclash = false;
                            }
                        }
                    }
                }
            }
            return noclash;
        }

        $scope.v4box_changed = function () {
            var x, y;
            if ($scope.backtracking)
                return;
            for (x = 0; x <= 3; x++) {
                for (y = 0; y <= 3; y++) {
                    //v4Subbox[x, y] = v4box[x, y].Text;
                    $scope.fourByfour_array2D[x][y].color = 'black'; //v4box[x, y].ForeColor = Color.Black;
                }
            }
            for (x = 0; x <= 3; x++) {
                for (y = 0; y <= 3; y++) {
                    if ($scope.v4CheckRows(x, y)) {
                        if ($scope.v4CheckColumns(x, y)) {
                            if (!$scope.v4Checkbox(x, y)) {
                                $scope.fourByfour_array2D[x][y].color = 'red'; //v4box[x, y].ForeColor = Color.Red;
                            }
                        }
                        else {
                            $scope.fourByfour_array2D[x][y].color = 'red'; //v4box[x, y].ForeColor = Color.Red;
                        }
                    }
                    else {
                        $scope.fourByfour_array2D[x][y].color = 'red'; //v4box[x, y].ForeColor = Color.Red;
                    }
                }
            }
        }

    });