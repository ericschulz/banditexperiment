Structured Bandits Project

> Nick Franklin, Eric Schulz and Sam Gershman.
> "Finding structure in multi-armed bandits."

In particular, it contains the reproducible code for the experiment as well as the code to generate the underlying functions.

# Index
## Experiment

This is the html/js-implementation of the experiment. In particular,

- index.html: the implementation of the experiment.
- letters: the arms with the letters written on them
- envs: generated functions, 100 are positive-linear, 100 are negative linear, and 100 are permutations of the two
- js: this is where the JavaScript is hosted, structuredbandit.js contains the documented code


## Function generation

This is how I generated the functions in envs:

- generate.R: shows how I generated functions from a linear kernel and exported it to JSON


## Paper

To be written.

