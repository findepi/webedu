// vim:set et ts=8 ai sw=4 sts=4:

(function($) {

    var operators = ['+', '+', '-']
        , numbersMin = 0
        , numbersMax = 7

    function validateArithemtic(data) {
        var values = data.values
            , left = values.left
            , operand = values.operand
            , right = values.right
            , result = values.result

        if (left && operand && right && result) {
            left = parseInt(left)
            right = parseInt(right)
            result = parseInt(result)

            if (eval('' + left + operand + right + '==' + result)) {

                return true
            }
        }

        return false
    }

    window.jsedu = jQuery.extend(window.jsedu, {
        runArithmetic: function(options) {
            options = options || {}
            var currentProblem = $(options.currentProblem || '#currentProblem')
                , previousProblems = $(options.previousProblems || '#previousProblems')
                , fieldNames = ['left', 'right', 'result']
                , chosenop
                , values = {}
                , whichEmpty

            currentProblem.empty()
            chosenop = operators[jsedu.random(0, operators.length)]

            currentProblem
                .append('<input type="hidden" name="operand" value="' + chosenop + '" />')
                .append('<input name="left" />')
                .append(chosenop)
                .append('<input name="right" />')
                .append('=')
                .append('<input name="result" />')

            values.left = jsedu.random(numbersMin, numbersMax)
            values.right = jsedu.random(numbersMin, (chosenop == '-') ? values.left : numbersMax)
            values.result = eval('' + values.left + chosenop + values.right)
            whichEmpty = fieldNames[jsedu.random(0, fieldNames.length)]

            for (var k in values) {
                if (whichEmpty != k) {
                    currentProblem.find('input[name=' + k + ']')
                        .attr('readonly', 'readonly').val(values[k])
                }
            }

            currentProblem.find('input[name=' + whichEmpty + ']')
            // TODO this makes F5 not to work .... sad thing
                .numeric()
                .focus()

            currentProblem.data('validation', validateArithemtic)
            currentProblem.data('newProblem', function() {
                jsedu.runArithmetic(options)
            })
        }
    })

})(jQuery)
