// vim:set et ts=8 ai sw=4 sts=4:

(function($) {


    window.jsedu = jQuery.extend(window.jsedu, {
        /** random int from [min, max) */
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        , createBasicLayout: function(options) {
            console.log(['options', options])
            var where = $(options.where)
                , currentProblem = $('<div id="currentProblem" class="currentProblem problem" />')
                , previousProblems = $('<div id="previousProblems" class="previousProblems" />')

            where
                .append(previousProblems)
                .append(currentProblem)

            currentProblem.on('change input', 'input', function(event) {
                if (currentProblem.data('alreadyValidated'))
                    return

                var valid = currentProblem.data('validation')({
                    event: event
                    , currentProblem: currentProblem
                    , values: buildValuesMap(currentProblem)
                })

                if (valid) {
                    currentProblem
                        .data('alreadyValidated', true)
                        .one('animationend', function() {
                            currentProblem.removeClass('problemNowSolved')
                            currentProblem.removeData('alreadyValidated')

                            $('<div class="problem problemSolved"/>')
                                .append(currentProblem.contents())
                                .appendTo(previousProblems)
                                .find('input').attr('readonly', 'readonly')

                            currentProblem.data('newProblem')()
                            $('html, body').animate({
                                scrollTop: currentProblem.offset().top + currentProblem.height()
                            }, 2000)
                        })
                        .addClass('problemNowSolved')
                        .find('input').focus().blur()
                }
            })
        }
    })

    function buildValuesMap(scope) {
        var map = {}
        scope.find('input[name]').each(function() {
            map[this.name] = $(this).val()
        })
        return map
    }

})(jQuery)
