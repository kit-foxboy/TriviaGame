class question {
    constructor(question, answer1, answer2, answer3, answer4, correctAnswer) {
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer;
    }
}

var quiz = {
    timer: null,
    correctAnswers: 0,
    incorrectAnswers: 0,
    questionIdx: 0,
    questions: [
        new question('Where are the majority of carnivorous plants found?', 'The Americas', 'Asia', 'South America', 'Autralia', 0),
        new question('Which of these plants are NOT carnvivorous?', 'Venus Flytraps', 'Sundews', 'Pitcher Plants', 'Bromeliads', 3),
        new question('Where do American carnivourous plants grow?', 'Open Fields', 'Tropical Forests', 'Swamps and Bogs', 'Deserts', 2),
        new question('Why do these plants trap and digest insects?', 'To Aid in Photosyntheses', 'To Make Up for Poor Soil Conditions', 'To Make Up for Poor Light Conditions', 'To Make Up for Poor Water Conditions', 1),
        new question('Which scientist was the first to research carnivorous plants?', "Peter D'Amato", 'Charles Darwin', 'Gregor Mendel', 'Carl Linnaeus', 1),
        new question('Which of these trap types is NOT real?', 'Pitfall', 'Snap Trap', 'Flypaper', 'Funnel', 3)
    ],
    correctSound: document.getElementById('audio-correct'),
    incorrectSound: document.getElementById('audio-incorrect'),

    startTimer: function() {

        var time = 10;
        this.timer = setInterval(function() {
            $('#timer').text('Time Left: ' + time);
            time--;

            if (time < 0) {
                quiz.timeout();
            }
        }, 1000);
    },

    timeout: function() {

        clearInterval(this.timer);
        this.incorrectAnswers++;
        this.incorrectSound.play();

        $('#timer').text("Time's Up!");
        this.showAnswers();

        setTimeout(this.next, 2000);
    },
    
    next: function(increment = true) {

        if (increment) {
            quiz.questionIdx++;
        }
        
        if (quiz.questionIdx >= quiz.questions.length) {
            $('#answers').hide();
            $('#timer').text('');
            $('#results').show();
            $('#question').text('Results');
            $('#correct-answers').text(quiz.correctAnswers);
            $('#incorrect-answers').text(quiz.incorrectAnswers);
        }

        var question = quiz.questions[quiz.questionIdx];

        $('#question').text(question.question);
        $('#answers').html(
            '<p><button type="button" data-answer="0">' + question.answer1 + '</button>' +
            '<p><button type="button" data-answer="1">' + question.answer2 + '</button>' +
            '<p><button type="button" data-answer="2">' + question.answer3 + '</button>' +
            '<p><button type="button" data-answer="3">' + question.answer4 + '</button>'
        );

        $('#answers button').on('click', function() {
            quiz.submit($(this).data('answer'));
        });

        quiz.startTimer();
    },

    submit: function(answerIdx) {
        
        if (answerIdx === this.questions[this.questionIdx].correctAnswer) {
            this.correctAnswers++;
            this.correctSound.play();
            $('#timer').text("Correct!");
        } else {
            this.incorrectAnswers++;
            this.incorrectSound.play();
            $('#timer').text("Incorrect...");
        }

        clearInterval(this.timer);
        this.showAnswers();
        setTimeout(this.next, 2000);
    },

    showAnswers: function() {

        $('#answers button').each(function(idx) {
            $(this).attr('disabled', 'disabled');
            if (quiz.questions[quiz.questionIdx].correctAnswer === idx) {
                $(this).addClass('correct');
            } else {
                $(this).addClass('incorrect');
            }
        });
    }
};

$(document).ready(function() {

    $('#start').on('click', function(){
        $(this).hide();
        quiz.next(false);
    });
});