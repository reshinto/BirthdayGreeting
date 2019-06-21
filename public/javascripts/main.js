/* global theEnd animateShootingStars getScreenWidth getScreenHeight */

const lightsButton = document.getElementById("lightsSwitch");
const bulb1 = document.getElementById("yellowBulb");
const bulb2 = document.getElementById("redBulb");
const bulb3 = document.getElementById("blueBulb");
const bulb4 = document.getElementById("greenBulb");
const bulb5 = document.getElementById("pinkBulb");
const bulb6 = document.getElementById("orangeBulb");
const leftSpeaker = document.getElementById("leftSpeaker");
const rightSpeaker = document.getElementById("rightSpeaker");
const table = document.getElementById("table");
const cake = document.getElementById("cake");
const floor = document.getElementById("floor");
const flameButton = document.getElementById("flame");
const musicButton = document.getElementById("rightSpeaker");
const decorations = document.getElementById("cakeAndTable");
const balloonBorder = document.getElementById("balloonBorder");
const balloonsButton = document.getElementById("balloons");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const b4 = document.getElementById("b4");
const b5 = document.getElementById("b5");
const b6 = document.getElementById("b6");
const b7 = document.getElementById("b7");
const b8 = document.getElementById("b8");
const b9 = document.getElementById("b9");
const b10 = document.getElementById("b10");
const b11 = document.getElementById("b11");
const b12 = document.getElementById("b12");
const b13 = document.getElementById("b13");
const b14 = document.getElementById("b14");
const windowDiv = document.getElementById("window");
const wishMsgParent = document.getElementById("wishMessage");
const msgParent = document.getElementById("message");
const msgText = msgParent.getElementsByTagName("P");

const sound = new Audio();

const screenWidthCenterPos = Math.floor(window.innerWidth / 2);

let isFlameClicked = false;
let isPlaying = false;
let isMusicClicked = false;
let isBalloonClicked = false;
let okToClick = false;
let isLightsClicked = false;
// Mouse events
let isDown = false;
let hasMove = false;
let Y = 0;
const mouseUp = false;
const mouseLeave = false;

// Event Listeners
// Turn On lights event

lightsButton.addEventListener("click", function() {
    // if(!isLightsClicked){
    isLightsClicked = true;
    lightsButton.classList.remove("clickMe");
    turnOnLights();
    musicButton.classList.add("clickMe");
    fadeOut(lightsButton, 50);
    // }
});

lightsButton.addEventListener("mousedown", function() {
    isDown = true;
}, true);

lightsButton.addEventListener("mousemove", function(e) {
    e.preventDefault();
    isLightsClicked = true;
    const rect = lightsButton.getBoundingClientRect();
    const movement = event.movementY;
    if (rect.top < 0 && isDown) {
        hasMove = true;
        if (movement >= Y && movement <= 50) {
            Y = movement;
        }
        lightsButton.style.top = rect.y + Y + "px";
    }
}, true);

lightsButton.addEventListener("mouseup", function() {
    resetPosition(mouseUp);
}, true);

lightsButton.addEventListener("mouseleave", function() {
    resetPosition(mouseLeave);
}, true);

// Turn On music event

musicButton.addEventListener("click", function() {
    if (isLightsClicked && !theEnd) {
        if (!isMusicClicked) {
            isMusicClicked = true;
            for (let i = 1; i <= 14; i++) {
                document.getElementById(`b${i}`).classList.add("clickMe");
            }
            musicButton.classList.remove("clickMe");
            bulb1.classList.add("glowYellow");
            bulb2.classList.add("glowRed");
            bulb3.classList.add("glowBlue");
            bulb4.classList.add("glowGreen");
            bulb5.classList.add("glowPink");
            bulb6.classList.add("glowOrange");
        }
        sound.src = "audio/hbd.mp3";
        sound.loop = true;
        if (isPlaying === false) {
            sound.play();
            isPlaying = true;
        } else {
            sound.pause();
            isPlaying = false;
        }
    }
});

