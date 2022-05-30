Bandits Experiment

> Eric Schulz. May 2022.
> A simple bandit experiment. Code is legacy. Please forgive.

##  Current experiment

This is the html/js-implementation of the experiment.

- index.html: the pages with instructions of the experiment.
- letters: the arms with the letters written on them
- js: structuredbandit.js contains the documented code

Currently, there are 5 blocks with 5 trials each. There are 8 arms and every arm just returns 20.

## Task
What we want, are 10 blocks with 10 trials each. There should be 2 arms only and each should return --when sampled-- a normally-distributed reward with x~N(25, 5). Good luck!