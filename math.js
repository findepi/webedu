// vim:set et ts=8 ai sw=4 sts=4:

(function($) {

    var operators = ['+']
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
                , chosenop

            currentProblem.empty()
            chosenop = operators[jsedu.random(0, operators.length)]

            currentProblem
                .append('<input type="hidden" name="operand" value="' + chosenop + '" />')
                .append('<input name="left" />')
                .append(chosenop)
                .append('<input name="right" />')
                .append('=')
                .append('<input name="result" />')

            currentProblem.find('input[name=left]')
                .attr('readonly', 'readonly').val(jsedu.random(numbersMin, numbersMax))
            currentProblem.find('input[name=right]')
                .attr('readonly', 'readonly').val(jsedu.random(numbersMin, numbersMax))

            // TODO this makes F5 not to work .... sad thing
            currentProblem.find('input').numeric()

            currentProblem.data('validation', validateArithemtic)
            currentProblem.data('newProblem', function() {
                jsedu.runArithmetic(options)
            })
            currentProblem.find('input:empty').focus()
        }
    })

})(jQuery)