// Decoration event

for (let i = 1; i <= 14; i++) {
    document.getElementById(`b${i}`).addEventListener("click", function() {
        if (isMusicClicked && !isBalloonClicked) {
            isBalloonClicked = true;
            for (let i = 1; i <= 14; i++) {
                document.getElementById(`b${i}`).classList.remove("clickMe");
            }
            balloonsButton.classList.remove("clickMe");
            turnOffLights();
            flyAndDisappear();
            moveBalloons();
            moveDecorations();
        }
    });
}

// Display Message event

flameButton.addEventListener("click", function() {
    if (okToClick && isBalloonClicked && !isFlameClicked) {
        isFlameClicked = true;
        flameButton.classList.remove("clickMe");
        fadeOut(flameButton, 10);

        lightsFadeIn(table);
        turnOnLights();
        msgParent.style.display = "flex";
        textLoop(msgText.length, "t");
    }
});

// Required functions
// Turn On lights event functions

/**
 * Turn on lights and reset all events
 * @param {bool} mouseEvent a mouse event with bool value
 */
function resetPosition(mouseEvent) {
    mouseEvent = true;
    if (hasMove && mouseEvent) {
        lightsButton.style.top = -50 + "px";
        Y = 0;
        isDown = false;
        hasMove = false;
        mouseEvent = false;
        turnOnLights();
        musicButton.classList.add("clickMe");
        fadeOut(lightsButton, 50);
    }
}

/**
 * Turn on all lights
 */
function turnOnLights() {
    lightsFadeIn(bulb1);
    lightsFadeIn(bulb2);
    lightsFadeIn(bulb3);
    lightsFadeIn(bulb4);
    lightsFadeIn(bulb5);
    lightsFadeIn(bulb6);
    lightsFadeIn(leftSpeaker);
    lightsFadeIn(rightSpeaker);
    lightsFadeIn(balloonsButton);
    lightsFadeIn(table);
    lightsFadeIn(cake);
    lightsFadeIn(floor);
}

/**
 * Fade out animation
 * @param {element_ID} element ID of html element
 * @param {number} speed animation speed
 */
function fadeOut(element, speed) {
    let opacity = 1;
    const timer = setInterval(function() {
        if (opacity <= 0.1) {
            clearInterval(timer);
            element.style.display = "none";
        }
        element.style.opacity = opacity;
        element.style.filter = `aplha(opacity=${opacity * 100})`;
        opacity -= opacity * 0.1;
    }, speed);
}

/**
 * Fade in animation
 * @param {element_ID} element ID of html element
 * @param {number} speed animation speed
 * @param {value} displayType set css display value
 */
function fadeIn(element, speed, displayType) {
    element.style.opacity = 0;
    let opacity = 0.1;
    element.style.display = displayType;
    const timer = setInterval(function() {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = `aplha(opacity=${opacity * 100})`;
        opacity += opacity * 0.1;
    }, speed);
}

/**
 * Turn on lights animation
 * @param {element_ID} element ID of html element
 */
function lightsFadeIn(element) {
    let opacity = parseFloat(
            window.getComputedStyle(element).getPropertyValue("opacity")
    );
    const timer = setInterval(function() {
        if (
            (element === balloonsButton && opacity >= 0.95) ||
            (element === table && opacity >= 0.8)
        ) {
            clearInterval(timer);
        }
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = `aplha(opacity=${opacity * 100})`;
        opacity += opacity * 0.1;
    }, 10);
}

// Decoration event functions

/**
 * Turn off lights animation
 * @param {element_ID} element ID of html element
 */
function lightsFadeOut(element) {
    let opacity = parseFloat(
            window.getComputedStyle(element).getPropertyValue("opacity")
    );
    const timer = setInterval(function() {
        if (theEnd && opacity <= 0) {
            clearInterval(timer);
        }
        if (!theEnd && opacity <= 0.3) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = `aplha(opacity=${opacity * 100})`;
        opacity -= opacity * 0.1;
    }, 10);
}

