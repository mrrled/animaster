addListeners();

function empty(){
    return -1;
}
function animaster(){
    const _steps = [];
    function addMove(duration, translation){
        let step = {
            duration: duration,
            name: "move",
            translation: translation,
            ratio:undefined,
            func: move
        }
        _steps.push(step);
        return this;
    }
    function addScale(duration, ratio){
        let step = {
            duration: duration,
            name: "scale",
            translation: undefined,
            ratio:ratio,
            func: scale
        }
        _steps.push(step);
        return this;
    }

    function addFadeIn(duration){
        let step = {
            duration: duration,
            name: "fadeIn",
            translation: undefined,
            ratio:undefined,
            func: fadeIn
        }
        _steps.push(step);
        return this;
    }

    function addFadeOut(duration){
        let step = {
            duration: duration,
            name: "fadeOut",
            translation: undefined,
            ratio:undefined,
            func: fadeOut
        }
        _steps.push(step);
        return this;
    }

    function play(element){
        for (const step of _steps){
            step.func(element, step)
        }
    }

    function moveAndHide(element, duration){
        let step = {
            duration: duration * 2/5,
            name: "move",
            translation: {x: 100, y: 20},
            ratio:undefined,
            func: move
        }
        move(element, step)
        
        let step2 = {
            duration: duration * 3/5,
            name: "fadeOut",
            translation: undefined,
            ratio:undefined,
            func: fadeOut
        }
        setTimeout(() => {
        fadeOut(element, step2);
    }, duration * 2/5);
    }
    function showAndHide(element, duration){
        const time = duration / 3;
        let step = {
            duration: time,
            name: "fadeIn",
            translation: undefined,
            ratio:undefined,
            func: fadeIn
        }
        let step2 = {
            duration: time,
            name: "fadeOut",
            translation: undefined,
            ratio:undefined,
            func: fadeOut
        }
        fadeIn(element, step);
        setTimeout(fadeOut, time, element, step2);
    }

    function heartBreaking(element, duration) {
        let step = {
            duration: 500,
            name: "scale",
            translation: undefined,
            ratio:1.4,
            func: scale
        }
        let step2 = {
            duration: 500,
            name: "scale",
            translation: undefined,
            ratio:1,
            func: scale
        }
        let timer = setTimeout(function run() {
            scale(element, step);
            setTimeout(scale, 250, element, step2);
            timer = setTimeout(run, 500);
        }, 0);
        

        function stop(){
            clearTimeout(timer);
        }
        return {stop};
    }

    /**
     * Блок плавно появляется из прозрачного.
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */
    function fadeIn(element, step) {
        element.style.transitionDuration =  `${step.duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function fadeOut(element, step) {
        element.style.transitionDuration =  `${step.duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    /**
     * Функция, передвигающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param translation — объект с полями x и y, обозначающими смещение блока
     */
    function move(element, step) {
        element.style.transitionDuration = `${step.duration}ms`;
        element.style.transform = getTransform(step.translation, null);
    }

    /**
     * Функция, увеличивающая/уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     */
    function scale(element, step) {
        element.style.transitionDuration =  `${step.duration}ms`;
        element.style.transform = getTransform(null, step.ratio);
    }

    function resetFadeIn(element){
        element.style.transitionDuration = null;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function resetFadeOut(element){
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function resetMoveAndScale(element){
        element.style.transitionDuration = null;
        element.style.transform = null;
        element.style.transform = getTransform(0, 1);

    }

    return {move, scale, fadeIn, fadeOut, moveAndHide, showAndHide, heartBreaking,
        resetFadeIn, resetFadeOut, resetMoveAndScale, addMove, play, addScale,
        addFadeIn, addFadeOut};
}

let stopper;
function addListeners() {

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().addFadeIn(5000).play(block);
        });

    document.getElementById('heartBreakingStop')
        .addEventListener('click', function () {
            stopper.stop();
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().addFadeOut(5000).play(block);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().addMove(500, {x: 100, y: 50}).play(block);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().addScale(1000, 1.25).play(block);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 5000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 10000);
        });

    document.getElementById('heartBreakingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBreakingBlock');
            stopper = animaster().heartBreaking(block);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().resetFadeIn(block);
        });
        
    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().resetFadeOut(block);
        });
    
     document.getElementById('scaleReset')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().resetMoveAndScale(block);
        });

    document.getElementById('moveReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().resetMoveAndScale(block);
        });
    document.getElementById('customPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('customBlock');
            const customAnimation = animaster()
                .addMove(200, {x: 40, y: 40})
                .addScale(800, 1.3)
                .addMove(200, {x: 80, y: 0})
                .addScale(800, 1)
                .addMove(200, {x: 40, y: -40})
                .addScale(800, 0.7)
                .addMove(200, {x: 0, y: 0})
                .addScale(800, 1);
            customAnimation.play(block);
        });

}



function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
