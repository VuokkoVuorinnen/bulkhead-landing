/* Local-only interactions. No storage, network calls, or telemetry. */
'use strict';

const catRemarks = [
    'A small purr. Your contribution has been acknowledged.',
    'Has moved one paw. An ambitious afternoon.',
    'Considers the observatory structurally adequate for napping.',
    'Briefly inspected the horizon. No biscuits detected.',
    'Has promoted you to assistant window supervisor.',
    'Back to supervising absolutely nothing.'
];
const prompts = [
    'Draw the nearest ordinary object as if it were a newly discovered machine.',
    'Find a detail in a familiar room that you have never drawn. Give it five minutes.',
    'Write three sentences about a place. Leave out its name.',
    'Make something with only two colours. Let the limitation do some of the work.',
    'Take a small complicated thing and explain it without using its usual vocabulary.',
    'Notice where the light falls. That is the entire assignment.',
    'Give an unfinished idea a title. You do not have to finish it today.'
];
let catIndex = 0;
let promptIndex = 0;
const catButton = document.querySelector('#pet-cat');
const promptButton = document.querySelector('#new-prompt');
catButton.hidden = false;
promptButton.hidden = false;
catButton.addEventListener('click', () => {
    document.querySelector('#cat-status').textContent = catRemarks[catIndex];
    catIndex = (catIndex + 1) % catRemarks.length;
});
promptButton.addEventListener('click', () => {
    promptIndex = (promptIndex + 1) % prompts.length;
    document.querySelector('#prompt-text').textContent = prompts[promptIndex];
});