/**
 * Turn off all lights
 */
function turnOffLights() {
    lightsFadeOut(bulb1);
    lightsFadeOut(bulb2);
    lightsFadeOut(bulb3);
    lightsFadeOut(bulb4);
    lightsFadeOut(bulb5);
    lightsFadeOut(bulb6);
    lightsFadeOut(leftSpeaker);
    lightsFadeOut(rightSpeaker);
    if (theEnd) {
        lightsFadeOut(balloonsButton);
        lightsFadeOut(cake);
    }
    lightsFadeOut(table);
    lightsFadeOut(floor);
}

/**
 * Let balloon border loose
 */
function flyAndDisappear() {
    let pos = balloonBorder.getBoundingClientRect().top;
    const timer = setInterval(function() {
        if (pos === -10) {
            clearInterval(timer);
        } else {
            pos--;
            balloonBorder.style.top = pos + "px";
        }
    }, 5);
}

/**
 * Move table, cake, and flame to the center of screen
 */
function moveDecorations() {
    let left = Math.floor(decorations.getBoundingClientRect().left);
    const timer = setInterval(function() {
        left += 2;
        if (getCenterPos(decorations) >= screenWidthCenterPos) {
            clearInterval(timer);
            animateShootingStars();
            fadeIn(wishMsgParent, 10, "flex");
            setTimeout(function() {
                fadeOut(wishMsgParent, 50);
                flameButton.classList.add("clickMe");
                okToClick = true;
            }, 5000);
        } else {
            decorations.style.left = left + "px";
        }
    }, 5);
}

/**
 * Move all balloons to the right end of screen
 */
function moveBalloons() {
    let left = Math.floor(b14.getBoundingClientRect().left);
    const timer = setInterval(function() {
        left += 3;
        if (b14.getBoundingClientRect().right < getScreenWidth) {
            for (let i = 1; i <= 14; i++) {
                document.getElementById(`b${i}`).style.left = left + "px";
            }
        } else {
            clearInterval(timer);
            releaseBalloons();
        }
    }, 5);
}

/**
 * Release all balloons when it hits the right end of screen
 */
function releaseBalloons() {
    removeClass();
    releaseBalloon(b1, 16, 0);
    releaseBalloon(b2, 32, 0);
    releaseBalloon(b3, 48, 0);
    releaseBalloon(b4, 64, 0);
    releaseBalloon(b5, 80, 0);
    releaseBalloon(b6, 10, 10);
    releaseBalloon(b7, 20, 10);
    releaseBalloon(b8, 30, 10);
    releaseBalloon(b9, 40, 10);
    releaseBalloon(b10, 50, 10);
    releaseBalloon(b11, 60, 10);
    releaseBalloon(b12, 70, 10);
    releaseBalloon(b13, 80, 10);
    releaseBalloon(b14, 90, 10);
    addClass();
}

/**
 * Remove margin spacing of all balloons
 */
function removeClass() {
    b1.classList.remove("b1");
    b2.classList.remove("b2");
    b3.classList.remove("b3");
    b4.classList.remove("b4");
    b5.classList.remove("b5");
    b6.classList.remove("b6");
    b7.classList.remove("b7");
    b8.classList.remove("b3");
    b9.classList.remove("b4");
    b10.classList.remove("b1");
    b11.classList.remove("b5");
    b12.classList.remove("b2");
    b13.classList.remove("b7");
    b14.classList.remove("b6");
}

/**
 * Add balloon animations for all balloons
 */
function addClass() {
    b1.classList.add("balloons-rotate-behaviour-two");
    b2.classList.add("balloons-rotate-behaviour-one");
    b3.classList.add("balloons-rotate-behaviour-one");
    b4.classList.add("balloons-rotate-behaviour-two");
    b5.classList.add("balloons-rotate-behaviour-two");
    b6.classList.add("balloons-rotate-behaviour-one");
    b7.classList.add("balloons-rotate-behaviour-one");
    b8.classList.add("balloons-rotate-behaviour-two");
    b9.classList.add("balloons-rotate-behaviour-two");
    b10.classList.add("balloons-rotate-behaviour-one");
    b11.classList.add("balloons-rotate-behaviour-two");
    b12.classList.add("balloons-rotate-behaviour-two");
    b13.classList.add("balloons-rotate-behaviour-one");
    b14.classList.add("balloons-rotate-behaviour-one");
}

/**
 * release a balloon when it hits the right end of the screen
 * @param {element_ID} balloonId ID of balloon element
 * @param {percentage} centerP position of balloon to stop horizontally
 * @param {percentage} topP position of balloon to stop vertically
 */
function releaseBalloon(balloonId, centerP, topP) {
    const setTopPos = setPos(getScreenHeight, topP);
    const setCenterPos = setPos(getScreenWidth, centerP);
    let curLeftPos = Math.floor(balloonId.getBoundingClientRect().left);
    let curTopPos = Math.floor(balloonId.getBoundingClientRect().top);
    const timer = setInterval(function() {
        if (balloonId.getBoundingClientRect().top > setTopPos) {
            curTopPos -= 1;
            balloonId.style.top = curTopPos + "px";
        }
        if (getCenterPos(balloonId) <= setCenterPos) {
            curLeftPos += 1;
        } else {
            curLeftPos -= 1;
        }
        balloonId.style.left = curLeftPos + "px";
        if (balloonId.getBoundingClientRect().top <= setTopPos) {
            if (getCenterPos(balloonId) === setCenterPos) {
                clearInterval(timer);
            }
        }
    }, 5);
}

/**
 * Get actual position from screen
 * @param {number} screenDimension width or height of screen
 * @param {percentage} posPercentage desired stopping position
 * @return {number} the actual position to stop animation
 */
function setPos(screenDimension, posPercentage) {
    return Math.floor((screenDimension / 100) * posPercentage);
}

/**
 * Get the center position of the element
 * @param {element_ID} balloonId ID of balloon element
 * @return {number} the center position of the element
 */
function getCenterPos(balloonId) {
    const left = balloonId.getBoundingClientRect().left;
    const right = balloonId.getBoundingClientRect().right;
    return Math.floor((right - left) / 2 + left);
}

// Display Message event functions

/**
 * Start to activate the ending animation
 */
function startEnd() {
    setTimeout(function() {
        theEnd = true;
        turnOffLights();
        lightsFadeOut(balloonBorder);
        sound.pause();
        windowDiv.style.visibility = "hidden";
    }, 3000);
}

/**
 * Play text animation
 * @param {number} maxCount total number of text elements
 * @param {string} elementPrefix ID of text element excluding the numbers
 * @param {number} count the number of times the text has been looped
 * @param {number} preCount the previous count number
 */
function textLoop(maxCount, elementPrefix, count = 0, preCount = 0) {
    if (count === 0) {
        fadeIn(document.getElementById(`${elementPrefix}0`), 10, "block");
        count = 1;
    }
    if (preCount === 0) {
        setTimeout(function() {
            fadeOut(document.getElementById(`${elementPrefix}0`), 50);
            preCount = 1;
        }, 5000);
    }
    setTimeout(function() {
        let text;
        if (preCount !== count) {
            text = document.getElementById(`${elementPrefix}${preCount}`);
            fadeOut(text, 50);
            preCount++;
            return textLoop(maxCount, elementPrefix, count, preCount);
        }
        text = document.getElementById(`${elementPrefix}${count}`);
        fadeIn(text, 10, "block");
        preCount = count;
        count++;
        if (count < maxCount) {
            return textLoop(maxCount, elementPrefix, count, preCount);
        }
        return startEnd();
    }, 2000);
}
